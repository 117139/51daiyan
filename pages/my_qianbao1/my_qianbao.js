// pages/my_tx/my_tx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		tx_type:0,
		tx_crad:0,
		tx_mon:0,
    cw_data:[
        {
          name: '购物',
          pri: '+20',
          time: '2020-05-20 15:26',
          inr: '材料费提成'
        },
        {
          name: '购物',
          pri: '+20',
          time: '2020-05-10 15:26',
          inr: '材料费提成'
        },
        {
          name: '购物',
          pri: '+20',
          time: '2019-08-14 12:00',
          inr: ''
        },
        {
          name: '购物',
          pri: '+20',
          time: '2019-08-14 12:00',
          inr: ''
        },
      ]
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
	txtype_fuc(e){
		console.log(e.currentTarget.dataset.type)
		this.setData({
			tx_type:e.currentTarget.dataset.type
		})
	},
	txcrad_fuc(e){
		console.log(e.currentTarget.dataset.type)
		this.setData({
			tx_crad:e.currentTarget.dataset.type
		})
	},
	get_val(e){
		console.log(e.detail )
		this.setData({
			tx_mon: e.detail.value
		})
	},
	tx_sub(){
		var that = this
		if(that.data.tx_mon==0){
			wx.showToast({
			  title: '请输入提现金额',
			})
			return
		}
		wx.showToast({
      title: '提现',
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