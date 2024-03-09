import {
  CatmullRomCurve3,
  ConeGeometry,
  CylinderGeometry,
  OctahedronGeometry,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";

export const getPrimitives = () => [
  new OctahedronGeometry(0.5),
  new ConeGeometry(0.25, 1, 120, 1, true),
  getTubeGeometry(),
  new CylinderGeometry(1, 0.5, 2, 32, 32, true),
  new TorusGeometry(1, 0.4, 64, 64),
  new SphereGeometry(0.5, 64, 64),
];

function getTubeGeometry() {
  const halfCircleRadius = 5;
  const halfCirclePoints = 50;

  const halfCirclePath = new CatmullRomCurve3(
    Array(halfCirclePoints + 1)
      .fill(null)
      .map((_, i) => {
        const angle = (i / halfCirclePoints) * Math.PI;
        const x = halfCircleRadius * Math.cos(angle);
        const y = halfCircleRadius * Math.sin(angle);
        return new Vector3(x, y, 0);
      })
  );

  return new TubeGeometry(halfCirclePath, 64, 1.5, 64, false)
    .rotateZ(-Math.PI / 5)
    .center();
}
