// pages/star_list/star_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		s_type:0
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
	jiazai:function (){
    console.log('触底')
  }
})