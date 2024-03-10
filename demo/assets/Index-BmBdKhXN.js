var se=Object.defineProperty;var ie=(r,n,o)=>n in r?se(r,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[n]=o;var D=(r,n,o)=>(ie(r,typeof n!="symbol"?n+"":n,o),o);import{w as ce,a as le,C as F,B as de,u as ue,r as Q,x as me,H,F as q,y as N,L as pe,z as K,G as he,A as Z,D as U,I as _e,J as fe,K as ge,U as ve,b as x,q as j,m as we,o as ye,W as Ee,p as Re,s as be,X as Se,t as Le,v as Ce}from"./onResize-DnKIDDtR.js";import{l as Y}from"./loadModel-B_ymqVvC.js";import{d as Be,E as Te,H as Ge,i as Me,m as b,l as xe,p as Fe,I as ke,k as Ae,h as Ie}from"./index-wJ0kBrX9.js";const De=()=>{const r=`
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
  `;return new ce({fragmentShader:r,uniforms:{uTime:{value:0},uResolution:{value:new le(1e3,1e3)},uColor1:{value:new F(16762880)},uColor2:{value:new F(4690165)},uColor3:{value:new F(15140052)},uColor4:{value:new F(52479)}},side:de})},He=()=>{const r=new ue,n=De(),o=new Q(r,n),{uTime:c,uResolution:s}=n.uniforms;return{box:o,dispose:()=>{r.dispose(),n.dispose()},setTime:u=>c.value=u,setResolution:(u,t)=>s.value.set(u,t)}};class Ne extends me{constructor(n){super(n),this.type=H}parse(n){const t=function(e,i){switch(e){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(i||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(i||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(i||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(i||""))}},T=`
`,O=function(e,i,l){i=i||1024;let h=e.pos,p=-1,a=0,_="",d=String.fromCharCode.apply(null,new Uint16Array(e.subarray(h,h+128)));for(;0>(p=d.indexOf(T))&&a<i&&h<e.byteLength;)_+=d,a+=d.length,h+=128,d+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(h,h+128)));return-1<p?(l!==!1&&(e.pos+=a+p+1),_+d.slice(0,p)):!1},te=function(e){const i=/^#\?(\S+)/,l=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,m=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,h=/^\s*FORMAT=(\S+)\s*$/,p=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,a={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let _,d;for((e.pos>=e.byteLength||!(_=O(e)))&&t(1,"no header found"),(d=_.match(i))||t(3,"bad initial token"),a.valid|=1,a.programtype=d[1],a.string+=_+`
`;_=O(e),_!==!1;){if(a.string+=_+`
`,_.charAt(0)==="#"){a.comments+=_+`
`;continue}if((d=_.match(l))&&(a.gamma=parseFloat(d[1])),(d=_.match(m))&&(a.exposure=parseFloat(d[1])),(d=_.match(h))&&(a.valid|=2,a.format=d[1]),(d=_.match(p))&&(a.valid|=4,a.height=parseInt(d[1],10),a.width=parseInt(d[2],10)),a.valid&2&&a.valid&4)break}return a.valid&2||t(3,"missing format specifier"),a.valid&4||t(3,"missing image size specifier"),a},oe=function(e,i,l){const m=i;if(m<8||m>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);m!==(e[2]<<8|e[3])&&t(3,"wrong scanline width");const h=new Uint8Array(4*i*l);h.length||t(4,"unable to allocate buffer space");let p=0,a=0;const _=4*m,d=new Uint8Array(4),L=new Uint8Array(_);let X=l;for(;X>0&&a<e.byteLength;){a+4>e.byteLength&&t(1),d[0]=e[a++],d[1]=e[a++],d[2]=e[a++],d[3]=e[a++],(d[0]!=2||d[1]!=2||(d[2]<<8|d[3])!=m)&&t(3,"bad rgbe scanline format");let M=0,y;for(;M<_&&a<e.byteLength;){y=e[a++];const E=y>128;if(E&&(y-=128),(y===0||M+y>_)&&t(3,"bad scanline data"),E){const R=e[a++];for(let J=0;J<y;J++)L[M++]=R}else L.set(e.subarray(a,a+y),M),M+=y,a+=y}const re=m;for(let E=0;E<re;E++){let R=0;h[p]=L[E+R],R+=m,h[p+1]=L[E+R],R+=m,h[p+2]=L[E+R],R+=m,h[p+3]=L[E+R],p+=4}X--}return h},ae=function(e,i,l,m){const h=e[i+3],p=Math.pow(2,h-128)/255;l[m+0]=e[i+0]*p,l[m+1]=e[i+1]*p,l[m+2]=e[i+2]*p,l[m+3]=1},ne=function(e,i,l,m){const h=e[i+3],p=Math.pow(2,h-128)/255;l[m+0]=N.toHalfFloat(Math.min(e[i+0]*p,65504)),l[m+1]=N.toHalfFloat(Math.min(e[i+1]*p,65504)),l[m+2]=N.toHalfFloat(Math.min(e[i+2]*p,65504)),l[m+3]=N.toHalfFloat(1)},A=new Uint8Array(n);A.pos=0;const G=te(A),W=G.width,$=G.height,I=oe(A.subarray(A.pos),W,$);let P,z,S;switch(this.type){case q:S=I.length/4;const e=new Float32Array(S*4);for(let l=0;l<S;l++)ae(I,l*4,e,l*4);P=e,z=q;break;case H:S=I.length/4;const i=new Uint16Array(S*4);for(let l=0;l<S;l++)ne(I,l*4,i,l*4);P=i,z=H;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:W,height:$,data:P,header:G.string,gamma:G.gamma,exposure:G.exposure,type:z}}setDataType(n){return this.type=n,this}load(n,o,c,s){function u(t,g){switch(t.type){case q:case H:t.colorSpace=pe,t.minFilter=K,t.magFilter=K,t.generateMipmaps=!1,t.flipY=!0;break}o&&o(t,g)}return super.load(n,u,c,s)}}const Ve=({renderer:r,scene:n,path:o,background:c=!1,toneMapping:s,exposure:u})=>{const t=new he(r);t.compileEquirectangularShader(),new Ne().load(`./three-css-layout/HDR/${o}`,function(f){const w=t.fromEquirectangular(f).texture;n.environment=w,c&&(n.background=w),s&&(r.toneMapping=s),u!=null&&(r.toneMappingExposure=u),f.dispose(),t.dispose()})},Ue=r=>{const n=new Z(16777215,.5),o=new U(16777215,2),c=new U(16777215,.3),s=new U(16777215,.3);o.position.set(5,5,5),c.position.set(-5,5,5),s.position.set(0,0,5),r.add(n,o,c,s)};class Pe extends _e{constructor(o,c,s,u,t){super();D(this,"_extrude");D(this,"_segments");D(this,"_radius");this._extrude=t,this._segments=u,this._radius=s,this.update(o,c,s)}update(o,c,s){s=s??this._radius;const u=new fe().moveTo(0,s).quadraticCurveTo(0,0,s,0).lineTo(o-s,0).quadraticCurveTo(o,0,o,s).lineTo(o,c-s).quadraticCurveTo(o,c,o-s,c).lineTo(s,c).quadraticCurveTo(0,c,0,c-s).lineTo(0,s),t=this._extrude?new ge(u,this._extrude):new ve(u,this._segments);this.copy(t.center()),t.dispose()}}const ze=(r,n)=>{let o;Y("aiphone_15_pro_-_low_poly_smartphone/scene.gltf").then(t=>{if(!t)return;o=t.getObjectByName("BasePhone_Screen_0").material.map,o.repeat.set(1,.25),Y("little_gym_stuff_-_dumbbell/scene.gltf").then(f=>{f&&(f.scale.setScalar(.0025),f.position.set(.05,.05,-.02),f.rotation.set(0,x.degToRad(-15),x.degToRad(-15)),t.add(f))}),Y("little_gym_stuff_-_kettlebell/scene.gltf").then(f=>{f&&(f.scale.setScalar(.004),f.position.set(-.05,-.05,.02),f.rotation.set(0,x.degToRad(-15),x.degToRad(-10)),t.add(f))});const g=new j("#iphone","contain");g.add(t),r.add(g),r.fitCamera(n,"cover")});const c=2.5;let s=0,u=0;return{animateModel:t=>{if(!o)return;const g=t%c/c;g>0&&t-u>=c&&(s-=.25,u=t),o.offset.y=x.lerp(o.offset.y,s,g)}}},qe=new Ce,Ye=new Z(16777215,.4),ee=new U(16777215,2);ee.position.set(-5,5,3);const C=new we;C.fov=10;C.position.z=1;const B=new ye;B.background=new F(15443457);let V,k,v;const je=()=>{V=document.body,v=new Ee({antialias:!0}),v.setSize(window.innerWidth,window.innerHeight);const r=new Re(V);r.scroll(!0),k=He();const n=new j("#background","fill");n.add(k.box),r.add(n);const o=new Pe(1,1,.03,12),c=new be({transparent:!0,opacity:.5}),s=new Q(o,c),u=new j("main","fill");u.add(s),u.addEventListener("onBeforeFit",()=>{const{offsetWidth:w,offsetHeight:T}=u.domElement;o.update(w,T,30),u.objectNeedsUpdate=!0}),r.add(u);const{animateModel:t}=ze(r,C);B.add(Ye,ee,r),V.appendChild(v.domElement),v.setAnimationLoop(g),v.outputColorSpace=Se,Ue(B),Ve({renderer:v,scene:B,path:"/three-css-layout/studio_small_03_2k.hdr"}),f();function g(){const w=qe.getElapsedTime();t(w),k.setTime(w),r.updateObjects(),v.render(B,C)}function f(){const[w,T]=Le(V,v,C);r.fitCamera(C,"cover"),k.setResolution(w,T)}window.onresize=f},Oe=()=>{document.body.removeChild(v.domElement),v.setAnimationLoop(null),v.dispose(),B.clear(),k.dispose()},We={id:"demo3"},$e={class:"container header"},Xe={class:"logo"},Je=b("i",null,"Collections",-1),Ke=b("i",null,"Fabrics",-1),Qe=b("i",null,"Offers",-1),Ze=b("i",null,"Contact",-1),et=b("u",{class:"actionButton"},"Do You Even lift?",-1),tt=ke('<header class="container"><div><h2>Yellow is the new Orange</h2><p> Dive into a world of vibrant warmth with our stunning yellow sofas. Embrace bold and bright living, where every moment is a splash of sunshine. </p></div><div id="iphone" class="three"></div></header><main class="container"></main><footer class="container"></footer><i id="background"></i>',4),st=Be({__name:"Index",setup(r){return Te(()=>je()),Ge(Oe),(n,o)=>{const c=Ae("v-icon");return Ie(),Me("div",We,[b("nav",$e,[b("b",Xe,[xe(c,{class:"r",name:"io-barbell-outline",scale:2}),Fe(" DoYouEvenLift ")]),Je,Ke,Qe,Ze,et]),tt])}}});export{st as default};
