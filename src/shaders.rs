use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;
use anyhow::{ anyhow, Result };
use web_sys::{ WebGlRenderingContext, WebGlShader, WebGlProgram, WebGlUniformLocation };
use crate::mesh::ArrayBuffer;

static DEFAULT_VERTEX_SHADER: &'static str = include_str!("./vertex_shader.glsl");
static DEFAULT_FRAGMENT_SHADER: &'static str = include_str!("./fragment_shader.glsl");

#[derive(Clone)]
pub struct Shader {
    gl: WebGlRenderingContext,
    shader: WebGlShader
}

impl Shader {
    fn new(gl: &WebGlRenderingContext, kind: u32, source: &str) -> Result<Self> {
        let shader = gl.create_shader(kind).expect("Failed to create shader");
        gl.shader_source(&shader, source);
        gl.compile_shader(&shader);
        let success = gl.get_shader_parameter(&shader, WebGlRenderingContext::COMPILE_STATUS);
        if success.is_falsy() {
            let log = gl.get_shader_info_log(&shader);
            gl.delete_shader(Some(&shader));
            anyhow::bail!("Failed to compile shader: {:?}", log);
        }

        Ok(Shader {
            gl: gl.clone(),
            shader
        })
    }

    fn attach(&self, program: &WebGlProgram) {
        self.gl.attach_shader(program, &self.shader);
    }
}

impl Drop for Shader {
    fn drop(&mut self) {
        self.gl.delete_shader(Some(&self.shader));
    }
}

#[derive(Clone)]
pub struct Attrib {
    pub loc: u32,
    pub size: i32,
    pub kind: u32,
}

#[derive(Clone)]
pub struct Uniform {
    pub loc: WebGlUniformLocation
}

#[derive(Clone)]
pub struct ShaderProgram {
    gl: WebGlRenderingContext,
    vertex_shader: Shader,
    fragment_shader: Shader,
    program: WebGlProgram,
    attribs: Rc<RefCell<HashMap<String, Attrib>>>,
    uniforms: Rc<RefCell<HashMap<String, Uniform>>>
}

impl ShaderProgram {
    pub fn new(gl: &WebGlRenderingContext, vertex_shader_src: &str, fragment_shader_src: &str) -> Result<Self> {
        let vertex_shader = Shader::new(gl, WebGlRenderingContext::VERTEX_SHADER, vertex_shader_src)?;
        let fragment_shader = Shader::new(gl, WebGlRenderingContext::FRAGMENT_SHADER, fragment_shader_src)?;
        let program = gl.create_program().expect("Failed to create program");
        vertex_shader.attach(&program);
        fragment_shader.attach(&program);
        gl.link_program(&program);
        let success = gl.get_program_parameter(&program, WebGlRenderingContext::LINK_STATUS);
        if success.is_falsy() {
            let log = gl.get_program_info_log(&program);
            gl.delete_program(Some(&program));
            anyhow::bail!("Failed to link shader program: {:?}", log);
        }

        Ok(ShaderProgram {
            gl: gl.clone(),
            vertex_shader,
            fragment_shader,
            program,
            attribs: Rc::new(RefCell::new(HashMap::new())),
            uniforms: Rc::new(RefCell::new(HashMap::new()))
        })
    }

    pub fn default(gl: &WebGlRenderingContext) -> Result<Self> {
        let p = ShaderProgram::new(gl, DEFAULT_VERTEX_SHADER, DEFAULT_FRAGMENT_SHADER)?
            .with_attrib("position", 3, WebGlRenderingContext::FLOAT)
            .with_attrib("normal", 3, WebGlRenderingContext::FLOAT)
            .with_uniform("world_view_projection")
            .with_uniform("world_inverse_transpose");
        Ok(p)
    }

    pub fn with_attrib(self, name: &str, size: i32, kind: u32) -> Self {
        let loc = self.gl.get_attrib_location(&self.program, name);
        if loc >= 0 {
            let attrib = Attrib {
                loc: loc as u32,
                size, kind
            };
            self.attribs.borrow_mut().insert(name.to_owned(), attrib);
        } else {
            log::error!("get_attrib_location returned {}", loc);
        }
        self
    }

    pub fn with_uniform(self, name: &str) -> Self {
        let loc = self.gl.get_uniform_location(&self.program, name);
        if let Some(loc) = loc {
            let uniform = Uniform {
                loc
            };
            self.uniforms.borrow_mut().insert(name.to_owned(), uniform);
        } else {
            log::error!("get_uniform_location returned None");
        }
        self
    }

    pub fn set_attrib_arraybuffer(&self, name: &str, buf: &ArrayBuffer) -> Result<()> {
        let attribs = self.attribs.borrow();
        let attrib = attribs.get(name)
            .ok_or(anyhow!("Unknown attrib: {}", name))?;
        self.gl.enable_vertex_attrib_array(attrib.loc);
        buf.bind();
        self.gl.vertex_attrib_pointer_with_i32(attrib.loc, attrib.size, attrib.kind, false, buf.stride, buf.offset);
        Ok(())
    }

    pub fn set_uniform_mat4<M>(&self, name: &str, mat: M) -> Result<()>
    where M: AsRef<[f32]>
    {
        let uniforms = self.uniforms.borrow();
        let uniform = uniforms.get(name)
            .ok_or(anyhow!("Unknown uniform: {}", name))?;
        self.gl.uniform_matrix4fv_with_f32_array(Some(&uniform.loc), false, &mat.as_ref());
        Ok(())
    }

    pub fn use_program(&self) {
        self.gl.use_program(Some(&self.program));
    }
}

impl Drop for ShaderProgram {
    fn drop(&mut self) {
        self.gl.delete_program(Some(&self.program));
    }
}
