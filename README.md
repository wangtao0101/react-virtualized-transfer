# react-virtualized-transfer

[![NPM version](https://img.shields.io/npm/v/react-virtualized-transfer.svg?style=flat)](https://www.npmjs.com/package/react-virtualized-transfer)
[![Build Status](https://img.shields.io/travis/wangtao0101/react-virtualized-transfer.svg?style=flat)](https://travis-ci.org/wangtao0101/react-virtualized-transfer)
[![codecov](https://codecov.io/gh/wangtao0101/react-virtualized-transfer/branch/master/graph/badge.svg)](https://codecov.io/gh/wangtao0101/react-virtualized-transfer)

Transfer component with virtualization based on [antd](https://github.com/ant-design/ant-design), and 10 times performance than antd transfer!

To develop fast, some code and file maybe come from antd, thank to the great project!

Example: https://wangtao0101.github.io/react-virtualized-transfer/

## Break Change
use css.js and less.js to help import css or less !!
support es version !!

## Motivation
We should handle more than 10 thousands of data, but the transfer component in antd is very slow when the number comes to 1000

## Difference with antd
1. needs rowHeight prop (since using [react virtualized](https://github.com/bvaughn/react-virtualized))
2. fast without using [Animate](https://github.com/react-component/animate)
3. no i18n, user should realize by yourself

## Getting started
```
npm install react-virtualized-transfer --save
yarn add react-virtualized-transfer
```

Use css version
```
import Transfer from 'react-virtualized-transfer';

require('react-virtualized-transfer/lib/css')
// or
require('react-virtualized-transfer/es/css')
```
Use less version, then you can [modify less variable](https://ant.design/docs/react/customize-theme-cn)
```
import Transfer from 'react-virtualized-transfer';

require('react-virtualized-transfer/lib/less')
// or
require('react-virtualized-transfer/es/less')
```

## API (not support means antd support but react-virtualized-transfer not support)

| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| rowHeight  | rowHeight for each item | number | 32
| dataSource | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in `targetKeys` prop. | [TransferItem](https://git.io/vMM64)[] | [] |
| render | The function to generate the item shown on a column. Based on an record (element of the dataSource array), this function should return a React element which is generated from that record. | Function(record) |     |
| targetKeys | A set of keys of elements that are listed on the right column. | string[] | [] |
| selectedKeys | A set of keys of selected items. | string[] | [] |
| onChange | A callback function that is executed when the transfer between columns is complete. | (targetKeys, direction, moveKeys): void | |
| onSelectChange | A callback function which is executed when selected items are changed. | (sourceSelectedKeys, targetSelectedKeys): void | |
| onScroll(not support) | A callback function which is executed when scroll options list | (direction, event): void | |
| listStyle | A custom CSS style used for rendering the transfer columns. | object |  |
| className | A custom CSS class. | string | ['', ''] |
| titles | A set of titles that are sorted from left to right. | string[] | - |
| operations | A set of operations that are sorted from top to bottom. | string[] | [] |
| showSearch | If included, a search box is shown on each column. | boolean | false |
| filterOption | A function to determine whether an item should show in search result list | (inputValue, option): boolean | |
| searchPlaceholder | The hint text of the search box. | string | 'Search here' |
| notFoundContent | Text to display when a column is empty. | string\|ReactNode | 'The list is empty'  |
| footer | A function used for rendering the footer. | (props): ReactNode |  |
| lazy(not support) | property of [react-lazy-load](https://github.com/loktar00/react-lazy-load) for lazy rendering items | object | `{ height: 32, offset: 32 }` |
| onSearchChange(not support) | A callback function which is executed when search field are changed | (direction: 'left'\|'right', event: Event): void | - |


## Example 
example from [antd transfer](https://ant.design/components/transfer/)
```js
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
        const length = 5000;
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
                render={item => `${item.title}-${item.description}`}
                dataSource={this.state.dataSource}
                targetKeys={this.state.targetKeys}
                selectedKeys={this.state.selectedKeys}
                onSelectChange={this.handleSelectChange}
                filterOption={this.filterOption}
                onChange={this.handleChange}
                titles={['source', 'target']}
                className={'test'}
                rowHeight={32}
                listStyle={{
                    width: '40%',
                    height: 400,
                }}
                operations={['to right', 'to left']}
                showSearch
                notFoundContent={'not found'}
                searchPlaceholder={'Search'}
            />
        );
    }
}
```


## Roadmap
- [ ] onSearchChange props
- [ ] onScroll props
- [ ] full test
- [ ] more example and compare with antd
