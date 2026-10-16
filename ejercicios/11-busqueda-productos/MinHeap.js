// la raíz siempre es el menor según comparar; los hijos de i están en 2i+1 y 2i+2
class MinHeap {
  constructor(comparar = (a, b) => a - b) {
    this.comparar = comparar;
    this.heap = [];
  }

  push(valor) {
    this.heap.push(valor);
    this.percolateUp(this.heap.length - 1);
  }

  pop() {
    if (!this.heap.length) return null;
    const minimo = this.heap[0];
    const ultimo = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = ultimo;
      this.percolateDown(0);
    }
    return minimo;
  }

  peek() { return this.heap[0] ?? null; }

  heapify(arreglo) {
    this.heap = [...arreglo];
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) this.percolateDown(i);
    return this;
  }

  percolateUp(indice) {
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2);
      if (this.comparar(this.heap[indice], this.heap[padre]) >= 0) return;
      this.swap(indice, padre);
      indice = padre;
    }
  }

  percolateDown(indice) {
    while (true) {
      const izquierdo = 2 * indice + 1;
      const derecho = izquierdo + 1;
      let menor = indice;
      if (izquierdo < this.heap.length && this.comparar(this.heap[izquierdo], this.heap[menor]) < 0) menor = izquierdo;
      if (derecho < this.heap.length && this.comparar(this.heap[derecho], this.heap[menor]) < 0) menor = derecho;
      if (menor === indice) return;
      this.swap(indice, menor);
      indice = menor;
    }
  }

  swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  size() { return this.heap.length; }
  toArray() { return [...this.heap]; }
}

module.exports = MinHeap;
