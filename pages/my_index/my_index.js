// pages/my_index/my_index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		s_type:0,
		data_list:[1,1,1,1,1,1,1],
    gz_type:false
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
  guanzhu(){
    var that =this
    that.setData({
      gz_type: !that.data.gz_type
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
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    app.pveimg(curr, urls)
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