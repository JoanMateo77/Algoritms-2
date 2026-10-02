const LinkedList = require('./LinkedList');

class Reproductor {
  constructor() {
    this.lista = new LinkedList();
    this.nodoActual = null;
  }

  agregar(cancion) {
    this.lista.append(cancion);
    return this;
  }

  cargar(canciones) {
    canciones.forEach((cancion) => this.agregar(cancion));
    return this;
  }

  reproducir() {
    this.nodoActual = this.lista.head;
    return this.cancionActual();
  }

  siguiente() {
    if (!this.nodoActual) {
      return null;
    }

    this.nodoActual = this.nodoActual.next;
    return this.cancionActual();
  }

  cancionActual() {
    return this.nodoActual ? this.nodoActual.value : null;
  }

  quitar(titulo) {
    const nodo = this.buscarNodo(titulo);

    if (!nodo) {
      return false;
    }

    // si quitamos la que esta sonando, primero movemos el cursor
    if (nodo === this.nodoActual) {
      this.nodoActual = nodo.next;
    }

    this.lista.removeNode(nodo);
    return true;
  }

  // con titulos repetidos se prefiere la cancion que esta sonando
  buscarNodo(titulo) {
    if (this.nodoActual && this.nodoActual.value.titulo === titulo) {
      return this.nodoActual;
    }

    let nodo = this.lista.head;
    while (nodo && nodo.value.titulo !== titulo) {
      nodo = nodo.next;
    }

    return nodo;
  }

  cuantas() {
    return this.lista.size();
  }

  listar() {
    if (this.lista.isEmpty()) {
      return '(playlist vacía)';
    }

    const filas = [];
    let nodo = this.lista.head;

    while (nodo) {
      const cancion = nodo.value;
      const sonando = nodo === this.nodoActual ? '>' : ' ';
      const numero = String(filas.length + 1).padStart(2, ' ');
      filas.push(`${sonando} ${numero}. ${cancion.titulo} - ${cancion.artista} (${cancion.duracion})`);
      nodo = nodo.next;
    }

    return filas.join('\n');
  }
}

module.exports = Reproductor;
