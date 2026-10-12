import { Link, NavLink, Route, Routes } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";
export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">ce.</span>CampusEats
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            Menu
          </NavLink>
          <NavLink className="nav-order" to="/order">
            Place order
          </NavLink>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="*"
            element={
              <div className="state-panel">
                <h1>Page not found</h1>
                <Link to="/">Back to menu</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>
          CampusEats{" "}
          <span className="footer-note">A little break. A good meal.</span>
        </span>
        <details>
          <summary>Food photo credits</summary>
          <p>
            Illustrative photos, cropped for display.{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Kottu_Roti.jpg">
              Kottu: Chamal N
            </a>{" "}
            and{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Watalappan-Sri_Lanka.jpg">
              Watalappan: Ji-Elle
            </a>
            ,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/3.0/">
              CC BY-SA 3.0
            </a>
            .{" "}
            <a href="https://commons.wikimedia.org/wiki/File:FriedRice.JPG">
              Fried rice: David (Kcdtsg)
            </a>
            , public domain.
          </p>
        </details>
      </footer>
    </div>
  );
}
