//ES6中函数的扩展

//一、函数参数的默认值
//1.优点：1)简洁自然;2)阅读代码的人可以直接看到哪些参数可以省略，不用查看函数体和文档;3)有利于代码优化

//2.基本用法
function log(x='Hello',y='World'){
    console.log(x,y);
}
//log();

//函数不能有同名参数
function Point(x=0,y=0){//参数变量x、y在函数中默认声明，不能在函数体中再次用let和const声明
    this.x=x;
    this.y=y;
}
const p=new Point();
//console.log(p);

//参数默认值不是传值进去，而是每次调用函数都会重新计算默认值的值，惰性求值
let x=99;
function foo(p=x+1){
    console.log(p);
}
//foo();
x++;
//foo();

//3.与解构赋值默认值结合使用
function foo({x,y=5}={}){
    console.log(x,y);
}
//foo();

function m1({x=0,y=0}={}){
    //console.log(x,y);
}
function m2({x,y}={x:0,y:0}){
    //console.log(x,y);
}
//函数没有参数，先使用参数的默认值，如果参数没有默认值，使用解构赋值的默认值
//函数有参数传入的时候，只会使用到参数的默认值，不会使用解构赋值的默认值
m1();
m2();
//x、y都有值
m1({x:1,y:1});
m2({x:1,y:1});
//x有值，y无值
m1({x:1});//1,0
m2({x:1});//1,undefined
//x和y都无值
m1({});//0,0
m2({});//undefined,undefined

//4.参数默认值的位置
//一般定义了默认值的参数是函数的尾参数，才可以看出可以省略的参数
//非尾参数不可省略
function f(x=1,y){
    //console.log(x,y);
}
f();
f(2);//2为x的值
//f(,1);
//显示传入undefined会触发参数等于默认值，null不行
f(undefined,1);//1,1
f(null,1);//null,1

//5.函数的length属性
//指定了默认值后，函数的length属性只会返回没有默认值的参数个数
//length属性的含义是该函数预期传入的参数个数，指定了默认值后，预期传入的参数就不包括该参数
//console.log((function(a){}).length);//1
//console.log((function(a=1){}).length);//0
//console.log((function(a,b,c=1){}).length);//2

//如果设置了默认值的参数不是尾参数，length属性将不会计算后面的参数
//console.log((function(a=1,b,c){}).length);//0
//console.log((function(a,b=1,c){}).length);//1
//特殊情况
//console.log((function(...args){}).length);//0

//6.作用域
//一旦设置了函数的默认值，函数进行声明和初始化时，参数会形成一个单独的作用域，初始化结束，作用域消失
var z=1;
function f1(z,y=z){//初始化时，形成一个单独的作用域，y=z中z指向的是参数z而不是全局变量z
    console.log(y);
}
//f1(2);//2
let z1=1;
function f2(y=z1){//作用域里，变量z1并没有定义，所以会指向全局变量z1；如果全局变量z1不存在，会报错
    let z1=2;//函数定义时，函数体内的定义不会影响参数
    console.log(y);
}
//f2();//1

// var x1=1;
// function f3(x1=x1){//也会报错，相当于执行let x1=x1，很明显因为let的暂时性死区，后面的x未声明

// }

let foos='outer';
function bar(func=()=>foos){//匿名函数返回foos变量，由于作用域里没有foos变量，因此指向全局变量foos
    //如果foos变量不存在，报错
    let foos='inner';//没关系
    console.log(func());
}

//bar();//outer

var x2=1;//不变
function foo2(x2,y=function(){x2=2}){//局部作用域中匿名函数中的x2指向参数x2,
    var x2=3;//x2由var声明为函数的局部变量与参数x2不同；如果去掉var则指向参数var
    y();
    console.log(x2);//指向局部变量x2而不是参数x2
}
//foo2();//3

//7.应用
//1）指定某一个参数不得省略，否则抛出错误
function throwOfMissing(){
    return new Error('Missing Parameter');
}
function foo3(must=throwOfMissing()){
    return must;
}
//console.log(foo3());//'Missing Parameter'

//2）参数默认值设为undefined，表明参数可以省略
function foo4(optional=undefined){}


//二、rest参数
//ES6引入rest参数（形式为...变量名），用于获取函数的多余参数，不需要使用arguments对象
//rest参数中的变量是一个数组，将多余的变量放入一个数组中

function add(...values){
    let sum=0;

    for(let val of values){
        sum+=val;
    }

    return sum;
}

//console.log(add(1,2,3,4))//利用rest参数可以传入任意数目的参数

