var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Object3D as t, Vector2 as e, Box3 as s, Matrix4 as i, Vector3 as o } from "three";
const n = (t2, e2) => {
  const s2 = "string" == typeof t2 ? document.querySelector(t2) : t2;
  if (!s2)
    throw Error(`${e2}: Invalid DOM element`);
  return s2;
}, r = (t2, e2) => !!(t2 == null ? void 0 : t2[e2]);
class c extends t {
  constructor(t2) {
    super();
    __publicField(this, "type", "CSSLayout");
    __publicField(this, "domElement");
    __publicField(this, "isCSSLayout", true);
    __publicField(this, "_layoutDomOffset", new e());
    __publicField(this, "_positionOffset", new e());
    __publicField(this, "_scaleFactor", new e());
    __publicField(this, "_outerSize", new e());
    __publicField(this, "_innerSize", new e());
    __publicField(this, "_cssLayoutObjects", []);
    __publicField(this, "_scrollReference");
    __publicField(this, "_scrollListener");
    this.domElement = n(t2, this.type);
  }
  fitCamera(t2, e2 = "fill", s2 = false) {
    let i2 = 1, o2 = 1;
    if (this._scrollListener && this.position.set(0, 0, this.position.z), r(t2, "isPerspectiveCamera")) {
      const e3 = t2.position.distanceTo(this.position), s3 = t2.fov * (Math.PI / 180);
      o2 = 2 * Math.tan(s3 / 2) * e3, i2 = o2 * t2.aspect;
    } else
      i2 = (t2.right - t2.left) / t2.zoom, o2 = (t2.top - t2.bottom) / t2.zoom;
    return s2 && this.lookAt(t2.position), this.fitPlane(i2, o2, e2);
  }
  fitPlane(t2, e2, s2 = "cover") {
    this.dispatchEvent({ type: "onBeforeFit" });
    let i2 = 0, o2 = 0;
    this._scrollListener && (this._scrollReference ? (i2 = this._scrollReference.scrollLeft, o2 = this._scrollReference.scrollTop) : (i2 = window.screenX, o2 = window.scrollY));
    const { width: n2, height: r2, left: c2, top: l2 } = this.domElement.getBoundingClientRect();
    if (this._outerSize.set(n2, r2), this._innerSize.set(t2, e2), this._layoutDomOffset.set(c2 + n2 / 2, l2 + r2 / 2), this._positionOffset.set(0, 0), this._scaleFactor.set(t2 / n2, e2 / r2), "fill" !== s2) {
      const i3 = Math["contain" === s2 ? "min" : "max"](this._scaleFactor.x, this._scaleFactor.y);
      this._scaleFactor.set(i3, i3), this._outerSize.multiply(this._scaleFactor), this._outerSize.x > t2 ? this._positionOffset.x = (this._outerSize.x - t2) / -2 : this._outerSize.y > e2 && (this._positionOffset.y = (this._outerSize.y - e2) / 2);
    } else
      this._outerSize.multiply(this._scaleFactor);
    return this.updateObjects(true), this._scrollListener && (this._scrollReference ? (this._scrollReference.scrollLeft = i2, this._scrollReference.scrollTop = o2) : window.scroll(0, 0), this._scrollListener()), this.dispatchEvent({ type: "onFit" }), this;
  }
  scroll(t2, e2) {
    return this._scrollListener && (this.position.set(0, 0, this.position.z), (this._scrollReference || window).removeEventListener("scroll", this._scrollListener), delete this._scrollListener, delete this._scrollReference), t2 ? (e2 && (this._scrollReference = n(e2, this.type)), this._scrollListener = () => {
      const t3 = this._scrollReference ? this._scrollReference.scrollLeft : window.scrollX, e3 = this._scrollReference ? this._scrollReference.scrollTop : window.scrollY;
      this.position.set(-t3 * this._scaleFactor.x, e3 * this._scaleFactor.y, this.position.z);
    }, (this._scrollReference || window).addEventListener("scroll", this._scrollListener), this._scrollListener(), this) : this;
  }
  updateObjects(t2 = false, e2 = false) {
    return this._cssLayoutObjects.forEach((s2) => s2.fitLayout(t2, e2)), this;
  }
  add(...t2) {
    return super.add(...t2), t2.forEach((t3) => {
      r(t3, "isCSSLayoutObject") && this._cssLayoutObjects.push(t3);
    }), this;
  }
  remove(...t2) {
    return super.remove(...t2), t2.forEach((t3) => {
      const e2 = this._cssLayoutObjects.indexOf(t3);
      ~e2 && this._cssLayoutObjects.splice(e2, 1);
    }), this;
  }
  dispose() {
    this.scroll(false);
  }
}
const l = new DOMMatrix(), h = (t2) => {
  t2.position.set(0, 0, 0), t2.scale.set(1, 1, 1), t2.rotation.set(0, 0, 0);
}, a = new s(), d = new i(), p = new o(), _ = new o();
class m extends t {
  constructor(t2, e2 = "contain") {
    super();
    __publicField(this, "type", "CSSLayoutObject");
    __publicField(this, "fit", "contain");
    __publicField(this, "domElement");
    __publicField(this, "objectNeedsUpdate", true);
    __publicField(this, "elementNeedsUpdate", true);
    __publicField(this, "isCSSLayoutObject", true);
    __publicField(this, "_container", new t());
    __publicField(this, "_size", new o());
    __publicField(this, "_domBoundingRect", [0, 0, 0, 0]);
    __publicField(this, "_boundingRectPosition", new o());
    this.domElement = n(t2, this.type), this._container.parent = this, this._container.name = "container", this.children.push(this._container), this.fit = e2;
  }
  fitLayout(t2 = false, e2 = false) {
    this.dispatchEvent({ type: "onBeforeFit" }), this.elementNeedsUpdate = t2 || this.elementNeedsUpdate, this.objectNeedsUpdate = e2 || this.objectNeedsUpdate;
    const s2 = this.parent;
    if (!s2 || !s2.isCSSLayout)
      throw Error(`${this.type} require a parent of type "CSSLayout"`);
    const i2 = s2._layoutDomOffset, o2 = s2._scaleFactor, n2 = s2._positionOffset, r2 = getComputedStyle(this.domElement), { transform: c2, display: l2 } = r2;
    if ("none" === l2)
      return this.visible = false, this;
    if (this.visible = true, h(this), "none" === c2)
      return this._updateElementBoundingRect(this.domElement, i2, o2, n2), this.dispatchEvent({ type: "onFit" }), this;
    this._resetCSSTransform(r2, i2, o2, n2);
    const [a2, m2, u, f] = this._domBoundingRect, [y, S] = [u / 2, f / 2], [w, x] = r2.transformOrigin.split(" ").map(parseFloat);
    return _.setFromMatrixPosition(d).multiply({ x: o2.x, y: -o2.y, z: 1 }), p.set((m2 + y + w - y - i2.x) * o2.x - n2.x, -(a2 + S + x - S - i2.y) * o2.y - n2.y, 0).add(_), d.setPosition(p), this.applyMatrix4(d), this._container.position.copy(this._boundingRectPosition).sub(p).add(_).fromArray(this._container.position.toArray().map((t3) => parseFloat(t3.toFixed(2)))), this.dispatchEvent({ type: "onFit" }), this;
  }
  add(...t2) {
    return this._container.add(...t2), this;
  }
  remove(...t2) {
    return this._container.remove(...t2), this;
  }
  _updateObjectBoundingBox() {
    h(this._container), this.objectNeedsUpdate && (a.setFromObject(this._container), a.getSize(this._size), this.objectNeedsUpdate = false);
  }
  _updateElementBoundingRect(t2, e2, s2, i2) {
    if (!this.elementNeedsUpdate)
      return;
    const o2 = this._container, { top: n2, left: r2, width: c2, height: l2 } = t2.getBoundingClientRect();
    this._updateObjectBoundingBox(), this._domBoundingRect.length = 0, this._domBoundingRect.push(n2, r2, c2, l2), o2.position.set((r2 - e2.x + c2 / 2) * s2.x - i2.x, -(n2 - e2.y + l2 / 2) * s2.y - i2.y, 0), this._boundingRectPosition.copy(o2.position);
    const h2 = this.fit;
    if ("fill" !== h2) {
      const t3 = Math["contain" === h2 ? "min" : "max"](c2 * s2.x / this._size.x, l2 * s2.y / this._size.y);
      o2.scale.setScalar(t3);
    } else
      o2.scale.multiply({ x: c2 * s2.x / this._size.x, y: l2 * s2.y / this._size.y, z: this._size.z });
    this.elementNeedsUpdate = false;
  }
  _resetCSSTransform(t2, e2, s2, i2) {
    if (((t3, e3) => {
      l.setMatrixValue(t3), e3.set(l.m11, -l.m21, l.m31, l.m41, -l.m12, l.m22, -l.m32, l.m42, l.m13, -l.m23, l.m33, l.m43, l.m14, l.m24, l.m34, l.m44);
    })(t2.transform, d), !this.elementNeedsUpdate)
      return;
    const o2 = this.domElement, n2 = o2.style, { transform: r2, animation: c2, transition: h2 } = n2, a2 = "none" !== t2.animationName, p2 = !!parseFloat(t2.transitionDuration);
    n2.transform = "none", a2 && (n2.animation = "none"), p2 && (n2.transition = "none"), this._updateElementBoundingRect(o2, e2, s2, i2), n2.transform = r2, a2 && (n2.animation = c2), p2 && (n2.transition = h2);
  }
}
export {
  c as CSSLayout,
  m as CSSLayoutObject
};
