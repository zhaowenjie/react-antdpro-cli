import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import Avatar from './AvatarDropdown';

class GlobalHeaderRight extends Component {
  render() {
    const { theme, layout } = this.props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({
            id: 'component.globalHeader.search',
          })}
          dataSource={[
            formatMessage({
              id: 'component.globalHeader.search.example1',
            }),
            formatMessage({
              id: 'component.globalHeader.search.example2',
            }),
            formatMessage({
              id: 'component.globalHeader.search.example3',
            }),
          ]}
          onSearch={value => {
            console.log('input', value); // tslint:disable-line no-console
          }}
          onPressEnter={value => {
            console.log('enter', value); // tslint:disable-line no-console
          }}
        />
        <Tooltip
          title={formatMessage({
            id: 'component.globalHeader.help',
          })}
        >
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started-cn"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>

        <a
          target="_blank"
          href="https://preview.pro.ant.design/dashboard/analysis"
          rel="noopener noreferrer"
          className={styles.action}
        >
          proDemo
        </a>
        <a
          target="_blank"
          href="https://v2-pro.ant.design/components/charts-cn"
          rel="noopener noreferrer"
          className={styles.action}
        >
          pro组件
        </a>
        <a
          target="_blank"
          href="https://umijs.org/zh/guide/block.html"
          rel="noopener noreferrer"
          className={styles.action}
        >
          umi
        </a>
        <a
          target="_blank"
          href="https://ant.design/docs/react/introduce-cn"
          rel="noopener noreferrer"
          className={styles.action}
        >
          antd
        </a>
        <Avatar menu />
        <SelectLang className={styles.action} />
      </div>
    );
  }
}

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
