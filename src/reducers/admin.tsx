import * as ACTIONS from '../actions/constants';
import * as _ from 'underscore';

function increment_last(v: any, i: any) {
    return v.replace(/[0-9]+(?!.*[0-9])/, function(match: any) {
        return parseInt(match, 10) + i;
    });
}
interface ImgType {
    file?: any;
    result?: string;
}
interface OptionType {
    key: string;
    value?: string[];
}

interface VariantsType {
    name: string;
    price: number;
    sku: string;
    barcode: string;
    index: number;
}

interface StateType {
    previewImg?: ImgType[];
    options?: OptionType[];
    variantForm: boolean;
    variants?: VariantsType[];
}

const initialState: StateType = {
    previewImg: [],
    variantForm: false,
    options: [
        // {
        //     key: 'Material'
        // },
        // {
        //     key: 'Color'
        // },
        // {
        //     key: 'Size'
        // }
    ],
    variants: []
};

interface ActionType {
    type: string;
    img: {
        file: File;
        result: string;
    };
    key: string;
    value: string;
    variantKey: string;
    index: number;
    variant: any;
    price: any;
    sku: any;
    barcode: any;
    variantCb: boolean;
    initVal: any;
}

export default (state = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case ACTIONS.SET_PREVIEW_IMG:
            if (state.previewImg) {
                return {
                    ...state,
                    previewImg: [...state.previewImg, action.img]
                };
            }
            return { ...state };
        case ACTIONS.REMOVE_PREVIEW_IMG:
            if (!state.previewImg) {
                return { ...state };
            }
            return {
                ...state,
                previewImg: state.previewImg.filter(img => {
                    return img !== action.img;
                })
            };
        case ACTIONS.SET_FIRST_PREVIEW_IMG:
            if (!state.previewImg) {
                return { ...state };
            }
            return {
                ...state,
                previewImg: [
                    action.img,
                    ...state.previewImg.filter(img => {
                        return img !== action.img;
                    })
                ]
            };
        case ACTIONS.TOGGLE_VARIANTS_FORM:
            return { ...state, variantForm: !state.variantForm };
        case ACTIONS.ADD_VARIANT_KEY:
            if (state.options) {
                if (
                    _.findIndex(state.options, { key: action.variantKey }) ===
                    -1
                ) {
                    return {
                        ...state,
                        options: [
                            ...state.options,
                            { key: action.variantKey, value: [] }
                        ]
                    };
                } else {
                    return { ...state };
                }
            }
            return { ...state };
        case ACTIONS.ADD_VARIANT_VALUE:
            if (state.options) {
                let variants: string[] = [];
                let variantArr: any = state.options.map((option, i) => {
                    if (i === action.index) {
                        if (option.value) {
                            option.value.push(action.value);
                            return option;
                        }
                    }
                    return option;
                });

                let variantValues = variantArr.filter((v: any) => {
                    if (v.value && v.value.length > 0) {
                        return v.value;
                    }
                    return false;
                });
                variantValues = variantValues.map((v: any) => {
                    return v.value;
                });
                let oldResult: any = [];
                let newResult: any = [];
                if (variantValues && variantValues[0]) {
                    for (let i = 0, l = variantValues[0].length; i < l; i++) {
                        if (
                            variantValues[0] &&
                            !variantValues[1] &&
                            !variantValues[2]
                        ) {
                            variants.push(variantValues[0][i]);
                        }
                        if (
                            variantValues[0] &&
                            variantValues[1] &&
                            !variantValues[2]
                        ) {
                            for (
                                let x = 0, y = variantValues[1].length;
                                x < y;
                                x++
                            ) {
                                variants.push(
                                    `${variantValues[0][i]}・${variantValues[1][
                                        x
                                    ]}`
                                );
                            }
                        }
                        if (
                            variantValues[0] &&
                            variantValues[1] &&
                            variantValues[2]
                        ) {
                            for (
                                let x = 0, y = variantValues[1].length;
                                x < y;
                                x++
                            ) {
                                for (
                                    let a = 0, b = variantValues[2].length;
                                    a < b;
                                    a++
                                ) {
                                    variants.push(
                                        `${variantValues[0][
                                            i
                                        ]}・${variantValues[1][
                                            x
                                        ]}・${variantValues[2][a]} `
                                    );
                                }
                            }
                        }
                    }
                }
                let newVariants = variants.map((item: any, index: number) => {
                    return {
                        name: item,
                        price: action.initVal.price ? action.initVal.price : 0,
                        sku: action.initVal.sku
                            ? increment_last(action.initVal.sku, index)
                            : '',
                        barcode: action.initVal.barcode
                            ? action.initVal.barcode
                            : '',
                        index: index
                    };
                });
                return {
                    ...state,
                    options: variantArr,
                    variants: newVariants
                };
            }
            return { ...state };
        case ACTIONS.REMOVE_VARIANT_VALUE:
            if (!state.options) {
                return { ...state };
            }
            return {
                ...state,
                options: state.options.map((option, i) => {
                    if (i === action.index && option.value) {
                        let newOption = { ...option };
                        let newValue = option.value.filter(v => {
                            return v !== action.value;
                        });
                        newOption.value = newValue;
                        return newOption;
                    }
                    return option;
                })
            };

        case ACTIONS.SET_VARIANT_PRICE:
            if (!state.variants) {
                return { ...state };
            } else {
                let newVariantss = [...state.variants];
                newVariantss[action.index].price = action.price;
                return { ...state, variants: newVariantss };
            }
        case ACTIONS.SET_VARIANT_SKU:
            if (!state.variants) {
                return { ...state };
            }
            let newVariantsz = [...state.variants];
            newVariantsz[action.index].sku = action.sku;
            return { ...state, variants: newVariantsz };

        default:
            return { ...state };
    }
};
