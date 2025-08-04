import {listNav,queryProduct} from "../../api/apis"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[],
    productList:[],
    total:"0",
    keyword:"",
    noData:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let searchKeyArr = wx.getStorageSync('searchKeyArr')||null;
    if(searchKeyArr){
        this.setData({
            historyList:searchKeyArr
        })
    }
  },
  //输入框改变的时候
  onChange(e){
    this.setData({
        keyword:e.detail
    })
  },
  //清空输入框
  onClear(){
      this.setData({
          keyword:"",
          productList:"",
          total:0,
          noData:true
      })
  },
  //点击搜索的每一项
  tapHisItem(e){
    console.log(e);
    this.setData({
        keyword:e.currentTarget.dataset.value
    })
    this.getData()
  },
  //清空搜索历史
  removeHistory(){
    wx.removeStorageSync('searchKeyArr')
    this.setData({
        historyList:[],
        total:0,
        keyword:"",
        productList:[],
        noData:true
    })
  },
  //确认搜索
  onSearch(){
    console.log(this.data.keyword);
    let hisArr = this.data.historyList || [];
    hisArr.unshift(this.data.keyword);
    hisArr = [...new Set(hisArr)]
    hisArr = hisArr.slice(0,5)
    this.setData({
        historyList:hisArr
    })
    wx.setStorageSync('searchKeyArr', hisArr);
    this.getData();
  },
  //获取搜索产品
  getData(s=0){
      queryProduct({
          keyword:this.data.keyword,
          limit:10,
          size:s
      }).then(res=>{
          let oldArr = this.data.productList
          let newArr = oldArr.concat(res.data)
          let noData = false
          if(res.data.length==0){
              noData = true
        }
          console.log(res);
          this.setData({
            total:res.total,
            productList:newArr,
            noData
          })
          if(res.total==this.data.productList.length){
            this.setData({
                noData:true
            })
        }
        
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.noData){return}
    this.getData(this.data.productList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})