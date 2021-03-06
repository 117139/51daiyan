//logs.js
// var pageState = require('../../utils/pageState/index.js')
const app = getApp()

Page({
  data: {
		btnkg:0,
		htmlReset:0,
		
		yname:'',
		imgb:[],



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
	save_val(){
		var that =this
		if(!that.data.yname){
			wx.showToast({
			  icon: 'none',
			  title: '请输入您的评价',
			})
			return
		}
		
		wx.showToast({
			title: '操作成功',
		})
		setTimeout(function () {
		  wx.navigateBack()
		}, 1000)
		
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
