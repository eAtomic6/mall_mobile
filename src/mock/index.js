import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random;
//使用mockjs模拟数据

// const tabTitle = ['全部','水果','肉禽类','蔬菜','水产','速冻','进口','国产']
const getTabList = function () {
    let tabs = []
    for (let i = 0; i < 8; i++) {
        let obj = {
            id:i+1,
            name:Random.cname(), // 生成一条随机的中文句子 ( min, max )
        }
        tabs.push(obj)
    }
    return tabs
}
const getGoodsList = function () {
    let list = []
    for (let i = 0; i < 30; i++) {
        let obj = {
            id:i+1,
            price:Random.natural(10,30), //返回一个随机的自然数
            product_type:Random.natural(1,8), //返回一个随机的自然数
            name:Random.csentence(10, 100), // 生成一条随机的中文句子 ( min, max )
            date:Random.date("yyyy-MM-dd"),// Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            time:Random.time(),//时间
            image:Random.dataImage('200x200', 'mock的图片'), //模拟图片 宽高不指定则随机
        }
        list.push(obj)
    }
    return list
}
Mock.mock('/api/tab', 'get', getTabList)
Mock.mock('/api/list', 'get', getGoodsList)