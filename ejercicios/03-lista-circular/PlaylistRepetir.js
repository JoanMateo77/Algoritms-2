const CircularLinkedList = require('./CircularLinkedList');

class PlaylistRepetir {
  constructor() {
    this.lista = new CircularLinkedList();
    this.nodoActual = null;
    this.reproducidas = 0;
  }

  agregar(cancion) {
    this.lista.append(cancion);

    if (!this.nodoActual) {
      this.nodoActual = this.lista.head;
    }

    return this;
  }

  cargar(canciones) {
    canciones.forEach((cancion) => this.agregar(cancion));
    return this;
  }

  reproducir() {
    this.nodoActual = this.lista.head;
    this.reproducidas = this.nodoActual ? 1 : 0;
    return this.cancionActual();
  }

  siguiente() {
    if (!this.nodoActual) {
      return null;
    }

    this.nodoActual = this.nodoActual.next;
    this.reproducidas++;

    return this.cancionActual();
  }

  cancionActual() {
    return this.nodoActual ? this.nodoActual.value : null;
  }

  vueltas() {
    if (this.lista.isEmpty()) {
      return 0;
    }

    return Math.floor(this.reproducidas / this.lista.size());
  }

  proximas(n) {
    if (!this.nodoActual) {
      return [];
    }

    const resultado = [];
    let nodo = this.nodoActual;

    for (let i = 0; i < n; i++) {
      nodo = nodo.next;
      resultado.push(nodo.value);
    }

    return resultado;
  }

  quitar(titulo) {
    const nodo = this.buscarNodo(titulo);

    if (!nodo) {
      return false;
    }

    if (nodo === this.nodoActual) {
      this.nodoActual = nodo.next === nodo ? null : nodo.next;
    }

    this.lista.removeNode(nodo);
    return true;
  }

  // con titulos repetidos se prefiere la cancion que esta sonando
  buscarNodo(titulo) {
    if (this.nodoActual && this.nodoActual.value.titulo === titulo) {
      return this.nodoActual;
    }

    if (this.lista.isEmpty()) {
      return null;
    }

    let nodo = this.lista.head;

    do {
      if (nodo.value.titulo === titulo) {
        return nodo;
      }
      nodo = nodo.next;
    } while (nodo !== this.lista.head);

    return null;
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

    do {
      const cancion = nodo.value;
      const sonando = nodo === this.nodoActual ? '>' : ' ';
      const numero = String(filas.length + 1).padStart(2, ' ');
      filas.push(`${sonando} ${numero}. ${cancion.titulo} — ${cancion.artista}`);
      nodo = nodo.next;
    } while (nodo !== this.lista.head);

    filas.push('   ... y vuelve a empezar');

    return filas.join('\n');
  }
}

module.exports = PlaylistRepetir;
