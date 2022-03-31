const { Schema } = require("./config");

const BugSchema = new Schema(
  {
    // 受理人
    receiver: {
      type: String,
      required: true,
    },
    // 提交人
    submitter: {
      type: String,
      required: true,
    },
    // 提交时间
    createTime: {
      type: Number,
      required: true,
    },
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 内容
    content: {
      type: String,
      required: false,
    },
    // 关联需求
    // relationDemand: {
    //   type: Array,
    //   required: false, // 后面要改为true
    //   default: [],
    // },
    // 关联项目
    relationProject: {
      type: String,
      required: true, 
      default: "",
    },
    // 优先级 (0最高，0,1,2,3)
    priority: {
      type: Number,
      required: true,
      default: 3,
    },
    // 严重程度 (0最高，0,1,2,3)
    severity: {
      type: Number,
      required: true,
      default: 3,
    },
    // 状态 (0: 未开始，1：处理中，2：已解决，3：已驳回，4: 挂起)
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    // 解决时间
    fixedTime: {
      type: Number,
      required: false,
    },
    // 备注
    remarks: {
      type: String,
      required: false,
    },
    // 总处理时间
    usedTime: {
      type: Number,
      required: false,
    },
    // 缺陷类型 (0:功能问题;1:界面问题;2:兼容问题;3:用户体验问题;4:接口问题;5:性能问题;6:安全问题;7:环境问题;8:程序逻辑错误;9:程序校验错误;10:安全漏洞)
    bugType: {
      type: Number,
      required: false,
      default: 0,
    },
    comments: {
      type: Array,
      required: false,
      default: []
    }
  },
  {
    versionKey: false,
  }
);

module.exports = BugSchema;
