import React from "react";
import axios from "axios";
import loader from "../loading.gif";
import { Link } from "react-router-dom";

export default class BookList extends React.Component {
  state = {
    books: [],
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
    sorter: {
      last: "",
      order: 1,
    },
    wait: false,
  };

  getBooks(filter = null) {
    var wait = true;
    this.setState({ wait });
    var order = 1;
    var url = "http://localhost:5000/api/books";
    if (filter) {
      const sorter = this.state.sorter;
      if (sorter.last === filter) {
        order = sorter.order;
        sorter.order = sorter.order * -1;
      } else {
        sorter.last = filter;
        sorter.order = -1;
      }
      this.setState({ sorter });
      url += "?filter=" + filter + "&order=" + order;
    }
    axios.get(url).then((res) => {
      const books = res.data;
      this.setState({ books });
      wait = false;
      this.setState({ wait });
    });
  }

  componentDidMount() {
    this.getBooks();
  }

  sortData(column) {
    let books = this.state.books;
    books.sort(function (a, b) {
      console.log(a);
      console.log(b);
      console.log(column);
      const valueA = String(a[column]).toUpperCase(); // ignore upper and lowercase
      const valueB = String(b[column]).toUpperCase();
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
    console.log(books);
    this.setState({ books });
  }

  render() {
    return (
      <div className="container">
        {this.state.wait ? (
          <div>
            <img src={loader} alt="loading..." />
          </div>
        ) : (
          <div className="tableContainer">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th onClick={() => this.getBooks("title")}>Title</th>
                  <th onClick={() => this.getBooks("authors")}>Author(s)</th>
                  <th onClick={() => this.getBooks("average_rating")}>
                    Avg. Rating
                  </th>
                  <th onClick={() => this.getBooks("ratings_count")}>
                    No. Ratings
                  </th>
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
                      <Link to={"/books/" + book.bookID}>
                        <button>View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        )}
      </div>
    );
  }
}
