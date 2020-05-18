// pages/my_name/my_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yname:'',
    xname:'',
    crad_id: '',
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
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.shengri = e.detail.value
    this.setData({
      shengri: this.data.shengri
    })
  },
  get_val(e) {
    console.log(e.detail)
    this.setData({
      yname: e.detail.value
    })
  },
  get_val1(e) {
    console.log(e.detail)
    this.setData({
      xname: e.detail.value
    })
  },
  get_val2(e) {
    console.log(e.detail)
    this.setData({
      crad_id: e.detail.value
    })
  },
  save_val() {
    if (!this.data.yname) {
      wx.showToast({
        icon: 'none',
        title: '请输入开户银行',
      })
      return
    }
    if (!this.data.xname) {
      wx.showToast({
        icon: 'none',
        title: '请输入持卡人姓名',
      })
      return
    }
    if (!this.data.crad_id) {
      wx.showToast({
        icon: 'none',
        title: '请输入卡号',
      })
      return
    }
    wx.showToast({
      title: '保存',
    })
    setTimeout(function () {
      wx.navigateBack()
    }, 1000)
    console.log(this.data.yname)
    console.log(this.data.xname)
    console.log(this.data.crad_id)
  }
  
})