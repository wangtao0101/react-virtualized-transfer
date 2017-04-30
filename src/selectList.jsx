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

export default class SelectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            dataSource: [],
        };

        this.renderItem = this.renderItem.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleFilterWapper = this.handleFilterWapper.bind(this);
        this.handleFilterWithDebounce = _.debounce(this.handleFilter.bind(this), 200);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.matchFilter = this.matchFilter.bind(this);
    }

    componentWillMount() {
        this.setState({
            dataSource: this.props.dataSource,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource
            || nextProps.dataSource.length !== this.props.dataSource) {
            if (this.state.filter !== '') {
                this.handleFilter(nextProps.dataSource, this.state.filter);
            } else {
                this.setState({
                    dataSource: nextProps.dataSource,
                });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (PureRenderMixin.shouldComponentUpdate.apply(this, nextProps, nextState)) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.list.forceUpdateGrid();
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

    handleFilterWapper(e) {
        this.handleFilterWithDebounce(this.props.dataSource, e.target.value);
        this.setState({
            filter: e.target.value,
        });
    }

    matchFilter(filter, item) {
        if (this.props.filterOption) {
            return this.props.filterOption(filter, item);
        }
        const { renderedText } = this.renderItem(item);
        return renderedText.indexOf(filter) >= 0;
    }

    handleFilter(dataSource, filter) {
        const showItems = [];
        dataSource.map((item) => {
            if (!this.matchFilter(filter, item)) {
                return null;
            }
            showItems.push(item);
            return item;
        });
        this.setState({
            dataSource: showItems,
        }, () => {
            /* TODO: maybe we can scroll to the position which user is looking at*/
            this.list.scrollToRow(0);
        });
    }

    handleClear() {
        this.setState({
            filter: '',
            dataSource: this.props.dataSource,
        }, () => {
            this.list.scrollToRow(0);
        });
    }

    rowRenderer({ _key, index, _isScrolling, _isVisible, _parent, style }) {
        const item = this.state.dataSource[index];
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
        const { width, height, footer } = this.props;
        const { dataSource } = this.state;

        const className = classNames({
            [`${prefixCls}-list`]: true,
        });

        const listStyle = {
            width,
            height,
        };

        const footerDom = footer(Object.assign({}, this.props));

        const listFooter = footerDom ? (
            <div className={`${prefixCls}-list-footer`}>
                {footerDom}
            </div>
        ) : null;

        return (
            <div className={className} style={listStyle}>
                <Search
                    value={this.state.filter}
                    onChange={this.handleFilterWapper}
                    handleClear={this.handleClear}
                    prefixCls={`${prefixCls}-list-search`}
                />
                <List
                    ref={(list) => { this.list = list; }}
                    width={width - 2}
                    height={height - 38 - 32}
                    rowCount={dataSource.length}
                    rowHeight={32}
                    rowRenderer={this.rowRenderer}
                />
                {listFooter}
            </div>
        );
    }
}

SelectList.defaultProps = {
    width: 200,
    height: 300,
    filterOption: undefined,
    footer: noop,
};

SelectList.propTypes = {
    render: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
    selectKey: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    filterOption: PropTypes.func,
    footer: PropTypes.func,
};
