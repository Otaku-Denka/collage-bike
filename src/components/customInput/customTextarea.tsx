import * as React from 'react';

import { FormControl } from 'react-bootstrap';

const CustomTextarea = ({ input, meta, type, placeholder, min, max }: any) => {
    return (
        <FormControl
            componentClass="textarea"
            rows={6}
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            value={input.value}
            onChange={input.onChange}
        />
    );
};

export default CustomTextarea;
