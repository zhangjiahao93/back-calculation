import BC from "./index.mjs";

const genArr = (num) => {
  const obj = {};
  for (let i = 1; i <= num; i++) {
    const value = Math.floor(Math.random() * 1000);
    obj[value] = value;
    // arr.push(Math.floor(Math.random() * 1000));
    // arr.push(i);
  }
  return Object.values(obj);
};

const nums = genArr(1000);
const obj = new BC({ input: nums, sum: 100 });
console.log(obj.getValues());
