// pages/daiyan_sc/daiyan_sc.js
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		s_type:'',
    f_data_list: [1, 1, 1, 1],
		data_list:[1,1,1,1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.retry()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  retry() {
    this.setData({
      data_list: []
    })
    this.getf_datalist()
    this.getdatalist()
    // this.getdata()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getf_datalist() {
    var that = this
    var jkurl = '/f/detection/mall/friendlist'

    var prams = {
      type: that.data.type
    }
    wx.showLoading({
      title: "正在加载中...",
    })
    http.postRequest(jkurl, prams,
      function (res) {
        if (res.data.code == 100) {

          console.log('获取成功')
          that.setData({
            f_data_list: res.data.info ? res.data.info : []
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
  },
  getdatalist() {
    var that = this
    var jkurl = '/f/detection/mall/list'

    var prams = {
      cateId: that.data.s_type
    }
    wx.showLoading({
      title: "正在加载中...",
    })
    http.postRequest(jkurl, prams,
      function (res) {
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
  },
  jump(e) {
    app.jump(e)
  },
	ss_type(e){
		var that =this
		if(that.data.s_type==e.currentTarget.dataset.type) return
		console.log(e.currentTarget.dataset.type)
		that.setData({
			s_type:e.currentTarget.dataset.type
		})
	}
})