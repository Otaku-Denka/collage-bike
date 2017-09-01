import * as React from 'react';
import VariantItem from './variantItem';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

const VariantItemContainer = ({
    admin,
    reset,
    initialVariantValue,
    EditProduct,
    setVariantPrice,
    setVariantSku
}: any) => {
    const renderItems = admin.variants.map((data: any, i: any) => {
        // let variant = {
        //     variantCb: true,
        //     price: EditProduct.values.price || 0,
        //     sku: EditProduct.values.sku || '',
        //     barcode: EditProduct.values.barcode || '',
        //     index: i
        // };
        // console.log('@@@@@@@@@@@@@', variant);
        // initialVariantValue(variant, i);
        return (
            <VariantItem
                key={i}
                data={data}
                i={i}
                reset={reset}
                initialVariantValue={initialVariantValue}
                EditProduct={EditProduct}
                admin={admin}
                setVariantPrice={setVariantPrice}
                setVariantSku={setVariantSku}
            />
        );
    });
    return (
        <div>
            <TitleContainer>
                <Title>Variant</Title>
                <Title>Price</Title>
                <Title>SKU</Title>
                <Title>Barcode</Title>
            </TitleContainer>
            {renderItems}
        </div>
    );
};

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid darkgrey;
`;
const Title = styled.div`
    display: flex;
    width: 25%;
    text-align: left;
`;

export default VariantItemContainer;
