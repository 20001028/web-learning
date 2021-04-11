//Iterator


//一、Iteartor的概念
//Iterator是一种接口，为各种数据结构提供统一的访问机制
//任何数据结构只要部署了Iterator接口，就可以完成遍历操作

//Iterator遍历过程
//1）创建一个指针对象，指向当前数据结构起始位置
//2）第一次调用next方法指向数据结构第一个成员
//3）不断调用next方法，直到指针指向数据结构结束位置

//每一次调用next方法都会返回一个包含value和done两个属性的对象
//value是成员的值，done属性表示是否结束

function makeIterator(array){
    var nextIndex=0;
    return {
        next:function(){
            return nextIndex<array.length ? 
            {
                value:array[nextIndex++],done:false
            } : {
                value:undefined,done:true
            };
        },
    };
}

var it=makeIterator(['a','b']);

// console.log(it.next());//{ value: 'a', done: false }
// console.log(it.next());//{ value: 'b', done: false }
// console.log(it.next());//{ value: undefined, done: true }

//done:false和value:undefined属性都可以省略
function makeIterator2(array){
    var nextIndex=0;
    return {
        next:function(){
            return nextIndex<array.length ? 
            {
                value:array[nextIndex++]
            } : {
                done:true
            };
        },
    };
}