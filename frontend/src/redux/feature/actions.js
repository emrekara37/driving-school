import {getCourseId} from "../../helpers/utility";

const featureActions = {
    GET_FEATURE_REQ: 'GET_FEATURE_REQ',
    GET_FEATURE_ERR: 'GET_FEATURE_ERR',
    GET_FEATURE_DONE: 'GET_FEATURE_DONE',
    ADD_FEATURE_REQ: 'ADD_FEATURE_REQ',
    ADD_FEATURE_ERR: 'ADD_FEATURE_ERR',
    ADD_FEATURE_DONE: 'ADD_FEATURE_DONE',

    getFeature: (key) => {
        return (dispatch) => {
            dispatch({
                type: featureActions.GET_FEATURE_REQ,
                payload: {data: {id: getCourseId(), key}}
            })
        }
    },
    addFeature: (data) => {
        return (dispatch) => {


            data.courseId =getCourseId();
            dispatch({
                type: featureActions.ADD_FEATURE_REQ,
                payload: {data}
            })
        }
    }
};
export default featureActions;
