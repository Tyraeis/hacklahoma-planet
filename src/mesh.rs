use std::rc::Rc;
use js_sys::{ Float32Array, Uint32Array };
use web_sys::{ WebGlRenderingContext, WebGlBuffer };
use cgmath::{ Matrix4, Vector3 };
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

    pub fn data_u32(&self, target: u32, data: &[u32], usage: u32) {
        // Safety: "Views into WebAssembly memory are only valid so long as the backing buffer isn't
        // resized in JS." The array is only passed to WebGl and then immediately discarded, so this
        // is safe.
        //
        // See: https://rustwasm.github.io/wasm-bindgen/api/js_sys/struct.Uint16Array.html#method.view
        unsafe {
            let array = Uint32Array::view(data);
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
    num_components: i32,
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

    pub fn data(&mut self, data: &[u32], usage: u32, count: i32, offset: i32) {
        self.buffer.data_u32(WebGlRenderingContext::ELEMENT_ARRAY_BUFFER, data, usage);
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
    pub normals: ArrayBuffer,
    pub colors: ArrayBuffer,
    pub shader: Rc<ShaderProgram>
}

impl Mesh {
    pub fn new(
        gl: &WebGlRenderingContext,
        vertices: ArrayBuffer,
        indices: ElementArrayBuffer,
        normals: ArrayBuffer,
        colors: ArrayBuffer,
        shader: Rc<ShaderProgram>
    ) -> Self {
        Mesh {
            gl: gl.clone(),
            vertices,
            indices,
            normals,
            colors,
            shader: shader.clone()
        }
    }

    pub fn render(&self, world_view_projection: &Matrix4<f32>, world_inverse_transpose: &Matrix4<f32>) {
        //let mat: &[f32; 16] = view_matrix.as_ref();

        self.shader.use_program();
        self.shader.set_attrib_arraybuffer("position", &self.vertices)
            .expect("Error setting vertex positions");
        self.shader.set_attrib_arraybuffer("normal", &self.normals)
            .expect("Error setting vertex normals");
        self.shader.set_attrib_arraybuffer("color", &self.colors)
            .expect("Error setting vertex colors");
        self.shader.set_uniform_mat4("world_view_projection", world_view_projection.as_ref() as &[f32; 16])
            .expect("Error setting world-view-projection matrix");
        self.shader.set_uniform_mat4("world_inverse_transpose", world_inverse_transpose.as_ref() as &[f32; 16])
            .expect("Error setting world-inverse-transpose matrix");
        
        self.indices.bind();
        self.gl.draw_elements_with_i32(
            WebGlRenderingContext::TRIANGLES,
            self.indices.count,
            WebGlRenderingContext::UNSIGNED_INT,
            self.indices.offset
        );
    }
}

fn get_vertex(vertices: &[f32], index: usize) -> Vector3<f32> {
    let a = vertices[index*3 + 0];
    let b = vertices[index*3 + 1];
    let c = vertices[index*3 + 2];
    Vector3::new(a, b, c)
}

pub fn generate_normals(vertices: &[f32], indices: &[u32]) -> Vec<f32> {
    let mut normals: Vec<Vec<Vector3<f32>>> = std::iter::repeat(Vec::new())
        .take(vertices.len() / 3)
        .collect();
    
    for face in 0..indices.len()/3 {
        let idx_a = indices[face*3 + 0] as usize;
        let idx_b = indices[face*3 + 1] as usize;
        let idx_c = indices[face*3 + 2] as usize;

        let a = get_vertex(vertices, idx_a);
        let b = get_vertex(vertices, idx_b);
        let c = get_vertex(vertices, idx_c);

        normals[idx_a].push((b - a).cross(c - a));
        normals[idx_b].push((c - b).cross(a - b));
        normals[idx_c].push((a - c).cross(b - c));
    }

    let normals: Vec<f32> = normals.iter()
        .map(|n| n.iter().sum())
        .flat_map(|v: Vector3<f32>| vec![v.x, v.y, v.z])
        .collect();

    normals
}