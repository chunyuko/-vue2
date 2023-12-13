// 缓存的常量名称

// 通用前缀
export const PREFIX =
  'DLSYSTEM_' + (process.env.DEV ? 'DEV_' : 'PROD_') + process.env.VUE_APP_PROJECT_VERSION + '_'

// token
export const TOKEN = PREFIX + 'Token'

// 用户权限
export const ROLES = PREFIX + 'Roles'

//多页签
export const TABLIST = PREFIX + 'LayoutTabList'