//数组排序
//arguments变量的写法
function sortNumbers(){
    //arguments对象不是数组，使用之前需要用Array.prototype.slice.call转换为数组
    return Array.prototype.slice.call(arguments).sort();
}
//rest参数的写法
//rest参数是一个数组
const sortNumbers1=(...numbers)=>numbers.sort();

//利用rest参数改写push方法
function _push(arr,...items){
    items.forEach(function(item){
        arr.push(item);
        console.log(item);
    })
}
var a=[];
//_push(a,[1,1,2,3,4]);

//rest参数后不能有其他参数，必须是尾参数
//函数的length属性同样不包括rest参数
//console.log((function(a,...b){}).length);

//三、严格模式
//ES6规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，函数内部就不能显式的定义严格模式

// // 报错
// function doSomething(a, b = a) {
//     'use strict';
//     // code
// }
  
// // 报错
// const doSomething = function ({a, b}) {
//     'use strict';
//     // code
// };
  
// // 报错
// const doSomething = (...a) => {
//     'use strict';
//     // code
// };
  
// const obj = {
//     // 报错
//     doSomething({a, b}) {
//         'use strict';
//         // code
//     }
// };

//原因：函数内部的严格模式同时适用函数体和函数参数。但是函数执行的时候先执行函数参数再执行函数体。
//但是只有从函数体中才可以知道参数是否应该按照严格模式执行，参数却先于函数体执行
// function doSomething(value=070){
//     'use strict';
//     return value;
// }
//上述代码中，严格模式下不能用前缀0表示八进制，因此会报错
//但是JS引擎会先执行参数，在函数体中发现严格模式才会报错，增加了复杂性

//规避严格模式的限制
//1）全局严格模式
'use strict';
function doSomething(a,b=a){

}

//2）把函数包在一个无参数的立即执行函数中
const doSomething1=(function(){
    'use strict';
    return function(value=42){
        return value;
    };
});

//四、name属性
//函数的name属性返回函数的函数名
function foo4(){};
//console.log(foo4.name);

//匿名函数的name属性
var f=function(){};
//ES5返回空字符串，ES6返回f
//console.log(f.name);//f

//具名函数赋值给一个变量
var bar=function baz(){};
//ES5和6都会返回具名函数的名称baz
//console.log(bar.name);//baz

//Function构造函数返回的name属性为anonymous
//console.log((new Function()).name);//anonymous

//bind返回的函数，name属性值前会加bound前缀
//console.log(bar.bind({}).name)//bound baz
//console.log((function(){}).bind({}).name)//bound

//五、箭头函数

//1.基本用法
//ES6允许使用箭头=>定义函数

var f= v => v;
//等同于
var f=function(v){
    return v;
};
//console.log(f(1));

//如果箭头不需要参数或需要多个参数，使用圆括号代替
var f=()=>5;
//console.log(f());
//等同于
var f=function(){
    return 5;
};
var sum=(a,b)=>a+b;
//console.log(sum(1,3));
//等同于
var sum=function(a,b){
    return a+b;
};

//如果函数代码块部分多于一条语句则使用大括号括起来，并且需要用return语句返回
var sum=(a,b)=>{return a+b};

//因为大括号会被解释为代码块，因此如果直接返回一个对象，应该用括号括起来，否则会报错
let getTempItem=id=>({id:id,name:'zzg'});

//特殊情况，虽然可以运行，但是会得到错误的结果
let foow=()=>{a:1};//大括号被认为是代码块，因此会执行语句a:1，a被解释为标签，因此执行语句为1，并没有返回值，输出undefined
//console.log(foow());//undefined

//如果箭头函数只有一行语句且不需要返回值
let fn=()=>void doesNotReturn();

//箭头函数与变量解构结合
const full=({first,last})=>first+' '+last;
//等同于
function fulls(person){
    return person.first+' '+person.last;
}

//箭头函数可以简化表达
const isEven=n=>n%2===0;
const square=n=>n*n;

//简化回调函数
//正常函数
[1,2,3].map(function(x){
    return x*x;
});
//箭头函数
[1,2,3].map(x=>x*x);

//正常函数
[1,2,3].sort(function(a,b){
    return a-b;
});
//箭头函数
[1,2,3].sort((a,b)=>a-b);

//rest参数与箭头函数结合
const numbers=(...nums)=>nums;
//console.log(numbers(1,2,3,4));//[1,2,3,4]
const headAndTail=(head,...tail)=>[head,tail];
//console.log(headAndTail(1,2,3,4,5));//[1,[2,3,4,5]]

//2.使用注意点
//函数体内的this对象，总是指向定义时所在的对象，而不是使用时所在的对象
function foor(){
    setTimeout(()=>{//setTimeout的参数是一个箭头函数，它的定义是在foo函数生成时，但执行等到100ms后
        //如果是普通函数，this指向window，输出21
        //箭头函数导致this总是指向定义生效时所指的对象{id:42}，因此输出42
        console.log('id:',this.id);
    },100);
}
var id=21;
//foor.call({id:42});

