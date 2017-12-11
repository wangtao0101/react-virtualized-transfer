import React from 'react';
import { storiesOf } from '@storybook/react';
import TestTransfer from './TestTransfer';
import TestSelectList from './TestSelectList';
import '../src/less';

storiesOf('Transfer', module)
.add('basic', () => (
    <TestTransfer />
));

storiesOf('MitiSelect', module)
.add('basic', () => (
    <TestSelectList />
));
