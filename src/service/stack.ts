export default class Stack {
  _size: number;
  head: any;

  constructor() {
    this._size = 0;
    this.head = null;
    /*
      [{item, next: null}, {item, next: head}, {item, next: head} ]
    */
  }

  size() {
    return this._size;
  }

  push(item: any) {
    const node = { item, next: this.head };
    this.head = node;
    this._size++;
  }

  pop() {
    if (this._size < 1) {
      throw new Error('no item');
    }
    this._size--;
    return this.head.item;
  }

  peek() {
    if (this._size < 1) {
      throw new Error('no item');
    }
    return this.head.item;
  }
}
