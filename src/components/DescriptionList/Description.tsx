/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-12 16:48:59
 * @modify date 2019-06-12 16:48:59
 * @desc [https://v2-pro.ant.design/components/description-list-cn]
 */
import React from 'react';
import { Col } from 'antd';
import { ColProps } from 'antd/es/col';
import styles from './index.less';
import responsive from './responsive';

export interface DescriptionProps extends ColProps {
  column?: number;
  key?: string | number;
  style?: React.CSSProperties;
  term?: React.ReactNode;
}

const Description: React.SFC<DescriptionProps> = props => {
  const { term, column = 3, children, ...restProps } = props;
  return (
    <Col {...responsive[column]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children !== null && children !== undefined && (
        <div className={styles.detail}>{children}</div>
      )}
    </Col>
  );
};

export default Description;
