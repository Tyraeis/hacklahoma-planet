precision mediump float;

varying vec3 v_normal;

void main() {
    vec3 normal = normalize(v_normal);
    float light = max(0.1, dot(normal, normalize(vec3(1, -0.2, -0.7))));
    gl_FragColor = vec4(1, 0, 0.5, 1);
    gl_FragColor.rgb *= light;
}