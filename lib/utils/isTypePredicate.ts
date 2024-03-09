export const isTypePredicate = <Type extends Union, Union = any>(
  object: Union,
  isType: keyof Type
): object is Type => !!(object as Type)?.[isType];
