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
    const cancion = this.lista.find((c) => c.titulo === titulo);

    if (!cancion) {
      return false;
    }

    if (this.nodoActual && this.nodoActual.value === cancion) {
      this.nodoActual = this.nodoActual.next === this.nodoActual ? null : this.nodoActual.next;
    }

    this.lista.remove(cancion);

    if (this.lista.isEmpty()) {
      this.nodoActual = null;
    }

    return true;
  }

  cuantas() {
    return this.lista.size();
  }

  listar() {
    const canciones = this.lista.toArray();

    if (canciones.length === 0) {
      return '(playlist vacía)';
    }

    const filas = canciones.map((cancion, indice) => {
      const sonando = cancion === this.cancionActual() ? '>' : ' ';
      const numero = String(indice + 1).padStart(2, ' ');
      return `${sonando} ${numero}. ${cancion.titulo} — ${cancion.artista}`;
    });

    filas.push('   ... y vuelve a empezar');

    return filas.join('\n');
  }
}

module.exports = PlaylistRepetir;
