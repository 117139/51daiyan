const wxml = `
<view class="container" >
  <image class="img" src="http://www.wanbonet.com/suxin/images/hbbg.jpg"></image>
  <image class="hb_xcxm" src="http://www.wanbonet.com/suxin/images/xcxm.png"></image>
  <view class="user_msg draw_canvas">
    <image class="user_tx draw_canvas" src="http://www.wanbonet.com/suxin/images/tx1_03.jpg"></image>
    <text class="user_name">昵称</text>
    <text class="user_lv">3</text>
  </view>
  <view class="hb_tab">
      <text class="hb_tab_view">202件</text>
      <text class="hb_tab_view">202件</text>
      <text class="hb_tab_view">70%好友</text>
    </view>
</view>
`

const style = {
  container: {
    width: 375,
    height: 667,
  },

  img: {
    width: 375,
    height: 667,
  },
  hb_xcxm: {
    position: 'absolute',
    top: 247,
    left: 127,
    width: 122,
    height: 122,
    borderRadius: 61,
  },
  user_msg: {
    position: 'absolute',
    top: 450,
    left: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 100
  },
  user_tx: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 7,
  },
  user_name: {
    width: 60,
    height: 15,
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginBottom: 1,
  },
  user_lv: {
    width: 10,
    height: 15,
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    position: 'relative',
    left: 27,
    color: '#FE8735'
  },
  hb_tab:{
    position: 'absolute',
    top: 599,
    left: 25,
    width: 323,
    height: 25,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  hb_tab_view:{
    // backgroundColor:'#eeeeee',
    width: 70,
    height: 24,
    fontSize: 15,
    color:'#FE8735',
    textAlign: 'center',
    verticalAlign: 'middle',
  }
}

module.exports = {
  wxml,
  style
}
