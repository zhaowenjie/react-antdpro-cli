/**
 * @author [zhaowenjie]
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-03 14:39:31
 * @modify date 2019-06-03 14:39:31
 * @desc [表单校验规则]
 * @rule [https://ant.design/components/form-cn/#components-form-demo-validate-static]
 */
import Reg from '@/utils/regexp';

export default {
  phone: [
    {
      required: true,
      message: '手机号不能为空',
    },
    {
      pattern: Reg.phone,
      message: '请输入正确的手机号',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
    },
    {
      pattern: Reg.email,
      message: '邮箱格式错误',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
    },
    {
      pattern: Reg.password,
      message: '请输入6-20位字母和数字组合',
    },
  ],
};
