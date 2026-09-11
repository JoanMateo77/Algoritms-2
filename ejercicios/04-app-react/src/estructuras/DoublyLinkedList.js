export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
    return newNode;
  }

  peek(value, current = this.head) {
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  size() {
    return this.length;
  }

  remove(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;

        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;

        current.prev = null;
        current.next = null;
        this.length--;
        return current;
      }
      current = current.next;
    }

    return null;
  }

  removeAfter(node) {
    if (!node) return 0;

    let borrados = 0;
    let current = node.next;

    while (current) {
      const siguiente = current.next;
      current.prev = null;
      current.next = null;
      current = siguiente;
      borrados++;
    }

    node.next = null;
    this.tail = node;
    this.length -= borrados;
    return borrados;
  }

  print() {
    let current = this.head;
    let result = '';
    while (current) {
      result += `${current.value} <-> `;
      current = current.next;
    }
    return result + 'null';
  }

  isEmpty() {
    return this.length === 0;
  }

  toArray() {
    const resultado = [];
    let current = this.head;
    while (current) {
      resultado.push(current.value);
      current = current.next;
    }
    return resultado;
  }

  toArrayReverse() {
    const resultado = [];
    let current = this.tail;
    while (current) {
      resultado.push(current.value);
      current = current.prev;
    }
    return resultado;
  }
}
