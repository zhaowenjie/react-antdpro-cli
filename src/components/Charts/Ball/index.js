/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-13 13:51:43
 * @modify date 2019-06-13 13:51:43
 * @desc [小球组件]
 */
import React, { Component } from 'react';
import styles from './index.less';

class Ball extends Component {
  render() {
    const { children, type } = this.props;
    const ballClassName = `${styles.ball} ${type === 'error' ? styles.error : ''}`;
    return <div className={ballClassName}>{children}</div>;
  }
}

export default Ball;
