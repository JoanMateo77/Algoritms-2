export default function DiagramaNodos({ items, indiceActual = -1, tipo = 'simple' }) {
  if (items.length === 0) {
    return (
      <div className="papel">
        <p className="diagrama-vacio">
          Lista vacía: <code>head</code> y <code>tail</code> valen{' '}
          <code>null</code>.
        </p>
      </div>
    );
  }

  const esDoble = tipo === 'doble';
  const esCircular = tipo === 'circular';

  return (
    <div className="papel">
      <ol className="diagrama" aria-label="Estado interno de la lista">
        {items.map((texto, indice) => {
          const esActual = indice === indiceActual;
          const esUltimo = indice === items.length - 1;

          return (
            <li className="celda" key={indice}>
              <div className="punteros-arriba">
                {indice === 0 && <span className="marca-puntero">head</span>}
                {esUltimo && items.length > 1 && (
                  <span className="marca-puntero">tail</span>
                )}
              </div>

              <div className="fila-nodo">
                <div className={esActual ? 'nodo nodo-actual' : 'nodo'}>
                  {esDoble && (
                    <span className="nodo-puntero" title="prev">
                      {indice === 0 ? '∅' : '•'}
                    </span>
                  )}
                  <span className="nodo-valor">{texto}</span>
                  <span className="nodo-puntero" title="next">
                    {esUltimo && !esCircular ? '∅' : '•'}
                  </span>
                </div>

                {!esUltimo && (
                  <span
                    className={esDoble ? 'union union-doble' : 'union'}
                    aria-hidden="true"
                  />
                )}

                {esUltimo && esCircular && (
                  <span className="vuelta">tail.next → head</span>
                )}
              </div>

              <div className="marca-actual">
                {esActual && <span>nodo actual</span>}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="leyenda">
        <span className="leyenda-item">
          <span className="leyenda-simbolo">•</span> puntero a otro nodo
        </span>
        {!esCircular && (
          <span className="leyenda-item">
            <span className="leyenda-simbolo">∅</span> puntero en{' '}
            <code>null</code>
          </span>
        )}
      </p>
    </div>
  );
}
