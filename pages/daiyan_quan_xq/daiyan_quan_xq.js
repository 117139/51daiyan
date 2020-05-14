// pages/daiyan_quan_xq/daiyan_quan_xq.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_type:'0',
    data_list:[1,1,1,1],
		start_li:[
		  {
		    name: '未达标商户',
		    img: '/static/images/1_03.jpg',
		    url: '/pages/list/list',
		    type: '1'
		  },
		  {
		    name: '达标商户',
		    img: '/static/images/1_05.jpg',
		    url: '/pages/list/list',
		    type: '2'
		  },
		  {
		    name: '巡机单',
		    img: '/static/images/1_09.jpg',
		    url: '/pages/list/list',
		    type: '2'
		  },
		  {
		    name: '已巡机',
		    img: '/static/images/1_10.jpg',
		    url: '/pages/list/list',
		    type: '3'
		  },
		  {
		    name: '装机单',
		    img: '/static/images/1_13.jpg',
		    url: '/pages/list/list',
		    type: '4'
		  },
		  {
		    name: '已装机',
		    img: '/static/images/1_14.jpg',
		    url: '/pages/list/list',
		    type: '5'
		  },
		  {
		    name: '维护单',
		    img: '/static/images/1_17.jpg',
		    url: '/pages/list/list',
		    type: '6'
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
		indicatorDots: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    console.log(that.options)
    that.setData({
      type: that.options.type
    })
    if (that.options.name){
      wx.setNavigationBarTitle({
        title: that.options.name,
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
	tab_fuc(e){
		var that =this
		if(that.data.tab_type==e.currentTarget.dataset.type) return
		console.log(e.currentTarget.dataset.type)
		that.setData({
			tab_type:e.currentTarget.dataset.type
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