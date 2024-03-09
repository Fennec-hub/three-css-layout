import{s as w,B as y,a as S,C as b,u as C,r as k,A as L,D as f,m as B,o as Y,W as x,p as j,q as _,t as z,v as M}from"./onResize-DnKIDDtR.js";import{l as p,d as m}from"./MathUtils-Dj7g6UvR.js";import{d as T,E as A,H as E,i as R,p as e,m as c,q as s,I as g,l as F,h as O}from"./index-DEPv8ifa.js";const V=()=>{const t=new w({side:y}),a={resolution:{value:new S(1250,930)},time:{value:0},cellSize:{value:30},color1:{value:new b(193/255,41/255,46/255)},color2:{value:new b(241/255,211/255,2/255)}};return t.onBeforeCompile=n=>{n.uniforms={...n.uniforms,...a},n.fragmentShader=n.fragmentShader.replace("void main() {",`
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
      `),n.fragmentShader=n.fragmentShader.replace("#include <dithering_fragment>",`
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
    `)},[t,a]},D=()=>{const t=new C,[a,n]=V();return{box:new k(t,a),dispose:()=>{t.dispose(),a.dispose()},setTime:o=>n.time.value=o,setResolution:(o,l)=>{n.resolution.value.set(o,l),n.cellSize.value=Math.max(o*.025,16)},setColors:(o,l)=>{n.color1.value.set(o),n.color2.value.set(l)}}},G=t=>{const a=new L(16777215,1),n=new f(16777215,1),i=new f(16777215,2),o=new f(16777215,1);n.position.set(-5,5,5),i.position.set(5,5,5),o.position.set(0,5,0),t.add(a,n,i,o)},N=new M,d=new B;d.near=.1;d.far=2;d.position.z=1;const h=new Y;h.background=new b(15443457);let v,u,r;const H=()=>{v=document.body,r=new x({antialias:!0}),r.setSize(window.innerWidth,window.innerHeight);const t=new j(v);t.scroll(!0),u=D();const a=new _("#background","fill");a.add(u.box),t.add(a),p("ritchie_armchair_ochre_yellow.glb").then(o=>{if(!o)return;o.position.set(0,-30,0),o.rotation.set(m(25),m(-20),0);const l=new _("#sofa1","contain");l.add(o),t.add(l),t.fitCamera(d,"cover")}),p("dylan_armchair_yolk_yellow.glb").then(o=>{if(!o)return;o.position.set(0,-45,0),o.rotation.set(m(25),m(20),0);const l=new _("#sofa2","contain");l.add(o),t.add(l),t.fitCamera(d,"cover")}),h.add(t),v.appendChild(r.domElement),G(h),r.setAnimationLoop(n);function n(){u.setTime(N.getElapsedTime()),t.updateObjects(),r.render(h,d)}i();function i(){const[o,l]=z(v,r,d);t.fitCamera(d,"cover"),u.setResolution(o,l)}window.onresize=i},P=()=>{r.domElement.remove(),r.setAnimationLoop(null),r.dispose(),h.clear(),u.dispose()},q={id:"demo2"},W={class:"container"},I={class:"logo"},U=e("s",null,"Yellow",-1),J=e("i",null,"Collections",-1),Q=e("i",null,"Fabrics",-1),K=e("i",null,"Offers",-1),X=e("i",null,"Contact",-1),Z=e("u",{class:"actionButton"},"Customize Your Sofa",-1),$=e("div",{class:"container hero"},[e("div",null,[e("h2",null,"Yellow is the new Orange"),e("p",null," Dive into a world of vibrant warmth with our stunning yellow sofas. Embrace bold and bright living, where every moment is a splash of sunshine. ")]),e("div",{id:"sofa1",class:"three"})],-1),ee={class:"banner"},oe={class:"container"},te=e("i",null,"Select your favorite Yellow",-1),ne=e("b",null,"Color",-1),ie=e("i",null,"Us our quick quote tool.",-1),se=e("b",null,"Get a Quote",-1),ae=e("i",null,"Locate your timely delivery",-1),le=e("b",null,"Ship now",-1),ce={class:"logo"},re=e("s",null,"Yellow",-1),de=e("p",null,[e("b",null,"YellowHue"),s(" sofas exude energetic warmth, uplifting moods with their vibrant hue. Rich tones brighten spaces, creating a cheerful centerpiece that positively impacts the overall ambiance. ")],-1),ue=e("u",{class:"actionButton"},"Customize Your Sofa",-1),he=g('<div class="container hero"><div id="sofa2" class="three"></div><div><h2>It&#39;s not just a color – it&#39;s a statement</h2><ul><li>Yellow is brightness, creativity and innovation.</li><li>Yellow is energy and positivity.</li><li>Yellow is warm, inviting, cozy and comfortable.</li><li>Yellow is eclectic, modern and minimalist.</li><li>Yellow is bold, stands out with a strong character.</li><li>Yellow is timeless, is tradition, is longevity.</li></ul></div></div><div class="container dots"> . </div>',2),me={class:"container footer"},ve=e("h4",null,"Three CSS Layout",-1),fe=e("p",null,[s(" This demo was created using "),e("b",null,[e("a",{href:"https://threejs.org/"},"Three.js")]),s(" and "),e("b",null,[e("a",{href:"https://github.com/Fennec-hub/three-css-layout"},"Three CSS Layout")]),s(", a JavaScript tool designed to simplify the positioning and scaling of Three.js objects within HTML elements. ")],-1),_e=e("h4",null,"Links",-1),be={class:"links"},pe=e("a",{href:"https://twitter.com/SaharianFennec"},[e("b",null,"𝕏"),s(" @SaharianFennec")],-1),ge={href:"https://github.com/Fennec-hub/three-css-layout"},we=e("h4",null,"Acknowledgement",-1),ye=g('<ul><li><a href="https://sketchfab.com/3d-models/ritchie-armchair-ochre-yellow-a2217ae834c74a90a439a3a6a09c4e8f"> Ritchie Armchair, Ochre Yellow. </a>, by <a href="https://sketchfab.com/made-it">MADE.COM</a>, <b>CC-BY-NC</b>. </li><li><a href="https://sketchfab.com/3d-models/dylan-armchair-yolk-yellow-31ba136eb97b4129880ac9fb32288d5c"> Dylan Armchair, Yolk Yellow. </a>, by <a href="https://sketchfab.com/made-it">MADE.COM</a>, <b>CC-BY-NC</b>. </li></ul>',1),Se=e("p",null,[e("a",{href:"https://www.shadertoy.com/view/WdlyRS"}," Voronoi Gradient "),s(" by "),e("a",{href:"https://www.shadertoy.com/user/gls9102"},"gls9102")],-1),Ce=e("p",null,[e("a",{href:"https://dribbble.com/shots/17349281-Laundry-Professional-Landing-Page-Template"}," Professional Landing Page Template "),s(" by "),e("a",{href:"https://dribbble.com/arjunmakwana"},"Arjun")],-1),ke=e("u",null,null,-1),Le=e("i",{id:"background"},null,-1),je=T({__name:"Index",setup(t){return A(H),E(P),(a,n)=>{const i=F("v-icon");return O(),R("div",q,[e("nav",W,[e("b",I,[c(i,{class:"r",name:"gi-sofa",scale:2}),U,s("Sofa ")]),J,Q,K,X,Z]),$,e("div",ee,[e("div",oe,[e("nav",null,[e("u",null,[c(i,{class:"r",name:"fa-swatchbook",scale:2.5}),te,ne]),e("u",null,[c(i,{class:"r",name:"la-money-bill-wave-solid",scale:2.5}),ie,se]),e("u",null,[c(i,{class:"r",name:"bi-calendar-event",scale:2.5}),ae,le])]),e("b",ce,[c(i,{class:"r",name:"gi-sofa",scale:2.5}),re,s("Sofa ")]),de,ue])]),he,e("div",me,[e("div",null,[e("div",null,[ve,fe,_e,e("p",be,[pe,e("a",ge,[e("i",null,[c(i,{name:"bi-github"})]),s("GitHub")])])]),e("div",null,[we,e("h4",null,[c(i,{name:"si-sketchfab"}),s(" Models")]),ye,e("h4",null,[e("b",null,[c(i,{name:"co-3d"}),s(" Background shader")])]),Se,e("h4",null,[e("b",null,[c(i,{name:"bi-dribbble"}),s(" Layout inspiration:")])]),Ce])]),ke]),Le])}}});export{je as default};
