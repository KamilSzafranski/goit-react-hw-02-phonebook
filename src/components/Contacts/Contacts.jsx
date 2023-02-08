import React, { Component } from 'react';
import css from './Contacts.module.css';
import PropTypes from 'prop-types';
import { ContactsItem } from 'components/ContactsItem/ContacsItem';

export class Contacts extends Component {
  render() {
    const { data, handler, deleteItem } = this.props;
    return (
      <div className={css.box}>
        <h2 className={css.title}>Contacts</h2>
        <p className={css.description}>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          onChange={handler}
          className={css.input}
        />
        <ul>
          {data.map(element => {
            return (
              <ContactsItem
                key={element.id}
                name={element.name}
                number={element.number}
                handleDelete={deleteItem}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  handler: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
