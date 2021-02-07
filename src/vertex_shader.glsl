attribute vec4 position;
attribute vec3 normal;
uniform mat4 world_view_projection;
uniform mat4 world_inverse_transpose;

varying vec3 v_normal;

void main() {
    v_normal = mat3(world_inverse_transpose) * normal;
    gl_Position = world_view_projection * position;
}