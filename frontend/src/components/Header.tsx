import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
    return (
        <header className="header">
            <nav className="nav-container">
                <ul className="nav-links">
                    <li>
                        <Link to="/">Liste des Livres</Link>
                    </li>
                    <li>
                        <Link to="/add-book">Ajouter un Livre</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;