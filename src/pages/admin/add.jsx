import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message, Card } from 'antd';
import { Link, useRequest, history, useModel } from 'umi';
import { register } from './service';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import * as services from './service';

const FormItem = Form.Item;

const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = () => {
  const { initialState } = useModel('@@initialState');
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('Re_password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const onFinish = async (values) => {
    // eslint-disable-next-line no-param-reassign
    values.Re_id = 123;
    /* values.Re_id = initialState.currentUser.Re_id; */
    const msg = await services.pwd(values);
    if (msg.result === 'true') {
      message.success('修改成功');
    } else {
      message.error('修改失败');
    }
    form.resetFields();
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('Re_password')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    } // 有值的情况

    if (!visible) {
      setVisible(!!value);
    }

    setPopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('Re_password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <PageContainer>
      <Card>
        <div className={styles.main}>
          <Form form={form} name="UserRegister" onFinish={onFinish}>
            <FormItem name="Re_id">
              <Input
                size="large"
                placeholder="用户ID （学号）"
                defaultValue={123} /* {initialState.currentUser.Re_id} */
                disabled
              />
            </FormItem>
            <FormItem
              name="Re_old_password"
              rules={[
                {
                  required: true,
                  message: '请输入旧密码',
                },
              ]}
            >
              <Input size="large" type="password" placeholder="请输入旧密码" />
            </FormItem>
            <Popover
              getPopupContainer={(node) => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                visible && (
                  <div
                    style={{
                      padding: '4px 0',
                    }}
                  >
                    {passwordStatusMap[getPasswordStatus()]}
                    {renderPasswordProgress()}
                    <div
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                    </div>
                  </div>
                )
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            >
              <FormItem
                name="Re_password"
                className={
                  form.getFieldValue('Re_password') &&
                  form.getFieldValue('Re_password').length > 0 &&
                  styles.password
                }
                rules={[
                  {
                    validator: checkPassword,
                  },
                ]}
              >
                <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
              </FormItem>
            </Popover>
            <FormItem
              name="confirm"
              rules={[
                {
                  required: true,
                  message: '确认密码',
                },
                {
                  validator: checkConfirm,
                },
              ]}
            >
              <Input size="large" type="password" placeholder="确认密码" />
            </FormItem>
            <FormItem>
              <Button size="large" className={styles.submit} type="primary" htmlType="submit">
                <span>添加</span>
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Register;
