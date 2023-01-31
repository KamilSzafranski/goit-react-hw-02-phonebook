import React, { Component } from 'react';
import css from './Sheet.module.css';
import PropTypes from 'prop-types';

export class Sheet extends Component {
  render() {
    const { add } = this.props;
    return (
      <div className={css.Box}>
        <form onSubmit={add}>
          <div aria-labelledby="phonebook" className={css.phonebook}>
            <p id="phonebook" className={css.title}>
              Phonebooks
            </p>
            <label className={css.name} htmlFor="Name">
              Name
            </label>
            <input
              className={css.inputName}
              id="Name"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <label className={css.name} htmlFor="number">
              Phone
            </label>
            <input
              className={css.inputName}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button type="submit" className={css.btn}>
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

Sheet.propTypes = {
  add: PropTypes.func.isRequired,
};
