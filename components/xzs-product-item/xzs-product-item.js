// components/xzs-product-item/xzs-product-item.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
        type:Object,
        value:{
            grade:"",
            picpath:"",
            price:"",
            pronum:"",
            title:"",
            weight:"",
            year:"",
            _id:""
        }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickPro(e){
        console.log(123123);
        console.log(e);
        let id = e.currentTarget.dataset.id
        console.log(id);
        wx.navigateTo({
          url: '/pages/proDetail/proDetail?id='+id,
        })
    }
  }
})