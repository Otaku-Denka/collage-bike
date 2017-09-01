import * as React from 'react';
import { FormControl } from 'react-bootstrap';

const CustomInput = ({
    input,
    meta,
    type,
    placeholder,
    min,
    max,
    style,
    onKeyDown,
    defaultValue
}: any) => {
    return (
        <FormControl
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            value={input.value}
            onChange={input.onChange}
            style={style}
            onKeyDown={onKeyDown}
        />
    );
};

export default CustomInput;
