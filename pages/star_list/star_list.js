// pages/star_list/star_list.js
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		s_type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if(options.type){
			this.setData({
				s_type:options.type
			})
		}
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
    this.getstarlist()
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
    console.log('触底')
    // this.getdata()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleHome:function (){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
	ss_type:function (e){
		var that =this
    if(that.data.s_type==e.currentTarget.dataset.type) return
    console.log(e.currentTarget.dataset.type)
    that.setData({
    	s_type:e.currentTarget.dataset.type
    })
  },
  getstarlist() {
    var that = this
    var jkurl = '/f/detection/celebrity/list'

    var prams = {
      type: that.data.s_type
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
	jiazai:function (){
    console.log('触底')
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
  }
})