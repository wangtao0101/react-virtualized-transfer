import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Item from '../src/item';
import Transfer from '../src/transfer';
import SelectList from '../src/selectList';
import '../src/transfer.less';

storiesOf('Transfer', module)
  .add('item', () => (
    <Item />
  ))
  .add('SelectList', () => (
    <SelectList />
  ))
  .add('Transfer', () => (
    <Transfer />
  ));
