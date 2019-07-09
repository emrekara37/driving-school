import {getCourseId} from "../../helpers/utility";
import axios from "axios";
import {API_URL} from "../../settings";

const preRegActions = {
    GET_PREREG_REQ: "GET_PREREG_REQ",
    GET_PREREG_DONE: "GET_PREREG_DONE",
    GET_PREREG_ERR: "GET_PREREG_ERR",
    CHANGE_PREREG_REQ: "CHANGE_PREREG_REQ",
    CHANGE_PREREG_ERR: "CHANGE_PREREG_ERR",
    CHANGE_PREREG_DONE: "CHANGE_PREREG_DONE",
    getPreRegs: () => {
        return (dispatch) => {
            dispatch({
                type: preRegActions.GET_PREREG_REQ,
                payload: {id: getCourseId()}
            })
        }
    },
    getProducts: async () => {
        const call = await axios.get(`${API_URL}api/app/product`);
        return call.data;
    },
    changePreRegStatus: (data) => {

        return (dispatch) => {
            dispatch({
                type: preRegActions.CHANGE_PREREG_REQ,
                payload: {data}
            })
        }
    }

};
export default preRegActions;
