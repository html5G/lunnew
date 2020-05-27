const db = wx.cloud.database({});
const todos = db.collection("smzdmYouhuiLists").doc('jM7iIblpMzePjdNHtlQd1mPCMpiQs3gKYs6MeBBED8VRy6XB')
const _ = db.command
var app = getApp()
Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    name: '名字',
    PUSH: 0,
    city: null,
    PUSHItem: '',
    PUSH1: 0,
    openid: null,
  },
  getUser() {
    var that = this
    wx.getUserInfo({
      success(res) {
        console.log("获取用户信息成功", res)
        wx.showToast({
          title: '登录成功',
        })
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          city: res.userInfo.city
        })
        todos.get({
          //如果查询成功的话    
          success: res => {
            const openid = that.data.openid
            console.log(res.data.PagesIndex)
            const openidTo = res.data.PagesIndex
            let newArr = openidTo.filter(function (obj) {
              return obj.openid === openid
            })
            console.log("huhcdusfuds", newArr)
            let PUSHItemString = JSON.stringify(newArr)
            console.log('PUSHItemString',PUSHItemString)
            that.setData({
              PUSH: newArr.length,
              PUSHItem: PUSHItemString
            })
            /*写入 */
            const openids = that.data.openid
            console.log(res.data.longin)
            const openidTos = res.data.longin
            const prodData = openidTos.map(function(item) {
              return item['openid']
            })
            console.log(prodData)
            const prodData1 = prodData.every(function(item) {
              return item !== openids
            })
            console.log(prodData1)
            if(prodData1 == true) {
              todos.update({
                data: {
                  longin: _.push({
                    avatarUrl: that.data.avatarUrl,
                    nickName: that.data.name,
                    openid: that.data.openid,
                    city: that.data.city
                  })
                },
                success: res => {
                  console.log("数据库写入成功", res)
                },
                fail: error => {
                  console.log('数据库写入失败', error)
                }
              }) 
            } else if(prodData1 == false) {
              return
            }
          },
          fail: error => {
            wx.showToast({
              title: '出错！',
            })
          }
        })
      },
      fail(res) {
        wx.showToast({
          title: '出错',
        })
      }
    })
  },
  getUserInfo: function (e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log(99999)
          that.getUser()
        }
      }
    })
  },
  onLoad: function (options) {
    let that = this;
    that.getUser()
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        that.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })    
  }
})