const wxml = `
<view class="container" >
  <image class="img" src="http://www.wanbonet.com/suxin/images/hbbg.jpg"></image>
  <image class="hb_xcxm draw_canvas" src="http://www.wanbonet.com/suxin/images/xcxm.png"></image>
  <view class="user_msg draw_canvas">
    <image class="user_tx draw_canvas" src="http://www.wanbonet.com/suxin/images/tx1_03.jpg"></image>
    <view class="user_name draw_canvas">昵称</view>
    <view class="user_lv draw_canvas"><text class="iconfont iconxingzhuang60kaobei2"></text>代言星级 3</view>
  </view>
  <view class="hb_tab draw_canvas">
    <view>
      <view class="d1 draw_canvas">累计代言</view>
      <view class="d2 draw_canvas"><text>212</text>件</view>
    </view>
    <view>
      <view class="d1 draw_canvas">带动销量</view>
      <view class="d2 draw_canvas"><text>212</text>件</view>
    </view>
    <view>
      <view class="d1 draw_canvas">影响力超过</view>
      <view class="d2 draw_canvas"><text>70</text>%好友</view>
    </view>
  </view>
</view>
`

const style = {
  container: {
    width: 750,
    height: 1334,
    border:'1px solid #eee'
  },
  
  img: {
    width: 750,
    height: 1334,
    borderRadius: 20,
  },
  hb_xcxm:{
    position: 'absolute',
    top: 494,
    left: 254,
    width: 243,
    height: 243,
    borderRadius: 121,
  },
  user_msg:{
    position: 'absolute',
    top: 900,
    left: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200
  },
  user_tx:{
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  user_name:{
    fontSize: 30,
    color:'#333',
  }
}

module.exports = {
  wxml,
  style
}
