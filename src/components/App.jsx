import React, { Component } from 'react';
import { Sheet } from './Sheet/Sheet';
import { Contacts } from './Contacts/Contacts';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  renderFilteredData = () => {
    return this.state.contacts.filter(element => {
      return element.name
        .toLowerCase()
        .startsWith(this.state.filter.toLowerCase());
    });
  };

  inputChange = event => {
    this.setState((state, props) => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  };

  deleteItem = event => {
    const data = this.state.contacts.filter(element => {
      return element.name !== event.target.dataset.name;
    });
    this.setState(state => {
      return { contacts: data };
    });
  };

  addContact = event => {
    event.preventDefault();
    const {
      name: { value: text },
      number: { value: num },
    } = event.currentTarget.elements;
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
        contacts: [...this.state.contacts, objectToAdd],
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
