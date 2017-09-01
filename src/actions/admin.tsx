import * as ACTIONS from './constants';

export function setPreviewImg(img: any) {
    return {
        type: ACTIONS.SET_PREVIEW_IMG,
        img
    };
}

export function removePreivewImg(img: any) {
    return {
        type: ACTIONS.REMOVE_PREVIEW_IMG,
        img
    };
}

export function setFirstPreviewImg(img: any) {
    return {
        type: ACTIONS.SET_FIRST_PREVIEW_IMG,
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

export function addVariantValue(key: string, value: string) {
    return {
        type: ACTIONS.ADD_VARIANT_VALUE,
        key,
        value,
    };
}

export function removeVariantValue(index: number, value: string) {
    return {
        type: ACTIONS.REMOVE_VARIANT_VALUE,
        index,
        value
    };
}

export function addVariantKey(variantKey: string) {
    return {
        type: ACTIONS.ADD_VARIANT_KEY,
        variantKey
    };
}

export function initialVariantValue(variant: any, index: number) {
    return {
        type: ACTIONS.INITIAL_VARIANT_VALUE,
        variant: variant,
        index: index
    };
}

export function setVariantPrice(price: any, index: any) {
    return {
        type: ACTIONS.SET_VARIANT_PRICE,
        price,
        index
    };
}

export function setVariantSku(sku: any, index: any) {
    return {
        type: ACTIONS.SET_VARIANT_SKU,
        sku,
        index
    };
}
