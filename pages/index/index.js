// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: '',
    homeSeek: '',
    homeTeacher: '',
    homeVideo: '',
    star_list: [],
    finddyr: [],
    data_list: [1, 1, 1, ],
    loginmsg: '',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    that.setData({
      userInfo: userInfo
    })
    var loginmsg = wx.getStorageSync('loginmsg')
    if (loginmsg) {
      that.setData({
        loginmsg: loginmsg
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  retry() {
    this.getstarlist()
    this.getdyr_list()
    // this.getdata()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    that.setData({
      userInfo: userInfo
    })
    var loginmsg = wx.getStorageSync('loginmsg')
    if (loginmsg) {
      that.setData({
        loginmsg: loginmsg
      })
    }
    that.retry()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  guanzhu(e) {
    console.log(e.currentTarget.dataset)
    var datas = e.currentTarget.dataset
    var jkurl = '/f/myinfo/atten/save'

    var prams = {}
    http.request(jkurl, prams,
      function(res) {
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
      function(err) {
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
  },
  guanzhu_qx(e) {
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(e.currentTarget.dataset)
          var datas = e.currentTarget.dataset
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getstarlist() {
    var that = this
    var jkurl = '/f/news/celebrity/list'

    var prams = {}
    http.postRequest(jkurl, prams,
      function(res) {
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
      function(err) {
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
  },
  getdyr_list() {
    ///f/detection/person/list
    var that = this
    var jkurl = '/f/detection/person/list'

    var prams = {}
    http.postRequest(jkurl, prams,
      function(res) {
        if (res.data.code == 100) {

          console.log('获取成功')
          that.setData({
            finddyr: res.data.info ? res.data.info : []
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
      function(err) {
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
  },
  toupiao(e) {
    var idx = e.currentTarget.dataset.idx
    var newdata = this.data.start_li
    newdata[idx].tp_type = 2
    this.setData({
      start_li: newdata
    })
  },
  getdata() {
    ///api/homeIndex
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/homeIndex',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        htmlStatus1.finish()
        console.log(res.data)
        if (res.data.code == 1) { //数据为空

          that.setData({
            banner: res.data.data.homeBanner,
            homeSeek: res.data.data.homeSeek,
            homeTeacher: res.data.data.homeTeacher,
            homeVideo: res.data.data.homeVideo,
          })
        } else {
          htmlStatus1.error()
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        }
      },
      fail() {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        htmlStatus1.error()
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })

      },
      complete() {
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
  zan(e) {
    console.log(e.currentTarget.dataset.id)
  },
  jump(e) {
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 2) {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else {
      app.jump(e)
    }
  },
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    app.pveimg(curr, urls)
  },
  kffuc(e) {
    console.log(e)
  }
})