#![allow(dead_code)]

mod shaders;
mod mesh;
mod scene;

use anyhow::{ anyhow, Result };
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{ WebGlRenderingContext, HtmlCanvasElement };
use cgmath::{ Deg, Matrix4 };
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
    shader: ShaderProgram,
    scene: Scene
}

fn create_scene(gl: &WebGlRenderingContext, shader: &ShaderProgram, w: f32, h: f32) -> Result<Scene> {
    let mut scene = Scene::new(Camera::new(Deg(75.0), w / h, 0.1, 1000.0));

    let vertices = [
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
    ];
    let indices = [
        0, 1, 3, //top 1
        3, 1, 2, //top 2
        2, 6, 7, //front 1
        7, 3, 2, //front 2
        7, 6, 5, //bottom 1
        5, 4, 7, //bottom 2
        5, 1, 4, //back 1
        4, 1, 0, //back 2
        4, 3, 7, //right 1
        3, 4, 0, //right 2
        5, 6, 2, //left 1
        5, 1, 2  //left 2
    ];

    let mut vertex_buf = ArrayBuffer::new(gl);
    vertex_buf.data(&vertices, WebGlRenderingContext::STATIC_DRAW, (vertices.len()/3) as i32, 0, 0);

    let mut index_buf = ElementArrayBuffer::new(gl);
    index_buf.data(&indices, WebGlRenderingContext::STATIC_DRAW, indices.len() as i32, 0);

    let mut obj = Object::new(Mesh::new(gl, vertex_buf, index_buf, shader));
    obj.position.z = -5.0;
    scene.add(obj);

    Ok(scene)
}


#[wasm_bindgen]
impl Renderer {
    #[wasm_bindgen(constructor)]
    pub fn constructor(canvas: HtmlCanvasElement) -> Self {
        match Renderer::new(canvas) {
            Ok(result) => result,
            Err(e) => panic!("{}", e)
        }
    }

    fn new(canvas: HtmlCanvasElement) -> Result<Renderer> {
        let ctx = canvas.get_context("webgl");
        if let Ok(Some(ctx)) = ctx {
            if let Ok(gl) = ctx.dyn_into::<WebGlRenderingContext>() {
                let shader = ShaderProgram::default(&gl)?;
                let width = canvas.width() as i32;
                let height = canvas.height() as i32;
                let scene = create_scene(&gl, &shader, width as f32, height as f32)?;
                return Ok(Renderer {
                    canvas,
                    width,
                    height,
                    gl,
                    shader,
                    scene
                });
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
}