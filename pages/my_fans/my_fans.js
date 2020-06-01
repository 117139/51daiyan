// pages/search/search.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
var http = require('../../utils/httputils.js'); //请求
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
		ss_cur:0,
    data_list: [
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
    // data_list:[]
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
    this.getstarlist()
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
  guanzhu(e) {
    console.log(e.currentTarget.dataset)
    var datas = e.currentTarget.dataset
    var jkurl = '/f/myinfo/atten/save'

    var prams = {}
    http.request(jkurl, prams,
      function (res) {
        if (res.data.code == 100) {

          wx.showToast({
            icon: 'none',
            title: '操作成功'
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
  guanzhu_qx(e) {
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(e.currentTarget.dataset)
          var datas = e.currentTarget.dataset
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getstarlist() {
    var that = this
    var jkurl = '/f/detection/fans/list'

    var prams = {}
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
    var newdata = this.data.data_list
    newdata[idx].tp_type = 2
    this.setData({
      data_list: newdata
    })
  },
	ss_type(e){
		
		var that =this
		if(that.data.ss_cur==e.currentTarget.dataset.type) return
		console.log(e.currentTarget.dataset.type)
		that.setData({
			ss_cur:e.currentTarget.dataset.type
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