//箭头函数可以让setTimeout里面的this绑定定义时所在的定义域，而不是指向运行时所在作用域
function Timer(){
    this.s1=0;
    this.s2=0;
    setInterval(()=>this.s1++,1000);//this绑定定义时所在的作用域：Timer函数
    setInterval(function(){
        this.s2++;//this绑定运行时所在的作用域（全局对象）
    },1000);
}
//var timer=new Timer();//定义时

//setTimeout(()=>console.log('s1:',timer.s1),3100);//3
//setTimeout(()=>console.log('s2:',timer.s2),3100);//0

//箭头函数让this指向固定化，有利于封装回调函数
var handler={
    id:'123456',

    init:function(){
        //箭头函数里的this总是指向handler对象
        //并不是因为箭头函数内部有绑定this的机制，而是因为箭头函数没有自己的this
        //导致内部的this就是外层代码块的this，也不能用作构造函数
        document.addEventListener('click',event=>this.doSomething(event.type),false);
    },

    doSomething:function(type){
        console.log('Handling '+type+'for'+this.id);
    }
};

//在ES5中，箭头函数根本没有自己的this，而是引用外层的this

function foot(){
    return ()=>{
        return ()=>{
            return ()=>{
                console.log(this.id);
            }
        }
    }
}
//上述代码中只有一个this，就是foot函数的this，因此输出结果都一样
var f=foot.call({id:1});

//f.call({id:2})()();//1
//f().call({id:3})();//1
//f()().call({id:4});//1

//除了this，在箭头函数中不存在的三个变量：arguments、super、new.target
function foog(){
    setTimeout(()=>{
        console.log('args:',arguments);
    },100);
}
//因为箭头函数没有arguments对象，因此输出foog函数的arguments对象
//foog(2,4,5,7)//args: [Arguments] { '0': 2, '1': 4, '2': 5, '3': 7 }

//由于箭头函数没有自己的this，因此不可以用bind、apply、call去改变this指向
var res=(function(){
    return [
        (()=>this.x).bind({x:'inner'})()//bind方法无效，箭头函数内部的this指向外部的this
    ];
}).call({x:'outer'});//['outer']

//3.不适用场合
//由于箭头函数使得this从动态变成静态
//1）定义对象的方法，且该方法内部包括this
const cat={
    lives:9,
    jumps:()=>{//jumps是一个箭头函数，this指向全局对象，
        //因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域
        this.lives--;
    }
    //如果jumps是普通函数，方法内部的this指向cat
}

globalThis.s=21;
const obj={
    s:42,
    //obj.m()使用箭头函数定义。JS引擎会现在全局空间生成这个箭头函数，然后赋值给obj.m
    //导致箭头函数内部的this指向全局对象，obj.m()输出全局空间的21
    m:()=>console.log(this.s)//21
};

//2）需要动态this的时候不应使用箭头函数
// var button=document.getElementById('press');
// button.addEventListener('click',()=>{
//     this.classList.toggle('on');
// });
//点击按钮会报错，因为button监听函数是箭头函数，里面的this就是全局对象而不会动态指向被点击的按钮对象

//4.嵌套的箭头函数
//多重嵌套函数
function insert(value){
    return {
        into:function(array){
            return {
                after:function(afterValue){
                    array.splice(array.indexOf(afterValue)+1,0,value);
                    return array;
                }
            }
        }
    }
}
//console.log(insert(2).into([1,3]).after(1));
//箭头函数改写
let insert1=(value)=>({
    into:(array)=>({
        after:(afterValue)=>{
            array.splice(array.indexOf(afterValue)+1,0,value);
            return array;
        }})})
console.log(insert1(2).into([1,3]).after(1));

//六、尾调用优化

//七、函数参数的尾逗号
//ES6允许函数的最后一个参数有尾逗号
//使得函数参数与数组和对象的尾逗号规则保持一致
function clownsEverywhere(
    param1,
    param2,
){  }
clownsEverywhere(
    'foo',
    'bar',
);


//八、Function.prototype.toString()
//ES6对函数实例的toString()方法做了修改，toString方法返回函数代码本身
//修改前的函数会省略空格和注释，修改后明确要求返回一模一样的原始代码
function /* foo comment */ foo(){}
console.log(foo.toString());

//九、catch命令的参数省略
//JS中try...catch明确要去catch命令后面必须跟参数，接受try代码块抛出的错误对象
try{

}catch(err)
{

}
//ES6中允许catch语句省略参数
try{

}catch{
    
}