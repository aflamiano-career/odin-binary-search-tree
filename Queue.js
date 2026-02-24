export default class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.items[this.tail] = value;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const value = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return value;
  }

  peek() {
    return this.isEmpty() ? undefined : this.items[this.head];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.tail - this.head;
  }
}
