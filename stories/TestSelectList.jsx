import React from 'react';
import { Button } from 'antd';
import SelectList from '../src/selectList';

export default class TestSelectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            dataSource: [],
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.getMock = this.getMock.bind(this);
    }

    componentWillMount() {
        this.getMock();
    }

    getMock() {
        const dataSource = [];
        const length = Math.random() * 10;
        for (let i = 0; i < (length < 1 ? 10 : length); i += 1) {
            dataSource.push({
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                disabled: i % 3 < 1,
            });
        }
        this.setState({
            dataSource,
            selectedKeys: [],
        });
    }

    filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
    }

    handleSelect(selectedKeys) {
        this.setState({
            selectedKeys,
        });
    }

    renderFooter() {
        return (
            <Button
                size="small"
                style={{ float: 'right', margin: 5 }}
                onClick={this.getMock}
            >
                reload
            </Button>
        );
    }

    render() {
        return (
            <SelectList
                render={item => item.title}
                dataSource={this.state.dataSource}
                selectedKeys={this.state.selectedKeys}
                handleSelect={this.handleSelect}
                footer={this.renderFooter}
                showSearch
                showHeader
                itemsUnit={'items'}
                itemUnit={'item'}
                titleText={'Source'}
                rowHeight={32}
            />
        );
    }
}
