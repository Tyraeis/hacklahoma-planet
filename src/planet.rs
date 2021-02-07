use cgmath::{ prelude::*, Vector3 };
use web_sys::WebGlRenderingContext;
//use hexasphere::shapes::IcoSphere;
use genmesh::generators::{ IcoSphere, IndexedPolygon, SharedVertex };
use crate::mesh::{ ArrayBuffer, ElementArrayBuffer, Mesh, generate_normals };
use crate::shaders::ShaderProgram;

const PHI: f32 = 1.6180339887498948;

const ICOSAHEDRON_VERTICES: [f32; 36] = [
     0.0,  1.0,  PHI,
     1.0,  PHI,  0.0,
     PHI,  0.0,  1.0,
     0.0, -1.0,  PHI,
    -1.0,  PHI,  0.0,
     PHI,  0.0, -1.0,
     0.0,  1.0, -PHI,
     1.0, -PHI,  0.0,
    -PHI,  0.0,  1.0,
     0.0, -1.0, -PHI,
    -1.0, -PHI,  0.0,
    -PHI,  0.0, -1.0,
];
const ICOSAHEDRON_INDICES: [u32; 60] = [
    0, 2, 3,
    0, 3, 8,
    0, 2, 1,
    0, 4, 1,
    0, 8, 4,
    2, 5, 7,
    2, 1, 5,
    3, 2, 7,
    1, 6, 5,
    1, 4, 6,
    4, 11, 6,
    4, 8, 11,
    8, 10, 11,
    8, 3, 10,
    3, 7, 10,
    7, 9, 10,
    7, 5, 9,
    5, 6, 9,
    6, 11, 9,
    10, 9, 11
];

// https://github.com/thallada/icosahedron/blob/9643757df245e29f5ecfbb25f9a2c06b3a4e1217/src/lib.rs#L160-L205
fn subdivide_face(a: Vector3<f32>, b: Vector3<f32>, c: Vector3<f32>, lod: usize) {
    let cols = lod;
    let mut vertices: Vec<Vec<Vector3<f32>>> = Vec::new();

    for i in 0..=cols {
        vertices.push(Vec::new());
        let aj = a.lerp(c, i as f32 / lod as f32);
        let bj = b.lerp(c, i as f32 / lod as f32);
        let rows = cols - i;
        for j in 0..rows {
            if j == 0 && i == cols {
                vertices[i].push(aj.normalize());
            } else {
                vertices[i].push(aj.clone().lerp(bj, j as f32 / rows as f32).normalize());
            }
        }
    }
    
    for i in 0..cols {
        for j in 0..2*(cols-i) - 1 {
            let k = j / 2;


            if j % 2 == 0 {
                let a = vertices[i][k + 1];
                let b = vertices[i + 1][k];
                let c = vertices[i][k];
            } else {
                let a = vertices[i][k + 1];
                let b = vertices[i + 1][k + 1];
                let c = vertices[i + 1][k];
            }
        }
    }
}

pub fn create_icosahedron(gl: &WebGlRenderingContext, shader: &ShaderProgram, lod: u32) -> Mesh {
    let mut vertex_buf = ArrayBuffer::new(gl);
    vertex_buf.data(&ICOSAHEDRON_VERTICES, WebGlRenderingContext::STATIC_DRAW, 12, 0, 0);

    let mut index_buf = ElementArrayBuffer::new(gl);
    index_buf.data(&ICOSAHEDRON_INDICES, WebGlRenderingContext::STATIC_DRAW, ICOSAHEDRON_INDICES.len() as i32, 0);

    let normals = generate_normals(&ICOSAHEDRON_VERTICES, &ICOSAHEDRON_INDICES);
    let mut normal_buf = ArrayBuffer::new(gl);
    normal_buf.data(&normals, WebGlRenderingContext::STATIC_DRAW, 12, 0, 0);

    log::info!("{:?}", &ICOSAHEDRON_VERTICES);
    log::info!("{:?}", &ICOSAHEDRON_INDICES);

    Mesh::new(gl, vertex_buf, index_buf, normal_buf, shader)
}

pub fn create_icosahedron2(gl: &WebGlRenderingContext, shader: &ShaderProgram, lod: usize) -> Mesh {
    /* let shape: IcoSphere<Vec<f32>> = IcoSphere::new(lod, |v| vec![v.x, v.y, v.z]);

    let vertices: Vec<f32> = shape.raw_data().iter()
        .flat_map(|v| v)
        .copied()
        .collect();
    
    let indices = shape.get_all_indices();

    let normals = generate_normals(&vertices, &indices); */

    let shape = IcoSphere::subdivide(lod);

    let vertices: Vec<f32> = shape.shared_vertex_iter()
        .flat_map(|v| vec![v.pos.x, v.pos.y, v.pos.z])
        .collect();

    let normals: Vec<f32> = shape.shared_vertex_iter()
        .flat_map(|v| vec![-v.normal.x, -v.normal.y, -v.normal.z])
        .collect();

    let indices: Vec<u32> = shape.indexed_polygon_iter()
        .flat_map(|t| vec![t.x, t.z, t.y])
        .map(|n| n as u32)
        .collect();

    let mut vertex_buf = ArrayBuffer::new(gl);
    vertex_buf.data(&vertices, WebGlRenderingContext::STATIC_DRAW, shape.shared_vertex_count() as i32, 0, 0);

    let mut index_buf = ElementArrayBuffer::new(gl);
    index_buf.data(&indices, WebGlRenderingContext::STATIC_DRAW, indices.len() as i32, 0);

    let mut normal_buf = ArrayBuffer::new(gl);
    normal_buf.data(&normals, WebGlRenderingContext::STATIC_DRAW, shape.shared_vertex_count() as i32, 0, 0);

    log::info!("{:?}", vertices);
    log::info!("{:?}", indices);
    log::info!("{} {}", shape.shared_vertex_count(), indices.len());

    Mesh::new(gl, vertex_buf, index_buf, normal_buf, shader)
}