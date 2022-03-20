const { Schema } = require("./config");

const DemandSchema = new Schema(
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
    // 关联项目
    relationProject: {
      type: String,
      required: false, 
      default: "",
    },
    // 优先级 (0最高，0,1,2,3)
    priority: {
      type: Number,
      required: true,
      default: 3,
    },
    // 状态 (0: 未开始，1：处理中，2：已提测，3：已驳回，4: 已完成)
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    // 完成时间
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
  },
  {
    versionKey: false,
  }
);

module.exports = DemandSchema;
