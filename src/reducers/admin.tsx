import * as ACTIONS from '../actions/constants';

const initialState = {
    previewImg: [],
    varianForm: false
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ACTIONS.SET_PREVIEW_IMG:
            return { ...state, previewImg: [...state.previewImg, action.img] };
        case ACTIONS.TOGGLE_VARIANTS_FORM:
            return { ...state, varianForm: !state.varianForm };
        default:
            return { ...state };
    }
};
