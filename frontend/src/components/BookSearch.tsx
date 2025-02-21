import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3000/api/books";

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query) {
            setBook(null);
            setError("Veuillez entrer un ISBN.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${query}`);
            if (!response.ok) {
                setBook(null);
                setError("Livre non trouvé.");
                return;
            }

            const data = await response.json();
            setBook(data.data);
            setError(null);
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
            setError("Une erreur s'est produite, veuillez réessayer.");
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="text-center text-secondary">Rechercher un Livre</h3>
            <div className="search-bar d-flex justify-content-center mt-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Entrez ISBN..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary ms-2" onClick={handleSearch}>
                    Rechercher
                </button>
            </div>

            {error && <p className="text-center text-danger mt-3">{error}</p>}

            {book && (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img
                                src={book.image || "https://via.placeholder.com/150"}
                                className="card-img-top book-image"
                                alt={book.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.name}</h5>
                                <p className="card-text">Auteur : {book.author}</p>
                                <p className="card-text"><small>ISBN: {book.ISBN}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookSearch;