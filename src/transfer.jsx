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
        this.initStateByProps = this.initStateByProps.bind(this);
    }

    componentWillMount() {
        this.initStateByProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        /* TODO: should improve currently 10000/43.44ms*/
        if (nextProps.dataSource !== this.props.dataSource ||
            nextProps.targetKeys !== this.props.targetKeys ||
            nextProps.selectedKeys !== this.props.selectedKeys) {
            this.initStateByProps(nextProps);
        }
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    initStateByProps(props) {
        const leftSource = [];
        const rightSrouce = [];
        const sourceSelectedKeys = [];
        const targetSelectedKeys = [];

        props.dataSource.map((item) => {
            if (props.targetKeys.includes(item.key)) {
                rightSrouce.push(item);
            } else {
                leftSource.push(item);
            }
            return item;
        });

        props.selectedKeys.map((key) => {
            if (props.targetKeys.includes(key)) {
                targetSelectedKeys.push(key);
            } else {
                sourceSelectedKeys.push(key);
            }
            return key;
        });

        this.setState({
            leftSource,
            rightSrouce,
            sourceSelectedKeys,
            targetSelectedKeys,
        });
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
