import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const removeContact = createAction('contacts/removeContact');

export const setFilter = createAction('contacts/setFilter');

const contactReducer = createReducer(
  {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  },
  {
    [addContact]: (state, action) => ({
      ...state,
      items: [action.payload, ...state.items],
    }),
    [removeContact]: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
    [setFilter]: (state, action) => ({ ...state, filter: action.payload }),
  }
);

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
