export default class Utils {
  /**
   * 获取指定范围内的随机数
   * @param min
   * @param max
   * @returns {number} r -> [min, max)
   */
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * 获取数组的逆序数
   * @param arr
   * @returns {number}
   */
  static getNumberInversions(arr) {
    let t = 0;
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[j] > arr[i]) {
          t++;
        }
      }
    }
    return t;
  }

  /**
   * 使用 Knuth Durstenfeld 洗牌算法打乱数组
   * @param arr
   */
  static knuthDurstenfeldShuffle(arr) {
    let len = arr.length;
    while (len > 1) {
      const randomIndex = Utils.getRandomInt(0, len - 1);
      console.log(len, "exchange: ", randomIndex, len - 1);
      [arr[len - 1], arr[randomIndex]] = [arr[randomIndex], arr[len - 1]];
      console.log(
        "[0,",
        len,
        "] = ",
        randomIndex,
        "-->",
        arr,
        "逆序数:",
        Utils.getNumberInversions(arr)
      );
      --len;
    }
  }

  /**
   * 是否是奇数
   * @param number
   * @returns {boolean}
   */
  static isOdd(number) {
    return number % 2 !== 0;
  }

  /**
   * 获取有解数列
   * @returns {*[]}
   */
  static getSolvablePuzzleNumbers(matrix_n) {
    let arr = Array.from(
      new Array(Math.pow(matrix_n, 2) - 1),
      (val, index) => index + 1
    );

    this.knuthDurstenfeldShuffle(arr);

    if (this.isOdd(matrix_n)) {
      [arr[3], arr[1]] = [arr[1], arr[3]];
    }

    return [...arr, null];
  }
}
