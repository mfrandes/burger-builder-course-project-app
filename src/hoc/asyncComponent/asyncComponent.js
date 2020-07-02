import React, { Component} from 'react';

const asyncComponent = (importCmponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importCmponent() 
            .then(cmp => this.setState({ component: cmp.default}));
        }

        render(){
            const C = this.state.component;
            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent;