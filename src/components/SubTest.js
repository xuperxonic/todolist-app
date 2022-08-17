import React, { component } from 'react';

class SubTest extends Component {
  render(){
    return (
      <button onClick={function(e){
          e.preventDefault();
          console.log('clicked');
        }.bind(this)}
        >{this.props.title}</button>
    )
  }
}
export default SubTest;
  