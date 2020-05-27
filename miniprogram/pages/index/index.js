//云数据库初始化
const db = wx.cloud.database({});
const todos = db.collection("smzdmYouhuiLists").doc('jM7iIblpMzePjdNHtlQd1mPCMpiQs3gKYs6MeBBED8VRy6XB')
var app = getApp()
Page({
  data: {
    PageArroy: [], //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    MathMax: null
  },
  /**
   * 生命周期函数--监听页面加载
   */

  bindtapNavigator(e) {
      wx.showModal({
        content: '发布商品将获取你的基本信息！',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../listfb/listfb?MathMax=' + JSON.stringify(this.data.MathMax),
            })
          }
        },
      })
  },
  onLoad: function (options) {
    //2、开始查询数据了  news对应的是集合的名称  
    wx.showLoading({
      title: '加载中',
    })
    todos.get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        this.setData({
          PageArroy: res.data
        })
      },
      fail: error => {
        wx.showToast({
          title: '出错！',
        })
      }
    })
    setTimeout(function () {
      wx.showToast({
        title: '加载成功！',
      })
    }, 1000)
  },
  onPullDownRefresh: function () {
    todos.get({
      success: res => {
        this.setData({
          PageArroy: res.data,
        })
      },
      fail: error => {
        wx.showToast({
          title: '出错！',
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
})