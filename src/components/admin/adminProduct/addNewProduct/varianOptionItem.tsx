import * as React from 'react';
import CustomInput from '../../../customInput/customInput';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

const VarianOptionItem = ({
    index,
    tags,
    onKeyDown,
    option,
    removeVariantValue
}: any) => {
    const renderValues = option.value.map((value: string, i: number) => {
        const colors = ['#29bc94', '#763eaf', '#ff9517'];
        return (
            <div
                key={i}
                style={{
                    background: colors[index],
                    color: '#fff',
                    borderRadius: '5px',
                    display: 'inline-block',
                    minHeight: '2.8rem',
                    padding: '5px',
                    margin: '5px'
                }}
                onClick={() => {
                    removeVariantValue(index, value);
                }}
            >
                {value}
                <i
                    className="fa fa-times"
                    aria-hidden="true"
                    style={{
                        marginLeft: '5px',
                        cursor: 'pointer'
                    }}
                />
            </div>
        );
    });
    return (
        <Row style={{ display: 'flex', marginTop: '10px' }}>
            <Col
                md={3}
                sm={3}
                xs={5}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <Field
                    name={`variantName${index}`}
                    type="text"
                    component={CustomInput}
                    placeholder={''}
                />
            </Col>
            <Col md={9} sm={9} xs={7}>
                <div
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                >
                    {renderValues}
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
