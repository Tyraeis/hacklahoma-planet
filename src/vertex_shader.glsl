// an attribute will receive data from a buffer
attribute vec4 position;
uniform mat4 transform_matrix;

// all shaders have a main function
void main() {

    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = transform_matrix * position;
}