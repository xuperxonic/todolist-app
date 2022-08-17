import React, { Component } from 'react';

class ReadContent extends Component {
  render() {
    return (
      <article>
        <h1>{this.props.subTitle}</h1>
        <p>{this.props.subText}</p>
      </article>
    );
  }
}

export default ReadContent;