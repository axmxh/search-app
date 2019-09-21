import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './components/Products';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterd: [],
      selected: ''
    };
    this.changeState = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e) {
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

  handleSelect(e) {
    this.setState({ selected: e.target.value });
    let selected = e.target.value;
    fetch(`http://localhost:5000/?s=${selected}`, {
      method: 'post',
      body: JSON.stringify({
        selected
      }),
      url: selected
    })
      .then(res => {
        return res.json();
      })
      .then(products => {
        if (selected !== '') {
          this.setState({
            selected: products
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
        <div className='filter'>
          <input
            className='search-input'
            onChange={this.handleChange}
            type='text'
            placeholder='Search for Prouduct ..'
          ></input>
          <div className='filter-faced'>
            Category
            <select onChange={this.handleSelect} value={this.state.selected}>
              <option defaultValue>Select category</option>
              <option value='1'>Phone Accessories</option>
              <option value='2'>Mobile Phones</option>
              <option value='3'>Laptops</option>
            </select>
          </div>
        </div>

        <Products ref={this.changeState} />
      </div>
    );
  }
}

export default App;
