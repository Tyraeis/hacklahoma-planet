mod shaders;
mod mesh;

use anyhow::{ anyhow, Result };
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{ WebGlRenderingContext, HtmlCanvasElement };
use crate::shaders::ShaderProgram;
use crate::mesh::{ ArrayBuffer, Mesh };

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
    gl: WebGlRenderingContext,
    shader: ShaderProgram,
    obj: Mesh
}

fn create_box(gl: &WebGlRenderingContext, shader: &ShaderProgram) -> Result<Mesh> {
    let vertices = [
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0
    ];
    let mut buf = ArrayBuffer::new(gl);
    buf.data(&vertices, WebGlRenderingContext::STATIC_DRAW, 3, 0, 0);
    Ok(Mesh::new(gl, buf, shader))
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
                let obj = create_box(&gl, &shader)?;
                return Ok(Renderer {
                    canvas,
                    gl,
                    shader,
                    obj
                });
            }
        }
        Err(anyhow!("Failed to get WebGl rendering context"))
    }

    #[wasm_bindgen]
    pub fn render(&self) {
        self.gl.viewport(0, 0, self.canvas.width() as i32, self.canvas.height() as i32);
        self.gl.clear_color(0.0, 0.0, 0.0, 1.0);
        self.gl.clear(WebGlRenderingContext::COLOR_BUFFER_BIT);
        self.obj.render();
    }
}