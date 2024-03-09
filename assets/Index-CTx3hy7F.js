var se=Object.defineProperty;var ie=(r,n,o)=>n in r?se(r,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[n]=o;var k=(r,n,o)=>(ie(r,typeof n!="symbol"?n+"":n,o),o);import{w as ce,a as le,C as T,B as de,u as me,r as Q,x as ue,H as D,F as z,y as H,L as pe,z as K,G as _e,A as Z,D as U,I as he,J as fe,K as ge,U as ve,q as j,b as we,m as ye,o as Ee,W as Re,p as be,s as Se,X as Le,t as Ce,v as Be}from"./onResize-DnKIDDtR.js";import{l as Y,d as N}from"./MathUtils-Dj7g6UvR.js";import{d as Ge,E as Me,H as xe,i as Te,p as b,m as Fe,q as Ae,I as Ie,l as ke,h as De}from"./index-Dndv3unC.js";const He=()=>{const r=`
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
  `;return new ce({fragmentShader:r,uniforms:{uTime:{value:0},uResolution:{value:new le(1e3,1e3)},uColor1:{value:new T(16762880)},uColor2:{value:new T(4690165)},uColor3:{value:new T(15140052)},uColor4:{value:new T(52479)}},side:de})},Ne=()=>{const r=new me,n=He(),o=new Q(r,n),{uTime:c,uResolution:s}=n.uniforms;return{box:o,dispose:()=>{r.dispose(),n.dispose()},setTime:m=>c.value=m,setResolution:(m,t)=>s.value.set(m,t)}};class Ve extends ue{constructor(n){super(n),this.type=D}parse(n){const t=function(e,i){switch(e){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(i||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(i||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(i||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(i||""))}},G=`
`,O=function(e,i,l){i=i||1024;let _=e.pos,p=-1,a=0,h="",d=String.fromCharCode.apply(null,new Uint16Array(e.subarray(_,_+128)));for(;0>(p=d.indexOf(G))&&a<i&&_<e.byteLength;)h+=d,a+=d.length,_+=128,d+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(_,_+128)));return-1<p?(l!==!1&&(e.pos+=a+p+1),h+d.slice(0,p)):!1},te=function(e){const i=/^#\?(\S+)/,l=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,u=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,_=/^\s*FORMAT=(\S+)\s*$/,p=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,a={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let h,d;for((e.pos>=e.byteLength||!(h=O(e)))&&t(1,"no header found"),(d=h.match(i))||t(3,"bad initial token"),a.valid|=1,a.programtype=d[1],a.string+=h+`
`;h=O(e),h!==!1;){if(a.string+=h+`
`,h.charAt(0)==="#"){a.comments+=h+`
`;continue}if((d=h.match(l))&&(a.gamma=parseFloat(d[1])),(d=h.match(u))&&(a.exposure=parseFloat(d[1])),(d=h.match(_))&&(a.valid|=2,a.format=d[1]),(d=h.match(p))&&(a.valid|=4,a.height=parseInt(d[1],10),a.width=parseInt(d[2],10)),a.valid&2&&a.valid&4)break}return a.valid&2||t(3,"missing format specifier"),a.valid&4||t(3,"missing image size specifier"),a},oe=function(e,i,l){const u=i;if(u<8||u>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);u!==(e[2]<<8|e[3])&&t(3,"wrong scanline width");const _=new Uint8Array(4*i*l);_.length||t(4,"unable to allocate buffer space");let p=0,a=0;const h=4*u,d=new Uint8Array(4),L=new Uint8Array(h);let X=l;for(;X>0&&a<e.byteLength;){a+4>e.byteLength&&t(1),d[0]=e[a++],d[1]=e[a++],d[2]=e[a++],d[3]=e[a++],(d[0]!=2||d[1]!=2||(d[2]<<8|d[3])!=u)&&t(3,"bad rgbe scanline format");let x=0,y;for(;x<h&&a<e.byteLength;){y=e[a++];const E=y>128;if(E&&(y-=128),(y===0||x+y>h)&&t(3,"bad scanline data"),E){const R=e[a++];for(let J=0;J<y;J++)L[x++]=R}else L.set(e.subarray(a,a+y),x),x+=y,a+=y}const re=u;for(let E=0;E<re;E++){let R=0;_[p]=L[E+R],R+=u,_[p+1]=L[E+R],R+=u,_[p+2]=L[E+R],R+=u,_[p+3]=L[E+R],p+=4}X--}return _},ae=function(e,i,l,u){const _=e[i+3],p=Math.pow(2,_-128)/255;l[u+0]=e[i+0]*p,l[u+1]=e[i+1]*p,l[u+2]=e[i+2]*p,l[u+3]=1},ne=function(e,i,l,u){const _=e[i+3],p=Math.pow(2,_-128)/255;l[u+0]=H.toHalfFloat(Math.min(e[i+0]*p,65504)),l[u+1]=H.toHalfFloat(Math.min(e[i+1]*p,65504)),l[u+2]=H.toHalfFloat(Math.min(e[i+2]*p,65504)),l[u+3]=H.toHalfFloat(1)},A=new Uint8Array(n);A.pos=0;const M=te(A),W=M.width,$=M.height,I=oe(A.subarray(A.pos),W,$);let P,q,S;switch(this.type){case z:S=I.length/4;const e=new Float32Array(S*4);for(let l=0;l<S;l++)ae(I,l*4,e,l*4);P=e,q=z;break;case D:S=I.length/4;const i=new Uint16Array(S*4);for(let l=0;l<S;l++)ne(I,l*4,i,l*4);P=i,q=D;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:W,height:$,data:P,header:M.string,gamma:M.gamma,exposure:M.exposure,type:q}}setDataType(n){return this.type=n,this}load(n,o,c,s){function m(t,g){switch(t.type){case z:case D:t.colorSpace=pe,t.minFilter=K,t.magFilter=K,t.generateMipmaps=!1,t.flipY=!0;break}o&&o(t,g)}return super.load(n,m,c,s)}}const Ue=({renderer:r,scene:n,path:o,background:c=!1,toneMapping:s,exposure:m})=>{const t=new _e(r);t.compileEquirectangularShader(),new Ve().load(`./HDR/${o}`,function(f){const w=t.fromEquirectangular(f).texture;n.environment=w,c&&(n.background=w),s&&(r.toneMapping=s),m!=null&&(r.toneMappingExposure=m),f.dispose(),t.dispose()})},Pe=r=>{const n=new Z(16777215,.5),o=new U(16777215,2),c=new U(16777215,.3),s=new U(16777215,.3);o.position.set(5,5,5),c.position.set(-5,5,5),s.position.set(0,0,5),r.add(n,o,c,s)};class qe extends he{constructor(o,c,s,m,t){super();k(this,"_extrude");k(this,"_segments");k(this,"_radius");this._extrude=t,this._segments=m,this._radius=s,this.update(o,c,s)}update(o,c,s){s=s??this._radius;const m=new fe().moveTo(0,s).quadraticCurveTo(0,0,s,0).lineTo(o-s,0).quadraticCurveTo(o,0,o,s).lineTo(o,c-s).quadraticCurveTo(o,c,o-s,c).lineTo(s,c).quadraticCurveTo(0,c,0,c-s).lineTo(0,s),t=this._extrude?new ge(m,this._extrude):new ve(m,this._segments);this.copy(t.center()),t.dispose()}}const ze=(r,n)=>{let o;Y("aiphone_15_pro_-_low_poly_smartphone/scene.gltf").then(t=>{if(!t)return;o=t.getObjectByName("BasePhone_Screen_0").material.map,o.repeat.set(1,.25),Y("little_gym_stuff_-_dumbbell/scene.gltf").then(f=>{f&&(f.scale.setScalar(.0025),f.position.set(.05,.05,-.02),f.rotation.set(0,N(-15),N(-15)),t.add(f))}),Y("little_gym_stuff_-_kettlebell/scene.gltf").then(f=>{f&&(f.scale.setScalar(.004),f.position.set(-.05,-.05,.02),f.rotation.set(0,N(-15),N(-10)),t.add(f))});const g=new j("#iphone","contain");g.add(t),r.add(g),r.fitCamera(n,"cover")});const c=2.5;let s=0,m=0;return{animateModel:t=>{if(!o)return;const g=t%c/c;g>0&&t-m>=c&&(s-=.25,m=t),o.offset.y=we.lerp(o.offset.y,s,g)}}},Ye=new Be,je=new Z(16777215,.4),ee=new U(16777215,2);ee.position.set(-5,5,3);const C=new ye;C.fov=10;C.position.z=1;const B=new Ee;B.background=new T(15443457);let V,F,v;const Oe=()=>{V=document.body,v=new Re({antialias:!0}),v.setSize(window.innerWidth,window.innerHeight);const r=new be(V);r.scroll(!0),F=Ne();const n=new j("#background","fill");n.add(F.box),r.add(n);const o=new qe(1,1,.03,12),c=new Se({transparent:!0,opacity:.5}),s=new Q(o,c),m=new j("main","fill");m.add(s),m.addEventListener("onBeforeFit",()=>{const{offsetWidth:w,offsetHeight:G}=m.domElement;o.update(w,G,30),m.objectNeedsUpdate=!0}),r.add(m);const{animateModel:t}=ze(r,C);B.add(je,ee,r),V.appendChild(v.domElement),v.setAnimationLoop(g),v.outputColorSpace=Le,Pe(B),Ue({renderer:v,scene:B,path:"studio_small_03_2k.hdr"}),f();function g(){const w=Ye.getElapsedTime();t(w),F.setTime(w),r.updateObjects(),v.render(B,C)}function f(){const[w,G]=Ce(V,v,C);r.fitCamera(C,"cover"),F.setResolution(w,G)}window.onresize=f},We=()=>{document.body.removeChild(v.domElement),v.setAnimationLoop(null),v.dispose(),B.clear(),F.dispose()},$e={id:"demo3"},Xe={class:"container header"},Je={class:"logo"},Ke=b("i",null,"Collections",-1),Qe=b("i",null,"Fabrics",-1),Ze=b("i",null,"Offers",-1),et=b("i",null,"Contact",-1),tt=b("u",{class:"actionButton"},"Do You Even lift?",-1),ot=Ie('<header class="container"><div><h2>Yellow is the new Orange</h2><p> Dive into a world of vibrant warmth with our stunning yellow sofas. Embrace bold and bright living, where every moment is a splash of sunshine. </p></div><div id="iphone" class="three"></div></header><main class="container"></main><footer class="container"></footer><i id="background"></i>',4),it=Ge({__name:"Index",setup(r){return Me(()=>Oe()),xe(We),(n,o)=>{const c=ke("v-icon");return De(),Te("div",$e,[b("nav",Xe,[b("b",Je,[Fe(c,{class:"r",name:"io-barbell-outline",scale:2}),Ae(" DoYouEvenLift ")]),Ke,Qe,Ze,et,tt]),ot])}}});export{it as default};
