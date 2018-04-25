import config from '../configs/config'
import axios from 'axios'

/**
 * 接口地址构造
 * @param {string} path 接口地址
 * @returns {string} 完整地址
 */
function structureApiUrl(path) {
  let url = config.protocol + '://' + config.host + config.basePath + path

  return url
}

/**
 * 登入
 */
function login(api, params, successCallback) {
  let url = structureApiUrl(api.path)
  // 若url中包含 :id ，则用data中的id值替换，并且将id从data中删除
  if (url.indexOf(':id') > -1) {
    url = url.replace(':id', JSON.parse(JSON.stringify(params.id)));
    delete params.id;
  }
  console.log(params)
  axios({
    method: api.method,
    url: url,
    params: params,
    headers: {
      'Authorization': 'Basic bWdnOmthU2dRZjQyd1gzOEw=',
      'deviceId': 'H5'
    }
  }).then(function (res) {
    successCallback(res)
  })
}

/**
 * 使用axios进行网络请求
 * @param api 接口api
 * @param params 参数
 * @param successCallback 成功回调
 */
function httpRequest(api, params, successCallback, failCallback, token) {
  let url = structureApiUrl(api.path)
  // 若url中包含 :id ，则用data中的id值替换，并且将id从data中删除
  if (url.indexOf(':id') > -1) {
    url = url.replace(':id', JSON.parse(JSON.stringify(params.id)));
    delete params.id;
  }
  if (token) {
    axios({
      method: api.method,
      url: url,
      params: params,
      headers: {
        'Authorization': 'Bearer ' + token,
        // 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoibWdnIiwiZXhwIjoxNTI0NDczMzY1LCJhdXRob3JpdGllcyI6WyJhZG1pbiJdLCJqdGkiOiIzNTQzNTIxZS0wOTE4LTRiMGEtYjQ5My1kM2UwNGJkZjY3NzkiLCJjbGllbnRfaWQiOiJtZ2ciLCJzY29wZSI6WyJhbGwiLCJyZWFkIiwid3JpdGUiXX0.JMvgOKKvC5TK_7elAGPhePr78LkT4CgqA4hyNL2zIsI',
        'deviceId': ''
      }
    }).then(function (res) {
      successCallback(res)
    })
  } else {
    axios({
      method: api.method,
      url: url,
      params: params
    }).then(function (res) {
      successCallback(res)
    })
  }

}

export default httpRequest

export {
  structureApiUrl,
  httpRequest,
  login
}
