import React, { Component } from 'react';
import '../css/List.css'

class List extends Component{
  render() {
    return (
      <nav>
        <ul>
          <li><a href="1.html">1st</a></li>
          <li><a href="2.html">2nd</a></li>
          <li><a href="3.html">3rd</a></li>
        </ul>
      </nav>
    );
  }
}
export default List;