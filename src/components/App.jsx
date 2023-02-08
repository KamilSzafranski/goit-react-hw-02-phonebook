import React, { Component } from 'react';
import { Sheet } from './Sheet/Sheet';
import { Contacts } from './Contacts/Contacts';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { getStorage, saveStorage } from './Storage/Local';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState((state, pros) => {
      return { contacts: getStorage('contacts') };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.contacts.length !== this.state.contacts.length ||
      prevState.filter.length !== this.state.filter.length
    )
      saveStorage('contacts', this.state.contacts);
  }

  renderFilteredData = () =>
    this.state.contacts.filter(element =>
      element.name.toLowerCase().startsWith(this.state.filter.toLowerCase())
    );

  inputChange = event => {
    this.setState((state, props) => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  };

  deleteItem = event => {
    event.preventDefault();
    const data = this.state.contacts.filter(element => {
      return element.name !== event.target.dataset.name;
    });
    this.setState(state => {
      return { contacts: data };
    });
  };

  addContact = event => {
    const {
      name: { value: text },
      number: { value: num },
    } = event.currentTarget.elements;
    event.preventDefault();
    const nameTaken = this.state.contacts.some(
      elements => elements.name === text
    );
    const numberTaken = this.state.contacts.some(
      elements => elements.number === num
    );
    if (nameTaken && numberTaken) {
      return alert(`${text} is alredy in Phonebook`);
    }
    const objectToAdd = {
      id: nanoid(),
      name: text,
      number: num,
    };
    this.setState((state, props) => {
      return {
        contacts: [...state.contacts, objectToAdd],
      };
    });
  };
  render() {
    return (
      <div className={css.container}>
        <Sheet add={this.addContact} />
        <Contacts
          data={this.renderFilteredData()}
          filter={this.state.filter}
          handler={this.inputChange}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
