import * as ACTIONS from './constants';

export function setPreviewImg(img: any) {
    return {
        type: ACTIONS.SET_PREVIEW_IMG,
        img
    };
}

export function removePreviewImg(img: any) {
    return {
        type: ACTIONS.REMOVE_PREVIEW_IMG,
        img
    };
}

export function toggleVarianForm() {
    return {
        type: ACTIONS.TOGGLE_VARIANTS_FORM
    };
}
