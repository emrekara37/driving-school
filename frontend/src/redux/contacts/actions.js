import axios from 'axios';
import {API_URL} from "../../settings";

const contactActions = {
    ADD_CONTACT_REQ: "ADD_CONTACT_REQ",
    ADD_CONTACT_ERR: "ADD_CONTACT_ERR",
    ADD_CONTACT_DONE: "ADD_CONTACT_DONE",
    EDIT_CONTACT: "EDIT_CONTACT",
    DELETE__CONTACT: "DELETE__CONTACT",
    GET_USERS_REQUEST: "GET_USERS_REQUEST",
    GET_USERS_ERROR: "GET_USERS_ERROR",
    GET_USERS_DONE: "GET_USERS_DONE",
    CHANGE_CONTACT: "CHANGE_CONTACT",
    EDIT_VIEW: "EDIT_VIEW",

    getUsers: (data) => {
        return (dispatch) => {
            dispatch({
                type: contactActions.GET_USERS_REQUEST,
                payload: {data}
            })
        }
    },
    changeContact: id => ({
        type: contactActions.CHANGE_CONTACT,
        id
    }),
    addContact: (data) => {

        return (dispatch) => {
            dispatch({
                type: contactActions.ADD_CONTACT_REQ,
                payload: {data}
            })
        }
    },
    getDocuments: async (id) => {
        const response = await axios.get(`${API_URL}api/app/courseDocument/userDocuments/${id}`);
        return response.data;
    },
    getProducts: async () => {
        const call = await axios.get(`${API_URL}api/app/product`);
        return call.data;
    },
    getPeriots: async () => {
        const response = await axios.get(`${API_URL}api/app/product/periots`);
        return response.data;
    },
    editContact: newContact => {

    },
    sendDocReq: async (data) => {
        const response = await axios.post(`${API_URL}api/app/courseDocument`, data);
        return response.data;
    },
    deleteContact: (id) => {
        return (dispatch, getState) => {
            const {users} = getState().Contacts;
            let filteredUsers = users.filter(item => {
                return item.id !== id
            });
            dispatch({
                type: contactActions.DELETE__CONTACT,
                payload: {id},
                users: filteredUsers
            })
        }
    }
};
export default contactActions;
