import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BookList from "./components/BookList.js";
import NavBar from "./components/NavBar.js";
import NewBook from "./components/NewBook.js";
import ViewBook from "./components/ViewBook.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<ViewBook />} />
          <Route path="/books/new" element={<NewBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
