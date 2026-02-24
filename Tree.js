import { mergeSort } from "./util.js";
import { removeDuplicates } from "./util.js";
import { prettyPrint } from "./view.js";

import Queue from "./Queue.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = []) {
    this.root = this.#buildTree(array);
  }

  //   #buildTree(array) {
  //   if (array.length === 0) return null;

  //   const mid = Math.floor(array.length / 2);

  //   const node = new Node(array[mid]);

  //   node.left = this.#buildTree(array.slice(0, mid));
  //   node.right = this.#buildTree(array.slice(mid + 1));

  //   return node;
  // }

  #buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const node = new Node(array[mid]);

    node.left = this.#buildTree(array, start, mid - 1);
    node.right = this.#buildTree(array, mid + 1, end);

    return node;
  }

  #toArray(root) {
    if (!root) return [];

    const queue = [root];
    const result = [];

    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  #insertRecursive(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.#insertRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.#insertRecursive(node.right, value);
    }

    return node;
  }

  #getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) node = node.left;
    return node;
  }

  #deleteRecursive(node, value) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.#deleteRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.#deleteRecursive(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const successor = this.#getSuccessor(node);
      node.data = successor.data;
      node.right = this.#deleteRecursive(node.right, successor.data);
    }

    return node;
  }

  includes(value) {
    const array = this.#toArray(this.root);
    return array.includes(value);
  }

  insert(value) {
    this.root = this.#insertRecursive(this.root, value);
  }

  delete(value) {
    this.root = this.#deleteRecursive(this.root, value);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    if (!this.root) return;

    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      callback(current.data);

      if (current.left) queue.enqueue(current.left);
      if (current.right) queue.enqueue(current.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    if (!this.root) return;

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }

    traverse(this.root);

    // can use arrow function to not bind(this)
    // ========================================
    // const traverse = (node) => {
    //   if (node === null) return;
    //   traverse(node.left);
    //   callback(node.data);
    //   traverse(node.right);
    // };
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    if (!this.root) return;

    function traverse(node) {
      if (node === null) return;

      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    if (!this.root) return;

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    }

    traverse(this.root);
  }
}

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const unique = removeDuplicates(data);
const sorted = mergeSort(unique);

const tree = new Tree(sorted);

prettyPrint(tree.root);

console.log(tree.includes(100));

tree.insert(100);

prettyPrint(tree.root);

tree.delete(67);
prettyPrint(tree.root);

// tree.levelOrderForEach((value) => console.log(value));

tree.inOrderForEach((value) => console.log(value));
console.log("---------");
tree.preOrderForEach((value) => console.log(value));
console.log("---------");
tree.postOrderForEach((value) => console.log(value));
