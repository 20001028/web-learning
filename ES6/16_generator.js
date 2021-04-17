//Generator函数的语法

//一、简介
//Generator函数是一个状态机，封装了多个内部状态
//执行Generator函数会返回一个遍历器对象，Geneartor处理是状态机，还是一个遍历器对象生成函数
//返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态
//
//Generator函数的两个特征
//function关键字和函数名之间有一个*号
//函数体内部使用yield表达式，定义不同的内部状态

function* helloWorldGenerator(){
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw=helloWorldGenerator();

//调用Geneator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象Iterator
//调用遍历器对象的next方法，指针移向下一个状态
//每次调用next方法，内部指针从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式或return语句
//Generator函数是分段执行，yield是暂停执行的标记，next方法可以恢复执行

console.log(hw.next());//开始执行，{ value: 'hello', done: false }
console.log(hw.next());//{ value: 'world', done: false }
console.log(hw.next());//执行到return语句或函数结束，返回{ value: 'ending', done: true }
console.log(hw.next());//执行已经结束，返回{ value: undefined, done: true }
