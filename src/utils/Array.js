/* 数组相关方法 */

function isArray (target) {
  return (target === null || typeof target !== 'object' || !Array.isArray(target)) ? false : true;
}

//深度遍历数组
function deepMap (target, callback) {
  let result = [];
  //不是数组
  if (!isArray(target)) {
    return result.push(callback(target));
  }

  let stack = [target];
  while(stack.length > 0) {
    const data = stack.shift();
    for(let i in data) {
      if(isArray(data[i])) {
        stack.push(data[i]);
      } else {
        result.push(callback(data[i], i));
      }
    }
  }
  return result;
}


export default {
  isArray,
  deepMap
};