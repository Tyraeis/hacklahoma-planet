use js_sys::{ Float32Array, Uint16Array };
use web_sys::{ WebGlRenderingContext, WebGlBuffer };
use cgmath::Matrix4;
use crate::shaders::ShaderProgram;

pub struct Buffer {
    gl: WebGlRenderingContext,
    buffer: WebGlBuffer,
}

impl Buffer {
    pub fn new(gl: &WebGlRenderingContext) -> Self {
        let buffer = gl.create_buffer().expect("Failed to create buffer");
        Buffer {
            gl: gl.clone(),
            buffer
        }
    }

    pub fn bind(&self, target: u32) {
        self.gl.bind_buffer(target, Some(&self.buffer));
    }

    pub fn data_f32(&self, target: u32, data: &[f32], usage: u32) {
        // Safety: "Views into WebAssembly memory are only valid so long as the backing buffer isn't
        // resized in JS." The array is only passed to WebGl and then immediately discarded, so this
        // is safe.
        //
        // See: https://rustwasm.github.io/wasm-bindgen/api/js_sys/struct.Float32Array.html#method.view
        unsafe {
            let array = Float32Array::view(data);
            self.bind(target);
            self.gl.buffer_data_with_array_buffer_view(target, &array, usage);
        }
    }

    pub fn data_u16(&self, target: u32, data: &[u16], usage: u32) {
        // Safety: "Views into WebAssembly memory are only valid so long as the backing buffer isn't
        // resized in JS." The array is only passed to WebGl and then immediately discarded, so this
        // is safe.
        //
        // See: https://rustwasm.github.io/wasm-bindgen/api/js_sys/struct.Uint16Array.html#method.view
        unsafe {
            let array = Uint16Array::view(data);
            self.bind(target);
            self.gl.buffer_data_with_array_buffer_view(target, &array, usage);
        }
    }
}

impl Drop for Buffer {
    fn drop(&mut self) {
        self.gl.delete_buffer(Some(&self.buffer));
    }
}

pub struct ArrayBuffer {
    buffer: Buffer,
    pub num_components: i32,
    pub stride: i32,
    pub offset: i32,
}

impl ArrayBuffer {
    pub fn new(gl: &WebGlRenderingContext) -> Self {
        ArrayBuffer {
            buffer: Buffer::new(gl),
            num_components: 0,
            stride: 0,
            offset: 0
        }
    }

    pub fn data(&mut self, data: &[f32], usage: u32, num_components: i32, stride: i32, offset: i32) {
        self.buffer.data_f32(WebGlRenderingContext::ARRAY_BUFFER, data, usage);
        self.num_components = num_components;
        self.stride = stride;
        self.offset = offset;
    }

    pub fn bind(&self) {
        self.buffer.bind(WebGlRenderingContext::ARRAY_BUFFER);
    }
}

pub struct ElementArrayBuffer {
    buffer: Buffer,
    pub count: i32,
    pub offset: i32,
}

impl ElementArrayBuffer {
    pub fn new(gl: &WebGlRenderingContext) -> Self {
        ElementArrayBuffer {
            buffer: Buffer::new(gl),
            count: 0,
            offset: 0
        }
    }

    pub fn data(&mut self, data: &[u16], usage: u32, count: i32, offset: i32) {
        self.buffer.data_u16(WebGlRenderingContext::ELEMENT_ARRAY_BUFFER, data, usage);
        self.count = count;
        self.offset = offset;
    }

    pub fn bind(&self) {
        self.buffer.bind(WebGlRenderingContext::ELEMENT_ARRAY_BUFFER);
    }
}

pub struct Mesh {
    gl: WebGlRenderingContext,
    pub vertices: ArrayBuffer,
    pub indices: ElementArrayBuffer,
    pub shader: ShaderProgram
}

impl Mesh {
    pub fn new(gl: &WebGlRenderingContext, vertices: ArrayBuffer, indices: ElementArrayBuffer, shader: &ShaderProgram) -> Self {
        Mesh {
            gl: gl.clone(),
            vertices,
            indices,
            shader: shader.clone()
        }
    }

    pub fn render(&self, view_matrix: &Matrix4<f32>) {
        let mat: &[f32; 16] = view_matrix.as_ref();

        self.shader.use_program();
        self.shader.set_attrib_arraybuffer("position", &self.vertices)
            .expect("Error setting vertex positions");
        self.shader.set_uniform_mat4("transform_matrix", mat)
            .expect("Error setting transform matrix");
        
        self.indices.bind();
        self.gl.draw_elements_with_i32(
            WebGlRenderingContext::TRIANGLES,
            self.indices.count,
            WebGlRenderingContext::UNSIGNED_SHORT,
            self.indices.offset
        );
    }
}