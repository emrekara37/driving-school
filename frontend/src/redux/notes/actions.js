import {getCourseId} from "../../helpers/utility";

const notesAction = {
    CHANGE_NOTE: 'CHANGE_NOTE',
    ADD_NOTE: 'ADD_NOTE',
    ADD_NOTE_DONE: 'ADD_NOTE_DONE',
    EDIT_NOTE: 'EDIT_NOTE',
    DELETE_NOTE: 'DELETE_NOTE',
    CHANGE_COLOR: 'CHANGE_COLOR',
    GET_NOTES_REQ: "GET_NOTES_REQ",
    GET_NOTES_DONE: "GET_NOTES_DONE",
    GET_NOTES_ERR: "GET_NOTES_ERR",
    getNotes: () => {
        return (dispatch) => {
            dispatch({
                type: notesAction.GET_NOTES_REQ,
                payload: {id: getCourseId()}
            })
        }
    },
    changeNote: id => {
        return (dispatch, getState) => {
            const notes = getState().Notes.notes;
            const selectedColor = notes[notes.findIndex(note => note.id === id)].color;
            dispatch({
                type: notesAction.CHANGE_NOTE,
                selectedId: id,
                selectedColor
            });
        };
    },
    addNote: () => {
        return (dispatch, getState) => {

            const newNote = {
                id: new Date(),
                text: 'Yeni Not',
                createTime: new Date(),
                color: getState().Notes.selectedColor,
                courseId: getCourseId()
            };
            const notes = [newNote, ...getState().Notes.notes];
            dispatch({
                type: notesAction.ADD_NOTE,
                payload: newNote,
                notes
            });
        };
    },
    editNote: (id, newNote) => {
        return (dispatch, getState) => {
            const oldNotes = getState().Notes.notes;
            const notes = [];

            let editedNote = {};
            oldNotes.forEach(note => {
                if (note.id !== id) {
                    notes.push(note);
                } else {
                    editedNote = note;
                    note.text = newNote;
                    notes.push(note);
                }
            });
            dispatch({
                type: notesAction.EDIT_NOTE,
                notes,
                payload:editedNote
            });
        };
    },
    deleteNote: id => {
        return (dispatch, getState) => {
            const oldNotes = getState().Notes.notes;
            const notes = [];
            oldNotes.forEach(note => {
                if (note.id !== id) {
                    notes.push(note);
                }
            });
            let selectedId = getState().Notes.selectedId;
            if (selectedId === id) {
                if (notes.length === 0) {
                    selectedId = undefined;
                } else {
                    selectedId = notes[0].id;
                }
            }
            dispatch({
                type: notesAction.DELETE_NOTE,
                notes,
                selectedId,
                payload:id
            });
        };
    },
    changeColor: seectedColor => {
        return (dispatch, getState) => {
            const oldNotes = getState().Notes.notes;
            const selectedId = getState().Notes.selectedId;
            const notes = [];
            oldNotes.forEach(note => {
                if (note.id !== selectedId) {
                    notes.push(note);
                } else {
                    note.color = seectedColor;
                    notes.push(note);
                }
            });
            dispatch({
                type: notesAction.CHANGE_COLOR,
                notes,
                seectedColor
            });
        };
    }
};
export default notesAction;
