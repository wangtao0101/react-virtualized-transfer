import React from 'react';
import Transfer from '../src/transfer';

export default class TestTransferList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            targetKeys: [],
            dataSource: [],
        };
        this.getMock = this.getMock.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.getMock();
    }

    getMock() {
        const dataSource = [];
        const targetKeys = [];
        const length = Math.random() * 10000;
        for (let i = 0; i < (length < 1 ? 10 : length); i += 1) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                disabled: i % 3 < 1,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            dataSource.push(data);
        }
        this.setState({
            dataSource,
            selectedKeys: [],
            targetKeys,
        });
    }

    filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
    }

    handleChange(nextTargetKeys, _direction, _moveKeys) {
        this.setState({ targetKeys: nextTargetKeys });
    }

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    render() {
        return (
            <Transfer
                render={item => item.title}
                dataSource={this.state.dataSource}
                targetKeys={this.state.targetKeys}
                selectedKeys={this.state.selectedKeys}
                onSelectChange={this.handleSelectChange}
                onChange={this.handleChange}
            />
        );
    }
}
