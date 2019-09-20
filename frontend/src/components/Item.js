import React, { Component } from 'react';
//import './Item.css';

export default class Item extends Component {
  render() {
    return (
      <>
        <div className='item'>
          <div className='item-img'>
            <img src={this.props.item.image} alt='' />
          </div>
          <div className='item-detalis'>
            <p className='item-details__desc'>{this.props.item.name}</p>
            <span className='item-details__price'>
              {this.props.item.price} $
            </span>
            <span className='item-details__brand'>{this.props.item.brand}</span>
          </div>
        </div>
      </>
    );
  }
}
