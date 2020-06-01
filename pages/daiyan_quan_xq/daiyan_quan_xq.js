// pages/daiyan_quan_xq/daiyan_quan_xq.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    tab_type:'0',
    data_list:[1,1,1,1],
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
        tp_type: '1'
      },
      {
        name: '换机单',
        img: '/static/images/2_09.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '已换机',
        img: '/static/images/2_10.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '撤机单',
        img: '/static/images/2_13.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '已撤机',
        img: '/static/images/2_14.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '终端交易查询',
        img: '/static/images/2_17.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },
      {
        name: '应收列表',
        img: '/static/images/2_18.jpg',
        url: '/pages/list/list',
        tp_type: '1'
      },

    ],
		indicatorDots: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    console.log(options)
    that.setData({
      type: options.type
    })
    if (options.name) {
      wx.setNavigationBarTitle({
        title: that.options.name,
      })
      that.setData({
        name: options.name
      })
    }
    if (options.id) {
      that.setData({
        id:options.id
      })
    }
    this.retry()
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
  retry() {
    this.setData({
      data_list: []
    })
    this.getdatalist()
    // this.getdata()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.retry()
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
  getdatalist() {
    var that = this
    var jkurl = '/f/detection/group/evalist'
    if (that.data.tab_type == 1) {
      jkurl = '/f/detection/group/talentlist'
    }
    if (that.data.tab_type == 2) {
      jkurl = '/f/detection/group/comlist'
    }
    var prams = {
      categoryId:that.data.id
    }
    wx.showLoading({
      title: "正在加载中...",
    })
    http.postRequest(jkurl, prams,
      function (res) {
        if (res.data.code == 100) {

          console.log('获取成功')
          that.setData({
            data_list: res.data.info ? res.data.info : []
          })

        } else {
          if (res.data.message) {
            wx.showToast({
              icon: 'none',
              title: res.data.message
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
        }
      },
      function (err) {
        if (err.data.message) {
          wx.showToast({
            icon: 'none',
            title: err.data.message
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      })
  },
  toupiao(e) {
    var idx = e.currentTarget.dataset.idx
    var newdata = this.data.start_li
    newdata[idx].tp_type = 2
    this.setData({
      start_li: newdata
    })
  },
	tab_fuc(e){
		var that =this
		if(that.data.tab_type==e.currentTarget.dataset.type) return
		console.log(e.currentTarget.dataset.type)
		that.setData({
			tab_type:e.currentTarget.dataset.type
		})
    that.retry()
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