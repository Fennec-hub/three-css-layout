import { BackSide, Color, MeshBasicMaterial, Vector2 } from "three";

/**
 * Shader Toy
 * https://www.shadertoy.com/view/WdlyRS#
 * Voronoi Gradient
 * Created by [gls9102](https://www.shadertoy.com/user/gls9102) in 2020-03-24
 */

export const getVoronoiGradientMaterial = () => {
  const material = new MeshBasicMaterial({ side: BackSide });

  const uniforms = {
    resolution: {
      value: new Vector2(1250, 930),
    },
    time: { value: 0.0 },
    cellSize: { value: 30 },
    color1: { value: new Color(193 / 255, 41 / 255, 46 / 255) },
    color2: { value: new Color(241 / 255, 211 / 255, 2 / 255) },
  };

  material.onBeforeCompile = (shader) => {
    shader.uniforms = {
      ...shader.uniforms,
      ...uniforms,
    };

    shader.fragmentShader = shader.fragmentShader.replace(
      `void main() {`,
      `
      uniform vec2 resolution;
      uniform float time;
      uniform float cellSize;
      uniform vec3 color1;
      uniform vec3 color2;
  
      vec2 ran(vec2 uv) {
        uv *= vec2(dot(uv,vec2(127.1,311.7)),dot(uv,vec2(227.1,521.7)) );
        return 1.0-fract(tan(cos(uv)*123.6)*3533.3)*fract(tan(cos(uv)*123.6)*3533.3);
      }
      vec2 pt(vec2 id) {
        return sin(time*(ran(id+.5)-0.5)+ran(id-20.1)*8.0)*0.5;
      }

      void main() {
      `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>

      vec2 uv = (gl_FragCoord.xy - .5 * resolution.xy) / resolution.x;
      vec2 off = time/vec2(50., 30.);
      uv += off;
      uv *= cellSize;

      vec2 gv = fract(uv)-.5;
      vec2 id = floor(uv);

      float mindist = 1e9;
      vec2 vorv;
      for(float i=-1.;i<=1.;i++) {
          for(float j=-1.;j<=1.;j++) { 
              vec2 offv = vec2(i,j);
              float dist = length(gv+pt(id+offv)-offv);
              if(dist<mindist){
                  mindist = dist;
                  vorv = (id+pt(id+offv)+offv)/cellSize-off;
              }
          }
      }

      vec3 col = mix(color1,color2,clamp(vorv.x*2.2+vorv.y,-1.,1.)*0.5+0.5);

      gl_FragColor = vec4(col,1.0);
    `
    );
  };

  return [material, uniforms] as [typeof material, typeof uniforms];
};
