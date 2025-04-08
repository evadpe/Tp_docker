import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://backend:5000";

const EditBook = () => {
    const { isbn } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({ name: "", author: "", ISBN: "" });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`${API_URL}/${isbn}`);
                if (response.ok) {
                    const data = await response.json();
                    setBook(data.data);
                } else {
                    alert("Livre introuvable.");
                    navigate("/");
                }
            } catch (error) {
                console.error("Erreur :", error);
                alert("Erreur lors de la récupération du livre.");
                navigate("/");
            }
        };
        fetchBook();
    }, [isbn, navigate]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/${isbn}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                alert("Livre mis à jour avec succès !");
                navigate("/");
            } else {
                alert("Erreur lors de la mise à jour.");
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de la requête.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary">Modifier le Livre</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <label>Nom :
                    <input type="text" name="name" value={book.name} onChange={handleChange} required className="form-control"/>
                </label>
                <label>Auteur :
                    <input type="text" name="author" value={book.author} onChange={handleChange} required className="form-control"/>
                </label>
                <label>ISBN :
                    <input type="text" name="ISBN" value={book.ISBN} disabled className="form-control"/>
                </label>
                <button type="submit" className="btn btn-success mt-3">Sauvegarder</button>
            </form>
        </div>
    );
};

export default EditBook;