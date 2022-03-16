import axios from '@/libs/api.request'
import api from './newConfig'

// interface：请添加注释，接口相关重要信息
// post请求 json格式
export const query_zyxx_list = (params) => {
    return axios.request({
        url: api.query_zyxx_list,
        method: 'get',
        headers: {
            // 'Content-Type': 'application/json'
        },
        data: params
    })
}

export const getInfo = (params) => {
    return axios.request({
        url: api.getInfo,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}

export const getNewsList = (params) => {
    return axios.request({
        url: api.getNewsList,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getNewsListDetail = (params) => {
    return axios.request({
        url: api.getNewsListDetail,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getLoanProductList = (params) => {
    return axios.request({
        url: api.getLoanProductList,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getLoanRecordList = (params) => {
    return axios.request({
        url: api.getLoanRecordList,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getToken = (params) => {
    return axios.request({
        url: api.getToken,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getCode = (params) => {
    return axios.request({
        url: api.getCode,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getRegister = (params) => {
    return axios.request({
        url: api.getRegister,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getHelpThreeList = (params) => {
    return axios.request({
        url: api.getHelpThreeList,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getHelpList = (params) => {
    return axios.request({
        url: api.getHelpList,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}
export const getNewsTenList = (params) => {
    return axios.request({
        url: api.getNewsTenList,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: params
    })
}

