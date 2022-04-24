import React from "react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <ul>
          <li class="mainLogo">
            <Link to="/about">Booker</Link>
          </li>
          <li class="right">
            <Link to="/books">All Books</Link>
          </li>
          <li class="right">
            <Link to="/books/new">New Book</Link>
          </li>
        </ul>
      </div>
    );
  }
}
