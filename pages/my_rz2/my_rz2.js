// pages/my_rz1/my_rz1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname: '',
    sname: '',
    sf: [
      { name: '身份1', value: '1' },
      { name: '身份2', value: '2' },
    ],
    index:'0',
    sfimg1:'',
    sfimg2:'',
    yxtime1: '',
    yxtime2:'',
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
  reset_val() {
    this.setData({
      uname: ''
    })
  },
  
  get_val(e) {
    console.log(e.detail)
    this.setData({
      sname: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)


    var fs = e.detail.value
    
    if (!fs.sfz_name) {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名'
      })
      return
    }
    if (!fs.wb_id) {
      wx.showToast({
        icon: 'none',
        title: '请输入微博账号'
      })
      return
    }
    if (!fs.dy_id) {
      wx.showToast({
        icon: 'none',
        title: '请输入抖音账号'
      })
      return
    }
    if (!fs.ks_id) {
      wx.showToast({
        icon: 'none',
        title: '请输入快手账号'
      })
      return
    }
    if (!fs.tel || !(/^1\d{10}$/.test(fs.tel))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确格式的手机号'
      })
      return
    }

    wx.showModal({
      title: '提示',
      content: '是否提交',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '正在提交。。',
            mask: true
          })
          setTimeout(function(){
            wx.showToast({
              icon: 'none',
              title: '提交成功',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateTo({
                url:'/pages/my_rz3/my_rz3'
              })
            }, 1000)
          }, 1000)
          return
          wx.request({
            url: app.IPurl + '/api/index/save',
            data: {

              title: that.data.bookname,
              book_width: fs.book_h,//(图书高)
              author: fs.book_user,//(作者)
              isbn: fs.book_ISBN,//(ISBN)
              name: fs.book_myname,//(姓名)
              tel: fs.book_tel,//(联系方式)
              pic_book: fs.book_img1,//(书脊)
              pic_cover: fs.book_img2,//(封面)
              pic_rests: fs.book_img3,//(其他)
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            method: 'POST',
            success(res) {
              wx.hideLoading()
              console.log(res.data)


              if (res.data.code == 1) {

                wx.showToast({
                  icon: 'none',
                  title: '提交成功',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateBack()

                }, 1000)

              } else {
                if (res.data.msg) {
                  wx.showToast({
                    icon: 'none',
                    title: res.data.msg
                  })
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: '操作失败'
                  })
                }
              }


            },
            fail() {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '操作失败'
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})