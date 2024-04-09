export const ERROR_MESSAGE = {
  // generateRegOption
  USER_ID_CAN_NOT_BE_EMPTY: "用户名不能为空哦",
  USER_ALREADY_EXIST: "用户名已经存在啦，它必须唯一的说",
  GENERATE_REG_OPTIONS_FAILED: "生成注册选项错误",
  GENERATE_NEW_REG_SESSION_FAILED: "创建注册 Session 时出错了",
  // verifyRegistration
  REG_SESSION_EXPIRE: "注册 Session 过期了",
  VERIFY_REG_RESPONSE_PROCESS_FAILED: "认证过程出错！",
  VERIFY_REG_RESPONSE_FAILED: "认证出错了",
  VERIFY_SAVE_UER_FAILED: "在最后一步出错了，未能成功存储你的密钥",

  //generateAuthOption
  USER_ID_NOT_EXIST: "还没有注册哦",
  GENERATE_AUTH_OPTIONS_FAILED: "生成认证选项错误",
  GENERATE_NEW_AUTH_SESSION_FAILED: "创建认证 Session 时出错了",

  //verifyAuthenticationRes
  AUTH_SESSION_EXPIRE: "注册 Session 过期了",
  USER_ID_NOT_EXIST_IN_VERIFY: "验证时没找到用户名",
  AUTHENTICATOR_NOT_FOUND: "没找着注册的验证器",
  VERIFY_AUTH_RESPONSE_PROCESS_FAILED: "认证的过程出错",
  VERIFY_AUTH_RESPONSE_FAILED: "密钥不对哦",
  CREATE_NEW_SESSION_FAILED: "Session 没有创建成功！",

  // New Comment
  SESSION_EXPIRE: "登陆过期了的说",
  CREATE_COMMENT_FAILED: "创建评论失败了",
  COMMENT_EMPTY: "评论不能为空",

  //client auth
  USER_CANCELED: "出错了！可能是你取消了认证",
};

export const SUCCEED_MESSAGE = {
  OPTION_GENERATE_SUCCEED: "成功生成 Option，请完成认证！",
  REGISTER_SUCCEED: "注册成功！正在跳转...",
  AUTH_SUCCEED: "认证成功！正在跳转...",
  COMMENT_SUCCEED: "评论成功",
};
