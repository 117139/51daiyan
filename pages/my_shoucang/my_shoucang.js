// pages/my_daiyan/my_daiyan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dy_mon: 0,
    dy_num: 0,
    dy_pri: 0,
    data_list: [1, 1, 1, 1, 1]
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