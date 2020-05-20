// pages/lts/lts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myid:2,
    data_list:[
      { send: 1 ,msg:'你好在吗'},
      { send: 2, msg: '你好'},
      { send: 1, msg: '你好在吗'},
      { send: 2, msg: '你好'},
      { send: 1, msg: '你好,请问有什么需要帮助的吗'},
    ],
    sname: '',
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
  get_val(e) {
    console.log(e.detail)
    this.setData({
      sname: e.detail.value
    })
  },
  save_val() {
    var that =this
    if (!that.data.sname) {
     
      return
    }
    var newmsg = { send: 2, msg: that.data.sname }
    var data_list = that.data.data_list
    data_list.push(newmsg)
   that.setData({
     sname:'',
     data_list: data_list
   })
    
    console.log(that.data.sname)
  }
})