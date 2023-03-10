export function getEnumValues<T extends Record<string, string>>(enumObj: T): Array<T[keyof T]> {
  return Object.values(enumObj).map((v) => v.replace(/_/g, " ")) as Array<T[keyof T]>;
}
