import React, {PureComponent } from 'react';
import { InputSearch } from '../uielements/input';
import DeleteButton from './deleteButton';
import { ContactListWrapper } from './contactList.style';
import Scrollbar from '../utility/customScrollBar';

function filterContacts(contacts, search) {
  search = search.toUpperCase();
  return search
    ? contacts.filter(contact => contact.name.toUpperCase().includes(search))
    : contacts;
}

export default class ContactList extends PureComponent {
  constructor(props) {
    super(props);
    this.singleContact = this.singleContact.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleContact(contact) {
    const { seectedId, deleteContact, changeContact } = this.props;
    const activeClass = seectedId === contact.id ? 'active' : '';
    const onChange = () => changeContact(contact.id);
    return (
      <div
        key={contact.id}
        className={`${activeClass} isoSingleContact`}
        onClick={onChange}
      >
        <div className="isoAvatar">
           <img alt="#" src={contact.photo} />
        </div>
        <div className="isoContactName">
          <h3>{contact.name ? contact.name : 'No Name'}</h3>
        </div>
        <DeleteButton deleteContact={deleteContact} contact={contact} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const contacts = filterContacts(this.props.contacts, search);
    return (
      <ContactListWrapper className="isoContactListWrapper">
        <InputSearch
          placeholder="Öğrenci Ara"
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {contacts && contacts.length > 0 ? (
          <div className="isoContactList">
            <Scrollbar className="contactListScrollbar">
              {contacts.map(contact => this.singleContact(contact))}
            </Scrollbar>
          </div>
        ) : (
          <span className="isoNoResultMsg">
            Öğrenci Bulunamadı
          </span>
        )}
      </ContactListWrapper>
    );
  }
}
