import React, { Component } from 'react';
import './Products.css';
import Item from './Item';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:5000/products')
      .then(res => {
        return res.json();
      })
      .then(products => {
        this.setState({
          products
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  items() {
    return this.state.products.map((item, i) => {
      return (
        <div className='col-3' key={i}>
          <Item item={item} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>{this.items()}</div>
      </div>
    );
  }
}
