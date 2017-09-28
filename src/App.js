import React, { Component } from 'react';
import router from './router'

class App extends Component {
  render() {
    return (
      <div className="App">
        {router}
        {/* {this.props.index ? 
        <Restuarant id={this.props.bus[this.state.index].id} /> : null} 
        add redux stuffs if i want to do this method */}

      </div>
    );
  }
}

export default App;
