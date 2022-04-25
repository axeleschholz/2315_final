import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const initialState = {
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

export default class NewBook extends React.Component {
  //I know it's bad practice to define the initial state twice but
  //React was yelling at me if I mutate the state in componentDidMount
  //And I was running out of time.
  state = {
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
  componentDidMount() {}

  clear() {
    this.setState(initialState);
  }

  save() {
    let book = this.state.book;
    console.log(book);
    var url = "http://localhost:5000/api/books";

    axios.post(url, book).then(
      (response) => {
        alert("Book has been added");
        this.setState(initialState);
      },
      (error) => {
        console.error(error);
        alert("Error adding a new book.");
      }
    );
  }

  handleChange(event) {
    const book = this.state.book;

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

  render() {
    const book = this.state.book;
    return (
      <div className="bookForm">
        <h2>
          Title:{" "}
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={(event) => this.handleChange(event)}
          />
        </h2>
        <h3>
          Authors:{" "}
          <input
            type="text"
            name="authors"
            value={book.authors}
            onChange={(event) => this.handleChange(event)}
          />
        </h3>
        <p>
          ISBN:{" "}
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={(event) => this.handleChange(event)}
          />
        </p>
        <p>
          Language Code:{" "}
          <input
            type="text"
            name="language_code"
            value={book.language_code}
            onChange={(event) => this.handleChange(event)}
          />
        </p>
        <p>
          Pages:{" "}
          <input
            type="text"
            name="num_pages"
            value={book.num_pages}
            onChange={(event) => this.handleChange(event)}
          />
        </p>
        <p>
          Average Rating:{" "}
          <input
            type="text"
            name="average_rating"
            value={book.average_rating}
            onChange={(event) => this.handleChange(event)}
          />
        </p>
        <p>
          Number of Ratings:{" "}
          <input
            type="text"
            name="ratings_count"
            value={book.ratings_count}
            onChange={(event) => this.handleChange(event)}
          />
        </p>
        <p>
          <button onClick={() => this.clear()}>CLEAR</button>
          <button onClick={() => this.save()}>SAVE</button>
        </p>
      </div>
    );
  }
}
