import React from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ViewBook extends React.Component {
  state = {
    editing: false,
    deleted: false,
    book: {
      bookID: "",
      title: "",
      authors: "",
      average_rating: "",
      ratings_count: "",
      num_pages: "",
      language_code: "",
      isbn: "",
    },
  };

  deleteBook() {
    const book = this.state.book;

    axios.delete("http://localhost:5000/api/books/" + book["bookID"]).then(
      (response) => {
        var deleted = true;
        alert("Book deleted.");
        this.setState({ deleted });
      },
      (error) => {
        console.error(error);
        alert("Error deleting book.");
      }
    );
  }

  getBook(book_id) {
    axios.get("http://localhost:5000/api/books/" + book_id).then((res) => {
      const book = res.data;
      this.setState({ book });
    });
  }

  edit() {
    const editing = true;
    this.setState({ editing });
  }

  cancelEdit() {
    const editing = false;
    this.setState({ editing });
    //reload page
  }

  saveEdit() {
    let book = this.state.book;
    console.log(book);
    var url = "http://localhost:5000/api/books/" + book["bookID"];

    axios.put(url, book).then(
      (response) => {
        const editing = false;
        this.setState({ editing });
      },
      (error) => {
        console.log(error);
        alert("Error updating book information.");
      }
    );
  }

  handleEditChange(event) {
    const book = this.state.book;
    console.log(book);
    if (event.target.name === "title") {
      book.title = event.target.value;
    } else if (event.target.name === "authors") {
      book.authors = event.target.value;
    } else if (event.target.name === "isbn") {
      book.isbn = event.target.value;
    } else if (event.target.name === "language_code") {
      book.language_code = event.target.value;
    } else if (event.target.name === "num_pages") {
      book.num_pages = event.target.value;
    } else if (event.target.name === "average_rating") {
      book.average_rating = event.target.value;
    } else if (event.target.name === "ratings_count") {
      book.ratings_count = event.target.value;
    }

    this.setState({ book });
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.getBook(id);
  }

  //style this page a little more
  render() {
    console.log(this.state);
    const book = this.state.book;
    return (
      <div className="container">
        {this.state.editing ? (
          <div className="bookForm">
            <h2>
              Title:{" "}
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={(event) => this.handleEditChange(event)}
              />
            </h2>
            <h3>
              Authors:{" "}
              <input
                type="text"
                name="authors"
                value={book.authors}
                onChange={(event) => this.handleEditChange(event)}
              />
            </h3>
            <p>
              ISBN:{" "}
              <input
                type="text"
                name="isbn"
                value={book.isbn}
                onChange={(event) => this.handleEditChange(event)}
              />
            </p>
            <p>
              Language Code:{" "}
              <input
                type="text"
                name="language_code"
                value={book.language_code}
                onChange={(event) => this.handleEditChange(event)}
              />
            </p>
            <p>
              Pages:{" "}
              <input
                type="number"
                name="num_pages"
                value={book.num_pages}
                onChange={(event) => this.handleEditChange(event)}
              />
            </p>
            <p>
              Average Rating:{" "}
              <input
                type="number"
                name="average_rating"
                value={book.average_rating}
                onChange={(event) => this.handleEditChange(event)}
              />
            </p>
            <p>
              Number of Ratings:{" "}
              <input
                type="number"
                name="ratings_count"
                value={book.ratings_count}
                onChange={(event) => this.handleEditChange(event)}
              />
            </p>
            <p>
              <button onClick={() => this.cancelEdit()}>CANCEL</button>
              <button onClick={() => this.saveEdit()}>SAVE</button>
            </p>
          </div>
        ) : (
          <div>
            <h2>{this.state.book.title}</h2>
            <h3>By: {this.state.book.authors}</h3>
            <p>ISBN: {this.state.book.isbn}</p>
            <p>Language: {this.state.book.language_code}</p>
            <p>Pages: {this.state.book.num_pages}</p>
            <p>Average Rating: {this.state.book.average_rating}</p>
            <p>Number of Ratings: {this.state.book.ratings_count}</p>
            <button onClick={() => this.deleteBook()}>DELETE</button>
            <button onClick={() => this.edit()}>EDIT</button>
          </div>
        )}
        {this.state.deleted && <Navigate to="/books" replace={true} />}
      </div>
    );
  }
}

export default withParams(ViewBook);
