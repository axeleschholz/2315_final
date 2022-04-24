import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ViewBook extends React.Component {
  state = {
    bookID: "",
    authors: "",
    average_rating: "",
    ratings_count: "",
    num_pages: "",
    language_code: "",
    isbn: "",
  };

  getBook(book_id) {
    axios.get("http://localhost:5000/api/books/" + book_id).then((res) => {
      const books = res.data;
      this.setState(books);
    });
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.getBook(id);
  }

  render() {
    return (
      <div>
        <h3>Title: {this.state.title}</h3>
        <h3>Title: {this.state.title}</h3>
      </div>
    );
  }
}

export default withParams(ViewBook);
