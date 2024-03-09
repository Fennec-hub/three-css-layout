export const getDomElement = (
  domElement: string | HTMLElement,
  type: string
) => {
  const element =
    typeof domElement === "string"
      ? document.querySelector<HTMLElement>(domElement)
      : domElement;

  if (!element) throw Error(`${type}: Invalid DOM element`);

  return element;
};
