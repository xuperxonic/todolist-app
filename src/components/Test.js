import React, { component } from 'react';

class Test extends Component {
  constructor(props){
  	// state 값 초기화를 원한다면
    super(props);
    this.state = {
      title: 'subtest'
    }
  }
  render(){
    return (
      <div className="Test">
        <SubTest title={this.state.title}
          onClick={function(){
          	this.setState({
              title: "Clicked"
            });
          }.bind(this)}/>
      </div>
    )
  }
}
export default Test;