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
    Checkbox
} from 'react-bootstrap';

import Textarea from 'react-textarea-autosize';

import { setPreviewImg, toggleVarianForm } from '../../../../actions/admin';
import ImagesWrapper from './imagesWrapper';
import CustomInput from '../../../customInput/customInput';
import CustomTextarea from '../../../customInput/customTextarea';
import CustomSelect from '../../../customInput/customSelect';
import VarianOptionItem from './varianOptionItem';

class AddNewProductContainer extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            images: []
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
    render() {
        const renderImg = this.props.admin.previewImg.map(
            (data: any, i: number) => {
                return <img src={data.result} key={i} alt="" />;
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
                                        <span
                                            onClick={() => {
                                                console.log(this.state);
                                                console.log(this.props);
                                            }}
                                        >
                                            Images
                                        </span>
                                        <span style={{ float: 'right' }}>
                                            <input
                                                type="file"
                                                multiple={true}
                                                onChange={e => {
                                                    this.setPreviewImg(e);
                                                }}
                                            />
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            background: 'grey',
                                            marginTop: '20px'
                                        }}
                                    >
                                        <ImagesWrapper
                                            data={this.props.admin.previewImg}
                                        />
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
                                                }}
                                            >
                                                {this.props.admin.varianForm
                                                    ? 'Cancel'
                                                    : 'Add variant'}
                                            </a>
                                        </Col>
                                        <Col md={12}>
                                            <p style={{ marginTop: '10px' }}>
                                                Add variants if this product
                                                comes in multiple versions, like
                                                different sizes or colors.
                                            </p>
                                        </Col>
                                    </Row>
                                    {this.props.admin.varianForm
                                        ? <div>
                                              <Row>
                                                  <Col md={3}>
                                                      <span>Option name</span>
                                                  </Col>
                                                  <Col md={9}>
                                                      <span>Option values</span>
                                                  </Col>
                                              </Row>

                                              <VarianOptionItem
                                                  index={1}
                                                  onKeyDown={(e: any) => {
                                                      if (e.keyCode === 13) {
                                                          e.preventDefault();
                                                          console.log('hihi');
                                                      }
                                                  }}
                                              />
                                          </div>
                                        : ''}
                                </Well>
                            </div>
                        </Col>
                        <Col md={4} style={{ background: 'red' }}>
                            <span>＜</span>
                            <span>products</span>
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
        toggleVarianForm: bindActionCreators(toggleVarianForm, dispatch)
    };
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        admin: state.admin
    };
};

let AddNewProductContainerForm = reduxForm({
    form: 'EditProduct'
})(AddNewProductContainer);

export default connect(mapStateToProps, mapDispatchToProps)(
    AddNewProductContainerForm
);
