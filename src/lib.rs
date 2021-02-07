#![allow(dead_code)]

mod shaders;
mod mesh;
mod scene;

use std::rc::Rc;
use anyhow::{ anyhow, Result };
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use js_sys::Function;
use web_sys::{ WebGlRenderingContext, HtmlCanvasElement };
use cgmath::{ Deg, Matrix4 };
use serde::{ Serialize, Deserialize };
use genmesh::generators::{ IcoSphere, IndexedPolygon, SharedVertex };
use crate::shaders::ShaderProgram;
use crate::mesh::{ ArrayBuffer, ElementArrayBuffer, Mesh };
use crate::scene::{ Object, Camera, Scene };

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn rust_init() {
    console_error_panic_hook::set_once();
    console_log::init_with_level(log::Level::Debug).expect("Error initializing logging");
}

#[wasm_bindgen]
pub struct Renderer {
    canvas: HtmlCanvasElement,
    width: i32,
    height: i32,
    gl: WebGlRenderingContext,
    shader: Rc<ShaderProgram>,
    scene: Scene,
    lod: usize,
    surface_info_func: Function
}

fn enable_extensions(gl: &WebGlRenderingContext) -> Result<()> {
    gl.get_extension("OES_element_index_uint")
        .map_err(|_| anyhow!("Missing extension: OES_element_index_uint"))?;
    Ok(())
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SurfaceInfo {
    height: f32,
    color: (f32, f32, f32)
}


#[wasm_bindgen]
impl Renderer {
    #[wasm_bindgen(constructor)]
    pub fn constructor(canvas: HtmlCanvasElement, lod: usize, surface_info_func: Function) -> Self {
        match Renderer::new(canvas, lod, surface_info_func) {
            Ok(result) => result,
            Err(e) => panic!("{}", e)
        }
    }

    fn new(canvas: HtmlCanvasElement, lod: usize, surface_info_func: Function) -> Result<Renderer> {
        let ctx = canvas.get_context("webgl");
        if let Ok(Some(ctx)) = ctx {
            if let Ok(gl) = ctx.dyn_into::<WebGlRenderingContext>() {
                enable_extensions(&gl)?;
                let shader = Rc::new(ShaderProgram::default(&gl)?);

                let width = canvas.width() as i32;
                let height = canvas.height() as i32;
                let scene = Scene::new(Camera::new(Deg(30.0), width as f32 / height as f32, 0.1, 1000.0));

                let mut renderer = Renderer {
                    canvas,
                    width,
                    height,
                    gl,
                    shader,
                    scene,
                    lod,
                    surface_info_func
                };

                renderer.regenerate_planet();

                return Ok(renderer);
            }
        }
        Err(anyhow!("Failed to get WebGl rendering context"))
    }

    #[wasm_bindgen]
    pub fn resize(&mut self) {
        self.width = self.canvas.width() as i32;
        self.height = self.canvas.height() as i32;

        self.scene.camera.projection = cgmath::perspective(
            Deg(75.0),
            self.width as f32 / self.height as f32,
            0.1, 1000.0
        );
    }

    #[wasm_bindgen]
    pub fn render(&mut self, t: f32) {
        self.scene.objects[0].rotation = Matrix4::from_angle_y(Deg(t * 30.0));

        self.gl.enable(WebGlRenderingContext::DEPTH_TEST);
        self.gl.depth_func(WebGlRenderingContext::LEQUAL);
        self.gl.clear_color(0.0, 0.0, 0.0, 1.0);
        self.gl.clear_depth(1.0);
        self.gl.viewport(0, 0, self.width, self.height);
        self.gl.clear(WebGlRenderingContext::COLOR_BUFFER_BIT | WebGlRenderingContext::DEPTH_BUFFER_BIT);
        self.scene.render();
    }

    #[wasm_bindgen]
    pub fn set_lod(&mut self, lod: usize) {
        self.lod = lod;
    }

    #[wasm_bindgen]
    pub fn set_surface_info_func(&mut self, func: Function) {
        self.surface_info_func = func;
    }

    fn get_surface_info(&self, vecs: &Vec<Vec<f32>>) -> Vec<SurfaceInfo> {
        let this = JsValue::null();
        let vecs_js = JsValue::from_serde(vecs).unwrap();
        match self.surface_info_func.call1(&this, &vecs_js) {
            Ok(info) => {
                match info.into_serde() {
                    Ok(info) => return info,
                    Err(e) => {
                        log::error!("error receiving data from surface_info_func: {}", e);
                        log::error!("{:?}", info);
                    }
                }
            }
            Err(e) => log::error!("error in surface_info_func: {:?}", e)
        }
        std::iter::repeat(SurfaceInfo {
            height: 1.0,
            color: (1.0, 0.0, 1.0)
        }).take(vecs.len()).collect()
    }

    fn create_planet(&self) -> Mesh {
        let shape = IcoSphere::subdivide(self.lod);

        let mut vertices: Vec<Vec<f32>> = shape.shared_vertex_iter()
            .map(|v| vec![v.pos.x, v.pos.y, v.pos.z])
            .collect();
        
        let mut info = self.get_surface_info(&vertices);

        let vertices: Vec<f32> = vertices.drain(..)
            .enumerate()
            .flat_map(|(i, v)| {
                let h = info[i].height;
                vec![v[0]*h, v[1]*h, v[2]*h]
            })
            .collect();
        
        let colors: Vec<f32> = info.drain(..)
            .flat_map(|i| vec![i.color.0, i.color.1, i.color.2])
            .collect();

        let indices: Vec<u32> = shape.indexed_polygon_iter()
            .flat_map(|t| vec![t.x, t.z, t.y])
            .map(|n| n as u32)
            .collect();
        
        let normals = mesh::generate_normals(&vertices, &indices);

        let mut vertex_buf = ArrayBuffer::new(&self.gl);
        vertex_buf.data(&vertices, WebGlRenderingContext::STATIC_DRAW, shape.shared_vertex_count() as i32, 0, 0);

        let mut index_buf = ElementArrayBuffer::new(&self.gl);
        index_buf.data(&indices, WebGlRenderingContext::STATIC_DRAW, indices.len() as i32, 0);

        let mut normal_buf = ArrayBuffer::new(&self.gl);
        normal_buf.data(&normals, WebGlRenderingContext::STATIC_DRAW, shape.shared_vertex_count() as i32, 0, 0);
        
        let mut color_buf = ArrayBuffer::new(&self.gl);
        color_buf.data(&colors, WebGlRenderingContext::STATIC_DRAW, shape.shared_vertex_count() as i32, 0, 0);

        Mesh::new(&self.gl, vertex_buf, index_buf, normal_buf, color_buf, self.shader.clone())
    }

    #[wasm_bindgen]
    pub fn regenerate_planet(&mut self) {
        let mesh = self.create_planet();
        let mut obj = Object::new(mesh);
        obj.position.z = -3.0;

        self.scene.objects.clear();
        self.scene.add(obj);
    }
}