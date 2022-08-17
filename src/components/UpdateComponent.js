import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      subTitle: this.props.data.subTitle,
      subText: this.props.data.subText
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    
    return (
      <article>
        <h1>수정하기</h1>
        <form action={"update_process"} method={'post'}
          onSubmit={function (e) {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.subTitle,
              this.state.subText
            )
        }.bind(this)}>
          <p><input type="text" name="subTitle" placeholder="과목을 입력하세요"
            value={this.state.subTitle} onChange={this.inputFormHandler}
          ></input></p>
          <p><textarea name="subText" placeholder="내용을 입력하세요"
            value={this.state.subText} onChange={this.inputFormHandler}
          ></textarea></p>
          <p><input type="submit" value="생성"></input></p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
