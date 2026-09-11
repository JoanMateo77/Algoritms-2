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
    const paginas = this.paginas.toArray();

    if (paginas.length === 0) {
      return '(historial vacío)';
    }

    return paginas
      .map((pagina, indice) => {
        const aqui = pagina === this.paginaActual() ? '>' : ' ';
        const numero = String(indice + 1).padStart(2, ' ');
        return `${aqui} ${numero}. ${pagina.titulo}\n       ${pagina.url}`;
      })
      .join('\n');
  }
}

module.exports = Historial;
