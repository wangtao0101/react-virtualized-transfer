import 'react-virtualized/styles.css';
import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
        this.moveTo = this.moveTo.bind(this);
        this.moveToLeft = this.moveToLeft.bind(this);
        this.moveToRight = this.moveToRight.bind(this);
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

    getSelectedKeysName(direction) {
        return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    }

    initStateByProps(props, update) {
        const leftSource = [];
        const rightSrouce = [];
        const sourceSelectedKeys = [];
        const targetSelectedKeys = [];
        const oldSourceSelectedKeys = this.state.sourceSelectedKeys;
        const oldTargetSelectedKeys = this.state.targetSelectedKeys;

        props.dataSource.forEach((item) => {
            if (props.targetKeys.includes(item.key)) {
                rightSrouce.push(item);
            } else {
                leftSource.push(item);
            }

            if (!props.selectedKeys && update) {
                // fitler not exist keys
                if (oldSourceSelectedKeys.includes(item.key) &&
                    !props.targetKeys.includes(item.key)) {
                    sourceSelectedKeys.push(item.key);
                }
                if (oldTargetSelectedKeys.includes(item.key) &&
                    props.targetKeys.includes(item.key)) {
                    targetSelectedKeys.push(item.key);
                }
            }
        });

        if (props.selectedKeys) {
            props.selectedKeys.forEach((key) => {
                if (props.targetKeys.includes(key)) {
                    targetSelectedKeys.push(key);
                } else {
                    sourceSelectedKeys.push(key);
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
        this.props.onSelectChange(leftKeys, rightKeys);
    }

    moveTo(direction) {
        const { targetKeys = [], dataSource = [], onChange } = this.props;
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;
        const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;

        const newMoveKeys = [];
        // disable key can be selected in props, so there should fitler disabled keys
        dataSource.forEach((item) => {
            if (!item.disabled && moveKeys.includes(item.key)) {
                newMoveKeys.push(item.key);
            }
        });
        // move items to target box
        const newTargetKeys = direction === 'right'
            ? newMoveKeys.concat(targetKeys)
            : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);
        // empty checked keys
        const oppositeDirection = direction === 'right' ? 'left' : 'right';
        this.setState({
            [this.getSelectedKeysName(oppositeDirection)]: [],
        });
        this.handleSelect(oppositeDirection, []);
        if (onChange) {
            onChange(newTargetKeys, direction, newMoveKeys);
        }
    }

    moveToLeft() { this.moveTo('left'); }
    moveToRight() { this.moveTo('right'); }

    render() {
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;
        const { titles, className, filterOption } = this.props;
        const leftActive = targetSelectedKeys.length > 0;
        const rightActive = sourceSelectedKeys.length > 0;

        const cls = classNames({
            [`${prefixCls}`]: true,
        }, className);

        return (
            <div className={cls}>
                <SelectList
                    dataSource={this.state.leftSource}
                    render={this.props.render}
                    selectedKeys={this.state.sourceSelectedKeys}
                    handleSelect={selectedKeys => this.handleSelect('left', selectedKeys)}
                    showSearch
                    showHeader
                    filterOption={filterOption}
                    itemsUnit={'items'}
                    itemUnit={'item'}
                    titleText={titles[0]}
                    rowHeight={this.props.rowHeight}
                    style={this.props.listStyle}
                />
                <Operation
                    className={`${prefixCls}-operation`}
                    leftActive={leftActive}
                    rightActive={rightActive}
                    moveToLeft={this.moveToLeft}
                    moveToRight={this.moveToRight}
                    leftArrowText={this.props.operations[0]}
                    rightArrowText={this.props.operations[1]}
                />
                <SelectList
                    dataSource={this.state.rightSrouce}
                    render={this.props.render}
                    selectedKeys={this.state.targetSelectedKeys}
                    handleSelect={selectedKeys => this.handleSelect('right', selectedKeys)}
                    showSearch
                    showHeader
                    filterOption={filterOption}
                    itemsUnit={'items'}
                    itemUnit={'item'}
                    titleText={titles[1]}
                    rowHeight={this.props.rowHeight}
                    style={this.props.listStyle}
                />
            </div>
        );
    }
}


Transfer.defaultProps = {
    dataSource: [],
    selectedKeys: undefined,
    onSelectChange: undefined,
    titles: ['', ''],
    className: undefined,
    filterOption: undefined,
    listStyle: {
        width: 200,
        height: 300,
    },
    operations: ['', ''],
};

Transfer.propTypes = {
    dataSource: PropTypes.array,
    render: PropTypes.func.isRequired,
    targetKeys: PropTypes.array.isRequired,
    selectedKeys: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func,
    titles: PropTypes.array,
    className: PropTypes.string,
    filterOption: PropTypes.func,
    rowHeight: PropTypes.number.isRequired,
    listStyle: PropTypes.shape({
        height: PropTypes.number.isRequired, // not support %
        width: PropTypes.any,
    }),
    operations: PropTypes.array,
};
