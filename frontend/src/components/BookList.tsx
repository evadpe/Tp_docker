import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// @ts-ignore
import BookSearch from "./BookSearch.tsx";
// @ts-ignore
import mhm from "../img/pied.png";
const API_URL = "http://backend:5000";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                if (Array.isArray(data.books)) {
                    setBooks(data.books);
                } else {
                    console.error("Réponse API incorrecte :", data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des livres :", error);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (isbn) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce livre ?")) return;
        try {
            const response = await fetch(`${API_URL}/${isbn}`, { method: "DELETE" });
            if (response.ok) {
                setBooks(books.filter(book => book.ISBN !== isbn));
            } else {
                console.error("Erreur lors de la suppression");
                alert("Erreur lors de la suppression du livre.");
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Une erreur s'est produite.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary">Liste des Livres</h2>
            {books.length === 0 ? (
                <p className="text-center text-danger">Aucun livre disponible.</p>
            ) : (
                <div className="row">
                    {books.map((book) => (
                        <div key={book.ISBN} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={book.image || mhm}
                                    className="card-img-top book-image"
                                    alt={book.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{book.name}</h5>
                                    <p className="card-text">Auteur : {book.author}</p>
                                    <p className="card-text"><small>ISBN : {book.ISBN}</small></p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/edit/${book.ISBN}`} className="btn btn-warning btn-sm">
                                            Modifier
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(book.ISBN)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <BookSearch />
        </div>
    );
};

export default BookList;