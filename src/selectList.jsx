import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import { List } from 'react-virtualized';
import Item from './item';

const list = [];

for (let index = 0; index < 10000; index += 1) {
    list.push(`${index}`);
}

export default class SelectList extends React.Component {
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    rowRenderer({ key, index, _isScrolling, _isVisible, style }) {
        return (
          <Item
            key={key}
            text={list[index]}
            style={style}
          />
        );
    }

    render() {
        return (
          <List
            width={300}
            height={300}
            rowCount={list.length}
            rowHeight={32}
            rowRenderer={this.rowRenderer}
          />
        );
    }
}
