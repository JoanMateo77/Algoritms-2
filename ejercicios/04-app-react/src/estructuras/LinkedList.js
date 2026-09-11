export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

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
    if (!this.head) return null;

    if (this.head.value === value) {
      const eliminado = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return eliminado;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (!current.next) return null;

    const eliminado = current.next;
    current.next = current.next.next;
    if (!current.next) this.tail = current;
    this.length--;
    return eliminado;
  }

  print() {
    let current = this.head;
    let result = '';
    while (current) {
      result += `${current.value} -> `;
      current = current.next;
    }
    return result + 'null';
  }

  isEmpty() {
    return this.length === 0;
  }

  find(predicado) {
    let current = this.head;
    while (current) {
      if (predicado(current.value)) return current.value;
      current = current.next;
    }
    return null;
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
}
