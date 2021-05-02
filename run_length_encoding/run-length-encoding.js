Object.assign(module.exports, {
  encode,
  decode
});

function toLengthAndChar(subArr) {
  return `${subArr.length === 1 ? "" : subArr.length}${subArr[0]}`;
}

function encode(str) {
  var arr = str.split('');
  var temp = [];
  var acc = [];
  for (let idx = 0; idx < arr.length; idx += 1) {
    if (arr[idx] === temp[0]) {
      temp.push(arr[idx]);
    } else {
      if (temp.length > 0) acc.push(temp);
      temp = [];
      temp.push(arr[idx]);
    }
  }
  if (temp.length > 0) acc.push(temp);
  return acc.map(toLengthAndChar).join('');
}

function decode(str) {
  var result = "";
  var nums = str.split(/[A-Z a-z]/);
  var chars = str.match(/[A-Z a-z]/g);
  if (chars) {
    for (let idx = 0; idx < chars.length; idx += 1) {
      result += chars[idx].repeat(Number(nums[idx]) ? Number(nums[idx]) : 1);
    }
  }
  return result;
}
