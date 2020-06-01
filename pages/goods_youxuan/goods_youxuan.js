// pages/goods_tj/goods_tj.js
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		dy_mon:0,
		dy_num:0,
		dy_pri:0,
		data_list:[1,1,1,1,1],
		datalist:[
      { name: '全部', type: '' },
      { name: '日用品', type: 1 },
      { name: '化妆品', type: 2 },
      { name: '运动品', type: 3 },
      { name: '数码产品',type:4},
		],
		type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.retry()
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
	bindcur(e){
		var that =this
	  console.log(e.currentTarget.dataset.type)
	  that.setData({
	    type: e.currentTarget.dataset.type
	  })
    that.getdatalist()
		
	},
  getdatalist() {
    var that = this
    var jkurl = '/f/detection/pool/list'
    
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
	px_fuc(e){
		var that=this
		var type=e.currentTarget.dataset.type
		if(type==0){
			that.setData({
				dy_mon:!that.data.dy_mon
			})
		}
		if(type==1){
			that.setData({
				dy_num:!that.data.dy_num
			})
		}
		if(type==2){
			that.setData({
				dy_pri:!that.data.dy_pri
			})
		}
	}
})