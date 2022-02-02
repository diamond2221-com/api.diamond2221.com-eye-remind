/*
 * @Author: ZhangYu
 * @Date:   2018-12-29 14:54:27
 * @Last Modified by: ZhangYù
 * @Last Modified time: 2022-02-01 23:45:19
 */

export const timestampToTime = (timestamp: number | string): string => {
  if (typeof timestamp === 'string') timestamp = Number(timestamp);
  // debugger;
  const now: Date = new Date();
  const date: Date = new Date(timestamp);
  //计算时间间隔，单位为分钟
  const inter: number = parseInt(
    ((now.getTime() - date.getTime()) / 1000 / 60).toString()
  );
  if (inter === 0) {
    return '刚刚';
  }
  //多少分钟前
  else if (inter < 60) {
    return inter.toString() + '分钟前';
  }
  //多少小时前
  else if (inter < 60 * 24) {
    return parseInt((inter / 60).toString()).toString() + '小时前';
  }
  //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
  else if (now.getFullYear() === date.getFullYear()) {
    return (
      (date.getMonth() + 1).toString() +
      '-' +
      date.getDate().toString() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    );
  } else {
    return (
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString() +
      '-' +
      date.getDate().toString() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    );
  }
};

// 根据路径获取后缀
export const get_suffix = (filename: string): string => {
  const pos: number = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
};
// 随机字符串
export const random_string = (len: number): string => {
  len = len || 32;
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos: number = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

const base64 = () => {
  const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  /**
   * @description 解码 base64
   * @author ZhangYu
   * @date 2020-02-15
   * @param {string} r
   * @returns {string}
   */
  function atob(r: string): string {
    const o = String(r).replace(/=+$/, '');
    if (o.length % 4 === 1)
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    let d = '';
    for (
      let n, a, i = 0, c = 0;
      (a = o.charAt(c++));
      ~a && ((n = i % 4 ? 64 * n + a : a), i++ % 4)
        ? (d += String.fromCharCode(255 & (n >> ((-2 * i) & 6))))
        : 0
    )
      a = e.indexOf(a);
    return d;
  }

  /**
   * @description 把字符串编码为base64
   * @author ZhangYu
   * @date 2020-02-15
   * @param {string} r
   * @returns {string}
   */
  function btoa(r: string): string {
    let d = '';
    for (
      let o, n, a = String(r), i = 0, c = e;
      a.charAt(0 | i) || ((c = '='), i % 1);
      d += c.charAt(63 & (o >> (8 - (i % 1) * 8)))
    ) {
      if (((n = a.charCodeAt((i += 0.75))), n > 255))
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      o = (o << 8) | n;
    }
    return d;
  }
  return {
    btoa,
    atob,
  };
};
export const btoa = base64().btoa;
export const atob = base64().atob;

/**
 * @description 生成6位随机数
 * @author ZhangYu
 * @date 2020-02-18
 * @export
 * @returns {number}
 */
export function MathRand(): string {
  let Num = '';
  for (let i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
}

/**
 * @description 获取ｎ天之前的日期 返回时间戳
 * @author ZhangYu
 * @date 2020-03-02
 * @export
 * @param {number} n
 * @returns {number}
 */
export function getNDay(n: number): number {
  const now = Date.now();
  const day = new Date(now - 60 * 60 * 24 * n * 1000);
  day.setHours(0, 0, 0, 0);
  return day.getTime();
}

/**
 * @description 对数组进行冒泡排序
 * @author ZhangYu
 * @date 01/02/2022
 * @export
 * @param {any[]} arr
 * @param {(-1 | 1)} [dir=1]  (-1) 降序（从大到小） 1 升序（从小到大）
 * @param {(string | number)} [sortKey='sort'] 排序值
 * @return {*}  {any[]}
 */
export function bubbleSort<
  T extends { [key in K]: any },
  K extends string | number = 'sort'
>(arr: T[], dir: -1 | 1 = 1, sortKey: K = 'sort' as K): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (dir === 1) {
        if (+arr[i][sortKey] >= +arr[j][sortKey]) {
          // 如果前面的数据比后面的大就交换
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      } else if (dir === -1) {
        if (+arr[i][sortKey] <= +arr[j][sortKey]) {
          // 如果前面的数据比后面的大就交换
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
  return arr;
}
