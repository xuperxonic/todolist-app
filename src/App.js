import React, { Component } from 'react';
import Title from './components/Title';
import List from './components/List';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateComponent';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 2;
    this.state = {
      mode: 'welcome',
      selected_id: 0,
      header: { title: "To DO List", sub: "Writer: xuperxonic" },
      welcome: { subTitle: "제목이 표시됩니다.", subText: "내용이 표시됩니다." },
      contents: [
        { id: 0, subTitle:"1st", subText:"첫번째 항목입니다." },
        { id: 1, subTitle:"2nd", subText:"두번째 항목입니다." },
        { id: 2, subTitle:"3rd", subText:"세번째 항목입니다." }
      ]
    }
  }
  getReadContent() {
    for (let content of this.state.contents) {
      if (content.id === this.state.selected_id) {
        return content;
      }
    }
  }
  printContent() {
    let _subTitle, _subText, _article = null;
    if (this.state.mode === 'welcome') {
      // welcome 일 때 동작 수행하게
      _subTitle = this.state.welcome.subTitle;
      _subText = this.state.welcome.subText;
      _article = <ReadContent subTitle={_subTitle} subText={_subText}></ReadContent>;
    }
    else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _subTitle = _content.subTitle;
      _subText = _content.subText;
      _article = <ReadContent subTitle={_subTitle} subText={_subText}></ReadContent>;
      
    }
    else if (this.state.mode === 'create') {
      // create 동작일 때 최대 id 값을 올려주고 _article은 createContent의 결과여야 
      // 그리고 mode와 content, selected_id를 업그레이드 해줘야
      this.max_content_id++;
      _article = <CreateContent
        onSubmit={function (_subject, _desc) {
          const newContent = this.state.contents.concat({ id: this.max_content_id, subject: _subject, desc: _desc });
          this.setState({
            mode: 'read',
            contents: newContent,
            selected_id: this.max_content_id
          });
        }.bind(this)}
      ></CreateContent>
    }
    else if (this.state.mode === 'update') {
      // update는 좀 복잡해. read 된 것의 내용을 create 양식에 그대로 가져오고
      // 이걸 수정한 다음 submit 하면 setState로 갱신이 되어야 해 
      _article = <UpdateContent 
        onSubmit={function (_id, _subTitle, _subText) {
          const renewContent = Array.from(this.state.contents);
          for (let i = 0; i < renewContent.length; i++) {
            if (_id === renewContent[i].id) { // 해당하는 id값을 찾으면 그 내용을 변경하는거야
              renewContent[i] = { id: _id, subTitle: _subTitle, subText: _subText };
              break;
            }
          }
          this.setState({
            mode: 'read',
            contents: renewContent
          });
        }.bind(this)}
        data={this.getReadContent()}
      ></UpdateContent>
    }
    
    return _article;
  }

  deleteContent() {
    // 해당하는 content를 불러서 pop을 한뒤 max id 바꿔.
    let _contents = Array.from(this.state.contents);
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      for (let i = 0; i < _contents.length; i++) {
        if (_contents[i].id === this.state.selected_id) {
          _contents.splice(i, 1);
          break;
        }
      }
      this.setState({
        mode: 'welcome',
        contents: _contents
      });
      alert("삭제되었습니다.");
    }
  }
  
  render() {
    return (
      <div className="App">
        <Title
          title={this.state.header.title}
          sub={this.state.header.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Title>

        <List
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              selected_id: Number(id),
              mode: 'read'
            });
          }.bind(this)}
        ></List>
        
        <Control onChangeMode={function (_mode) {
            // delete일 때는 바로 실행하게 하자
            if (_mode === 'delete') {
              this.deleteContent();
            }
            else { // delete가 아닌 모든 오퍼레이션들 
              this.setState({
                mode: _mode
              });
            }
          }.bind(this)}></Control>
       
        {this.printContent()}
      </div>
    );
  }
}

export default App;