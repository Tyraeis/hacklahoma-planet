use cgmath::{ Matrix4, Vector3, Rad };
use crate::mesh::Mesh;

pub struct Object {
    pub mesh: Mesh,
    pub position: Vector3<f32>,
    pub rotation: Matrix4<f32>
}

impl Object {
    pub fn new(mesh: Mesh) -> Self {
        Object {
            mesh,
            position: Vector3::new(0.0, 0.0, 0.0),
            rotation: Matrix4::from_axis_angle(Vector3::unit_z(), Rad(0.0))
        }
    }

    fn model_matrix(&self) -> Matrix4<f32> {
        Matrix4::from_translation(self.position) * self.rotation
    }

    pub fn render(&self, view_matrix: &Matrix4<f32>) {
        let transform = view_matrix * self.model_matrix();
        self.mesh.render(&transform);
    }
}

pub struct Camera {
    pub projection: Matrix4<f32>,
    pub position: Vector3<f32>,
    pub pitch: Rad<f32>,
    pub yaw: Rad<f32>
}

impl Camera {
    pub fn new<R>(fovy: R, aspect: f32, near: f32, far: f32) -> Self
    where R: Into<Rad<f32>>
    {
        Camera {
            projection: cgmath::perspective(fovy, aspect, near, far),
            position: Vector3::new(0.0, 0.0, 0.0),
            pitch: Rad(0.0),
            yaw: Rad(0.0)
        }
    }

    fn camera_matrix(&self) -> Matrix4<f32> {
        Matrix4::from_angle_y(-self.yaw) * Matrix4::from_translation(-self.position)
    }

    pub fn view_matrix(&self) -> Matrix4<f32> {
        self.projection * self.camera_matrix()
    }
}

pub struct Scene {
    pub camera: Camera,
    pub objects: Vec<Object>,
}

impl Scene {
    pub fn new(camera: Camera) -> Scene {
        Scene {
            camera,
            objects: Vec::new()
        }
    }

    pub fn add(&mut self, object: Object) {
        self.objects.push(object);
    }

    pub fn render(&self) {
        let view_matrix = self.camera.view_matrix();
        for obj in self.objects.iter() {
            obj.render(&view_matrix);
        }
    }
}