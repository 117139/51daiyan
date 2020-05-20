// pages/daiyan_ph/daiyan_ph.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		ph_type:0,
		ph_type1:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
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
			ph_type:e.currentTarget.dataset.type
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