import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TestSelectList from './TestSelectList';
import TestTransfer from './TestTransfer';
import '../src/transfer.less';

storiesOf('Transfer', module)
    .add('SelectList', () => (
        <TestSelectList />
    ))
    .add('transfer', () => (
        <TestTransfer />
    ));
