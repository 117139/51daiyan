// pages/daiyan_ph/daiyan_ph.js
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		ph_type:0,
		ph_type1:0,
    data_list:[]
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
	ph_fuc(e){
		var that =this
		 if(that.data.ph_type==e.currentTarget.dataset.type) return
		that.setData({
      data_list:[],
			ph_type:e.currentTarget.dataset.type
		})
    this.getstarlist()
	},
  getstarlist() {
    var that = this
    var jkurl = '/f/detection/frind/list'
    if(that.data.ph_type==0){
      jkurl = '/f/detection/ranking/numlist'
    } else {
      jkurl = '/f/detection/ranking/wordlist'
    }
    var prams = {}
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
	ph_fuc1(e){
		var that =this
		 if(that.data.ph_type1==e.currentTarget.dataset.type) return
		that.setData({
			ph_type1:e.currentTarget.dataset.type
		})
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