import React from 'react';
import { Checkbox } from 'antd';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';

export default class Item extends React.Component {

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    render() {
        return (
          <li className="transfer-list transfer-list-item" style={this.props.style}>
            <Checkbox checked disabled={false} />
            <span>{this.props.text}</span>
          </li>
        );
    }
}

