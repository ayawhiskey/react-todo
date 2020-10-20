import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component {

  state = {
    todos: [
      this.createTodoItem('Drink Coffee', true),
      this.createTodoItem('Make Awesome App', true),
      this.createTodoItem('Have a Lunch'),
      this.createTodoItem('Make a Dinner'),
      this.createTodoItem('Read Medium', true),
      this.createTodoItem('Design a little')
    ],
    term: '',
    filter: 'all' // active, all, done
  }

  createTodoItem(label, done = false) {
    return {
      label,
      important: false,
      done,
      id: uuidv4()
    }
  }

  deleteItem = (id) => {

    this.setState(({todos}) => {
      const idx = todos.findIndex((el) => el.id === id);

      const newArray = [
        ...todos.slice(0, idx),
        ...todos.slice(idx + 1)
      ]

      return {
        todos: newArray
      }
    })

  }

  addItem = (text = 'New Added Todo Default Label') => {

    this.setState(({ todos }) => {
      return {
        todos: [...todos, this.createTodoItem(text)]
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName] }

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];

  }

  toggleFilter = (filter) => {
    this.setState({
      filter
    })
  }

  onToggleDone = (id) => {
    this.setState(({todos}) => {
      return {
        todos: this.toggleProperty(todos, id, 'done')
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({todos}) => {
      return {
        todos: this.toggleProperty(todos, id, 'important')
      }
    })
  }

  search = (items, term) => {

    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  filter = (items, filter) => {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onSearchChange = (term) => {
    this.setState({
      term
    })
  }

  render() {

    const { todos, term, filter } = this.state;
    const visibleItems = this.search(todos, term);
    const filteredItems = this.filter(visibleItems, filter);

    const doneCount = this.state.todos.filter((el) => el.done).length;
    const todoCount = this.state.todos.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel searchInputChange={ this.onSearchChange }/>
          <ItemStatusFilter
            filter={filter}
            toggleFilter={this.toggleFilter}/>
        </div>

        <TodoList
          todos={filteredItems}
          onDeleted={ this.deleteItem }
          onToggleImportant = { this.onToggleImportant }
          onToggleDone = { this.onToggleDone }/>

        <ItemAddForm onAdded={ this.addItem }/>
      </div>
    );
  }
}
