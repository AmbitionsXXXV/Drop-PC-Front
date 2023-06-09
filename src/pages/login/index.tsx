import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText
} from "@ant-design/pro-components";
import { Divider, message, Space, Tabs } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.module.less";
import { LOGIN, SEND_CODE_MSG } from "@/graphql/auth";
import { useMutation } from "@apollo/client";
import { useTitle } from "@/hooks";
import { AUTH_TOKEN } from "@/utils/constants";

interface IValue {
  tel: string;
  code: string;
  autoLogin: boolean;
}

type LoginType = "phone" | "account";

const Login = () => {
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>("phone");

  useTitle("登录");

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values
    });
    if (res.data.login.code === 200) {
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, "");
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, "");
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav(params.get("orgUrl") || "/");
      return;
    }
    message.error(res.data.login.message);
  };

  return (
    <div className="bg-white h-full m-[-24px] overflow-hidden">
      <LoginFormPage
        initialValues={{ tel: "19357227510" }}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
        onFinish={loginHandler}
        // actions={
        //   <div className="flex flex-col justify-center items-center">
        //     <Divider plain>
        //       <span className="text-gray-400 font-normal text-sm">其他登录方式</span>
        //     </Divider>
        //     <Space align="center" size={24}>
        //       <div className="flex flex-col justify-center items-center h-10 w-10 border-spacing-1 border-solid border-gray-200 rounded-full">
        //         <AlipayOutlined className="icon text-[#1677FF]" />
        //       </div>
        //       <div className="flex flex-col justify-center items-center h-10 w-10 border-spacing-1 border-solid border-gray-200 rounded-full">
        //         <TaobaoOutlined className="icon text-[#FF6A10]" />
        //       </div>
        //       <div className="flex flex-col justify-center items-center h-10 w-10 border-spacing-1 border-solid border-gray-200 rounded-full">
        //         <WeiboOutlined className="icon text-orange-400 hover:shadow-md" />
        //       </div>
        //     </Space>
        //   </div>
        // }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={activeKey => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
          <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
        </Tabs>
        {loginType === "account" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />
              }}
              placeholder={"用户名: admin or user"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!"
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />
              }}
              placeholder={"密码: password"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！"
                }
              ]}
            />
          </>
        )}
        {loginType === "phone" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />
              }}
              name="mobile"
              placeholder={"手机号"}
              rules={[
                {
                  required: true,
                  message: "请输入手机号！"
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！"
                }
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />
              }}
              captchaProps={{
                size: "large"
              }}
              placeholder={"请输入验证码"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！"
                }
              ]}
              onGetCaptcha={async (tel: string) => {
                const res = await run({
                  variables: {
                    tel
                  }
                });
                if (res.data.sendCodeMsg.code === 200) {
                  message.success(res.data.sendCodeMsg.message);
                } else {
                  message.error(res.data.sendCodeMsg.message);
                }
              }}
            />
          </>
        )}
        <div className="mb-6">
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right"
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
