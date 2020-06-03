//logs.js
var http = require('../../utils/httputils.js'); //请求
const app = getApp()

Page({
  data: {
		btnkg:0,   //0ok  1off
    region: [],
		moren:false,
		editaddress:{}
  },
  onLoad: function (option) {
    var that =this
    // if(option.id){
    //   this.setData({
    //     id: option.id
    //   })
    // }
    if(option.address){
			console.log(option.address)
      that.setData({
        editaddress: JSON.parse(option.address)
      })
      // var area = this.data.editaddress.area.split(' ')
      that.data.region =[
        that.data.editaddress.provinceName, that.data.editaddress.cityName, that.data.editaddress.countyName
      ]
      that.setData({
        region: that.data.region,
        moren: that.data.editaddress.is_default
      })
      console.log(that.data.region)
		}
		
		
  },
	//选择地区
	bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
		this.data.region=e.detail.value
    this.setData({
      region: this.data.region
    })
  },
	//设置默认
	switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
		this.setData({
			moren:e.detail.value==true?1:0
		})
  },
  getaddress(){
    var that=this
    var jkurl ='/f/myinfo/buyaddress/view'
    var prams={
      id:that.data.id
    }
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
	//提交表单
	formSubmit(e) {
    let that =this
		
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		let formresult=e.detail.value
		if (formresult.name=='') {
			wx.showToast({
				title: '收货人姓名不能为空',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (!(/^1\d{10}$/.test(formresult.tel))) {
			wx.showToast({
				title: '手机号码有误',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (formresult.address=='') {
			wx.showToast({
				title: '请选择地区',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (formresult.xxaddress=='') {
			wx.showToast({
				title: '请填写详细地址',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		var areaz=that.data.region[0]+' '+that.data.region[1]+' '+that.data.region[2]
		if(that.data.region[1]==undefined||that.data.region[2]==undefined){
			areaz=that.data.region[0]
		}
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
    var jkurl = '/f/myinfo/buyaddress/save'   //新增

    var prams = {
      orderId: '',
      trackingNum: '',
      receivername: formresult.name,
      receiverPhone: formresult.tel,
      receiverMobile: formresult.tel,
      receiverMobile: formresult.tel,
      provinceCode: '',
      provinceName: that.data.region[0],
      cityCode: '',
      cityName: that.data.region[1],
      countyCode: '',
      countyName: that.data.region[2],
      townCode: '',
      townName: '',
      address: formresult.xxaddress
    }
    wx.showLoading({
      title: "正在提交中...",
    })
    http.postRequest(jkurl, prams,
      function (res) {
        if (res.data.code == 100) {

          console.log('获取成功')
          wx.showToast({
            icon:'none',
            title: '操作成功',
          })
          setTimeout(function (){
            wx.navigateBack()
          },1000)
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
  }
	
})
