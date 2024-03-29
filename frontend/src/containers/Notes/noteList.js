import React, { Component } from 'react';
import Button from '../../components/uielements/button';
import { InputSearch } from '../../components/uielements/input';
import { NoteListWrapper } from './noteComponent.style';
import Scrollbars from '../../components/utility/customScrollBar.js';

function filterNotes(notes, search) {
  search = search.toUpperCase();
  if (search) {
    return notes.filter(note => note.text.toUpperCase().includes(search));
  }
  return notes;
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.singleNote = this.singleNote.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleNote(note) {
    const { selectedId, deleteNote, changeNote, colors } = this.props;
    const activeClass = selectedId === note.id ? 'active' : '';
    const onChange = () => changeNote(note.id);
    const onDelete = () => deleteNote(note.id);
    return (
      <div className={`isoList ${activeClass}`} key={note.id}>
        <div
          className="isoNoteBGColor"
          style={{ width: '5px', background: colors[note.color] }}
        />
        <div className="isoNoteText" onClick={onChange}>
          <h3>{note.text}</h3>
        </div>
        <Button
          className="isoDeleteBtn"
          icon="close"
          type="default"
          onClick={onDelete}
        />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const notes = filterNotes(this.props.notes, search);
    return (
      <NoteListWrapper className="isoNoteListWrapper">
        <InputSearch
          placeholder="Notlarda Ara"
          className="isoSearchNotes"
          value={search}
          onChange={this.onChange}
        />
        <div className="isoNoteList">
          {
              notes && notes.length > 0 ? (
            <Scrollbars>{notes.map(note => this.singleNote(note))}</Scrollbars>
          ) : (
            <span className="isoNoResultMsg">Not bulunamadı</span>
          )}
        </div>
      </NoteListWrapper>
    );
  }
}
