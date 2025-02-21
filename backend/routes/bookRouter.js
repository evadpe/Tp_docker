import express from "express";

import { getAllBooks , addBook , deleteBook , modifyBook, getBook} from "../controllers/bookController.js";

const router = express.Router();


router.get("/api/books", getAllBooks)



router.post("/api/books", addBook)

router.get("/api/books/:isbn", getBook);
router.put("/api/books/:isbn", modifyBook);
router.delete("/api/books/:isbn", deleteBook);


export default router;