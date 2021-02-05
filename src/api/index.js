import request from '../utils/request'
export function cveData(startPage = 1, pageSize = 10, ...params) {
    return request({
        url: '/exploitLib/cve/page',
        method: 'post',
        params: Object.assign({startPage, pageSize}, ...params)
    })
}

export function cveDetails(id) {
    return request({
        url: '/exploitLib/cve/info/' + id,
        method: 'get',
        params: {  }
    })
}

export function exbData(startPage = 1, pageSize = 10, ...params) {
    return request({
        url: '/exploitLib/exb/page',
        method: 'post',
        params: {
            pageSize,
            startPage,
            ...params
        }
    })
}

export function exbAffet() {
    return request({
        url: '/exploitLib/exb/platforms',
        method: 'get',
        params: {  }
    })
}

export function vulTags() {
    return request({
        url: '/exploitLib/exb/vulTags',
        method: 'get',
        params: {  }
    })
}

export function exbDetails(id) {
    return request({
        url: '/exploitLib/exb/info/' + id,
        method: 'get',
        params: {  }
    })
}

export function cnnvdData(startPage = 1, pageSize = 10, ...params) {
    return request({
        url: '/exploitLib/cnnvd/page',
        method: 'post',
        params: {
            pageSize,
            startPage,
            ...params
        }
    })
}

export function cnnvdVulTypes() {
    return request({
        url: '/exploitLib/cnnvd/vulTypes',
        method: 'get',
        params: {}
    })
}

export function cnnvdDetails(id) {
    return request({
        url: '/exploitLib/cnnvd/info/' + id,
        method: 'get',
        params: {  }
    })
}

export function metasploitData(startPage = 1, pageSize = 10, ...params) {
    return request({
        url: '/exploitLib/metasploit/page',
        method: 'post',
        params: {
            pageSize,
            startPage,
            ...params
        }
    })
}

export function metasploitDetailss(id) {
    return request({
        url: '/exploitLib/metasploit/info/' + id,
        method: 'get',
        params: { }
    })
}

// /exploitLib/cve/knowledge/{cveId}/{type}
export function cveKnowledge(id, type) {
    return request({
        url: 'exploitLib/cve/knowledge/' + id + '/' + 123,
        method: 'get',
        params: { }
    })
}