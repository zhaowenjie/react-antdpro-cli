import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ItemMap from './map';
import LoginContext, { ILoginContext } from './LoginContext';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WrappedLoginItemProps = Omit<LoginItemProps, 'form' | 'type' | 'updateActive'>;
export type LoginItemKeyType = keyof typeof ItemMap;
export type LoginItemType = { [K in keyof typeof ItemMap]: React.FC<WrappedLoginItemProps> };

export interface LoginItemProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  onGetCaptcha?: (event?: MouseEvent) => void | Promise<any> | false;
  placeholder?: string;
  buttonText?: React.ReactNode;
  onPressEnter?: (e: any) => void;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: ILoginContext['updateActive'];
  type?: string;
  defaultValue?: string;
  form?: FormComponentProps['form'];
  customProps?: { [key: string]: any };
  onChange?: (e: any) => void;
  tabUtil?: any;
}

interface LoginItemState {
  count: number;
}

const FormItem = Form.Item;

class WrapFormItem extends Component<LoginItemProps, LoginItemState> {
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };

  interval: number | undefined;

  constructor(props: LoginItemProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { updateActive, name = '' } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }: LoginItemProps) => {
    const options: {
      rules?: Array<any>;
      onChange?: LoginItemProps['onChange'];
      initialValue?: LoginItemProps['defaultValue'];
    } = {
      rules: rules || customProps.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      form,
      tabUtil,
      ...restProps
    } = this.props;
    if (!name) {
      return null;
    }
    if (!form) {
      return null;
    }
    const { getFieldDecorator } = form;
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customProps} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {context => {
        return (
          <WrapFormItem
            customProps={item.props}
            rules={item.rules}
            {...props}
            type={key}
            {...context}
            updateActive={context.updateActive}
          />
        );
      }}
    </LoginContext.Consumer>
  );
});

export default LoginItem as LoginItemType;
