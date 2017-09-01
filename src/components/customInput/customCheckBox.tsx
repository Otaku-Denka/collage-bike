import * as React from 'react';
import { FormControl, Checkbox } from 'react-bootstrap';

class CustomCheckbox extends React.Component<any, any> {
    componentDidMount() {
        const { input } = this.props;
        input.value = true;
    }
    render() {
        const { input, style } = this.props;
        return (
            <input
                type={'checkbox'}
                checked={input.value ? true : false}
                style={style}
                onChange={input.onChange}
            />
        );
    }
}

export default CustomCheckbox;
