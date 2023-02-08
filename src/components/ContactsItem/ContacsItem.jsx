import React, { Component } from 'react';
import css from './ContactsItem.module.css';

export class ContactsItem extends Component {
  componentWillUnmount() {
    alert(`Contacts: ${this.props.name} was remove`);
  }
  render() {
    const { name, number, handleDelete } = this.props;
    return (
      <li className={css.item}>
        <span>{name}:</span>
        <span> {number}</span>
        <button
          data-name={name}
          className={css.deleteBtn}
          onClick={handleDelete}
        >
          Delete
        </button>
      </li>
    );
  }
}
