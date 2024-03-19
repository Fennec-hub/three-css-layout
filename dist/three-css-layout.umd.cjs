var __defProp=Object.defineProperty,__defNormalProp=(t,e,i)=>e in t?__defProp(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,__publicField=(t,e,i)=>(__defNormalProp(t,"symbol"!=typeof e?e+"":e,i),i);!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).ThreeCSSLayout={},t.THREE)}(this,(function(t,e){"use strict";const i=(t,e)=>{const i="string"==typeof t?document.querySelector(t):t;if(!i)throw Error(`${e}: Invalid DOM element`);return i},s=(t,e)=>!!(null==t?void 0:t[e]);class o extends e.Object3D{constructor(t){super(),__publicField(this,"type","CSSLayout"),__publicField(this,"domElement"),__publicField(this,"isCSSLayout",!0),__publicField(this,"_layoutDomOffset",new e.Vector2),__publicField(this,"_positionOffset",new e.Vector2),__publicField(this,"_scaleFactor",new e.Vector2),__publicField(this,"_outerSize",new e.Vector2),__publicField(this,"_innerSize",new e.Vector2),__publicField(this,"_cssLayoutObjects",[]),__publicField(this,"_scrollReference"),__publicField(this,"_scrollListener"),this.domElement=i(t,this.type)}fitCamera(t,e="fill",i=!1){let o=1,n=1;if(this._scrollListener&&this.position.set(0,0,this.position.z),s(t,"isPerspectiveCamera")){const e=t.position.distanceTo(this.position),i=t.fov*(Math.PI/180);n=2*Math.tan(i/2)*e,o=n*t.aspect}else o=(t.right-t.left)/t.zoom,n=(t.top-t.bottom)/t.zoom;return i&&this.lookAt(t.position),this.fitPlane(o,n,e)}fitPlane(t,e,i="cover"){this.dispatchEvent({type:"onBeforeFit"});let s=0,o=0;this._scrollListener&&(this._scrollReference?(s=this._scrollReference.scrollLeft,o=this._scrollReference.scrollTop):(s=window.screenX,o=window.scrollY));const{width:n,height:r,left:l,top:c}=this.domElement.getBoundingClientRect();if(this._outerSize.set(n,r),this._innerSize.set(t,e),this._layoutDomOffset.set(l+n/2,c+r/2),this._positionOffset.set(0,0),this._scaleFactor.set(t/n,e/r),"fill"!==i){const s=Math["contain"===i?"min":"max"](this._scaleFactor.x,this._scaleFactor.y);this._scaleFactor.set(s,s),this._outerSize.multiply(this._scaleFactor),this._outerSize.x>t?this._positionOffset.x=(this._outerSize.x-t)/-2:this._outerSize.y>e&&(this._positionOffset.y=(this._outerSize.y-e)/2)}else this._outerSize.multiply(this._scaleFactor);return this.updateObjects(!0),this._scrollListener&&(this._scrollReference?(this._scrollReference.scrollLeft=s,this._scrollReference.scrollTop=o):window.scroll(0,0),this._scrollListener()),this.dispatchEvent({type:"onFit"}),this}scroll(t,e){return this._scrollListener&&(this.position.set(0,0,this.position.z),(this._scrollReference||window).removeEventListener("scroll",this._scrollListener),delete this._scrollListener,delete this._scrollReference),t?(e&&(this._scrollReference=i(e,this.type)),this._scrollListener=()=>{const t=this._scrollReference?this._scrollReference.scrollLeft:window.scrollX,e=this._scrollReference?this._scrollReference.scrollTop:window.scrollY;this.position.set(-t*this._scaleFactor.x,e*this._scaleFactor.y,this.position.z)},(this._scrollReference||window).addEventListener("scroll",this._scrollListener),this._scrollListener(),this):this}updateObjects(t=!1,e=!1){return this._cssLayoutObjects.forEach((i=>i.fitLayout(t,e))),this}add(...t){return super.add(...t),t.forEach((t=>{s(t,"isCSSLayoutObject")&&this._cssLayoutObjects.push(t)})),this}remove(...t){return super.remove(...t),t.forEach((t=>{const e=this._cssLayoutObjects.indexOf(t);~e&&this._cssLayoutObjects.splice(e,1)})),this}dispose(){this.scroll(!1)}}const n=new DOMMatrix,r=t=>{t.position.set(0,0,0),t.scale.set(1,1,1),t.rotation.set(0,0,0)},l=new e.Box3,c=new e.Matrix4,h=new e.Vector3,a=new e.Vector3;class _ extends e.Object3D{constructor(t,s="contain"){super(),__publicField(this,"type","CSSLayoutObject"),__publicField(this,"fit","contain"),__publicField(this,"domElement"),__publicField(this,"objectNeedsUpdate",!0),__publicField(this,"elementNeedsUpdate",!0),__publicField(this,"isCSSLayoutObject",!0),__publicField(this,"_container",new e.Object3D),__publicField(this,"_size",new e.Vector3),__publicField(this,"_domBoundingRect",[0,0,0,0]),__publicField(this,"_boundingRectPosition",new e.Vector3),this.domElement=i(t,this.type),this._container.parent=this,this._container.name="container",this.children.push(this._container),this.fit=s}fitLayout(t=!1,e=!1){this.dispatchEvent({type:"onBeforeFit"}),this.elementNeedsUpdate=t||this.elementNeedsUpdate,this.objectNeedsUpdate=e||this.objectNeedsUpdate;const i=this.parent;if(!i||!i.isCSSLayout)throw Error(`${this.type} require a parent of type "CSSLayout"`);const s=i._layoutDomOffset,o=i._scaleFactor,n=i._positionOffset,l=getComputedStyle(this.domElement),{transform:_,display:d}=l;if("none"===d)return this.visible=!1,this;if(this.visible=!0,r(this),"none"===_)return this._updateElementBoundingRect(this.domElement,s,o,n),this.dispatchEvent({type:"onFit"}),this;this._resetCSSTransform(l,s,o,n);const[p,u,f,m]=this._domBoundingRect,[y,b]=[f/2,m/2],[F,S]=l.transformOrigin.split(" ").map(parseFloat);return a.setFromMatrixPosition(c).multiply({x:o.x,y:-o.y,z:1}),h.set((u+y+F-y-s.x)*o.x-n.x,-(p+b+S-b-s.y)*o.y-n.y,0).add(a),c.setPosition(h),this.applyMatrix4(c),this._container.position.copy(this._boundingRectPosition).sub(h).add(a).fromArray(this._container.position.toArray().map((t=>parseFloat(t.toFixed(2))))),this.dispatchEvent({type:"onFit"}),this}add(...t){return this._container.add(...t),this}remove(...t){return this._container.remove(...t),this}_updateObjectBoundingBox(){r(this._container),this.objectNeedsUpdate&&(l.setFromObject(this._container),l.getSize(this._size),this.objectNeedsUpdate=!1)}_updateElementBoundingRect(t,e,i,s){if(!this.elementNeedsUpdate)return;const o=this._container,{top:n,left:r,width:l,height:c}=t.getBoundingClientRect();this._updateObjectBoundingBox(),this._domBoundingRect.length=0,this._domBoundingRect.push(n,r,l,c),o.position.set((r-e.x+l/2)*i.x-s.x,-(n-e.y+c/2)*i.y-s.y,0),this._boundingRectPosition.copy(o.position);const h=this.fit;if("fill"!==h){const t=Math["contain"===h?"min":"max"](l*i.x/this._size.x,c*i.y/this._size.y);o.scale.setScalar(t)}else o.scale.multiply({x:l*i.x/this._size.x,y:c*i.y/this._size.y,z:this._size.z});this.elementNeedsUpdate=!1}_resetCSSTransform(t,e,i,s){if(o=t.transform,r=c,n.setMatrixValue(o),r.set(n.m11,-n.m21,n.m31,n.m41,-n.m12,n.m22,-n.m32,n.m42,n.m13,-n.m23,n.m33,n.m43,n.m14,n.m24,n.m34,n.m44),!this.elementNeedsUpdate)return;var o,r;const l=this.domElement,h=l.style,{transform:a,animation:_,transition:d}=h,p="none"!==t.animationName,u=!!parseFloat(t.transitionDuration);h.transform="none",p&&(h.animation="none"),u&&(h.transition="none"),this._updateElementBoundingRect(l,e,i,s),h.transform=a,p&&(h.animation=_),u&&(h.transition=d)}}t.CSSLayout=o,t.CSSLayoutObject=_,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=three-css-layout.umd.cjs.map
