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
    },
    start_li: [
      {
        name: '未达标商户',
        img: '/static/images/1_03.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '达标商户',
        img: '/static/images/1_05.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '巡机单',
        img: '/static/images/1_09.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '已巡机',
        img: '/static/images/1_10.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '装机单',
        img: '/static/images/1_13.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '已装机',
        img: '/static/images/1_14.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '维护单',
        img: '/static/images/1_17.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '已维护',
        img: '/static/images/1_18.jpg',
        url: '/pages/list/list',
        type: '7'
      },
      {
        name: '换机单',
        img: '/static/images/2_09.jpg',
        url: '/pages/list/list',
        type: '8'
      },
      {
        name: '已换机',
        img: '/static/images/2_10.jpg',
        url: '/pages/list/list',
        type: '9'
      },
      {
        name: '撤机单',
        img: '/static/images/2_13.jpg',
        url: '/pages/list/list',
        type: '10'
      },
      {
        name: '已撤机',
        img: '/static/images/2_14.jpg',
        url: '/pages/list/list',
        type: '11'
      },
      {
        name: '终端交易查询',
        img: '/static/images/2_17.jpg',
        url: '/pages/list/list',
        type: '12'
      },
      {
        name: '应收列表',
        img: '/static/images/2_18.jpg',
        url: '/pages/list/list',
        type: '13'
      },

    ],
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
    clearInterval(djs_fuc) 
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
  toupiao(e) {
    var idx = e.currentTarget.dataset.idx
    var newdata = this.data.start_li
    newdata[idx].tp_type = 2
    this.setData({
      start_li: newdata
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