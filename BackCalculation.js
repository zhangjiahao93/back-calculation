"use strict";
/**
* @NAME: BackCalculation
* @AUTHOR: zjh
* @DATE: 2020-06-03
* @VERSION: 1.0
*/
exports.__esModule = true;
var BackCalculation = /** @class */ (function () {
    function BackCalculation(config) {
        this.input = config.input;
        this.sum = config.sum;
        this.compute();
    }
    /**
     * 递归列出所有可能性
     * n 为n个数
     * m 为m个数相加？ 3 代表3个数相加 初始化时与a必须相同
     */
    BackCalculation.prototype.dfs = function (n, m) {
        for (var i = n; i >= 1; i--) {
            this.a[m] = i;
            if (m > 1) {
                this.dfs(i - 1, m - 1);
            }
            else {
                var tmp = [];
                for (var i_1 = this.a[0]; i_1 >= 1; i_1--) {
                    tmp.push(this.a[i_1]);
                }
                this.tmpKeys.push(tmp);
            }
        }
    };
    /**
     * 精确计算 最高四位小数
     */
    BackCalculation.prototype.accAdd = function (arg1, arg2) {
        if (arg1 === "" || arg1 == null) {
            arg1 = 0;
        }
        if (arg2 === "" || arg2 == null) {
            arg2 = 0;
        }
        return (parseFloat(arg1) * 10000 + parseFloat(arg2) * 10000) / 10000;
    };
    BackCalculation.prototype.getValues = function () {
        return this.filterValues;
    };
    BackCalculation.prototype.getRows = function () {
        return this.filterRows;
    };
    BackCalculation.prototype.compute = function () {
        var _this = this;
        var input = this.input;
        this.tmpKeys = [];
        //几种可能：1数,2数相加？3,4,5....n
        for (var i = 2; i <= input.length; i++) {
            this.a = [i];
            this.dfs(input.length, i);
        }
        //通过列出的所有可能 逆推出对应input的key
        this.filterRows = this.tmpKeys.filter(function (v) {
            var sum = 0;
            v.forEach(function (vv) {
                sum = _this.accAdd(sum, input[vv - 1]);
            });
            return sum === _this.sum;
        });
        //按从小到大排序
        this.filterRows.forEach(function (element) {
            element.sort(function (a, b) { return a - b; });
        });
        //将上述input key 转化为 input value
        this.filterValues = this.filterRows.map(function (v) {
            return v.map(function (vv) {
                return input[vv - 1];
            });
        });
    };
    return BackCalculation;
}());
exports["default"] = BackCalculation;
