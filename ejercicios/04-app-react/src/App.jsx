import { NavLink, Route, Routes } from 'react-router-dom';
import InicioPage from './paginas/InicioPage';
import ListaSimplePage from './paginas/ListaSimplePage';
import ListaDoblePage from './paginas/ListaDoblePage';
import ListaCircularPage from './paginas/ListaCircularPage';

export default function App() {
  return (
    <div className="app">
      <nav className="menu">
        <span className="menu-marca">Listas Enlazadas</span>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/lista-simple">Lista simple</NavLink>
        <NavLink to="/lista-doble">Lista doble</NavLink>
        <NavLink to="/lista-circular">Lista circular</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/lista-simple" element={<ListaSimplePage />} />
          <Route path="/lista-doble" element={<ListaDoblePage />} />
          <Route path="/lista-circular" element={<ListaCircularPage />} />
        </Routes>
      </main>

      <footer className="pie">
        Reto 03 de Estructuras de Datos II, Universidad Autónoma de Occidente
      </footer>
    </div>
  );
}
