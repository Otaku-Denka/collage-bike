import * as React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import CustomInput from '../../../customInput/customInput';
import { Checkbox, FormControl } from 'react-bootstrap';
import CustomCheckbox from '../../../customInput/customCheckBox';
import VariantCheckbox from '../../../customInput/variantCheckBox';

export default class VariantItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentWillUnmount() {
        this.props.reset();
    }

    componentWillMount() {
        // function increment_last(v: any, i: any) {
        //     return v.replace(/[0-9]+(?!.*[0-9])/, function(match: any) {
        //         return parseInt(match, 10) + i;
        //     });
        // }
        // let variant = {
        //     variantCb: true,
        //     price: this.props.EditProduct.values.price || '',
        //     sku: this.props.EditProduct.values.sku
        //         ? increment_last(
        //               this.props.EditProduct.values.sku,
        //               this.props.i
        //           )
        //         : '' || '',
        //     barcode: this.props.EditProduct.values.barcode || '',
        //     index: this.props.i
        // };
        // this.props.initialVariantValue(variant, this.props.i);
    }

    render() {
        let name = this.props.data.name.split('・');
        name = name.map((data: any, i: any) => {
            const colors = ['#29bc94', '#763eaf', '#ff9517'];
            if (i > 0) {
                return (
                    <div key={i}>
                        <span>・</span>
                        <NameSpan color={colors[i]}>{data}</NameSpan>
                    </div>
                );
            } else {
                return (
                    <NameSpan key={i} color={colors[i]}>
                        {data}
                    </NameSpan>
                );
            }
        });
        console.log(this.props.admin.variants[this.props.i].price);
        console.log(this.props.data);
        return (
            <VariantContainer>
                <Variant>
                    {/* <Field
                        name={`creation${this.props.i}`}
                        component={CustomCheckbox}
                        checked={true}
                    /> */}
                    <input type={'checkbox'} onChange={e => {}} />
                    {name}
                </Variant>
                <Variant>
                    {/* <Field
                        name={`price${this.props.i}`}
                        type="number"
                        component={CustomInput}
                    /> */}
                    <FormControl
                        type="number"
                        placeholder=""
                        value={this.props.admin.variants[this.props.i].price}
                        onChange={(e: any) => {
                            let value = e.target.value;
                            this.props.setVariantPrice(value, this.props.i);
                        }}
                    />
                </Variant>
                <Variant>
                    {/* <Field
                        name={`sku${this.props.i}`}
                        type="text"
                        component={CustomInput}
                        placeholder={'Enter SKU'}
                    /> */}
                    <FormControl
                        type="text"
                        placeholder="Enter SKU"
                        value={this.props.admin.variants[this.props.i].sku}
                        onChange={(e: any) => {
                            this.props.setVariantSku(
                                e.target.value,
                                this.props.i
                            );
                            console.log(
                                'this.props.admin.variants[this.props.i].sku: ',
                                this.props.admin.variants[this.props.i].sku
                            );
                            console.log('index: ', this.props.i);
                            console.log('value: ', e.target.value);
                        }}
                    />
                </Variant>
                <Variant>
                    {/* <Field
                        name={`Barcode${this.props.i}`}
                        type="text"
                        component={CustomInput}
                        placeholder={'Enter Barcode'}
                    /> */}
                    <FormControl
                        type="text"
                        placeholder="Enter Barcode"
                        value={
                            this.props.admin.variants[this.props.i] ? (
                                this.props.admin.variants[this.props.i].barcode
                            ) : (
                                ''
                            )
                        }
                    />
                </Variant>
            </VariantContainer>
        );
    }
}

// export default reduxForm({
//     form: 'EditProduct'
// })(VariantItem);

const VariantContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const Variant = styled.div`
    display: flex;
    width: 25%;
    text-align: left;
    margin-right: 10px;
`;

const NameSpan = styled.span`color: ${props => props.color || 'black'};`;
