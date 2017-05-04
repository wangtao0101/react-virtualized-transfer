import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';

function noop() {
}

const Operation = ({ moveToLeft, moveToRight, leftArrowText,
    rightArrowText, leftActive, rightActive, className }) => {
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
};

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

export default Operation;
