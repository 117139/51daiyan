var app = getApp();
/**
 * 请求头
 */
var header = {
  'content-type': 'application/x-www-form-urlencoded',
  'Token': wx.getStorageSync("token")
}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
  console.log("请求方式：", "POST")
  request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
  console.log("请求方式：", "GET")
  request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
  console.log('请求url：' + url);
  
  console.log("请求头：", header)
  wx.request({
    url: app.IPurl+url,
    data: dealParams(params),
    method: method,
    header: header,
    success: function (res) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      console.log('响应：', res.data);

      if (res.data) {
        /** start 根据需求 接口的返回状态码进行处理 */
        onSuccess(res); 
        /** end 处理结束*/
      }
    },
    fail: function (error) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      onFailed(error); //failure for other reasons
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  console.log("请求参数:", params)
  return params;
}

/*
*关注方法
 */
function guanzhu(e) {
  console.log(e.currentTarget.dataset)
  var datas = e.currentTarget.dataset
  var jkurl = '/f/myinfo/atten/save'

  var prams = {}
  request(jkurl, prams,
    function (res) {
      if (res.data.code == 100) {

        wx.showToast({
          icon: 'none',
          title: '操作成功'
        })

      } else {
        if (res.data.message) {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      }
    },
    function (err) {
      if (err.data.message) {
        wx.showToast({
          icon: 'none',
          title: err.data.message
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
      }
    })
}
function guanzhu_qx(e) {
  console.log(e.currentTarget.dataset)
  var datas = e.currentTarget.dataset
  return
  var jkurl = '/f/news/celebrity/list'

  var prams = {}
  request(jkurl, prams,
    function (res) {
      if (res.data.code == 100) {

        console.log('获取成功')
        that.setData({
          star_list: res.data.info
        })

      } else {
        if (res.data.message) {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      }
    },
    function (err) {
      if (err.data.message) {
        wx.showToast({
          icon: 'none',
          title: err.data.message
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
      }
    })
}


// 1.通过module.exports方式提供给外部调用
module.exports = {
  postRequest: post,
  getRequest: get,
  guanzhu:guanzhu,
  guanzhu_qx: guanzhu_qx
}