const MIXIN = {
    methods: {
        /**
          * @desc - 添加商品至购物车  
        */
        addCarFn(type='init',item) {
            // debugger
            let carList = []
            let obj = type==='init' ? {...this.detailInfo} : {...item}
            obj.num = 1
            if(localStorage.getItem('carList')) {
                let arr = JSON.parse(localStorage.getItem('carList'))
                let _index
                arr.find((item,index) => {
                    if(item.name === obj.name) {
                        _index = index
                    }
                })
                if(typeof _index === 'number') {
                    ++arr[_index].num
                }else{
                    arr.push(obj)
                }
                carList = [...arr]
            } else {
                carList = [obj]
            }
            this.$toast('添加成功，在购物车等亲')
            localStorage.setItem('carList',JSON.stringify(carList))
        }
    }
}
export {
    MIXIN
}