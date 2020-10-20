import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  onChangeHandler = async (e) => {
    const term = e.target.value;
    await this.setState({ term })
    this.props.searchInputChange(this.state.term);
  }

  render() {

    return (
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             value={this.state.term}
             onChange={this.onChangeHandler}/>
   );
  }
}