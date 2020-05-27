const db = wx.cloud.database({});
const todos = db.collection("smzdmYouhuiLists").doc('jM7iIblpMzePjdNHtlQd1mPCMpiQs3gKYs6MeBBED8VRy6XB')
const _ = db.command
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImageUrl: null,
    describe: null,
    money: null,
    openid: null,
    openids: null,
    CodeID: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindtapa(e) {
    wx.showToast({
      title: '在开发中',
    })
  },
  bindtapb(e) {
    wx.showToast({
      title: '在开发中',
    })
  },
  bindtapc(e) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    todos.get({
      //如果查询成功的话    
      success: res => {
        const CodeID = that.data.CodeID
        const openids = that.data.openids
        const contant = openids + CodeID
        console.log("5563202156235",contant)
        console.log(res.data.PagesIndex)
        const openidTos = res.data.selected
        const prodData = openidTos.map(function(item) {
          return item['openid'] + item['CodeID']
        })
        console.log(prodData)
        const prodData2 = prodData.every(function(item) {
          return item !== contant
        })
        if(prodData2 == true ) {
          todos.update({
            data: {
              selected: _.push({
                CodeID: that.data.CodeID,
                ImageUrl: that.data.ImageUrl,
                describe: that.data.describe,
                openid: that.data.openids,
                money: that.data.money
              })
            },
            success: res => {
              console.log("数据库写入成功", res)
              wx.showToast({
                title: '已经加入购物车',
              })
             
            },
            fail: error => {
              console.log('数据库写入失败', error)
            }
          }) 
        } else if(prodData2 == false ) {
          wx.showToast({
            title: '之前已经加入了',
          })
          return
        }
      }
    })
    wx.hideLoading()
  },
  bindtapd(e) {
    wx.navigateTo({
      url: '../money/money?ImageUrl=' + this.data.ImageUrl + '&money=' + this.data.money +'&describe=' + this.data.describe,
    })
  },
  onLoad: function (options) {
    console.log("传递",options.ImageUrl)
    console.log("传递",options.money)
    console.log("传递",options.describe)
    console.log("传递",options.openid)
    console.log("传递",options.CodeID)
    this.setData({
      ImageUrl: options.ImageUrl,
      money: options.money,
      describe: options.describe,
      openid: options.openid,
      CodeID: options.CodeID
    })
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        that.setData({
          openids: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })    
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
    
  }
})