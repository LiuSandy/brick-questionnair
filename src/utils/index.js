/* UUID 生成器 */
export function uuid() {
  const s = [];
  const hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  return s.join("");
}

/* 深拷贝 */
export function deepClone(target, map = new Map()) {
  if (target !== null && typeof target === "object") {
    // 检查缓存是否存在数据
    const cache = map.get(target);
    if (cache) return cache;
    const isArray = Array.isArray(target);
    let result = isArray ? [] : {};
    map.set(target, result);
    if (isArray) {
      target.forEach((item, index) => {
        result[index] = deepClone(item, map);
      });
    } else {
      Object.keys(target).forEach((key) => {
        result[key] = deepClone(target[key], map);
      });
    }
    return result;
  }
  return target;
}

export function compact(data) {
  return data.filter((item) => !!item);
}

export function lastRight(data = []) {
  return data[data.length - 1];
}

/**
 * 比较两个字符串的不同
 * @param oldStr
 * @param newStr
 */
export function diff(oldStr, newStr) {
  let index = 0;
  for (let i = 0; i < oldStr.length; i++) {
    if (newStr[i] !== oldStr[i]) {
      index = i;
      break;
    }
    index = newStr.length - oldStr.length;
  }
  return index;
}
