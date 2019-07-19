/**
 * 移动端拖拽
 * @params {obj1,obj2}  obj1拖拽的区域  obj2拖动的对象，两者可以使同一个
 */
export const mDrag = (downObj, dragObg) => {
  downObj.addEventListener("touchstart", function(ev) {
    let disX = ev.touches[0].clientX - dragObg.offsetLeft;
    let disY = ev.touches[0].clientY - dragObg.offsetTop;

    let oMove = ev => {
      dragObg.style.left = ev.touches[0].clientX - disX + "px";
      dragObg.style.top = ev.touches[0].clientY - disY + "px";
    };
    downObj.addEventListener("touchmove", oMove);

    let oEnd = ev => {
      downObj.removeEventListener("touchmove", oMove, false);
      downObj.removeEventListener("touchend", oEnd, false);
      dragObg.releaseCapture && dragObg.releaseCapture();
    };
    downObj.addEventListener("touchend", oEnd);
  });
};

/**
 * 数组对象删除相同元素
 * @param {array ,string, [object|string]}
 * arr需要去重的数组  key对象里需要对比的 键 名  obj要对比的对象或者字符串
 */
export const rmSameObj = (arr, key, obj) => {
  let _obj = obj[key] ? obj[key] : obj;
  let _del = "";
  arr.forEach((v, i) => {
    if (v[key] == _obj) {
      _del = arr.splice(i, 1);
    }
  });
  return _del;
};

/**
 * 移除重复数组对象
 * @param {Array} arr 包含对象数组
 * @param {String} key 要对比的键值
 */
export const rmSame = (arr, key) => {
  let obj = {};
  return arr.reduce((v, next) => {
    obj[next[key]] ? "" : (obj[next[key]] = true && v.push(next));
    return v;
  }, []);
};

/**
 * 时间戳或时间格式导出
 * @param {string,string}
 * date 时间戳10 | 日期时间 | GMT
 * 
 */
export const timeFormat = (date, format = "default") => {
  if(!date)return;
  let getDate = isNaN(date) ? date.replace(/-/g, "/") : date * 1000;
  let oDate = new Date(getDate);
  let Y = oDate.getFullYear();
  let M = toDouble(oDate.getMonth() + 1);
  let D = toDouble(oDate.getDate());
  let h = toDouble(oDate.getHours());
  let m = toDouble(oDate.getMinutes());
  let s = toDouble(oDate.getSeconds());
 
  let oMap = new Map([
    ["YMD", `${Y}-${M}-${D}`],
    ["hms", `${h}:${m}:${s}`],
    ["YMDhms", `${Y}-${M}-${D} ${h}:${m}:${s}`],
    ["Y$M$D$", `${Y}年${M}月${D}日`],
    ["h$m$s$", `${h}时${m}分${s}秒`],
    ["Y$M$D$h$m$s$", `${Y}年${M}月${D}日 ${h}时${m}分${s}秒`],
    ["default", {Y,M,D,h,m,s}]
  ]);
  return oMap.get(format);
};

/**
 * 时间转时间戳
 * @param { Date } 日期时间
 */
export const dateTime2Stamp = dateTime => {
  dateTime.replace(/-/, "/");
  return new Date(dateTime).getTime() / 1000;
};
/**
 * 小于10前位补0
 * @param {number}
 */
export const toDouble = num => (num < 10 ? "0" + num : num);

/**
 * 数组对象查重
 * @param {array, object, string}
 *
 */
export const findInArr = (arr, newObj, key) => {
  let i = 0;
  for (i; i < arr.length; i++) {
    if (arr[i][key] == newObj[key]) {
      return i;
    }
  }
  return -1;
};
