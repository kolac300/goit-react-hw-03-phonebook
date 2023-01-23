import { ContactList } from './contacts/ContactList';
import { ContactForm } from './phoneBook/ContactForm';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './filter/Filter';
import { ContactsBook } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

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
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  onHandleCHange = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  addContact = (name, number) => {
    if (name.toLowerCase() in this.isAlredyExistValidation()) {
      toast.error(`${name} is alredy in contacts`);
    } else {
      this.setState(prev => ({
        contacts: [
          ...prev.contacts,
          {
            name: name,
            id: nanoid(),
            number: number,
          },
        ],
      }));
      toast.success('Successfully added!');
    }
  };

  isAlredyExistValidation = () =>
    this.state.contacts.reduce((outputObj, contact) => {
      outputObj[contact.name.toLowerCase()] = contact;
      return outputObj;
    }, {});

  onDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
    toast.success('Successfully deleted!');
  };

  onFilter = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  };

  render() {
    return (
      <>
        <ContactsBook>
          <Toaster position="top-center" reverseOrder={false} />
          <ContactForm onAddContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter
            filter={this.state.filter}
            onHandleCHange={this.onHandleCHange}
          />
          <ContactList
            filtredContacts={this.onFilter()}
            onDeleteContact={this.onDeleteContact}
          />
        </ContactsBook>
      </>
    );
  }
}
