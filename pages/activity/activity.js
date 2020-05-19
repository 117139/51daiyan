// pages/activity/activity.js
const app = getApp()
var djs_fuc
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hd_time:{
      day: 0,
      hh: 0,
      mm: 0,
      min:0,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    djs_fuc=setInterval(function () {
      that.setData({
        hd_time: that.djs()
      })
      console.log(that.djs())
    }, 1000);
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
    clearInterval(djs_fuc) 
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
  djs(){
    var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2020/6/8");  //定义结束时间
    var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
      lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
      leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
      lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
    var djstime={
      day: leftd,
      hh: lefth,
      mm: leftm,
      min: lefts,
    }
    return djstime
    // return leftd + "天" + lefth + ":" + leftm + ":" + lefts;  //返回倒计时的字符串
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