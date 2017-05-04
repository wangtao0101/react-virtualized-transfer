import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';

function noop() {
}

export default class Operation extends React.Component {
    render() {
        const { moveToLeft, moveToRight, leftArrowText,
            rightArrowText, leftActive, rightActive, className } = this.props;
        const moveToLeftButton = (<Button type="primary" size="small" disabled={!leftActive} onClick={moveToLeft}>
            {<span><Icon type="left" />{leftArrowText}</span>}
        </Button>);
        const moveToRightButton = (<Button type="primary" size="small" disabled={!rightActive} onClick={moveToRight}>
            {<span>{rightArrowText}<Icon type="right" /></span>}
        </Button>);
        return (<div className={className}>
            {moveToLeftButton}
            {moveToRightButton}
        </div>);
    }
}

Operation.defaultProps = {
    leftArrowText: '',
    rightArrowText: '',
    moveToLeft: noop,
    moveToRight: noop,
};

Operation.propTypes = {
    moveToLeft: PropTypes.func,
    moveToRight: PropTypes.func,
    leftArrowText: PropTypes.string,
    rightArrowText: PropTypes.string,
    leftActive: PropTypes.bool.isRequired,
    rightActive: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
};
