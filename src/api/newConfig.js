// 此文件为路由根路径及路由地址统一存储文件，望各位开发人员做好代码注释工作，切记！重要！
const API = '/api' // 根路径  39.98.113.250:8303（供应链协同）

export default {
    'query_zyxx_list': `${API}/bfsp-portal/portal/index`,
    'getInfo': `${API}/ifsp-auth/info`,
    'getNewsList': `${API}/ifsp-portal/portal/newsList`, // 资讯列表
    'getNewsListDetail': `${API}/ifsp-portal/portal/newsListDetail`, // 详情
    'getLoanProductList': `${API}/ifsp-portal/portal/loanProductList`, 
    'getLoanRecordList': `${API}/ifsp-portal/portal/loanRecordList`, // 融资动态
    'getToken': `http://192.168.0.35:9995/ifsp-auth/token`, // token
    'getCode': `${API}/ifsp-auth/sendSmsCode`, // 获取验证码
    'getRegister': `${API}/ifsp-user/register-pc`, // 注册
    'getHelpThreeList': `${API}/ifsp-portal/portal/helpThreeList`, // 帮助中心3条
    'getHelpList': `${API}/ifsp-portal/portal/helpList`, // 帮助中心所有
    'getNewsTenList': `${API}/ifsp-portal/portal/newsTenList`, // 资讯列表 3条
}