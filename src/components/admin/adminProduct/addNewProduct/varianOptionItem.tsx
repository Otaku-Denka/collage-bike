import * as React from 'react';
import CustomInput from '../../../customInput/customInput';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

const VarianOptionItem = ({ index, tags, onKeyDown }: any) => {
    return (
        <Row style={{ display: 'flex' }}>
            <Col md={3} style={{ display: 'flex', alignItems: 'center' }}>
                <Field
                    name={`variantName${index}`}
                    type="text"
                    component={CustomInput}
                    placeholder={''}
                />
            </Col>
            <Col md={9}>
                <div
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                >
                    <div
                        style={{
                            background: '#29bc94',
                            color: '#fff',
                            borderRadius: '5px',
                            display: 'inline-block',
                            minHeight: '2.8rem',
                            padding: '5px',
                            margin: '5px'
                        }}
                    >
                        test
                        <i
                            className="fa fa-times"
                            aria-hidden="true"
                            style={{
                                marginLeft: '5px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                    <Field
                        name={`variantValue${index}`}
                        type="text"
                        component={CustomInput}
                        placeholder={''}
                        style={{
                            border: 'none',
                            boxShadow: 'none'
                        }}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default VarianOptionItem;
