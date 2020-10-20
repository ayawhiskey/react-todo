import React, { Component } from 'react';

import './item-status-filter.css';

export default class  ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ]

  render() {

    const { toggleFilter, filter } = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      return (
        <button type="button"
                key={name}
                className={"btn " + ( name === filter ? 'btn-info' : 'btn-outline-secondary' )}
                onClick={() => toggleFilter(name)}>
          {label}
        </button>
      )
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
