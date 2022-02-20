import { IForm } from "@/base-ui/form/index";
export const fromConfig: IForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "20px 60px"
  },
  // colLayout :{
  //   span: 8
  // };
  formItems: [
    {
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      type: "password",
      label: "密码",
      placeholder: "请输入密码"
    },
    {
      type: "select",
      label: "喜欢的运动",
      placeholder: "请选择喜欢的运动",
      options: [
        {
          label: "篮球",
          value: "basketball"
        }
      ]
    },
    {
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ]
};
