// miniprogram/pages/cart/cart.js
const db = wx.cloud.database({});
const todos = db.collection("smzdmYouhuiLists").doc('jM7iIblpMzePjdNHtlQd1mPCMpiQs3gKYs6MeBBED8VRy6XB')
const _ = db.command
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PAHE: 0,
    // ArrayNew: [0],
    ifelse: false,
    openid: null,
    PageSindexP: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  checkboxChange(e) {
   
    let arr = e.detail.value
    let num = parseInt(arr)
    // this.data.ArrayNew.push(num)
    // console.log(this.data.ArrayNew)
    this.setData({
      PAHE: num
    })
  },
  button() {
    wx.showToast({
      title: '开发中',
    })
  },
  onLoad: function (options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if (this.data.ifelse === false) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else if (this.data.ifelse === true) {
      todos.get({
        success: res => {
          let PagesIndexS = res.data.selected
          let openids = this.data.openid
          console.log('8888', res.data.selected)
          // let filt = new Object()
          // this.setData({
          //   PagesIndexS: res.data.selected
          // })
          let newArr = PagesIndexS.filter(function (obj) {
            return obj.openid === openids
          })
          console.log('7777', newArr)
          this.setData({
            PageSindexP: newArr
          })
        },
      })
    }
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