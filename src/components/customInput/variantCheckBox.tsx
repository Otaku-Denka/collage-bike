import * as React from 'react';

export default class VariantCheckbox extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: true
        };
    }
    onClick(e: any) {
        this.setState({
            value: !this.state.value
        });
    }
    render() {
        return (
            <input
                type={'checkbox'}
                checked={this.state.value}
                onChange={e => {
                    this.props.onClick(e);
                }}
            />
        );
    }
}
