import React from 'react';
import { render } from 'enzyme';

import Transfer from '../transfer';

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
};

describe('Transfer', () => {
    it('should render correctly and should show sorted targetkeys', () => {
        const wrapper = render(
            <Transfer
                {...commonProps}
                render={item => item.title} rowHeight={32}
            />);
        expect(wrapper).toMatchSnapshot();
    });
});
