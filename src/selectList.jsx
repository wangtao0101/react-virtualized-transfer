import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import { List } from 'react-virtualized';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import 'antd/lib/form/style/index.less';

import Item from './item';
import Search from './search';
import prefixCls from './constants';

function noop() { }

function isRenderResultPlainObject(result) {
    return result && !React.isValidElement(result) &&
        Object.prototype.toString.call(result) === '[object Object]';
}

function debounceEventHandler(...args) {
    const debounced = _.debounce(...args);
    return (e) => {
        e.persist();
        return debounced(e);
    };
}

export default class SelectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
        };

        this.renderItem = this.renderItem.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    shouldComponentUpdate(...args) {
        if (PureRenderMixin.shouldComponentUpdate.apply(this, args)) {
            this.list.forceUpdateGrid();
            return true;
        }
        return false;
    }

    handleSelect(selectedItem) {
        const { selectKey } = this.props;
        const index = selectKey.indexOf(selectedItem.key);
        if (index > -1) {
            selectKey.splice(index, 1);
        } else {
            selectKey.push(selectedItem.key);
        }
        this.props.handleSelect(selectKey);
    }

    handleFilter(e) {
        this.setState({
            filter: e.target.value,
        });
    }

    handleClear() {
        this.setState({
            filter: '',
        });
    }

    rowRenderer({ _key, index, _isScrolling, _isVisible, parent, style }) {
        const item = parent.props.list[index];
        const { renderedText, renderedEl } = this.renderItem(item);
        const checked = this.props.selectKey.indexOf(item.key) >= 0;
        const itemPrefixCls = `${prefixCls}-list`;

        return (
            <Item
                key={item.key}
                item={item}
                checked={checked}
                style={style}
                renderedText={renderedText}
                renderedEl={renderedEl}
                disabled={item.disabled}
                onClick={this.handleSelect}
                prefixCls={itemPrefixCls}
            />
        );
    }

    renderItem(item) {
        const { render = noop } = this.props;
        const renderResult = render(item);
        const isRenderResultPlain = isRenderResultPlainObject(renderResult);
        return {
            renderedText: isRenderResultPlain ? renderResult.value : renderResult,
            renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
        };
    }

    render() {
        const { dataSource, width, height } = this.props;

        const className = classNames({
            [`${prefixCls}-list`]: true,
        });

        const listStyle = {
            width,
            height,
        };

        return (
            <div className={className} style={listStyle}>
                <Search
                    value={this.state.filter}
                    onChange={this.handleFilter}
                    handleClear={debounceEventHandler(this.handleClear, 150)}
                    prefixCls={`${prefixCls}-list-search`}
                />
                <List
                    ref={(list) => { this.list = list; }}
                    width={width}
                    height={height - 30}
                    rowCount={dataSource.length}
                    rowHeight={32}
                    rowRenderer={this.rowRenderer}
                    list={dataSource}
                />
            </div>
        );
    }
}

SelectList.defaultProps = {
    width: 200,
    height: 200,
};

SelectList.propTypes = {
    render: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
    selectKey: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
};
