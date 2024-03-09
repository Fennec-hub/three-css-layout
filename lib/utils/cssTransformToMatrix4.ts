import type { Matrix4 } from "three";

const _domMatrix = new DOMMatrix();

export const cssTransformToMatrix4 = (transform: string, target: Matrix4) => {
  _domMatrix.setMatrixValue(transform);
  return target.set(
    _domMatrix.m11,
    -_domMatrix.m21,
    _domMatrix.m31,
    _domMatrix.m41,
    -_domMatrix.m12,
    _domMatrix.m22,
    -_domMatrix.m32,
    _domMatrix.m42,
    _domMatrix.m13,
    -_domMatrix.m23,
    _domMatrix.m33,
    _domMatrix.m43,
    _domMatrix.m14,
    _domMatrix.m24,
    _domMatrix.m34,
    _domMatrix.m44
  );
};
