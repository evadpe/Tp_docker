import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/BookList.tsx";
import BookAddForm from "./components/BookAddForm.tsx";
import EditBook from "./components/EditBook.tsx";
import Header from "./components/Header.tsx";
import BookSearch from "./components/BookSearch.tsx";

function App() {
    return (
        <Router>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add-book" element={<BookAddForm />} />
                    <Route path="/edit/:isbn" element={<EditBook />} />
                    <Route path="/search" element={<BookSearch />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;