import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      subTitle: this.props.data.subTitle,
      subText: this.props.data.subText
    }
    // 여기가 추가되었다. 정의한 함수를 state에도 바인딩을 시켜주는 것이 필요하다 
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
	
  // key 값에 [] 괄호를 씌우면 해당하는 key들 모두에 대응한다는 뜻으로, 특정 key를 따로 지정하지 않아도 된다. 
  // 이렇게 변화된 값을 setState() 메서드로 상태값을 변경해주면 된다.
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
               // onChange에 다음 handler들을 추가해준다. 
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