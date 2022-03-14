/* eslint-disable @typescript-eslint/no-unused-vars */
interface INode {
  element: any;
  next: INode | null;
}

class Nodea<T> implements INode {
  constructor(public element: T, public next: INode | null) {}
}

class LinkList<T> {
  public head: Nodea<T> | null;
  public size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  public getNode(index: number) {
    let current: Nodea<T> | null = this.head;
    if (index > this.size) {
      console.log('没有该项');
      return null;
    }

    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  public add(index: number, node: T) {
    if (index < 0 || index > this.size) return new Error('插入数据失败');

    if (index === 0) {
      this.head = new Nodea(node, this.head);
    } else {
      const curNode = this.getNode(index - 1);
      curNode.next = new Nodea(node, curNode.next);
    }
    this.size++;
  }
}

const list = new LinkList<{ name: string; age: number }>();
list.add(0, { name: 'zhangsan', age: 20 });
list.add(1, { name: 'zhangsi', age: 2 });
list.add(1, { name: 'zhangwu', age: 3 });
console.log(list);

class SortUtil {
  public static mtSort(arr: number[]): number[] {
    const container = new Array(Math.max(...arr) * 10 * 10 + 1).fill(0);
    arr.forEach(v => {
      container[v * 10 * 10]++;
    });

    const res: number[] = [];
    container.forEach((v, i) => {
      if (v) {
        for (let j = 0; j < v; j++) {
          res.push(i / 10 / 10);
        }
      }
    });
    return res;
  }

  public static bubbleSort(arr: number[]): number[] {
    for (let i = 0; i <= arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }

    return arr;
  }

  public static quickSort(arr: number[]): number[] {
    let len = arr.length;

    if (len <= 1) {
      return arr;
    }

    const jizhunNum = arr.splice(0, 1)[0];
    len -= 1;

    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < len; i++) {
      const num = arr[i];
      if (num >= jizhunNum) {
        rightArr.push(num);
      } else {
        leftArr.push(num);
      }
    }

    return [...this.quickSort(leftArr), jizhunNum, ...this.quickSort(rightArr)];
  }
}
const arr = new Array(100)
  .fill(0)
  .map(() => parseInt(Math.random().toString().slice(-10)));
console.time('quickSort');
console.log(SortUtil.quickSort([...arr]));
console.timeEnd('quickSort');
