import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h1>생성하기</h1>
        <form action={"create_process"} onSubmit={function (e) {
          e.preventDefault();
          this.props.onSubmit(
            e.target.subTile.value,
            e.target.subText.value
          )
        }.bind(this)}>
          <p><input type="text" name="subTitle" placeholder="제목을 입력하세요"></input></p>
          <p><textarea name="subText" placeholder="내용을 입력하세요"></textarea></p>
          <p><input type="submit" value="생성하기"></input></p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
