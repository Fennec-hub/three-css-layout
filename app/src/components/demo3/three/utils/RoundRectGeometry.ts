import {
  BufferGeometry,
  ExtrudeGeometry,
  ExtrudeGeometryOptions,
  Shape,
  ShapeGeometry,
} from "three";

export class RoundRectGeometry extends BufferGeometry {
  private _extrude?: ExtrudeGeometryOptions;
  private _segments: number;
  private _radius: number;

  constructor(
    width: number,
    height: number,
    radius: number,
    segments: number,
    extrude?: ExtrudeGeometryOptions
  ) {
    super();

    this._extrude = extrude;
    this._segments = segments;
    this._radius = radius;

    this.update(width, height, radius);
  }

  update(width: number, height: number, radius?: number) {
    radius = radius ?? this._radius;

    const shape = new Shape()
      .moveTo(0, radius)
      .quadraticCurveTo(0, 0, radius, 0)
      .lineTo(width - radius, 0)
      .quadraticCurveTo(width, 0, width, radius)
      .lineTo(width, height - radius)
      .quadraticCurveTo(width, height, width - radius, height)
      .lineTo(radius, height)
      .quadraticCurveTo(0, height, 0, height - radius)
      .lineTo(0, radius);

    const shapeGeometry = this._extrude
      ? new ExtrudeGeometry(shape, this._extrude)
      : new ShapeGeometry(shape, this._segments);

    this.copy(shapeGeometry.center());

    shapeGeometry.dispose();
  }
}
