import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {
    Col,
    Row,
    Well,
    FormGroup,
    ControlLabel,
    FormControl,
    Checkbox,
    Button
} from 'react-bootstrap';

import * as Dropzone from 'react-dropzone';
import {
    setPreviewImg,
    toggleVarianForm,
    addVariantKey,
    addVariantValue,
    removeVariantValue,
    removePreivewImg,
    setFirstPreviewImg,
    initialVariantValue,
    setVariantPrice,
    setVariantSku
} from '../../../../actions/admin';

import { resetVariantValue } from '../../../../actions/form';
import ImagesWrapper from './imagesWrapper';
import CustomInput from '../../../customInput/customInput';
import CustomTextarea from '../../../customInput/customTextarea';
import CustomSelect from '../../../customInput/customSelect';
import VarianOptionItem from './varianOptionItem';
import VariantItemContainer from './variantItemList';
import * as _ from 'underscore';
import styled from 'styled-components';

class AddNewProductContainer extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            images: [],
            defaultVariantKey: ['Material', 'Color', 'Size']
        };
    }

    setPreviewImg(e: any) {
        e.preventDefault();
        let files = e.target.files;
        let fileArray = [];

        if (files) {
            for (let i: number = 0, l: number = files.length; i < l; i++) {
                fileArray.push(files[i]);
            }
            fileArray.forEach(data => {
                let reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = () => {
                    this.props.setPreviewImg({
                        result: reader.result,
                        file: data
                    });
                };
            });
        }
    }
    handleOnDrop(file: any[]) {
        file.forEach(data => {
            this.props.setPreviewImg({
                file: data,
                result: data.preview
            });
        });
    }
    render() {
        let dropzoneRef: any;
        const renderImg = this.props.admin.previewImg.map(
            (data: any, i: number) => {
                return <img src={data.result} key={i} alt="" />;
            }
        );
        const renderVariantOptions = this.props.admin.options.map(
            (option: any, i: number) => {
                return (
                    <VarianOptionItem
                        removeVariantValue={this.props.removeVariantValue}
                        key={i}
                        option={option}
                        index={i}
                        onKeyDown={(e: any) => {
                            if (e.keyCode === 13) {
                                e.preventDefault();
                                const value = this.props.EditProduct.values[
                                    `variantValue${i}`
                                ];
                                if (
                                    value.match(/\S+/g) &&
                                    _.indexOf(
                                        this.props.admin.options[i].value,
                                        value
                                    ) === -1
                                ) {
                                    const initValue = {
                                        price: this.props.EditProduct.values
                                            .price,
                                        sku: this.props.EditProduct.values.sku,
                                        barcode: this.props.EditProduct.values
                                            .barcode
                                    };
                                    this.props.addVariantValue(
                                        i,
                                        value,
                                        initValue
                                    );
                                    this.props.resetVariantValue();
                                }
                            }
                        }}
                    />
                );
            }
        );
        return (
            <div className="admin-product-container">
                <div className="admin-products-wrapper">
                    <Row>
                        <header>
                            <div>
                                <span>＜</span>
                                <span>products</span>
                            </div>
                            <div>
                                <h1>Add product</h1>
                            </div>
                        </header>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <div style={{ marginTop: '20px' }}>
                                <Well
                                    bsSize="large"
                                    style={{ background: '#fff' }}
                                >
                                    <form action="">
                                        <FormGroup>
                                            <ControlLabel>Title</ControlLabel>
                                            <Field
                                                name="title"
                                                type="text"
                                                component={CustomInput}
                                                placeholder={'Enter Title'}
                                                value={'title'}
                                            />

                                            <br />
                                            <ControlLabel>
                                                Description
                                            </ControlLabel>
                                            <Field
                                                name="desc"
                                                type="textarea"
                                                component={CustomTextarea}
                                                rows={10}
                                                placeholder={
                                                    'Enter description'
                                                }
                                            />
                                        </FormGroup>
                                    </form>
                                </Well>
                                <Well
                                    bsSize="large"
                                    style={{ background: '#fff' }}
                                >
                                    <div>
                                        <span>Images</span>
                                        <a
                                            style={{
                                                float: 'right',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                if (dropzoneRef) {
                                                    dropzoneRef.open();
                                                }
                                            }}
                                        >
                                            Upload image
                                        </a>
                                    </div>
                                    <div
                                        style={{
                                            background: '#d3d3d3',
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Dropzone
                                            ref={node => {
                                                dropzoneRef = node;
                                            }}
                                            style={{
                                                display: 'flex',
                                                fontSize: '20px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                minHeight: '250px'
                                            }}
                                            onDrop={file => {
                                                this.handleOnDrop(file);
                                            }}
                                            disableClick={true}
                                        >
                                            {this.props.admin.previewImg
                                                .length < 1 ? (
                                                'Drop files to upload'
                                            ) : (
                                                <ImagesWrapper
                                                    data={
                                                        this.props.admin
                                                            .previewImg
                                                    }
                                                    removePreivewImg={
                                                        this.props
                                                            .removePreivewImg
                                                    }
                                                    setFirstPreviewImg={
                                                        this.props
                                                            .setFirstPreviewImg
                                                    }
                                                />
                                            )}
                                        </Dropzone>
                                    </div>
                                </Well>
                                <Well
                                    bsSize="large"
                                    style={{ background: '#fff' }}
                                >
                                    <Row>
                                        <Col md={12}>
                                            <h4>
                                                <b>Pricing</b>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Col md={6}>
                                            <ControlLabel>Price</ControlLabel>
                                            <Field
                                                name="price"
                                                type="number"
                                                component={CustomInput}
                                                placeholder={0}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <ControlLabel>
                                                Compare at price
                                            </ControlLabel>
                                            <Field
                                                name="comparePrice"
                                                type="number"
                                                component={CustomInput}
                                                placeholder={0}
                                            />
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Col md={12}>
                                            <Field
                                                name="taxes"
                                                type="checkbox"
                                                component={CustomInput}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    display: 'inline-block',
                                                    marginRight: '10px'
                                                }}
                                            />
                                            Charge taxes on this product
                                        </Col>
                                    </Row>
                                </Well>
                                <Well style={{ background: '#fff' }}>
                                    <Row>
                                        <Col md={12}>
                                            <h4>
                                                <b>Inventory</b>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Col md={6}>
                                            <ControlLabel>
                                                SKU (Stock Keeping Unit)
                                            </ControlLabel>
                                            <Field
                                                name="sku"
                                                type="text"
                                                component={CustomInput}
                                                placeholder={''}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <ControlLabel>
                                                Barcode (ISBN, UPC, GTIN, etc.)
                                            </ControlLabel>
                                            <Field
                                                name="barcode"
                                                type="text"
                                                component={CustomInput}
                                                placeholder={''}
                                            />
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Col md={6}>
                                            <ControlLabel>
                                                Inventory policy
                                            </ControlLabel>
                                            <Field
                                                name="Inventory"
                                                component={'select'}
                                                placeholder={`Don't track inventory`}
                                                className="form-control"
                                            >
                                                <option value={1}>
                                                    Don't track inventory
                                                </option>
                                                <option value={2}>
                                                    Shopify tracks this
                                                    product't inventory
                                                </option>
                                            </Field>
                                        </Col>
                                        <Col md={6}>
                                            <ControlLabel>
                                                Quantity
                                            </ControlLabel>
                                            <Field
                                                name="quantity"
                                                type="number"
                                                component={CustomInput}
                                                placeholder={''}
                                            />
                                        </Col>
                                    </Row>
                                </Well>
                                <Well style={{ background: '#fff' }}>
                                    <Row>
                                        <Col md={12}>
                                            <h4>
                                                <b>Shipping</b>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Field
                                                name="shipping"
                                                type="checkbox"
                                                component={CustomInput}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    display: 'inline-block',
                                                    marginRight: '10px'
                                                }}
                                            />
                                            This product requires shipping
                                        </Col>
                                    </Row>
                                    <Row>
                                        <hr
                                            style={{
                                                borderTop: '1px solid darkgrey'
                                            }}
                                        />
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <b>WEIGHT</b>

                                            <div
                                                style={{
                                                    color: '#637381',
                                                    marginTop: '20px'
                                                }}
                                            >
                                                Used to calculate shipping rates
                                                at checkout
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <ControlLabel
                                                style={{
                                                    display: 'block',
                                                    marginTop: '10px'
                                                }}
                                            >
                                                Weight
                                            </ControlLabel>
                                            <div style={{ marginTop: '20px' }}>
                                                <Field
                                                    name="weight"
                                                    type="number"
                                                    component={CustomInput}
                                                    placeholder={''}
                                                    style={{
                                                        width: '75%',
                                                        float: 'left',
                                                        borderRadius:
                                                            '5px 0 0 5px'
                                                    }}
                                                />

                                                <Field
                                                    name="unit"
                                                    component={'select'}
                                                    style={{
                                                        width: '25%',
                                                        float: 'left',
                                                        borderRadius:
                                                            '0 5px 5px 0'
                                                    }}
                                                    className="form-control"
                                                >
                                                    <option value={'kg'}>
                                                        kg
                                                    </option>
                                                    <option value={'oz'}>
                                                        oz
                                                    </option>
                                                    <option value={'lb'}>
                                                        lb
                                                    </option>
                                                    <option value={'g'}>
                                                        g
                                                    </option>
                                                </Field>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <hr
                                            style={{
                                                borderTop: '1px solid darkgrey'
                                            }}
                                        />
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <ControlLabel
                                                style={{
                                                    display: 'block',
                                                    marginTop: '10px'
                                                }}
                                            >
                                                FULFILLMENT SERVICE
                                            </ControlLabel>
                                            <Field
                                                name="service"
                                                component={'select'}
                                                style={{
                                                    width: '35%',
                                                    marginTop: '10px'
                                                }}
                                                className="form-control"
                                            >
                                                <option value={'Manual'}>
                                                    Manual
                                                </option>
                                            </Field>
                                        </Col>
                                    </Row>
                                </Well>
                                <Well
                                    bsSize="large"
                                    style={{ background: '#fff' }}
                                >
                                    <Row>
                                        <Col md={12}>
                                            <div
                                                style={{
                                                    display: 'block',
                                                    height: '70px',
                                                    width: '100%'
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        display: 'inline',
                                                        float: 'left'
                                                    }}
                                                >
                                                    <b>Variants</b>
                                                </h4>
                                                <a
                                                    style={{
                                                        float: 'right',
                                                        marginTop: '10px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {
                                                        this.props.toggleVarianForm();
                                                        if (
                                                            this.props.admin
                                                                .options
                                                                .length === 0
                                                        ) {
                                                            this.props.addVariantKey(
                                                                this.props
                                                                    .EditProduct
                                                                    .values
                                                                    .variantName0
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {this.props.admin
                                                        .variantForm ? (
                                                        'Cancel'
                                                    ) : (
                                                        'Add variant'
                                                    )}
                                                </a>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <p style={{ marginTop: '10px' }}>
                                                Add variants if this product
                                                comes in multiple versions, like
                                                different sizes or colors.
                                            </p>
                                        </Col>
                                    </Row>
                                    {this.props.admin.variantForm ? (
                                        <div>
                                            <Row>
                                                <Col md={3} sm={3} xs={3}>
                                                    <span>Option name</span>
                                                </Col>
                                                <Col md={9} sm={9} xs={9}>
                                                    <span>Option values</span>
                                                </Col>
                                            </Row>
                                            {renderVariantOptions}
                                            <Button
                                                style={{ marginTop: '20px' }}
                                                onClick={() => {
                                                    if (
                                                        this.props.admin.options
                                                            .length < 3
                                                    ) {
                                                        this.props.addVariantKey(
                                                            this.props
                                                                .EditProduct
                                                                .values[
                                                                `variantName${this
                                                                    .props.admin
                                                                    .options
                                                                    .length}`
                                                            ]
                                                        );
                                                    }
                                                }}
                                            >
                                                Add another option
                                            </Button>
                                            <Row>
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        marginTop: '20px'
                                                    }}
                                                >
                                                    <p>
                                                        Modify the variants to
                                                        be created:
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <VariantItemContainer
                                                    admin={this.props.admin}
                                                    reset={this.props.reset}
                                                    EditProduct={
                                                        this.props.EditProduct
                                                    }
                                                    initialVariantValue={
                                                        this.props
                                                            .initialVariantValue
                                                    }
                                                    setVariantPrice={
                                                        this.props
                                                            .setVariantPrice
                                                    }
                                                    setVariantSku={
                                                        this.props.setVariantSku
                                                    }
                                                />
                                            </Col>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </Well>
                            </div>
                        </Col>
                        <Col md={4} style={{ marginTop: '20px' }}>
                            <Well bsSize="large" style={{ background: '#fff' }}>
                                <TagHeader>
                                    <b>Tags</b>

                                    <a href="">View all tags</a>
                                </TagHeader>
                            </Well>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        setPreviewImg: bindActionCreators(setPreviewImg, dispatch),
        toggleVarianForm: bindActionCreators(toggleVarianForm, dispatch),
        addVariantKey: bindActionCreators(addVariantKey, dispatch),
        addVariantValue: bindActionCreators(addVariantValue, dispatch),
        resetVariantValue: bindActionCreators(resetVariantValue, dispatch),
        removeVariantValue: bindActionCreators(removeVariantValue, dispatch),
        removePreivewImg: bindActionCreators(removePreivewImg, dispatch),
        setFirstPreviewImg: bindActionCreators(setFirstPreviewImg, dispatch),
        initialVariantValue: bindActionCreators(initialVariantValue, dispatch),
        setVariantPrice: bindActionCreators(setVariantPrice, dispatch),
        setVariantSku: bindActionCreators(setVariantSku, dispatch)
    };
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        admin: state.admin,
        EditProduct: state.form.EditProduct
    };
};

let AddNewProductContainerForm = reduxForm({
    form: 'EditProduct',
    initialValues: {
        variantName0: 'Material',
        variantName1: 'Color',
        variantName2: 'Size',
        variantValue0: '',
        variantValue1: '',
        variantValue2: ''
    }
})(AddNewProductContainer);

export default connect(mapStateToProps, mapDispatchToProps)(
    AddNewProductContainerForm
);

const TagHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InlineFlex = styled.span`display: flex;`;
