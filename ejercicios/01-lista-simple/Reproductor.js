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
    const cancion = this.lista.find((c) => c.titulo === titulo);

    if (!cancion) {
      return false;
    }

    // si quitamos la que esta sonando, primero movemos el cursor
    if (this.nodoActual && this.nodoActual.value === cancion) {
      this.nodoActual = this.nodoActual.next;
    }

    this.lista.remove(cancion);
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

    return canciones
      .map((cancion, indice) => {
        const sonando = cancion === this.cancionActual() ? '>' : ' ';
        const numero = String(indice + 1).padStart(2, ' ');
        return `${sonando} ${numero}. ${cancion.titulo} - ${cancion.artista} (${cancion.duracion})`;
      })
      .join('\n');
  }
}

module.exports = Reproductor;
