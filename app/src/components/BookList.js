import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class BookList extends React.Component {
  state = {
    books: [],
    book: {
      bookID: "",
      authors: "",
      average_rating: "",
      ratings_count: "",
      num_pages: "",
      language_code: "",
      isbn: "",
    },
  };

  deleteBook(book) {
    //<button onClick={() => this.deleteBook(book)}>DELETE</button>
    console.log("delete book");

    axios
      .delete("http://localhost:5000/api/books/" + book["bookID"])
      .then((response) => {
        const books = this.state.books.filter(
          (item) => item._id !== book["_id"]
        );
        this.setState({ books });
      });
  }

  getBooks() {
    axios.get("http://localhost:5000/api/books").then((res) => {
      const books = res.data;
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="container">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Avg. Rating</th>
              <th>No. Ratings</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.average_rating}</td>
                <td>{book.ratings_count}</td>
                <td>
                  <Link to={"/books/" + book.bookID}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}
