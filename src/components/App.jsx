import React from 'react';
import { nanoid } from 'nanoid';
import { addContact, removeContact, setFilter } from 'Redux/contactsSlice';
import ContactForm from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from 'components/App.module.css';

import { useSelector, useDispatch } from 'react-redux/es/exports';

const App = () => {
  // const [contacts, setContacts] = useState(() => {
  //   const localStorageTarget = JSON.parse(
  //     window.localStorage.getItem('contacts')
  //   );
  //   return localStorageTarget && localStorageTarget.length > 0
  //     ? localStorageTarget
  //     : defaultContacts;
  // });
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const handleAddContact = data => {
    if (checkName(data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    } else {
      dispatch(
        addContact({ id: nanoid(), name: data.name, number: data.number })
      );
    }
  };

  const getVisiableContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    return dispatch(removeContact(contactId));
  };

  const checkName = filterName => {
    const arr = contacts.filter(({ name }) => name === filterName);
    if (arr.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2>Contacts</h2>

      <Filter
        filterValue={filter}
        onChange={e => dispatch(setFilter(e.currentTarget.value))}
      />

      <ContactList
        contacts={getVisiableContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
