class TrieNode {
  constructor(value = null) {
    this.value = value;
    this.children = new Map();
    this.isEndOfWord = false;
    this.producto = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(palabra, producto = palabra) {
    let actual = this.root;
    for (const letra of palabra) {
      if (!actual.children.has(letra)) actual.children.set(letra, new TrieNode(letra));
      actual = actual.children.get(letra);
    }
    actual.isEndOfWord = true;
    actual.producto = producto;
    return actual;
  }

  nodoDe(texto) {
    let actual = this.root;
    for (const letra of texto) {
      actual = actual.children.get(letra);
      if (!actual) return null;
    }
    return actual;
  }

  search(palabra) {
    return Boolean(this.nodoDe(palabra)?.isEndOfWord);
  }

  startsWith(prefijo) {
    const inicio = this.nodoDe(prefijo);
    if (!inicio) return [];
    const encontrados = [];
    const visitar = (nodo) => {
      if (nodo.isEndOfWord) encontrados.push(nodo.producto);
      nodo.children.forEach(visitar);
    };
    visitar(inicio);
    return encontrados;
  }
}

module.exports = { TrieNode, Trie };
