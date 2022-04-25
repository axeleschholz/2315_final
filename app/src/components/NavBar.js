import React from "react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <ul>
          <li className="mainLogo">
            <Link to="/">Booker</Link>
          </li>
          <li className="right">
            <Link to="/books">All Books</Link>
          </li>
          <li className="right">
            <Link to="/books/new">New Book</Link>
          </li>
        </ul>
      </div>
    );
  }
}
