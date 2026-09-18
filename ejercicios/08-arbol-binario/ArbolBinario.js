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
    const nuevo = new NodoBinario(valor);
    if (!this.raiz) { this.raiz = nuevo; return true; }
    let actual = this.raiz;
    while (actual) {
      if (valor === actual.valor) return false;
      const lado = valor < actual.valor ? 'izquierda' : 'derecha';
      if (!actual[lado]) { actual[lado] = nuevo; return true; }
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

  preorden(nodo = this.raiz, resultado = []) {
    if (nodo) { resultado.push(nodo.valor); this.preorden(nodo.izquierda, resultado); this.preorden(nodo.derecha, resultado); }
    return resultado;
  }
  inorden(nodo = this.raiz, resultado = []) {
    if (nodo) { this.inorden(nodo.izquierda, resultado); resultado.push(nodo.valor); this.inorden(nodo.derecha, resultado); }
    return resultado;
  }
  postorden(nodo = this.raiz, resultado = []) {
    if (nodo) { this.postorden(nodo.izquierda, resultado); this.postorden(nodo.derecha, resultado); resultado.push(nodo.valor); }
    return resultado;
  }

  paraD3(nodo = this.raiz) {
    if (!nodo) return null;
    const hijos = [this.paraD3(nodo.izquierda), this.paraD3(nodo.derecha)].filter(Boolean);
    return { name: String(nodo.valor), children: hijos };
  }
}

module.exports = { NodoBinario, ArbolBinario };
