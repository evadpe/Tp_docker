import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_URL = "http://backend:5000";

function DeleteBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const deleteBook = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setLoading(false);
                } else {
                    throw new Error("Erreur lors de la suppression");
                }
            } catch (error) {
                console.error("Erreur :", error);
                alert("Erreur lors de la suppression du livre.");
                navigate("/");
            }
        };

        deleteBook();
    }, [id, navigate]);

    return (
        <div className="text-center mt-5">
            {loading ? (
                <p className="text-warning">Suppression en cours...</p>
            ) : (
                <>
                    <p className="text-success">Livre supprimé avec succès.</p>
                    <Link to="/" className="btn btn-primary">Retour à la liste</Link>
                </>
            )}
        </div>
    );
}

export default DeleteBook;