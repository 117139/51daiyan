//myaddress.js
var pageState = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({
  data: {
		btnkg:0,
    moren:1,
    addresslist: [
      {
        user_name: '昵称',
        phone: '18300000000',
        area: '北京市海淀区',
        address: '中关村e世界5层',
        id:1
      },
      {
        user_name: '昵称',
        phone: '18300000000',
        area: '北京市海淀区',
        address: '中关村e世界5层',
        id:2
      },
      {
        user_name: '昵称',
        phone: '18300000000',
        area: '北京市海淀区',
        address: '中关村e世界5层',
        id:3
      },
      {
        user_name: '昵称',
        phone: '18300000000',
        area: '北京市海淀区',
        address: '中关村e世界5曾',
        id:4
      },
    ],
    mridx:0,
    form_type:0
  },
  onLoad: function (option) {
    var that =this
    if(option.type){
      that.setData({
        form_type:option.type
      })
    }
  },
	onShow(){

		// this.getaddlist()
	},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  xz_add(e){
    var that =this
    if (that.data.form_type!=1){
      return
    }
    console.log(e.currentTarget.dataset.idx)
    var idx = e.currentTarget.dataset.idx
    var pages = getCurrentPages();   //当前页面
    var prevPage = pages[pages.length - 2];   //上一页面
    prevPage.setData({
      //直接给上一个页面赋值
      addresschose: that.data.addresslist[idx],
    });

    wx.navigateBack({
      //返回
      delta: 1
    })
  },
	selecmr(e){
		let that =this
    var id = e.currentTarget.dataset.id
    that.setData({
      moren:id
    })
    return 
		console.log(e.currentTarget.dataset.id)
		// let id=e.currentTarget.dataset.id
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		wx.request({
			url:  app.IPurl+'/api/userAddressDefaultStatus/'+id,
			data:  {
				token:wx.getStorageSync('token')
		  },
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'put',
			success(res) {
				console.log(res.data)
				that.setData({
					btnkg:0
				})
				if(res.data.code==1){
					that.getaddlist()
				}else{
					if(res.data.msg){
						wx.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
						});
					}else{
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon:'none'
						});
					}
				}
			},
			fail(err){
				console.log(err)
				wx.showToast({
					title: '网络异常',
					duration: 2000,
					icon:'none'
				});
				that.setData({
					btnkg:0
				})
			}
		})
	},
	addressEdit(e){
		
		console.log(e.currentTarget.dataset.id)
		let address=this.data.addresslist[e.currentTarget.dataset.id]
		 address=JSON.stringify(address)
		wx.navigateTo({
			url:'/pages/addressEdit/addressEdit?address='+address
		})
	},
	addressDel(e){
		let that =this
		console.log(e.currentTarget.dataset.id)
		let id=e.currentTarget.dataset.id
		wx.showModal({
			content:"确定要删除改地址吗?",
			success(res) {
				if (res.confirm) {
					console.log('用户点击确定')
					if(that.data.btnkg==1){
						return
					}else{
						that.setData({
							btnkg:1
						})
					}
          wx.showToast({
            title: '删除'
          })
          return
					wx.request({
						url:  app.IPurl+'/api/userAddress/'+e.currentTarget.dataset.id,
						data:  {
								token:wx.getStorageSync('token')
					    },
						header: {
							'content-type': 'application/x-www-form-urlencoded' 
						},
						dataType:'json',
						method:'DELETE',
						success(res) {
							console.log(res.data)
							that.setData({
								btnkg:0
							})
							if(res.data.code==1){
								wx.showToast({
									title:'操作成功'
								})
								setTimeout(function(){
									that.getaddlist()
								},1000)
							}else{
								if(res.data.msg){
									wx.showToast({
										title: res.data.msg,
										duration: 2000,
										icon:'none'
									});
								}else{
									wx.showToast({
										title: '网络异常',
										duration: 2000,
										icon:'none'
									});
								}
							}
						},
						fail(){
							that.setData({
								btnkg:0
							})
							wx.showToast({
								title: '网络异常',
								duration: 2000,
								icon:'none'
							});
						}
					})
					
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	getaddlist(){
		const pageState1 = pageState.default(this)
		pageState1.loading()    // 切换为loading状态
		let that =this
		//http://water5100.800123456.top/WebService.asmx/useraddress
		wx.request({
			url:  app.IPurl+'/api/userAddressList',
			data:  {
					token:wx.getStorageSync('token')
				},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'get',
			success(res) {
				console.log(res.data)
				
				if(res.data.code==1){
					that.setData({
						addresslist:res.data.data
					})
				}
				pageState1.finish()    // 切换为finish状态
					// pageState1.error()    // 切换为error状态
			},
			fail() {
				 pageState1.error()    // 切换为error状态
			}
		})
	},
	onRetry(){
		this.getaddlist()
	}
})
