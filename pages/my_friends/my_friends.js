// pages/my_friends/my_friends.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_type:0,
    list_type1:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    // that.getdata()
    that.retry()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  retry() {
    this.setData({
      data_list: []
    })
    this.getstarlist()
    // this.getdata()
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
  
	paixun1(){
		var that =this
		that.setData({
			list_type1:!that.data.list_type1
		})
	},
	paixun(){
		var that =this
		that.setData({
			list_type:!that.data.list_type
		})
	},
  guanzhu(e) {
    console.log(e.currentTarget.dataset)
    var datas = e.currentTarget.dataset
    var jkurl = '/f/myinfo/atten/save'

    var prams = {}
    http.request(jkurl, prams,
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
    var jkurl = '/f/detection/frind/list'

    var prams = {
      type: that.data.ss_cur
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
  zan(e){
    console.log(e.currentTarget.dataset.id)
  },
  jump(e){
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type==2){
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else {
      app.jump(e)
    }
  },
	kffuc(e){
		console.log(e)
	}
})