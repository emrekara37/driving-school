import {getCourseId} from "../../helpers/utility";

const actions = {
    ADD_CAR_REQ: "ADD_CAR_REQ",
    ADD_CAR_DONE: "ADD_CAR_DONE",
    ADD_CAR_ERR: "ADD_CAR_ERR",
    GET_CARS_REQ: "GET_CARS_REQ",
    GET_CARS_DONE: "GET_CARS_DONE",
    GET_CARS_ERR: "GET_CARS_ERR",
    DELETE_CAR: "DELETE_CAR",
    addCar: (data) => {
        const form = new FormData();
        form.append("CarName", data.carName);
        form.append("CarDescription", data.carDescription);
        form.append("CourseId", getCourseId());

        if(data.file){
            form.append("Image", data.file);
        }
        return (dispatch) => {
            dispatch({
                type: actions.ADD_CAR_REQ,
                payload: {data: form}
            })
        }
    },
    getCars: () => {
        return (dispatch) => {
            dispatch({
                type: actions.GET_CARS_REQ,
                payload: {data: getCourseId()}
            });
        }
    },
    deleteCar: (id) => {
        return (dispatch) => {
            dispatch({
                type: actions.DELETE_CAR,
                payload:{id}
            })
        }
    },
    setCarsTable: (data) => {
        const dataSource = [];
        for (let i = 0; i < data.length; i++) {
            dataSource.push(
                {
                    key: data[i].id,
                    ...data[i]
                }
            );
        }
        return dataSource;
    }

};
export default actions;
