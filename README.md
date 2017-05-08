# react-virtualized-transfer
Transfer component with virtualization based on [antd](https://github.com/ant-design/ant-design), and 10 times performance than antd transfer!

To develop fast, some code and file maybe come from antd, thank to the great project!

Example: https://wangtao0101.github.io/react-virtualized-transfer/

## Motivation
We should handle more then 10 thousands of data, but the transfer compoment in antd is very slowly when the number come to 1000

## Difference from antd
1. react-virtualized-transfer need rowHeight prop (since react-virtualized-transfer use [react virtualized](https://github.com/bvaughn/react-virtualized))
2. react-virtualized-transfer is fast without using [Animate](https://github.com/react-component/animate)

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
