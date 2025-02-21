import Book from "../models/Book.js"
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (books.length === 0) {
            return res.status(404).json({
                status: "error",
                error: "Pas de livres dans la bdd",
            });
        }

        return res.status(200).json({
            status: "success",
            books: books,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "An error occurred while fetching books",
        });
    }
}

export const addBook = async (req, res) => {
    const { name, author, ISBN } = req.body;

    if (!name || !author || !ISBN) {
        return res.status(400).json({
            status: "error",
            error: "Missing required book fields: name, author, ISBN",
        });
    }

    try {
        const existingBook = await Book.findOne({ ISBN });

        if (existingBook) {
            return res.status(409).json({
                status: "error",
                error: "A book with this ISBN already exists",
            });
        }

        const newBook = new Book({ name, author, ISBN });
        await newBook.save();

        return res.status(201).json({
            status: "success",
            message: "Book created successfully",
            book: newBook,
        });
    } catch (error) {
        console.error("Error while creating book:", error);
        return res.status(500).json({
            status: "error",
            error: "An error occurred while creating the book",
        });
    }

};


export const getBook = async (req, res) => {
    const { isbn } = req.params;
    if (!isbn) {
        return res.status(400).json({
            status: "error",
            error: "ISBN manquant dans la requête",
        });
    }
    try {
        const book = await Book.findOne({ ISBN: isbn });
        if (!book) {
            return res.status(404).json({
                status: "error",
                error: "Livre non trouvé",
            });
        }
        return res.status(200).json({
            status: "success",
            data: book,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Une erreur est survenue lors de la récupération du livre",
        });
    }
};

export const modifyBook = async (req, res) => {
    const { isbn } = req.params;
    const updatedData = req.body;

    if (!isbn) {
        return res.status(400).json({
            status: "error",
            error: "ISBN manquant dans la requête",
        });
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({
            status: "error",
            error: "Les données de modification sont manquantes",
        });
    }
    try {
        const book = await Book.findOneAndUpdate({ ISBN: isbn }, updatedData, { new: true });
        if (!book) {
            return res.status(404).json({
                status: "error",
                error: "Livre non trouvé",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Livre mis à jour avec succès",
            book,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Une erreur s'est produite lors de la mise à jour du livre",
        });
    }
};

export const deleteBook = async (req, res) => {
    const { isbn } = req.params;
    if (!isbn) {
        return res.status(400).json({
            status: "error",
            error: "ISBN manquant dans la requête",
        });
    }
    try {
        const book = await Book.findOneAndDelete({ ISBN: isbn });
        if (!book) {
            return res.status(404).json({
                status: "error",
                error: "Livre non trouvé",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Livre supprimé avec succès",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Une erreur s'est produite lors de la suppression du livre",
        });
    }
};
