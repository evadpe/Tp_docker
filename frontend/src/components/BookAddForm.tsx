import React, { useState } from "react";
import "../App.css";

function BookAddForm() {
    const API_URL = "http://backend:5000";

    const [formData, setFormData] = useState({
        name: "",
        author: "",
        ISBN: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Livre ajouté avec succès !");
                setFormData({ name: "", author: "", ISBN: "" });
            } else {
                alert("Erreur lors de l'ajout du livre.");
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de la requête.");
        }
    };

    return (
        <div className="form-container">
            <h2 className="text-center text-success">Ajouter un Livre</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <label>Nom du livre :
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control"/>
                </label>
                <label>Nom de l'auteur :
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required className="form-control"/>
                </label>
                <label>ISBN :
                    <input type="text" name="ISBN" value={formData.ISBN} onChange={handleChange} required className="form-control"/>
                </label>
                <input type="submit" value="Ajouter" className="btn btn-success mt-3"/>
            </form>
        </div>
    );
}

export default BookAddForm;