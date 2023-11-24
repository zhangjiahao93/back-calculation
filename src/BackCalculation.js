/**
* @NAME: BackCalculation
* @AUTHOR: zjh
* @DATE: 2023-11-24
* @VERSION: 2.0
*/
function quickSort(arr) {
    let left = 0, right = arr.length - 1;
    main(arr, left, right);
    return arr;
    function main(arr, left, right) {
        // 递归结束的条件，直到数组只包含一个元素。
        if (arr.length === 1) {
            // 由于是直接修改arr，所以不用返回值。
            return;
        }
        // 获取left指针，准备下一轮分解。
        let index = partition(arr, left, right);
        if (left < index - 1) {
            // 继续分解左边数组。
            main(arr, left, index - 1);
        }
        if (index < right) {
            // 分解右边数组。
            main(arr, index, right);
        }
    }
    // 数组分解函数。
    function partition(arr, left, right) {
        // 选取中间项为参考点。
        let pivot = arr[Math.floor((left + right) / 2)];
        // 循环直到left > right。
        while (left <= right) {
            // 持续右移左指针直到其值不小于pivot。
            while (arr[left] < pivot) {
                left++;
            }
            // 持续左移右指针直到其值不大于pivot。
            while (arr[right] > pivot) {
                right--;
            }
            // 此时左指针的值不小于pivot，右指针的值不大于pivot。
            // 如果left仍然不大于right。
            if (left <= right) {
                // 交换两者的值，使得不大于pivot的值在其左侧，不小于pivot的值在其右侧。
                [arr[left], arr[right]] = [arr[right], arr[left]];
                // 左指针右移，右指针左移准备开始下一轮，防止arr[left]和arr[right]都等于pivot然后导致死循环。
                left++;
                right--;
            }
        }
        // 返回左指针作为下一轮分解的依据。
        return left;
    }
}
export default class BackCalculation {
    filterValues; //结果值
    constructor(config) {
        const input = quickSort(config.input);
        this.filterValues = this.findCombinations(input, config.sum);
    }
    // 使用回溯算法 计算的是所有可能的组合
    findCombinations(numbers, target) {
        let result = [];
        function backtrack(start, path, remaining) {
            if (remaining === 0) {
                result.push([...path]);
                return;
            }
            for (let i = start; i < numbers.length; i++) {
                if (numbers[i] > remaining) {
                    break;
                }
                path.push(numbers[i]);
                backtrack(i + 1, path, remaining - numbers[i]);
                path.pop();
            }
        }
        backtrack(0, [], target);
        return result;
    }
    getValues() {
        return this.filterValues;
    }
}
