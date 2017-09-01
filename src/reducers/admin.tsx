import * as ACTIONS from '../actions/constants';
import * as _ from 'underscore';

function increment_last(v: any, i: any) {
    return v.replace(/[0-9]+(?!.*[0-9])/, function(match: any) {
        return parseInt(match, 10) + i;
    });
}

interface KV {
  key: string
  value: string
}

interface ImgType {
    file?: any;
    result?: string;
}
interface OptionType {
    key: string;
    value: string[];
}

export interface VariantsType {
    name: string;
    price: number;
    sku: string;
    barcode: string;
    index: number;
}

interface StateType {
    previewImg?: ImgType[];
    options: OptionType[];
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
          return {
              ...state,
              options: addOptions(state.options, action.key, action.value),
              variants: optionsToVariants(state.options)
          };
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

function addOptions(options: OptionType[], key: string, value: string): OptionType[] {
  return options.map(option => {
    if (option.key === key) {
      if (option.value) {
        option.value.push(value)
      }
    }
    return option
  })
}

function optionsToVariants(options: OptionType[]): VariantsType[] {
  const kvArrays = cartesianProductOf(options)
  return mapKVArraysToVariants(kvArrays)
}

function cartesianProductOf(options: OptionType[]): KV[][] {
  let kvArrays: KV[][] = []
  options.forEach((option, i, array) => {
    if (i === 0) {
      option.value.forEach(v => {
        kvArrays.push([{key: option.key, value: v}])
      })
      return
    }
    let temp: {key: string, value: string}[][] = []
    option.value.forEach(v => {
      kvArrays.forEach(r => {
        temp.push([...r, {key: option.key, value: v}])
      })
    })
    kvArrays = temp
  })
  return kvArrays
}

function mapKVArraysToVariants(kvArrays: KV[][]): VariantsType[] {
  return kvArrays.map((kvArray, i) => {
    return kvArray.reduce((left, right) => {
      const temp = {
        name: left.name === "" ? right.value : `${left.name}.${right.value}`,
        price: 0,
        sku: "",
        barcode: "",
        index: i
      }
      return temp
    }, {name: "", price: 0, sku: "", barcode: "", index: 0})
  })
}
