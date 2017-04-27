import React from 'react';
import { Checkbox } from 'antd';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Item extends React.Component {

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    render() {
        const { item, renderedText, renderedEl, style, checked, onClick, prefixCls } = this.props;

        const className = classNames({
            [`${prefixCls}-content-item`]: true,
            [`${prefixCls}-content-item-disabled`]: item.disabled,
        });

        return (
            <li
                className={className}
                style={style}
                title={renderedText}
                onClick={item.disabled ? undefined : () => onClick(item)}
            >
                <Checkbox checked={checked} disabled={item.disabled} />
                <span>{renderedEl}</span>
            </li>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    renderedText: PropTypes.string.isRequired,
    renderedEl: PropTypes.any.isRequired,
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    prefixCls: PropTypes.string.isRequired,
};
