const { Schema } = require("./config");

const ProjectSchema = new Schema(
  {
    // 项目名
    projectName: {
      type: String,
      required: true,
    },
    // 项目详情
    details: {
      type: String,
      required: false,
      default: ""
    },
    // 开始时间
    startTime: {
      type: Number,
      required: true,
      default: 0,
    },
    // 结束时间
    endTime: {
      type: String,
      required: false,
    }, 
    // 项目需求列表
    demandList: {
      type: Array,
      required: false,
      default: [],
    },
    // 项目进度
    process: {
      type: Number,
      required: true, 
      default: 0,
    },
    // 创建人 
    creator: {
      type: String,
      required: true,
    },
    // 项目状态 (0正在沟通,1准备就绪待启动,2已启动进行中,3暂时挂起,4已完成)
    state: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = ProjectSchema;
