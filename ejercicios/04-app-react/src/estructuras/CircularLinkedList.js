export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class CircularLinkedList {
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
      newNode.next = newNode;
      this.length++;
      return newNode;
    }

    this.tail.next = newNode;
    newNode.next = this.head;
    this.tail = newNode;
    this.length++;
    return newNode;
  }

  peek(value) {
    if (!this.head) return null;

    let current = this.head;
    do {
      if (current.value === value) return current;
      current = current.next;
    } while (current !== this.head);

    return null;
  }

  size() {
    return this.length;
  }

  remove(value) {
    if (!this.head) return null;

    if (this.head === this.tail) {
      if (this.head.value !== value) return null;
      const eliminado = this.head;
      this.head = null;
      this.tail = null;
      eliminado.next = null;
      this.length--;
      return eliminado;
    }

    if (this.head.value === value) {
      const eliminado = this.head;
      this.head = this.head.next;
      this.tail.next = this.head;
      eliminado.next = null;
      this.length--;
      return eliminado;
    }

    let current = this.head;
    while (current.next !== this.head) {
      if (current.next.value === value) {
        const eliminado = current.next;
        current.next = eliminado.next;
        if (eliminado === this.tail) this.tail = current;
        eliminado.next = null;
        this.length--;
        return eliminado;
      }
      current = current.next;
    }

    return null;
  }

  print() {
    if (!this.head) return '(vacía)';

    let current = this.head;
    let result = '';
    do {
      result += `${current.value} -> `;
      current = current.next;
    } while (current !== this.head);

    return result + `(vuelve a ${this.head.value})`;
  }

  isEmpty() {
    return this.length === 0;
  }

  find(predicado) {
    if (!this.head) return null;

    let current = this.head;
    do {
      if (predicado(current.value)) return current.value;
      current = current.next;
    } while (current !== this.head);

    return null;
  }

  toArray() {
    if (!this.head) return [];

    const resultado = [];
    let current = this.head;
    do {
      resultado.push(current.value);
      current = current.next;
    } while (current !== this.head);

    return resultado;
  }
}
