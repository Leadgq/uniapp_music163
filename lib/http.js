const http = {
  get: (url, options = {}) => fun({
    url,
    method: 'GET',
    options
  }),
  post: (url, requestBody, options = {}) => fun({
    url,
    requestBody,
    method: 'POST',
    options
  }),
}

const fun = ({
  url,
  requestBody = {},
  method,
  options
}) => {
  return new Promise((reslove, reject) => {
    uni.request({
      url,
      method,
      withCredentials: true,
      data: requestBody,
      success(res) {
        reslove(res.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
export default http;
