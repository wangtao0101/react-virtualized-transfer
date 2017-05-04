import 'react-virtualized/styles.css';
import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import PropTypes from 'prop-types';
import 'core-js/fn/array/includes';
import './transfer.less';
import SelectList from './selectList';
import Operation from './operation';

import prefixCls from './constants';

export default class Transfer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftSource: [],
            rightSrouce: [],
            sourceSelectedKeys: [],
            targetSelectedKeys: [],
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.initStateByProps = this.initStateByProps.bind(this);
    }

    componentWillMount() {
        this.initStateByProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource ||
            nextProps.targetKeys !== this.props.targetKeys ||
            nextProps.selectedKeys !== this.props.selectedKeys) {
            this.initStateByProps(nextProps, true);
        }
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    initStateByProps(props, update) {
        const leftSource = [];
        const rightSrouce = [];
        const sourceSelectedKeys = [];
        const targetSelectedKeys = [];

        props.dataSource.forEach((item) => {
            if (props.targetKeys.includes(item.key)) {
                rightSrouce.push(item);
            } else {
                leftSource.push(item);
            }
        });

        if (props.selectedKeys) {
            props.selectedKeys.map((key) => {
                if (props.targetKeys.includes(key)) {
                    targetSelectedKeys.push(key);
                } else {
                    sourceSelectedKeys.push(key);
                }
                return key;
            });
        }

        if (!props.selectedKeys && update) {
            // filter selectedKeys in state
            const oldSourceSelectedKeys = this.state.sourceSelectedKeys;
            const oldTargetSelectedKeys = this.state.targetSelectedKeys;
            props.dataSource.forEach((item) => {
                if (oldSourceSelectedKeys.includes(item.key) &&
                    !props.targetKeys.includes(item.key)) {
                    sourceSelectedKeys.push(item.key);
                }
                if (oldTargetSelectedKeys.includes(item.key) &&
                    props.targetKeys.includes(item.key)) {
                    targetSelectedKeys.push(item.key);
                }
            });
        }

        this.setState({
            leftSource,
            rightSrouce,
            sourceSelectedKeys,
            targetSelectedKeys,
        });
    }

    handleSelect(direction, selectedKeys) {
        const leftKeys = direction === 'left' ? selectedKeys : this.state.sourceSelectedKeys;
        const rightKeys = direction === 'right' ? selectedKeys : this.state.targetSelectedKeys;
        const onSelectChange = this.props.onSelectChange;
        if (!onSelectChange) {
            this.setState({
                sourceSelectedKeys: leftKeys,
                targetSelectedKeys: rightKeys,
            });
            return;
        }
        this.props.onSelectChange(selectedKeys, this.state.targetSelectedKeys);
        this.props.onSelectChange(this.state.sourceSelectedKeys, selectedKeys);
    }

    render() {
        return (
            <div>
                <SelectList
                    dataSource={this.state.leftSource}
                    render={this.props.render}
                    selectedKeys={this.state.sourceSelectedKeys}
                    handleSelect={selectedKeys => this.handleSelect('left', selectedKeys)}
                    showSearch
                    showHeader
                    itemsUnit={'items'}
                    itemUnit={'item'}
                    titleText={'Source'}
                />
                <Operation className={`${prefixCls}-operation`} leftActive={false} rightActive={false} />
                <SelectList
                    dataSource={this.state.rightSrouce}
                    render={this.props.render}
                    selectedKeys={this.state.targetSelectedKeys}
                    handleSelect={selectedKeys => this.handleSelect('right', selectedKeys)}
                    showSearch
                    showHeader
                    itemsUnit={'items'}
                    itemUnit={'item'}
                    titleText={'Target'}
                />
            </div>
        );
    }
}


Transfer.defaultProps = {
    dataSource: [],
    selectedKeys: [],
    onSelectChange: undefined,
};

Transfer.propTypes = {
    render: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    targetKeys: PropTypes.array.isRequired,
    dataSource: PropTypes.array,
    selectedKeys: PropTypes.array,
    onSelectChange: PropTypes.func,
};
