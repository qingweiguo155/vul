import request from '../utils/request'
export function cveData(asc,cveId,keyword = '',orderBy, pageSize = 10, startPage = 1,vendor,version,product,vulType) {
    return request({
        url: '/exploitLib/cve/page',
        method: 'post',
        params: {
            asc,
            cveId,
            keyword,
            orderBy: "",
            pageSize,
            startPage,
            vendor,
            version,
            product,
            vulType,
            cvssScoreStart:null,
            cvssScoreEnd:null,
        }
    })
}

export function cveDetails(id) {
    return request({
        url: '/exploitLib/cve/info/' + id,
        method: 'get',
        params: {  }
    })
}
