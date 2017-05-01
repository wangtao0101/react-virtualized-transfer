import 'react-virtualized/styles.css';
import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import './transfer.less';
import SelectList from './selectList';

export default class Transfer extends React.Component {

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    render() {
        return (
            <div>
                <SelectList
                    render={item => item.title}
                    dataSource={this.state.dataSource}
                    selectKeys={this.state.selectKeys}
                    handleSelect={this.handleSelect}
                    footer={this.renderFooter}
                    showSearch
                    showHeader
                    itemsUnit={'items'}
                    itemUnit={'item'}
                    titleText={'Source'}
                />
                <SelectList
                    render={item => item.title}
                    dataSource={this.state.dataSource}
                    selectKeys={this.state.selectKeys}
                    // handleSelect={this.handleSelect}
                    // footer={this.renderFooter}
                    showSearch
                    showHeader
                    itemsUnit={'items'}
                    itemUnit={'item'}
                    titleText={'Source'}
                />
            </div>
        );
    }
}
