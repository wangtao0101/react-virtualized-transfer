import React from 'react';
import { render, mount } from 'enzyme';

import { Button } from 'antd';
import Transfer from '../transfer';
import Operation from '../operation';
import Item from '../item';
import Search from '../search';
import SelectList from '../selectList';

jest.useFakeTimers();

const commonProps = {
    dataSource: [{
        key: 'a',
        title: 'a',
    }, {
        key: 'b',
        title: 'b',
    }, {
        key: 'c',
        title: 'c',
        disabled: true,
    }],
    selectedKeys: ['a'],
    targetKeys: ['c', 'b'],
    render: item => item.title,
    rowHeight: 32,
};

const searchTransferProps = {
    dataSource: [
        {
            key: '0',
            title: 'content1',
            description: 'description of content1',
            chosen: false,
        },
        {
            key: '1',
            title: 'content2',
            description: 'description of content2',
            chosen: false,
        },
        {
            key: '2',
            title: 'content3',
            description: 'description of content3',
            chosen: false,
        },
        {
            key: '3',
            title: 'content4',
            description: 'description of content4',
            chosen: false,
        },
        {
            key: '4',
            title: 'content5',
            description: 'description of content5',
            chosen: false,
        },
        {
            key: '5',
            title: 'content6',
            description: 'description of content6',
            chosen: false,
        },
    ],
    selectedKeys: [],
    targetKeys: ['3', '4'],
    render: item => item.title,
    rowHeight: 32,
};

describe('Transfer', () => {
    it('should render correctly and should show sorted targetkeys', () => {
        const wrapper = render(
            <Transfer
                {...commonProps}
            />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should move selected keys to corresponding list', () => {
        const handleChange = jest.fn();
        const wrapper = mount(<Transfer {...commonProps} onChange={handleChange} />);
        wrapper.find(Operation).find(Button).at(1).simulate('click');
        expect(handleChange).toHaveBeenCalledWith(['a', 'c', 'b'], 'right', ['a']);
    });

    it('should uncheck checkbox when click on checked item', () => {
        const handleSelectChange = jest.fn();
        const wrapper = mount(<Transfer {...commonProps} onSelectChange={handleSelectChange} />);
        wrapper.find(Item).filterWhere(n => n.prop('item').key === 'a').simulate('click');
        expect(handleSelectChange).toHaveBeenLastCalledWith([], []);
    });

    it('should check checkbox when click on unchecked item', () => {
        const handleSelectChange = jest.fn();
        const wrapper = mount(<Transfer {...commonProps} onSelectChange={handleSelectChange} />);
        wrapper.find(Item).filterWhere(n => n.prop('item').key === 'b').simulate('click');
        expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], ['b']);
    });

    it('should check all item when click on check all and disabled item should not be checked', () => {
        const handleSelectChange = jest.fn();
        const wrapper = mount(<Transfer {...commonProps} onSelectChange={handleSelectChange} />);
        wrapper.find('.transfer-list-header input[type="checkbox"]')
            .filterWhere(n => !n.prop('checked')).simulate('change');
        expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b']);
    });

    it('should uncheck all item when click on uncheck all', () => {
        const handleSelectChange = jest.fn();
        const wrapper = mount(<Transfer {...commonProps} onSelectChange={handleSelectChange} />);
        wrapper.find('.transfer-list-header input[type="checkbox"]')
            .filterWhere(n => n.prop('checked')).simulate('change');
        expect(handleSelectChange).toHaveBeenCalledWith([], []);
    });

    it('should transfer just the filtered item after search by input', () => {
        const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
        const handleChange = jest.fn();
        let wrapper;
        const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
            wrapper.setProps({
                selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
            });
        };
        wrapper = mount(
            <Transfer
                {...searchTransferProps}
                showSearch
                filterOption={filterOption}
                onSelectChange={handleSelectChange}
                onChange={handleChange}
            />
        );
        wrapper.find(Search).at(0).find('input')
            .simulate('change', { target: { value: 'content2' } });
        jest.runAllTimers();
        wrapper.find(SelectList).at(0).find('.transfer-list-header input[type="checkbox"]').filterWhere(n => !n.prop('checked'))
            .simulate('change');
        wrapper.find(Operation).find(Button).at(1).simulate('click');
        expect(handleChange).toHaveBeenCalledWith(['1', '3', '4'], 'right', ['1']);
    });
});
