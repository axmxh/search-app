import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './components/Products';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterd: []
    };
    this.changeState = React.createRef();
    this.handleChang = this.handleChang.bind(this);
  }

  handleChang(e) {
    let query = e.target.value;
    fetch(`http://localhost:5000/?q=${query}`, {
      method: 'post',
      body: JSON.stringify({
        query
      })
    })
      .then(res => {
        return res.json();
      })
      .then(products => {
        if (query !== '') {
          this.setState({
            filterd: products
          });
          this.changeState.current.setState({
            products
          });
        } else {
          this.changeState.current.componentDidMount();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='App'>
        <input
          className='search-input'
          onChange={this.handleChang}
          type='text'
          placeholder='Search for Prouduct ..'
        ></input>
        <Products ref={this.changeState} />
      </div>
    );
  }
}

export default App;
