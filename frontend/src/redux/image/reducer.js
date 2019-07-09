import imageActions from "./actions";

const initState = {
    imageLoading: false,
    images: [],
    imageError: true,
    addImageLoading: false,
    addImageDone: {},

};

export default function imageReducer(state = initState, action) {
    switch (action.type) {
        case imageActions.GET_IMAGES_REQ:
            return {
                ...state,
                imageLoading: true
            };
        case imageActions.GET_IMAGES_DONE:
            return {
                ...state,
                images: action.payload,
                imageLoading: false
            };
        case imageActions.GET_IMAGES_ERR:
            return {
                ...state,
                imageLoading: false,
                imageError: true
            };
        case imageActions.ADD_IMAGE_REQ:
            return {
                ...state,
                addImageLoading: true
            };
        case imageActions.ADD_IMAGE_DONE:
            let ims = state.images;
            ims.push(action.payload);
            return {
                ...state,
                addImageLoading: false,
                images: ims,
                addImageDone: action.payload
            };
        case imageActions.DELETE_IMAGE_DONE:
            const id = action.payload;
            const images = state.images.filter(item => {
                return item.id !== id;
            });
            return {
                ...state,
                images: images
            };

        default:
            return state;
    }
}
