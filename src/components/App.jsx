import React, { Component } from 'react';
import { Sheet } from './Sheet/Sheet';
import { Contacts } from './Contacts/Contacts';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { getStorage, saveStorage, removeItemStorage } from './Storage/Local';

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

  componentDidMount() {
    this.setState((state, pros) => {
      return { contacts: getStorage('contacts') };
    });
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
    const deleteData = removeItemStorage('contacts', event.target.dataset.name);
    console.log(deleteData);
    this.setState(state => {
      return { contacts: [...deleteData] };
    });
  };

  addContact = event => {
    const {
      name: { value: text },
      number: { value: num },
    } = event.currentTarget.elements;
    const contactsData = getStorage('contacts');
    event.preventDefault();
    const nameTaken = contactsData.some(elements => elements.name === text);
    const numberTaken = contactsData.some(elements => elements.number === num);
    if (nameTaken && numberTaken) {
      return alert(`${text} is alredy in Phonebook`);
    }
    const objectToAdd = {
      id: nanoid(),
      name: text,
      number: num,
    };

    saveStorage('contacts', objectToAdd);

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
