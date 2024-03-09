/**
 * Shader Toy
 * https://www.shadertoy.com/view/wdyczG
 * Gradient Flow
 * Created by [hahnzhu](https://www.shadertoy.com/user/hahnzhu) in 2020-10-20
 */

import { Color, Vector2, ShaderMaterial, BackSide } from "three";

export const getShaderMaterial = () => {
  const fragmentShader = `
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;

    mat2 Rot(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    
    vec2 hash(vec2 p) {
      p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
      return fract(sin(p) * 43758.5453);
    }

    float noise(in vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      
      vec2 u = f * f * (3.0 - 2.0 * f);
    
      float n = mix(mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                  mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                      dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
      return 0.5 + 0.5 * n;
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      float ratio = uResolution.x / uResolution.y;
    
      vec2 tuv = uv;
      tuv -= .5;
    
      float degree = noise(vec2(uTime * .1, tuv.x * tuv.y));
    
      tuv.y *= 1.0 / ratio;
      tuv *= Rot(radians((degree - .5) * 720.0 + 180.0));
      tuv.y *= ratio;
    
      float frequency = 5.0;
      float amplitude = 30.0;
      float speed = uTime * 2.0;
      tuv.x += sin(tuv.y * frequency + speed) / amplitude;
      tuv.y += sin(tuv.x * frequency * 1.5 + speed) / (amplitude * 0.5);
    
      vec3 layer1 = mix(uColor1, uColor2, smoothstep(-0.3, 0.2, (tuv * Rot(radians(-5.0))).x));
      vec3 layer2 = mix(uColor3, uColor4, smoothstep(-0.3, 0.2, (tuv * Rot(radians(-5.0))).x));
    
      vec3 finalComp = mix(layer1, layer2, smoothstep(0.5, -0.3, tuv.y));
    
      gl_FragColor = vec4(finalComp, 1.0);
    }
  `;

  return new ShaderMaterial({
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uResolution: { value: new Vector2(1000, 1000) },
      uColor1: { value: new Color(0xffc800) },
      uColor2: { value: new Color(0x4790f5) },
      uColor3: { value: new Color(0xe704d4) },
      uColor4: { value: new Color(0x00ccff) },
    },
    side: BackSide,
  });
};
