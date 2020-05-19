//logs.js
// var pageState = require('../../utils/pageState/index.js')
const app = getApp()
import Wxml2Canvas from '../../canvasJS/index';
Page({
  data: {
		btnkg:0,
		htmlReset:0,
    datalist: [
      '图片代言',
      '视频代言',
      '海报代言'
    ],
    type: 0,
		pages:[1,1,1,1,1],
		zhaungtai:[
		  { name: '没收到货,或与卖家协商同意不用退货', value: '1' },
      { name: '已收到货,需要退货退款', value: '2' },
		  { name: '已收到货,需要换货', value: '2' },
		],
		index:0,
		yuanyin:[
		  { name: '发错了', value: '1' },
		  { name: '商品损坏', value: '2' },
		  { name: '不想要了', value: '3' },
		  { name: '商品与页面描述不符', value: '4' },
		  { name: '商品降价', value: '5' },
		],
		index1:0,
		yname:'',
		imgb:[],
    sp_url:'',
    haibao:'/static/images/haibao.png',

    goods_sele: [
      [{ "num": 1, xuan:false},
        { "num": 1, xuan:false },],
      [{ "num": 1, xuan:false },
        { "num": 1, xuan:false },]
    ],
    // goods_sele: [],
    xuan: false,
    all: false,

    width:750,
    height: 1334,
  },
  onLoad: function (option) {
		// wx.setNavigationBarTitle({
		// 	title:'加载中...'
		// })
    // if(option.id){
		// 	console.log(option.id)
		// }
		
		// wx.setNavigationBarTitle({
		// 	title: '订单列表'
		// })
		if(option.type){
			this.setData({
				type:option.type
			})
		}
		
		
		
  },
	onShow(){
		var pages=1
		var goods=[ 1,1 ]
		this.data.goods=goods
		this.setData({
			pages:pages,
			goods:this.data.goods
		})
    if (this.data.btnkg==1){
			that.setData({
				btnkg:0
			})
		}
		console.log('我显示了')
		// this.getOrderList('onshow')
	},
	cload(){
		var pages=1
		var goods=[1,1,]
		this.data.goods=goods
		this.setData({
			pages:pages,
			goods:this.data.goods
		})
		console.log('我显示了')
		// this.getOrderList('onshow')
	},
	onReady(){
		
	},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  drawImage() {
    let _this = this;
    var drawimg = new Wxml2Canvas({
      width: _this.data.width,
      height: _this.data.height,
      element: 'canvas1',
      background: '#000000',
      progress(percent) {
      },
      finish(url) {
        wx.hideLoading();
        wx.saveImageToPhotosAlbum({
          filePath: url
        })
      },
      error(res) {
      }
    });

    let data = {
      list: [
        {   //绘制矩形
          type: 'rect',
          x: 0,
          y: 50,
          style: {
            width: _this.data.width,
            height: _this.data.height - 60,
            fill: '#fff'
          }
        },
        {   //根据wxml绘制,
          type: 'wxml',
          class: '.hb_canvas .draw_canvas',
          limit: '.hb_canvas',
          x: 5,
          y: 70
        }]
    }
    drawimg.draw(data);
  },
  getPosterHandle() {
    wx.showLoading({
      title: '海报生成中...',
    })
    this.drawImage();
  },




  bindcur(e) {
    var that = this
    console.log(e.currentTarget.dataset.type)
    that.setData({
      type: e.currentTarget.dataset.type
    })
    // that.getOrderList()

  },
  //选择视频
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        that.setData({
          sp_url: res.tempFilePath,
        })
      }
    })
  },
  //上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
  uploadvideo: function () {
    var src = this.data.src;
    wx.uploadFile({
      url: 'http://172.16.98.36:8080/upanddown/upload2',//服务器接口
      method: 'POST',//这句话好像可以不用
      filePath: src,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'files',//服务器定义的Key值
      success: function () {
        console.log('视频上传成功')
      },
      fail: function () {
        console.log('接口调用失败')
      }
    })
  },
	save_val(){
    var that = this
    var type = that.data.type
    if (type == 0) {
      if (that.data.imgb.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请上传商品图片',
        })
        return
      }
    }
    if (type == 1) {
      if (!that.data.sp_url) {
        wx.showToast({
          icon: 'none',
          title: '请上传商品视频',
        })
        return
      }
    }
    if (type == 2) {
      if (!that.data.haibao) {
        wx.showToast({
          icon: 'none',
          title: '请生成海报',
        })
        return
      }
    }
    
    
		if(!that.data.yname){
			wx.showToast({
			  icon: 'none',
        title: '请填写您的代言',
			})
			return
		}
		
		wx.showToast({
			title: '操作成功',
		})
		setTimeout(function () {
		  wx.navigateTo({
        url: '/pages/daiyan_fabu_ok/daiyan_fabu_ok',
      })
		}, 1000)
		console.log(that.data.zhaungtai[that.data.index])
		console.log(that.data.yuanyin[that.data.index1])
		console.log(that.data.yname)
		console.log(that.data.imgb)
	},
		
	get_val(e) {
	  console.log(e.detail)
	  this.setData({
	    yname: e.detail.value
	  })
	},
	imgdel(e){
		var that =this
		console.log(e.currentTarget.dataset.idx)
		wx.showModal({
			title: '提示',
			content: '确定要删除这张图片吗',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					that.data.imgb.splice(e.currentTarget.dataset.idx,1)
					that.setData({
						imgb:that.data.imgb
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
		
	},
	scpic() {
	  var that = this
	  wx.chooseImage({
	    count: 9,
	    sizeType: ['original', 'compressed'],
	    sourceType: ['album', 'camera'],
	    success(res) {
	      // tempFilePath可以作为img标签的src属性显示图片
	      console.log(res)
	      const tempFilePaths = res.tempFilePaths
	      
	      const imglen = that.data.imgb.length
	      that.upimg(tempFilePaths, 0)
	     
	    }
	  })
	},
	upimg(imgs, i) {
	  var that = this
	  const imglen = that.data.imgb.length
	  var newlen = Number(imglen) + Number(i)
	  if (imglen == 9) {
	    wx.showToast({
	      icon: 'none',
	      title: '最多可上传九张'
	    })
	    return
	  }
		var newdata = that.data.imgb
		console.log(i)
		newdata.push(imgs[i])
		that.setData({
		  imgb: newdata
		})
		var news1 = that.data.imgb.length
		if (news1 < 9&& i<imgs.length-1) {
		  i++
		  that.upimg(imgs, i)
		}
		return
	  // console.log(img1)
	  wx.uploadFile({
	    url: app.IPurl, //仅为示例，非真实的接口地址
	    filePath: imgs[i],
	    name: 'upfile',
	    formData: {
	      'apipage': 'uppic',
	    },
	    success(res) {
	      // console.log(res.data)
	      var ndata = JSON.parse(res.data)
	      if (ndata.error == 0) {
	        console.log(imgs[i], i, ndata.url)
	        var newdata = that.data.imgb
	        console.log(i)
	        newdata.push(ndata.url)
	        that.setData({
	          imgb: newdata
	        })
	        // i++
	        // that.upimg(imgs, i)
	        var news1 = that.data.imgb.length
	        if (news1 < 9) {
	          i++
	          that.upimg(imgs, i)
	        }
	      } else {
	        wx.showToast({
	          icon: "none",
	          title: "上传失败"
	        })
	      }
	    }
	  })
	},
	//订单详情
	goOrderDetails(e){
		console.log(e.currentTarget.dataset.id)
		wx.navigateTo({
			url:'/pages/OrderDetails/OrderDetails?id='+e.currentTarget.dataset.id
		})
	},
	//付款
	pay(e){
    var that =this
		let oid=e.currentTarget.dataset.code
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		app.Pay(oid,'info')
	},
  jump(e) {
    app.jump(e)
  },
	onRetry(){
		this.onLoad()
	}
})
