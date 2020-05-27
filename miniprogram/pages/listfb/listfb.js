// miniprogram/pages/listfb/listfb.js
const app = getApp()
const db = wx.cloud.database({})
const todos = db.collection('smzdmYouhuiLists').doc('jM7iIblpMzePjdNHtlQd1mPCMpiQs3gKYs6MeBBED8VRy6XB')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        describe: "数码",
        identity: "0",
        checked: "true"
      },
      {
        describe: "乐器",
        identity: "1"
      },
      {
        describe: "体育",
        identity: "2"
      },
      {
        describe: "图书",
        identity: "3"
      },
      {
        describe: "其他",
        identity: "4"
      },
    ],
    files: [],
    identity: 0,
    describe: null,
    money: null,
    CodeID: null,
    ImageUrl: 'null',
    openid: null,
    ifelse: false,
    fileID: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindinputListfb(e) {
    console.log("input", e.detail.value)
    this.setData({
      describe: e.detail.value
    })
  },
  bindinputListfbMoney(e) {
    console.log("money", e.detail.value)
    this.setData({
      money: e.detail.value
    })
  },
  bindchangeListfb(e) {
    console.log("宝贝", e.detail.value)
    this.setData({
      identity: e.detail.value
    })
  },
  chooseImage(e) {
    let that = this
    console.log("8888", e)
    wx.chooseImage({
      current: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log('9999', res.tempFilePaths)
        // console.log("")
        that.setData({
          files: res.tempFilePaths
        })
      },
      fail: error => {
        wx.showToast({
          title: '取消或错误!',
        })
      }
    })
  },
  chooseImageNO(e) {
    this.setData({
      files: ''
    })
  },
  bindtapCancel(e) {
    wx.showModal({
      content: '是否关闭当前页面!',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  bindtapRelease(e) {
     if(this.data.describe === null) {
      wx.showToast({
        title: '描述不能为空',
      })
    }
    else if (this.data.files === '') {
      wx.showToast({
        title: '图片不能为空',
      })
    }
    else if(this.data.money === null) {
      wx.showToast({
        title: '商品价格不能为空',
      })
    } else {
    wx.showModal({
      content: '是否发布你的商品？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '发布',
      success: res => {
         if (res.confirm) {
          let that = this
          let filePath = that.data.files[0]
          const cloudPath = 'imagesPage/' + filePath.substring(59, 68) + filePath.match(/\.[^.]+?$/)         
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              // get resource ID
              console.log('上传成功', res)
              wx.cloud.getTempFileURL({
                fileList: [{
                  fileID: res.fileID
                }],
                success: res => {
                  console.log('链接拿取成功', res.fileList[0].tempFileURL)
                  this.setData({
                    ImageUrl: res.fileList[0].tempFileURL
                  })
                  const str = ''
                  const str1 = parseInt(this.data.CodeID) + parseInt(1)
                  const str2 = ''
                  const str3 = this.data.identity
                  const StrCodeId = (str.concat(str1).concat(str2))
                  const StrIdentity = (str.concat(str3).concat(str2)) 
                  todos.update({
                    data: {
                      PagesIndex: _.push({
                        CodeID:  filePath.substring(59, 68),
                        ImageUrl: res.fileList[0].tempFileURL,
                        describe: this.data.describe,
                        identity: StrIdentity,
                        openid: this.data.openid,
                        money: this.data.money
                      })
                    },
                    success: res =>   {
                      console.log("数据库写入成功", res)
                      wx.hideLoading({
                        complete: (res) => {
                          wx.showToast({
                            title: '发布成功',
                          })
                        },
                      })
                      this.setData({
                        files: '',
                        money: null,
                        describe: null
                      })
                    },
                    fail: error => {
                      console.log('数据库写入失败', error)
                    }
                  })            
                },
                fail: error => {
                  console.log("拿取失败", error)
                }
              })
            },
            fail: err => {
              // handle error
              console.log("图片上传失败", error)
            }
          })
        } else {
          console.log(res.cancel)
        }
      }
    })
  }
  },
  previewImage(e) {
    console.log('6666', this.data.files)
    console.log("input", this.data.describe)
    console.log("宝贝", this.data.identity)
    console.log("Money", this.data.money)
    console.log("ImageUrl", this.data.ImageUrl)
    console.log("CodeID", this.data.CodeID)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.files
    })
  },
  onPullDownRefresh: function(e) {
    console.log(55555)
  },
  onLoad: function (options) {
    var that = this
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
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  /**
   * 生命周期函数--监听页面显示
   */

  },
  onShow: function () {
    if(this.data.ifelse === false) {
      wx.navigateTo({
        url: '../login/login',
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