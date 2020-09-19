/*
 * @Author: your name
 * @Date: 2020-08-26 19:40:50
 * @LastEditTime: 2020-09-19 15:42:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/utils/utils.js
 */

/**
 * @description: URL编码
 * @param { Object } 参数json对象
 * @return { String }
 * @author: hanyu
 */

export function toParams(param) {
  let result = '';
  for (let name in param) {
    if (typeof param[name] != 'function') {
      if (param[name] === null) {
        result += '&' + name + '=';
      } else {
        result += '&' + name + '=' + encodeURI(param[name]);
      }
    }
  }
  return result.substring(1);
}

/**
 * @description: 防抖函数
 * @param { Function } fn 高频函数
 * @param { Number, String } wait 等待时间
 * @returns { Function }
 * @author: hanyu
 */
export function debounce(fn, wait) {
  let context = this,
    args = arguments,
    timer = null;
  return function () {
    context = this;
    args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait || 250);
  };
}

/**
 * @description: 对象深拷贝
 * @param { Object } obj 对象
 * @returns { Object }
 * @author: hanyu
 */
export function cloneObj(obj) {
  let str;
  let newObj = obj.constructor === Array ? [] : {};
  if (
    Object.prototype.toString.call(obj) !== '[object Object]' &&
    Object.prototype.toString.call(obj) !== '[object Array]'
  ) {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj); // 系列化对象
    newObj = JSON.parse(str); // 还原
  } else {
    for (let i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
    }
  }
  return newObj;
}