import React, {PureComponent} from 'react';
import {Alert, Layout, Spin} from 'antd';
import {connect} from 'react-redux';
import noteActions from '../../redux/notes/actions';
import NoteList from './noteList';
import {ColorChoser} from '../../components/';
import Button from '../../components/uielements/button';
import NoteComponentWrapper from './noteComponent.style';
import {Textarea} from '../../components/uielements/input';

const {changeNote, addNote, getNotes, editNote, deleteNote, changeColor} = noteActions;
const {Header, Content} = Layout;

class Notes extends PureComponent {
    constructor(props) {
        super(props);
        this.updateNote = this.updateNote.bind(this);
    }

    componentDidMount() {

        this.props.getNotes();
    }

    updateNote(event) {
        const {editNote, selectedId} = this.props;
        editNote(selectedId, event.target.value);
    }

    render() {
        const {
            notes,
            selectedId,
            changeNote,
            deleteNote,
            addNote,
            loading,
            colors,
            selectedColor,
            changeColor,
        } = this.props;
        if (loading === true) {
            return (<Spin tip="Yükleniyor"/>)
        }
        let selectedNote;
        if (notes !== null && notes.length === 0) {
            selectedNote = {text: '', id: 0}

        } else {
            selectedNote = selectedId !== undefined ? notes.filter(note => note.id === selectedId)[0] : null;
        }
        return (
            <NoteComponentWrapper className="isomorphicNoteComponent">
                <div style={{width: '340px'}} className="isoNoteListSidebar">
                    <NoteList
                        notes={notes}
                        selectedId={selectedId}
                        changeNote={changeNote}
                        deleteNote={deleteNote}
                        colors={colors}
                    />
                </div>
                <Layout className="isoNotepadWrapper">
                    <Header className="isoHeader">
                        {selectedId !== undefined ? (
                            <div className="isoColorChooseWrapper">
                                <ColorChoser
                                    colors={colors}
                                    changeColor={changeColor}
                                    seectedColor={selectedColor}
                                />{' '}
                                <span>
                  Renk Seçin
                </span>
                            </div>
                        ) : (
                            ''
                        )}
                        <Button type="primary" className="isoAddNoteBtn" onClick={addNote}>
                            Yeni Not
                        </Button>
                    </Header>
                    <Content className="isoNoteEditingArea">
                        {selectedId !== undefined ? (
                            <Textarea
                                className="isoNoteTextbox"
                                value={selectedNote.text}
                                onChange={this.updateNote}
                                autoFocus
                            />
                        ) : (
                            ''
                        )}
                    </Content>
                </Layout>
            </NoteComponentWrapper>
        )

    }
}

function mapStateToProps(state) {
    const {notes, selectedId, colors, selectedColor, loading} = state.Notes;
    return {
        notes,
        selectedId,
        colors,
        loading,
        selectedColor,
    };
}

export default connect(
    mapStateToProps,
    {
        addNote,
        editNote,
        deleteNote,
        getNotes,
        changeNote,
        changeColor,
    }
)(Notes);
