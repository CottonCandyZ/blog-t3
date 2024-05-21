export const ERROR_MESSAGE = {
  // generateRegOption
  USER_ID_CAN_NOT_BE_EMPTY: '用户名不能为空哦',
  GENERATE_REG_OPTIONS_FAILED: '生成注册选项错误',

  // verifyRegistration
  VERIFY_REG_RESPONSE_PROCESS_FAILED: '认证过程出错！',
  VERIFY_REG_RESPONSE_FAILED: '认证出错了',

  // generateAuthOption
  GENERATE_AUTH_OPTIONS_FAILED: '生成认证选项错误',
  GENERATE_NEW_AUTH_SESSION_FAILED: '创建认证 Session 时出错了',

  // verifyAuthenticationRes
  AUTHENTICATOR_NOT_FOUND: '没找着注册的验证器',
  VERIFY_AUTH_RESPONSE_PROCESS_FAILED: '认证的过程出错',
  VERIFY_AUTH_RESPONSE_FAILED: '密钥不对哦',

  // SESSION
  SESSION_NOT_FOUND: '还没登录呢',
  SESSION_EXPIRE: '登录过期了',
  AUTH_SESSION_EXPIRE: '验证 Session 过期了',
  AUTH_SESSION_NOT_FOND: '找不到验证 Session',

  // New Comment
  NEW_COMMENT_COMMENT_EMPTY: '评论不能为空',

  // client auth
  CLIENT_USER_CANCELED: '出错了！可能是你取消了认证',
  ADD_DEVICE_CANCELED: '出错了！可能是取消了或尝试添加重复的 key',

  // remove device
  ONLY_ONE_DEVICE_REMAIN: '只剩一个设备，不可以移除哦',
  REMOVE_DEVICE_SQL_ERROR: '移除失败，可能是网络错误！',

  // add device
  NO_DEVICE_REGISTER_BEFORE: '未找到已注册的设备',

  // ZOD
  ZOD_FORM_DATA_TYPE_ERROR: '数据类型错误',

  // DB
  DB_COMMENTS_LOAD_ERROR: '评论区加载失败',
  DB_ERROR: '数据库连接错误',

  // Fetch
  FETCH_AAGUID_LIST_ERROR: '获取 AAGUID LIST 失败',
}

export const SUCCEED_MESSAGE = {
  OPTION_GENERATE: '成功生成 Option，请完成认证！',
  REGISTER_FINISH: '注册成功！正在跳转...',
  AUTH_FINISH: '认证成功！正在跳转...',
  COMMENT_SUCCEED: '评论成功',
  ADD_DEVICE_SUCCEED: '成功添加了设备！',
  REMOVE_DEVICE_SUCCEED: '成功移除了设备！',

  // DB
  DB_READ_SUCCEED: '查找成功',
  // FETCH
  FETCH_SUCCESS: '获取成功',
}

export function resMessageError(errorKey: keyof typeof ERROR_MESSAGE) {
  return { message: ERROR_MESSAGE[errorKey], success: false, data: undefined }
}

export function resMessageSuccess<T = undefined>(
  successKey: keyof typeof SUCCEED_MESSAGE,
  data?: T,
) {
  return { message: SUCCEED_MESSAGE[successKey], success: true, data }
}
