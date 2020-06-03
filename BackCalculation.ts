/**
* @NAME: BackCalculation
* @AUTHOR: zjh
* @DATE: 2020-06-03
* @VERSION: 1.0
*/

interface SquareConfig {
  input: Array<number>;
  sum: number;
}

type TArray = Array<Array<number>>;

export default class BackCalculation {
  private sum: number;//数字需要逆解析的和
  private input: Array<number>; //输入数字
  private a: Array<number>; //几个数相加？[3] 代表3个数相加
  private tmpKeys: TArray;//临时储存所有组合key
  private filterRows: TArray;//结果行
  private filterValues: TArray;//结果值

  constructor(config: SquareConfig) {
    this.input = config.input;
    this.sum = config.sum;
  }
  /**
   * 递归列出所有可能性
   * n 为n个数
   * m 为m个数相加？ 3 代表3个数相加 初始化时与a必须相同
   */
  private dfs(n, m): void {
    for (let i = n; i >= 1; i--) {
      this.a[m] = i;
      if (m > 1) {
        this.dfs(i - 1, m - 1);
      } else {
        let tmp = [];
        for (let i = this.a[0]; i >= 1; i--) {
          tmp.push(this.a[i]);
        }
        this.tmpKeys.push(tmp);
      }
    }
  }
  /**
   * 精确计算 最高四位小数
   */
  private accAdd(arg1, arg2): number {
    if (arg1 === "" || arg1 == null) {
      arg1 = 0;
    }
    if (arg2 === "" || arg2 == null) {
      arg2 = 0;
    }
    return (parseFloat(arg1) * 10000 + parseFloat(arg2) * 10000) / 10000;
  }
  public getValues(): TArray {
    return this.filterValues;
  }

  public getRows(): TArray {
    return this.filterRows;
  }

  public compute(): TArray {
    const input = this.input;
    this.tmpKeys = [];
    //几种可能：1数,2数相加？3,4,5....n
    for (let i = 2; i <= input.length; i++) {
      this.a = [i];
      this.dfs(input.length, i);
    }
    //通过列出的所有可能 逆推出对应input的key
    this.filterRows = this.tmpKeys.filter((v) => {
      let sum = 0;
      v.forEach((vv) => {
        sum = this.accAdd(sum, input[vv - 1]);
      });
      return sum === this.sum;
    });
    //按从小到大排序
    this.filterRows.forEach(element => {
      element.sort((a, b) => a - b);
    });
    //将上述input key 转化为 input value
    this.filterValues = this.filterRows.map((v) => {
      return v.map((vv) => {
        return input[vv - 1];
      });
    });

    return this.filterValues
  }
}

