//app.js
App({
  IPurl: 'http://39.105.211.150:801/',
  IPurl1: 'http://39.105.211.150:801/',
  onLaunch: function () {
    let that = this
    // wx.removeStorageSync('userInfo')
    // wx.removeStorageSync('tokenstr')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log('16app'+JSON.stringify(res))
        // console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo'] == true) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已经授权')
          wx.getUserInfo({
            success(res) {
              console.log(res)
              var resdata = res
              that.globalData.userInfo = res.userInfo
              console.log(that.globalData.userInfo)
              wx.setStorageSync('userInfo', res.userInfo)
              if (!that.globalData.userInfo) {

              } else {
                console.log('有授权')
                wx.login({
                  success: function (res) {
                    console.log('登录')
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    var uinfo = that.globalData.userInfo
                    // 必须是在用户已经授权的情况下调用
                    // wx.getUserInfo({
                    //   success: function (res) {
                    //     console.log(res)
                    //     // var userInfo = res.userInfo
                    //     // var nickName = userInfo.nickName
                    //     // var avatarUrl = userInfo.avatarUrl
                    //     // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    //     // var province = userInfo.province
                    //     // var city = userInfo.city
                    //     // var country = userInfo.country

                    //   }
                    // })
                    var rawData = JSON.stringify(uinfo)
                    let data = {
                      code: res.code,
                      rawData: rawData,
                      signature: resdata.signature,
                      encryptedData: resdata.encryptedData,
                      iv: resdata.iv
                      // nickname: uinfo.nickName,
                      // avatarurl: uinfo.avatarUrl
                      // userName:'少女心',
                      // password:'test'
                    }
                    let rcode = res.code
                    console.log(res.code)
                    wx.request({
                      // url: that.IPurl +'/f/myinfo/login/login',
                      url: that.IPurl + '/f/myinfo/wxlogin/login',
                      data: data,
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      dataType: 'json',
                      method: 'POST',
                      success(res) {
                        console.log(res.data)
                        if (res.data.code == 100) {
                          console.log('登录成功')
                          wx.setStorageSync('token', res.data.token)
                          wx.setStorageSync('loginmsg', res.data.data[0])
                          console.log(res.data.data[0])
                        } else {
                          wx.removeStorageSync('userInfo')
                          wx.removeStorageSync('tokenstr')
                          wx.showToast({
                            icon: 'none',
                            title: '登录失败',
                          })
                        }

                      },
                      fail() {
                        wx.showToast({
                          icon: 'none',
                          title: '登录失败'
                        })
                      }
                    })
                  }
                })
              }
            }
          })

        } else {

        }
      }
    })
  },
  dologin(type) {
    let that = this
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        let rcode = res.code
        wx.getUserInfo({
          success(res) {
            console.log(res)
            var resdata = res
            var uinfo = that.globalData.userInfo
            let data = {
              code: res.code,
              // nickname: uinfo.nickName,
              // avatarurl: uinfo.avatarUrl
              // userName: '少女心',
              // password: 'test',
              rawData: resdata.rawData,
              signature: resdata.signature,
              encryptedData: resdata.encryptedData,
              iv: resdata.iv
            }


            wx.request({
              // url: that.IPurl + '/f/myinfo/login/login',
              url: that.IPurl + '/f/myinfo/wxlogin/login',
              data: data,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              dataType: 'json',
              method: 'POST',
              success(res) {
                console.log(res.data)
                if (res.data.code == 100) {
                  console.log('登录成功')
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('loginmsg', res.data.data[0])
                  if (type == 'shouquan') {
                    wx.navigateBack()
                  }



                } else {
                  wx.removeStorageSync('userInfo')
                  wx.removeStorageSync('token')
                  wx.showToast({
                    icon: 'none',
                    title: '登录失败',
                  })
                }

              },
              fail() {
                wx.showToast({
                  icon: 'none',
                  title: '登录失败'
                })
              }
            })
          }
        })

      }
    })
  },

  globalData: {
    userInfo: null
  },
  jump(e) {
    console.log(e)
    if (e.currentTarget.dataset.quanxian) {
      if (!wx.getStorageSync('userInfo')) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return
      }
    }
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }

  },
  pveimg(current, urls) {
    let urls1 = []
    if (urls) {
      urls1 = urls

    } else {
      urls1[0] = current
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls1 // 需要预览的图片http链接列表
    })
  },
  data: {
    haveLocation: false,
    activity_lat: -1,
    activity_lng: -1,
    activity_location: ""
  },
  call(e) {
    // if (!wx.getStorageSync('userInfo')) {
    // 	wx.navigateTo({
    // 		url: '/pages/login/login',
    // 	})
    // 	return
    // }
    console.log(e)
    if (e.currentTarget.dataset.tel) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      })
    }

  },
  data: {
    haveLocation: false,
    activity_lat: -1,
    activity_lng: -1,
    activity_location: ""
  }
})