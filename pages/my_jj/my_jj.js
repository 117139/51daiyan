// pages/my_name/my_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',
    sname:''
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
  reset_val(){
    this.setData({
      uname:''
    })
  },
  get_val(e){
    console.log(e.detail )
    this.setData({
      sname: e.detail.value
    })
  },
  save_val(){
    if (!this.data.sname){
      wx.showToast({
        icon: 'none',
        title: '请输入您的个人简介',
      })
      return
    }
    wx.showToast({
      title: '保存',
    })
    setTimeout(function (){
      wx.navigateBack()
    },1000)
    console.log(this.data.sname)
  }
})