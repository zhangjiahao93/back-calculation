# back-calculation
Calculate the number by the sum

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