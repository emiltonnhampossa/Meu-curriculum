import { deepClone } from "./parse-resume-from-pdf/deep-clone";

type Object = { [key: string]: any };

/**
 *
 * start = {a: ""}
 * end = {a: "abc"}
 * const iterator = func(start,end)
 * iterator.next().value = {a: "a"}
 * {a: "ab"}
 * {a: "abc"}
 * @param start
 * @param end
 * @param level
 */
export function* makeObjectCharIterator<T extends Object>(
  start: T,
  end: T,
  level = 0
) {
  const object: Object = level === 0 ? deepClone(start) : start;

  for (const [key, endValue] of Object.entries(end)) {
    if (typeof endValue === "object") {
      const recursiveIterator = makeObjectCharIterator(
        object[key],
        endValue,
        level + 1
      );
      while (true) {
        const next = recursiveIterator.next();
        if (next.done) {
          break;
        }

        yield deepClone(object) as T;
      }
    } else {
      for (let i = 0; i <= endValue.length; i++) {
        object[key] = endValue.slice(0, i);
        yield deepClone(object) as T;
      }
    }
  }
}

export const countObjectChar = (object: Object) => {
  let count = 0;
  for (const value of Object.values(object)) {
    if (typeof value === "object") {
      count += countObjectChar(value);
    } else if (typeof value === "string") {
      count += value.length;
    }
  }
  return count;
};
