class NodoBinario {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
  esHoja() { return !this.izquierda && !this.derecha; }
}

class ArbolBinario {
  constructor(valores = []) {
    this.raiz = null;
    valores.forEach((valor) => this.insertar(valor));
  }

  insertar(valor) {
    if (!Number.isFinite(valor)) throw new Error('El valor debe ser un número finito.');
    if (!this.raiz) {
      this.raiz = new NodoBinario(valor);
      return true;
    }
    let actual = this.raiz;
    while (valor !== actual.valor) {
      const lado = valor < actual.valor ? 'izquierda' : 'derecha';
      if (!actual[lado]) {
        actual[lado] = new NodoBinario(valor);
        return true;
      }
      actual = actual[lado];
    }
    return false;
  }

  contiene(valor) {
    let actual = this.raiz;
    while (actual) {
      if (valor === actual.valor) return true;
      actual = valor < actual.valor ? actual.izquierda : actual.derecha;
    }
    return false;
  }

  preorden() {
    const resultado = [];
    const visitar = (nodo) => {
      if (!nodo) return;
      resultado.push(nodo.valor);
      visitar(nodo.izquierda);
      visitar(nodo.derecha);
    };
    visitar(this.raiz);
    return resultado;
  }

  inorden() {
    const resultado = [];
    const visitar = (nodo) => {
      if (!nodo) return;
      visitar(nodo.izquierda);
      resultado.push(nodo.valor);
      visitar(nodo.derecha);
    };
    visitar(this.raiz);
    return resultado;
  }

  postorden() {
    const resultado = [];
    const visitar = (nodo) => {
      if (!nodo) return;
      visitar(nodo.izquierda);
      visitar(nodo.derecha);
      resultado.push(nodo.valor);
    };
    visitar(this.raiz);
    return resultado;
  }

  paraD3(nodo = this.raiz) {
    if (!nodo) return null;
    const hijos = [this.paraD3(nodo.izquierda), this.paraD3(nodo.derecha)].filter(Boolean);
    return { name: String(nodo.valor), children: hijos };
  }
}

module.exports = { NodoBinario, ArbolBinario };
