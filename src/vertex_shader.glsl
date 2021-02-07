attribute vec4 position;
attribute vec3 normal;
attribute vec4 color;
uniform mat4 world_view_projection;
uniform mat4 world_inverse_transpose;

varying vec3 v_normal;
varying vec4 v_color;

void main() {
    v_normal = mat3(world_inverse_transpose) * normal;
    v_color = color;
    gl_Position = world_view_projection * position;
}