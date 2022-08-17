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
      _article = <UpdateContent 
        onSubmit={function (_id, _subTitle, _subText) {
          const renewContent = Array.from(this.state.contents);
          for (let i = 0; i < renewContent.length; i++) {
            if (_id === renewContent[i].id) {
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
            if (_mode === 'delete') {
              this.deleteContent();
            }
            else {
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
