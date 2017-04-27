import 'react-virtualized/styles.css';
import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import './transfer.less';
import Item from './item';

export default class Transfer extends React.Component {

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    render() {
        return (
            <ul>
                <Item />
                <Item />
            </ul>
        );
    }
}
