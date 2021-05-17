# N-Puzzle

基于[JCanvas API](https://projects.calebevans.me/jcanvas/docs/)构建的简易数字华容道小游戏。


## 逆序数

> 在一个排列中，如果一对数的前后位置与大小顺序相反，即前面的数大于后面的数，那么它们就称为一个逆序。一个排列中逆序的总数就称为这个排列的逆序数[^reserve_baike]。

特性：

> 一个排列中的任意两个元素对换会导致该排列的逆序数奇偶性变化.


证明1[^proof1], 证明2[^proof2]

暴力计算代码

```javascript
let getNumberInversions = (arr) => {
    let t = 0; //逆序数
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[i]) {
                t++;
            }
        }
    }
    return t;
}
```

## 洗牌算法

对数组集合进行随机打乱操作。这里用到了***Knuth-Durstenfeld***洗牌算法[^Shuffle_algorithm]。该算法的核心是：

> 1. 从数组前n-1个元素中随机取一个元素e
>
> 2. e和数组第n个元素交换
>
> 3. 从数组前n-2个元素中随机取一个元素e1
>
> 4. e1和数组第n-1个元素交换
>
> 5. 重复以上步骤，直到随机数组长度为1时结束

洗牌算法的直观展示[^Fisher-Yates-shuffle]

Javascript 代码

```javascript
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //不含最大值，含最小值
    return Math.floor(Math.random() * (max - min)) + min; 
}

let knuthDurstenfeldShuffle = (arr) => {
    let len = arr.length;
    while (len > 1) {
        const randomIndex = getRandomInt(0, len-1);
        [arr[len - 1], arr[randomIndex]] = [arr[randomIndex], arr[len - 1]];
        --len;
    }
}
```
> 数组长度为偶数，那么经过上述洗牌后，数组的逆序数为奇数；否则为偶数。

## 有解条件

数字华容道结构满足N阶（行列相等）方阵; 可用数组表示数据存储结构，因此数组长度`L=N*N-1`。

当完成游戏时，该数组（目标数组）是一个递增数组（空格位于数组末尾）。其对应的逆序数是偶数（0）。

初始数组是否能被转换成目标数组，需要满足以下条件：


1. 当N（列）是奇数时，初始数组的逆序数为偶数时，游戏有解，此时空格可以在初始数组的任意一个位置。

2. 当N（列）是偶数时，

    - 初始数组的逆序数为偶数时，那么初始数组空格所在行与目标数组空格所在行差为偶数时，游戏有解。
    
    - 初始数组的逆序数为奇数时，那么初始数组空格所在行与目标数组空格所在行差为奇数时，游戏有解。

## 参考引用

[三种洗牌算法shuffle](https://blog.csdn.net/qq_26399665/article/details/79831490)
 
[Create array sequence `[0, 1, ..., N-1]` in one line](https://www.jstips.co/en/javascript/create-range-0/.n-easily-using-one-line/)
 
 
[^reserve_baike]:https://baike.baidu.com/item/%E9%80%86%E5%BA%8F%E6%95%B0
[^Fisher-Yates-shuffle]:http://www.programming-algorithms.net/article/43676/Fisher-Yates-shuffle
[^Shuffle_algorithm]: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
[^proof1]:https://blog.csdn.net/choimroc/article/details/103134547
[^proof2]:https://blog.csdn.net/Auris/article/details/103740560


