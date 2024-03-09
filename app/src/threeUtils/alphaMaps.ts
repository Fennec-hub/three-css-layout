import { CanvasTexture, NearestFilter, RepeatWrapping } from "three";

const cache: Record<string, CanvasTexture> = {};

export const getSpiralAlphaMap = (repeat = 4, rotation = Math.PI / 6) => {
  const cacheKey = `spiral-${repeat}-${rotation}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const width = 1;
  const height = 1024;
  const halfHeight = height / 2;

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, halfHeight);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, halfHeight, width, halfHeight);

  const texture = new CanvasTexture(canvas);
  texture.rotation = rotation;
  texture.magFilter = NearestFilter;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, repeat);

  cache[cacheKey] = texture;

  return texture;
};

export const getStripeAlphaMap = (repeat = 32, rotation = Math.PI / 2) => {
  const cacheKey = `stripe-${repeat}-${rotation}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const width = 1;
  const height = 1024;
  const thirdHeight = height / 3;

  canvas.width = width;
  canvas.height = height;

  for (let i = 0; i < height; i++) {
    ctx.fillStyle = i % 2 ? "#000" : "#fff";
    ctx.fillRect(0, thirdHeight * i, width, thirdHeight);
  }

  const texture = new CanvasTexture(canvas);
  texture.rotation = rotation;
  texture.magFilter = NearestFilter;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, repeat);

  cache[cacheKey] = texture;

  return texture;
};

export const clearAlphaMapCache = (
  type?: "spiral" | "stripe",
  repeat?: number,
  rotation?: number
) => {
  if (type && repeat && rotation) {
    const key = `${type}-${repeat}-${rotation}`;
    if (cache[key]) {
      cache[key].dispose();
      delete cache[key];
    }
  } else
    Object.keys(cache).forEach((key) => {
      cache[key].dispose();
      delete cache[key];
    });
};
