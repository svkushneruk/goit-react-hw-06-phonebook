import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';

export const increment = createAction('myValue/increment');
export const decrement = createAction('myValue/decrement');

export const addContact = createAction('contacts/addContact');
export const removeContact = createAction('contacts/removeContact');

const contactsReducer = createReducer(
  [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  {
    [addContact]: (state, action) => {
      state.push(action.payload);
    },
    [removeContact]: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  }
);

export const setFilter = createAction('filter/setFilter');

const filterReducer = createReducer('', {
  [setFilter]: (state, action) => (state = action.payload),
});

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
