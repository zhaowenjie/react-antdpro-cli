import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/lib/form';
import LoginComponents from './components/Login';
import { IStateType } from './model';
import _rule from '@/utils/formRules';

const styles = require('./style.less');

const { Password, Mobile, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<any>;
  userLogin: IStateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
}
export interface FromDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    userLogin,
    loading,
  }: {
    userLogin: IStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userLogin,
    submitting: loading.effects['userLogin/login'],
  }),
)
class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  loginForm: FormComponentProps['form'] | undefined | null;

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  // 提交登录
  handleSubmit = (err: any, values: FromDataType) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: {
          phoneNo: values.mobile,
          password: values.password,
        },
      });
    }
  };

  render() {
    const { submitting } = this.props;
    const { type } = this.state;
    const rules = {
      phone: _rule.phone,
    };
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          <Mobile
            defaultValue="15012012345"
            name="mobile"
            placeholder="手机号: 15012012345"
            rules={rules.phone}
          />
          <Password
            defaultValue="a111111"
            name="password"
            placeholder={`${formatMessage({ id: 'user-login.login.password' })}: a111111`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'user-login.password.required' }),
              },
            ]}
            onPressEnter={() => this.loginForm && this.loginForm.validateFields(this.handleSubmit)}
          />
          <Submit loading={submitting} className={styles.submit}>
            登录
          </Submit>
          <div className={styles.other} />
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
