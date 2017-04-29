import React from 'react';
import SelectList from '../src/selectList';

export default class TestSelectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectKey: [],
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectKey) {
        this.setState({
            selectKey,
        });
    }

    filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
    }

    render() {
        const dataSource = [];
        for (let i = 0; i < 2000; i += 1) {
            dataSource.push({
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                disabled: i % 3 < 1,
            });
        }
        return (
            <SelectList
                render={item => item.title}
                dataSource={dataSource}
                selectKey={this.state.selectKey}
                handleSelect={this.handleSelect}
            />
        );
    }
}
