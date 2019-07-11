/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-05 16:25:38
 * @modify date 2019-06-05 16:25:38
 * @desc [提交登录组件]
 */
import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import styles from './index.less';

const FormItem = Form.Item;

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.SFC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};

export default LoginSubmit;
