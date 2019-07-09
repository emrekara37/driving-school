import {getCourseId} from "../../helpers/utility";

const imageActions = {
    GET_IMAGES_REQ: "GET_IMAGES_REQ",
    GET_IMAGES_ERR: "GET_IMAGES_ERR",
    GET_IMAGES_DONE: "GET_IMAGES_DONE",
    ADD_IMAGE_REQ: "ADD_IMAGE_REQ",
    ADD_IMAGE_ERR: "ADD_IMAGE_ERR",
    ADD_IMAGE_DONE: "ADD_IMAGE_DONE",
    DELETE_IMAGE_REQ: "DELETE_IMAGE_REQ",
    DELETE_IMAGE_ERR: "DELETE_IMAGE_ERR",
    DELETE_IMAGE_DONE: "DELETE_IMAGE_DONE",
    getImages: () => {
        return (dispatch) => {
            dispatch({
                type: imageActions.GET_IMAGES_REQ,
                payload: {id: getCourseId()}
            })
        }
    },
    addImage: (data) => {
        let form = new FormData();
        form.append("CourseId", data.courseId);
        form.append("Image", data.image);
        form.append("Name", data.name);
        return (dispatch) => {
            dispatch({
                type: imageActions.ADD_IMAGE_REQ,
                payload: {data: form}
            });
        }
    },
    deleteImage: (id) => {
        return (dispatch) => {
            dispatch({
                type: imageActions.DELETE_IMAGE_REQ,
                payload: {id}
            })
        }
    }
};
export default imageActions;
