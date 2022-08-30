import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from 'components/App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  checkName = filterName => {
    return this.state.contacts.some(({ name }) => name.toLowerCase() === filterName.toLowerCase());
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  handleAddContact = data => {
    if (this.checkName(data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [
          { id: nanoid(), name: data.name, number: data.number },
          ...prevState.contacts,
        ],
      }));
    }
  };

  handleFilter = text => {
    this.setState({ filter: text });
  };

  getVisiableContacts = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const visiableContact = this.getVisiableContacts();
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />

        <h2>Contacts</h2>

        <Filter
          filterValue={this.state.filter}
          onChange={this.onChangeFilter}
        />
        <ContactList
          contacts={visiableContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
