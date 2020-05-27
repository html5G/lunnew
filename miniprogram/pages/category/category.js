// miniprogram/pages/category/category.js
const db = wx.cloud.database()
const todos = db.collection("smzdmYouhuiLists").doc('jM7iIblpMzePjdNHtlQd1mPCMpiQs3gKYs6MeBBED8VRy6XB')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    PageCurrentData: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onPullDownRefresh: function () {
    
    
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //2、开始查询数据了  news对应的是集合的名称   
    todos.get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        this.setData({
          PageCurrentData: res.data,
        })
      },
      fail: error => {
        wx.showToast({
          title: '出错',
        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

  },
  //获取当前滑块的index
  bindchange: function (e) {
    const _that = this;
    console.log("7777777", e)
    _that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
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
    let that = this
    console.log(888)
    todos.get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        that.setData({
          PageCurrentData: res.data,
        })
      },
      fail: error => {
        wx.showToast({
          title: '出错',
        })
      }
    })
    wx.stopPullDownRefresh({})
    setTimeout(function () {
      wx.showToast({
        title: '更新成功',
      })
    }, 1000)
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