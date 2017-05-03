import 'react-virtualized/styles.css';
import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import PropTypes from 'prop-types';
import 'core-js/fn/array/includes';
import './transfer.less';
import SelectList from './selectList';

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
    }

    componentWillMount() {
        const { dataSource, targetKeys, selectedKeys } = this.props;
        this.setState({
            leftSource: dataSource.filter(item => !targetKeys.includes(item.key)),
            rightSrouce: dataSource.filter(item => targetKeys.includes(item.key)),
            sourceSelectedKeys: selectedKeys.filter(key => !targetKeys.includes(key)),
            targetSelectedKeys: selectedKeys.filter(key => targetKeys.includes(key)),
        });
    }

    componentWillReceiveProps(nextProps) {
        /* TODO: should improve currently 10000/43.44ms*/
        if (nextProps.dataSource !== this.props.dataSource ||
            nextProps.targetKeys !== this.props.targetKeys ||
            nextProps.selectedKeys !== this.props.selectedKeys) {
            this.setState({
                leftSource: nextProps.dataSource
                    .filter(item => !nextProps.targetKeys.includes(item.key)),
                rightSrouce: nextProps.dataSource
                    .filter(item => nextProps.targetKeys.includes(item.key)),
                sourceSelectedKeys: nextProps.selectedKeys
                    .filter(key => !nextProps.targetKeys.includes(key)),
                targetSelectedKeys: nextProps.selectedKeys
                    .filter(key => nextProps.targetKeys.includes(key)),
            });
        }
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    handleSelect(direction, selectedKeys) {
        if (direction === 'left') {
            this.props.onSelectChange(selectedKeys, this.state.targetSelectedKeys);
        } else {
            this.props.onSelectChange(this.state.sourceSelectedKeys, selectedKeys);
        }
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
    targetKeys: [],
    selectedKeys: [],
};

Transfer.propTypes = {
    render: PropTypes.func.isRequired,
    dataSource: PropTypes.array,
    selectedKeys: PropTypes.array,
    targetKeys: PropTypes.array,
    onSelectChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
