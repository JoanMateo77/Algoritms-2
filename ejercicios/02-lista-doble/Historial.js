const DoublyLinkedList = require('./DoublyLinkedList');

class Historial {
  constructor() {
    this.paginas = new DoublyLinkedList();
    this.nodoActual = null;
  }

  visitar(pagina) {
    if (this.nodoActual && this.nodoActual !== this.paginas.tail) {
      this.paginas.removeAfter(this.nodoActual);
    }

    this.nodoActual = this.paginas.append(pagina);
    return this.paginaActual();
  }

  atras() {
    if (!this.puedeIrAtras()) {
      return null;
    }

    this.nodoActual = this.nodoActual.prev;
    return this.paginaActual();
  }

  adelante() {
    if (!this.puedeIrAdelante()) {
      return null;
    }

    this.nodoActual = this.nodoActual.next;
    return this.paginaActual();
  }

  puedeIrAtras() {
    return Boolean(this.nodoActual && this.nodoActual.prev);
  }

  puedeIrAdelante() {
    return Boolean(this.nodoActual && this.nodoActual.next);
  }

  paginaActual() {
    return this.nodoActual ? this.nodoActual.value : null;
  }

  cuantas() {
    return this.paginas.size();
  }

  listar() {
    if (this.paginas.isEmpty()) {
      return '(historial vacío)';
    }

    const filas = [];
    let nodo = this.paginas.head;

    while (nodo) {
      const pagina = nodo.value;
      const aqui = nodo === this.nodoActual ? '>' : ' ';
      const numero = String(filas.length + 1).padStart(2, ' ');
      filas.push(`${aqui} ${numero}. ${pagina.titulo}\n       ${pagina.url}`);
      nodo = nodo.next;
    }

    return filas.join('\n');
  }
}

module.exports = Historial;
