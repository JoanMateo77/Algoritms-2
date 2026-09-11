export default function Explicacion({ titulo, children, codigo }) {
  return (
    <aside className="explicacion">
      <h3>{titulo}</h3>
      <div className="explicacion-cuerpo">{children}</div>
      {codigo && <pre className="explicacion-codigo">{codigo}</pre>}
    </aside>
  );
}
