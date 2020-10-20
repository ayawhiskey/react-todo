import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  clearState = () => {
    this.setState({
      label: ''
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.clearState();
  }

  render() {

    const { label } = this.state;

    return (
      <form className="item-add-form d-flex"
        onSubmit={this.onSubmit}>
        <input type="text"
               className="form-control"
               placeholder="what needs to be done"
               onChange={this.onLabelChange}
               value={label}/>
        <button
          className="btn btn-outline-secondary">
          <i className="fa fa-plus"/>
        </button>
      </form>
    )
  }
}
