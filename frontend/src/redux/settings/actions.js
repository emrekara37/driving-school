import {getCourseId} from "../../helpers/utility";

const actions = {
    GET_SETTINGS_REQ: "GET_SETTINGS_REQ",
    GET_SETTINGS_DONE: "GET_SETTINGS_DONE",
    GET_SETTINGS_ERR: "GET_SETTINGS_ERR",
    SET_SETTINGS_REQ: "SET_SETTINGS_REQ",
    SET_SETTINGS_DONE: "SET_SETTINGS_DONE",
    SET_SETTINGS_ERR: "SET_SETTINGS_ERR",
    getSettings: () => {
        return (dispatch) => {
            dispatch({
                type: actions.GET_SETTINGS_REQ,
                payload: {id: getCourseId()}
            })
        }
    },
    setSettings: (data) => {
        console.log(data.personelPhoneNumber);
        const form = new FormData();
        form.append("PhoneNumber", data.phoneNumber);
        form.append("FaxNumber", data.faxNumber);
        form.append("PersonelPhoneNumber", data.personelPhoneNumber);
        form.append("Address", data.address);
        form.append("CourseName", data.courseName);
        if(data.file){
            form.append("Image", data.file);
        }
        form.append("Id",getCourseId());
        return (dispatch) => {
            dispatch({
                type: actions.SET_SETTINGS_REQ,
                payload: {data:form}
            })
        }
    }

};
export default actions;
