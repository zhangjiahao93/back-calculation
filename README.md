# back-calculation
逆计算和，反算和，已知“2个及以上数的和”和这些数字，求组成和的数字是这些数字的哪几项 ？

[blog地址](https://www.cnblogs.com/zjhblogs/p/13036404.html)

[演示 demo 地址](http://zjh.cool/sum/)

[演示 demo 源码](https://github.com/zhangjiahao93/back-calculation-demo)

[npm 地址](https://www.npmjs.com/package/back-calculation)


# install
```
yarn add back-calculation 
# or
npm install back-calculation 
```

# use 
```
import BC from "back-calculation";

const obj = new BC({
  input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  sum: 20,
});

console.log(obj.getValues());
```
