// pages/my_daiyan/my_daiyan.js
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginmsg: '',
    dy_mon: 0,
    dy_num: 0,
    dy_pri: 0,
    data_list: []
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
    this.retry()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  retry() {
    this.setData({
      data_list: []
    })
    this.getdatalist()
    // this.getdata()
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

  daiyan_del(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该代言',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(e.currentTarget.dataset)
          var datas = e.currentTarget.dataset
          ///f/myinfo/endorinfo/delete
          var jkurl = '/f/myinfo/endorinfo/delete'

          var prams = {
            ids: datas.id
          }
          http.postRequest(jkurl, prams,
            function(res) {
              if (res.data.code == 100) {

                wx.showToast({
                  icon: 'none',
                  title: '操作成功'
                })
                setTimeout(function() {
                  that.retry()
                }, 1000)
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


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getdatalist() {
    var that = this
    var jkurl = '/f/myinfo/favor/list'

    var prams = {}
    wx.showLoading({
      title: "正在加载中...",
    })
    http.postRequest(jkurl, prams,
      function(res) {
        if (res.data.code == 100) {

          console.log('获取成功')
          that.setData({
            data_list: res.data.info ? res.data.info : []
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
  jump(e) {
    app.jump(e)
  },

  px_fuc(e) {
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == 0) {
      that.setData({
        dy_mon: !that.data.dy_mon
      })
    }
    if (type == 1) {
      that.setData({
        dy_num: !that.data.dy_num
      })
    }
    if (type == 2) {
      that.setData({
        dy_pri: !that.data.dy_pri
      })
    }
  }
})