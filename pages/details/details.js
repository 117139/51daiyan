// pages/details/details.js

var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    data_list:[
      { value1: '苏门答腊黄金曼特宁深度烘培' },
      { value1: '耳挂咖啡' },
      { value1:'耳挂咖啡1'},
    ],
    cur_swiper:1,



    sheetshow: true,         //规格弹框控制
    showcan: false,
    goods_total_limit: '',  //商品阶梯
    guige: [
      { value1: '苏门答腊黄金曼特宁深度烘培', pri: 48, kucun:900 },
      { value1: '耳挂咖啡', pri: 49, kucun: 1900 },
      { value1: '耳挂咖啡1', pri: 41, kucun: 2900 },
      { value1: '耳挂咖啡2', pri: 42, kucun: 3900 },
      { value1: '耳挂咖啡3', pri: 43, kucun: 4900 },
    ],  //规格
    type1: [0],         //规格index
    cnum: 1,//数量
    goods_sku_id: 0,  //商品id
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
    var that = this;

    
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
  swiper_change(e){
    console.log(e.detail )
    var num = e.detail.current+1
    this.setData({
      cur_swiper:num
    })
  },
  //数量
  onChange(e) {
    let idx = e.currentTarget.dataset.selec
    console.log(e.detail)
    // this.data.goods_sele[idx].num=e.detail
    this.setData({
      cnum: e.detail
    });
  },
  //选择规格
  selegg(e) {
    // console.log(e.currentTarget.dataset.gg)
    this.data.type1[e.currentTarget.dataset.gg] = e.currentTarget.dataset.gg1

    this.setData({
      type1: this.data.type1
    })
    var ggs = this.data.guige
    var ggidxs = this.data.type1

    var ggshow1 = []
    var ggshowid = []
    // var ggjson = '{'
    // for (var i = 0; i < ggs.length; i++) {
    //   console.log(ggidxs[i])
    //   if (ggidxs[i] != -1) {
    //     console.log(ggs[i].values)
    //     ggshow1.push(ggs[i].values[ggidxs[i]].attr_value)
    //     ggshowid.push(ggs[i].values[ggidxs[i]].id)
    //     ggjson += '"' + ggs[i].name + '":"' + ggs[i].values[ggidxs[i]].attr_value + '"'
    //     if (i != ggs.length - 1) {
    //       ggjson += ','
    //     }
    //   }
    // }
    // var ggshow2 = ggshow1.join('，')
    // ggjson += "}"
    // // ggjson=JSON.parse(ggjson)
    var newpri = this.bSort(ggshowid)
    newpri = newpri.join('_')
    console.log(newpri)
    var json1 = this.data.goods.sku_data
    var mrpri = this.data.goods.goods_real_price
    var mrpimg = this.data.goods.goods_pic
    this.setData({
      newprice: mrpri,
      newimg: mrpimg,
      sku_id: 0
    })
    for (var key in json1) {
      // console.log(key, newpri, newpri == key);     //获取key值
      if (key == newpri) {
        console.log(json1[key])
        this.setData({
          newprice: json1[key].sku_price,
          sku_id: json1[key].sku_id,
          newimg: json1[key].sku_images,
        })
      }
      // console.log(json1[key]); //获取对应的value值
    }
    // console.log(this.data.goods.sku_data['"'+newpri+'"'])
    this.setData({
      ggshow: ggshow2,
      ggjson: ggjson
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
  },
  onClose() {
    this.setData({
      sheetshow: false
    })
  },
  sheetshow() {
    this.setData({
      sheetshow: true,
      btnkg: 0
    })
    
  },
  //加入购物车
  addwgc() {
    // if (!wx.getStorageSync('userWxmsg')) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    //   return
    // }
    let that = this

    that.onClose()
    wx.showToast({
    	title:"加入成功"
    })
    return
    ///api/shopping
    console.log('addwgc')
    if (that.data.btnkg == 1) {
      return
    } else {
      that.setData({
        btnkg: 1
      })
    }
    wx.request({
      url: app.IPurl + '/api/shopping',
      data: {
        token: wx.getStorageSync('token'),
        goods_id: that.data.goods_id,						//(商品id) 
        num: that.data.cnum,															//（数量） 
        attr_set: that.data.ggjson,//(规格名称)
        sku_id: that.data.sku_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          let resultd = res.data
          // console.log(res.data)
          that.onClose()
          wx.showToast({
            title: '添加成功'
          })
          that.setData({
            addshow: true

          })
          // that.setData({
          //   btnkg: 0
          // })

        } else {
          that.setData({
            btnkg: 0
          })
          if (res.data.msg) {
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            });
          } else {
            wx.showToast({
              title: '网络异常',
              duration: 2000,
              icon: 'none'
            });
          }
        }

      },
      fail(err) {
        that.setData({
          btnkg: 0
        })
        wx.showToast({
          title: '网络异常',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  },
  nowbuy() {
    // if (!wx.getStorageSync('userWxmsg')) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    //   return
    // }
    // console.log('buy')
    //http://water5100.800123456.top/WebService.asmx/order
    let that = this

    // let goods = this.data.goods
    // let newimg = this.data.newimg
    // let newprice = this.data.newprice
    // //let goodsname=this.data.goodsd.goods_sku_name
    // let goods_pic = newimg ? newimg : goods.goods_pic
    // let goods_name = goods.goods_name
    // let goods_id = goods.id
    // let goods_real_price = newprice ? newprice : goods.goods_real_price
    // let ggshow = that.data.ggshow
    // let ggjson = that.data.ggjson
    // let goodsnum = this.data.cnum
    // let sku_id = that.data.sku_id
    // let goodsladder=this.data.goodsd.is_ladder_pricing
    // let goodsxq=this.data.goodsd
    // console.log(goodsxq)
    wx.navigateTo({
      url: '/pages/Order/Order'
    })
  },
  call(e){
    app.call(e)
  },

  pveimg(e) {
    let that = this
    if (e.currentTarget.dataset.curitem) {
      app.pveimg(that.data.spimg, e.currentTarget.dataset.curitem, true)
    } else {
      app.pveimg(e.currentTarget.dataset.imgurl)
    }

  }
})