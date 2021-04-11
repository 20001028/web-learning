//ES6中的数组扩展

//一、扩展运算符
//1.含义
//扩展运算符是三个点...,好比rest参数的逆运算，将一个数组转换为用逗号分隔的参数序列
//console.log(...[1,2,3]);

//扩展运算符主要用于函数调用
function push(arr,...items){
    arr.push(...items);
}

function add(x,y){
    return x+y;
}

const numbers=[1,45];
//console.log(add(...numbers));//...运算符把一个数组变为参数序列

//扩展运算符可以与正常的函数参数结合使用
function f(a,b,c,d,e){}
var args=[0,1];
f(-1,...args,...args);

//扩展运算符后放表达式
var x=1;
const arr=[
    ...(x>0 ? ['a'] : []),
    'b',
];
//console.log(arr);//['a','b']

//扩展运算符后是空数组，不产生任何效果
//console.log([...[],1])//[1]

//只有函数调用，扩展运算符才可以放在圆括号中
//(...[1,2]);//报错
//console.log((...[1,2]));//报错
//console.log(...[1,2]);

//2.替代函数的apply方法
//由于扩展运算符可以展开数组，因此不在需要apply方法，将数组转化为函数
//ES5
function f(x,y,z){

}
var args=[0,1,2];
f.apply(null,args);

//ES6
f(...args);

//ES5
//console.log(Math.max.apply(null,args));//2

//ES6
//console.log(Math.max(...args));//2

//ES5
var arr1=[0,1,2];
var arr2=[3,4,5];
Array.prototype.push.apply(arr1,arr2);
//console.log(arr1);

//ES6
arr1.push(...arr2);
//console.log(arr1)

//3.扩展运算符的应用
//1)复制数组：数组是符合数据类型，直接复制的话只是复制了指向低层数据结构的指针，而不是克隆一个新数组
//ES5
const a1=[1,2];
const a2=a1.concat();
a2[0]=3;
//console.log(a1);//[1,2],a2的改变不会引起a1的改变

//ES6
const a3=[...a1];
const [...a4]=a1;
//console.log(a3,a4);//[1,2]

//2）合并数组
const ar1=['a','b'];
const ar2=['c'];
const ar3=['d','e'];

//ES5
//console.log(ar1.concat(ar2,ar3));//concat不会改变原数组

//ES6
//console.log([...ar1,...ar2,...ar3]);
const merge=[...ar1,...ar2,...ar3];
merge[1]='f';
//console.log(ar1[0]===merge[0]);//True,浅拷贝，merge数组的变化会影响原数组

//3)与解构赋值结合
//用于生成数组
//ES5
const list=[1,2,3,4,5,6];
var a=list[0];
var rest=list.slice(1);
//console.log(rest);//[2,3,4,5,6]

//ES6
[a,...rest]=list;

const [first,...rest1]=[1,2,3,4,5];
//console.log(first,rest1);//1 [2,3,4,5]

const [first2,...rest2]=[]
//console.log(first2,rest2);//undefined,[]

const [first3,...rest3]=['foo'];
//console.log(first3,rest3);//'foo',[]
//如果将扩展运算符用于数组赋值，只能放在最后一位

//4）字符串
//扩展运算符可以把字符串转换为数组
//console.log([...'hello']);//['h','e','l','l','o']

//返回字符串长度的函数
function length(str){
    return [...str].length;
}

//console.log(length('hello'));//5

//5）实现Iterator接口的对象
//任何定义了Iterator接口的对象都可以用扩展运算符转换为真正的数组

//6）Map和Set结构，Generator函数

//二、Array.from()
//用于将类似数组的对象和可遍历的对象转换为数组
let arrayLike={
    '0':'a',
    '1':'b',
    '2':'c',
    length:3,
};

//ES5
var arr1=[].slice.call(arrayLike);

//ES6
var arr2=Array.from(arrayLike);//['a','b','c']

//console.log(arr1,arr2);

//常见的类似数组的对象是DOM操作返回的NodeList集合以及函数内部的arguments对象，都可以转换为数组
function foo(){
    return Array.from(arguments);
}

//只要是部署了Iterator接口的数据结构，都可以转换为数组
//console.log(Array.from('hello'));

let namesSet=new Set(['a','b'])
//console.log(Array.from(namesSet));['a','b']

//如果参数是一个真正的数组，会返回一个一模一样的新数组
//console.log(Array.from[1,2,3]);//[1,2,3]

//任何有length属性的对象，都可以通过Array.from转换为数组，而扩展运算符不行
//console.log(Array.from({length:3}));//[undefined,undefined,undefined]

//没有Array.from方法的浏览器可以yogaArray.prototype.slice方法代替
const toArray=(()=>
    Array.from ? Array.from : obj=>[].slice.call(obj)
)();

//Array.from方法可以接受第二个参数，作用类似于数组的map方法，对每个元素进行处理并放入返回的数组
var arrayLikes={'0':1,'1':2,'2':3,length:3,};

//console.log(Array.from(arrayLikes,x=>x*x));//[1,4,9]
//等同于
//console.log(Array.from(arrayLikes).map(x=>x*x));//[1,4,9]
//console.log(Array.from([1,2,3],(x)=>x*x));//[1,4,9]

//console.log(Array.from([1,,2,,3],(n)=>n||0));//[1,0,2,0,3],把数组中布尔值为false的成员转换为0

//返回各种数据的类型
function typeOf(){
    return Array.from(arguments,value=>typeof value);
}

//console.log(typeOf(null,[],NaN));//['object','object','number']

//如果map函数里用到了this关键字，还可以传入Array.from的第三个参数用于绑定this

//Array.from可以将各种值转换为真正的数组并且提供map功能
//console.log(Array.from({length:2},()=>'jack'))//['jack','jack']

//将字符串转换为数组，返回字符串长度
function countSymbols(string){
    return Array.from(string).length;
}

//console.log(countSymbols('acbsbjch'));//8

//三、Array.of()
//Array.of方法用于将一组值转换为数组
//console.log(Array.of(3,11,8))//[3,11,8]
//console.log(Array.of(3));//[3]
//console.log(Array.of(3).length)//1

//Array.of方法主要用于弥补Array构造函数的不足，因为参数个数的不同，Array()行为有差异
//console.log(Array());//[]
//console.log(Array(3));//[,,,]，参数只有一个正整数时，实际上是指定数组的长度
//console.log(Array(3,11,8));//[3,11,8],只有当参数不少于两个时，才会返回参数组成的新数组

//Array.of()基本上可以用来替代Array()或newArray()，并且行为非常统一
//console.log(Array.of());//[],没有参数，返回空数组
//console.log(Array.of(undefined));//[undefined]
//console.log(Array.of(1));//[1]
//console.log(Array.of(1,2));//[1,2]

//m模拟实现Array.of
function ArrayOf(){
    return [].slice.call(arguments);
}

//四、数组实例的copyWithin()
//在当前数组的内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
//这个方法会修改当前数组
//Array.prototype.copyWithin(target,start=0,end=this.length)
//target（必须）:从该位置开始替换数据
//start（可选）:从该位置开始读取数据，默认为0
//end（可选）:到该位置前停止读取数据，默认等于数组长度
//如果为负值，从末尾开始计数，三个参数如果不是数值将自动转换为数值
//console.log([1,2,3,4,5].copyWithin(0,3));//[4,5,3,4,5]

//将3号位复制到0号位
//console.log([1,2,3,4,5].copyWithin(0,3,4));
//console.log([1,2,3,4,5].copyWithin(0,-2,-1));//[3,2,3,4,5]

//将2号位到数组结束,复制到0号位
let i32a=new Int32Array([1,2,3,4,5]);
//console.log(i32a.copyWithin(0,2));//[3,4,5,4,5]

//对于没有部署此方法的平台，采用以下写法
[].copyWithin.call(new Int32Array([1,2,3,4,5]),0,3,4)//

//五、数组实例的find()和findIndex()
//find方法用于找出第一个符合条件的数组成员，参数是一个回调函数，找到第一个返回值为true的成员
//如果没有符合条件的，返回undefined

//找出第一个小于0的成员
//console.log([1,2,-5,10].find((n)=>n<0));//-5

//找出第一个大于9的成员
//参数依次为当前的值、当前位置、原数组
//[1,5,10,15].find(function(value,index,arr){return value>9;});//10

//findIndex方法返回第一个符合条件成员的位置，如果都不符合，返回-1
// console.log([1,5,10,15].findIndex(function(value,index,arr){
//     return value>9;
// }));//2

//两个方法都可以接受第二个参数用来绑定回调函数的this对象
function f(v){
    return v>this.age;
}
let person={name:'John',age:20};
//console.log([10,12,26,15].find(f,person));//26

//两个方法都可以发现NaN，弥补了indexOf方法的不足
//console.log([NaN].indexOf(NaN));//-1
//console.log([NaN].findIndex(y=>Object.is(NaN,y)));//0,借助Object.is方法识别NaN

//六、数组市里的fill()
//fill方法使用给定值填充一个数组
//console.log(['a','b','c'].fill(7));//[7,7,7]
//console.log(new Array(3).fill(7));//[7,7,7]
//fill方法用于空数组的初始化很方便，数组中已有的元素全部抹去

//fill方法还可以接受第二个和第三个参数，指定填充的起始位置和结束位置
//console.log(['a','b','c'].fill(7,1,2));//['a',7,'b']

//如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象
let arra=new Array(3).fill({name:'Mike'});
arra[0].name='Ben';
//console.log(arra);//[ { name: 'Ben' }, { name: 'Ben' }, { name: 'Ben' } ]

let arrb=new Array(3).fill([]);
arrb[0].push(5);
//console.log(arrb);//[ [ 5 ], [ 5 ], [ 5 ] ]

//数组实例的entries(),keys()和values()
//用于遍历数组，都返回一个遍历器对象，可以用for...of进行遍历
//keys是对键名进行遍历、values是对键值对进行遍历、entries是对键值对进行遍历
for(let index of ['a','b'].keys()){
    //console.log(index);
}//0,1

for(let elem of ['a','b'].values()){
    //console.log(elem);
}//'a','b'

for(let [index,elem] of ['a','b'].entries()){
    //console.log(index,elem);
}//0 'a',1 'b'

//如果不使用功能for...of循环，也可以调用Iterator对象的next方法进行遍历
let letter=['a','b','c'];
let entries=letter.entries();
//console.log(entries.next().value);//[ 0, 'a' ]
//console.log(entries.next().value);//[ 0, 'b' ]
//console.log(entries.next().value);//[ 0, 'c' ]

//八、数组实例的includes()
//Array.prototype.includes方法返回布尔值，表示该数组是否包含给定的值
//console.log([1,2,3].includes(2));//ture
//console.log([1,2,3].includes(4));//false
//console.log([1,2,NaN].includes(NaN));//true

//includes方法的第二个参数表示搜索的起始位置，默认为0，如果为负数表示倒数位置
//如果大于数组长度，重置为0
//console.log([1,2,3].includes(3,3));//false
//console.log([1,2,3].includes(3,-1));//true

//indexOf方法检查是否包含某个值
//缺点：不够语义化，需要比较是够不等于-1
//内部使用严格相等===运算符进行判断，导致对NaN的误判
//console.log([NaN].indexOf(NaN));//-1
//includes使用不一样的判断算法
//console.log([NaN].includes(NaN));//true

//对于可能不支持该方法的环境
const contains=(()=>Array.prototype.includes
    ? (arr,value)=>arr.includes(value)
    : (arr,value)=>arr.some(el=>el===value)
)();
//console.log(contains(['foo','bar'],'bar'));//true

//Map和Set都有一个has方法，注意与includes区分开
//Map的has方法用来查找键名，Map.prototype.has(key)，WeakMap.prototype.has(key),Reflect.has(target,propertyKey)
//Set的has方法用来查找值，Set.prototype.ahas(value),WeakSet.prototype.has(value)

//九、数组实例的flat(),flatMap()
//数组的成员有时韩式数组，Array.prototype.flat()用于将嵌套的数组拉平，编程一维数组
//返回一个新数组，对于原数组没有改变
//console.log([1,2,[3,4]].flat());[1,2,3,4]
//flat默认只会拉平一层，如果想要多层，需要传入参数表示要拉平的层数，默认为1
//console.log([1,2,[3,[4,5]]].flat());//[1,2,3,[4,5]]
//console.log([1,2,[3,[4,5]]].flat(2));//[1,2,3,4,5]

//如果不管多少层，可以用Inifinity关键字作为参数
//console.log([1,[2,[3]]].flat(Infinity));//[1,2,3]

//如果原数组有空位，flat会跳过空位
//console.log([1,2,,4,5].flat());//[1,2,4,5]

//flatMap方法对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat方法
//返回一个新数组，不改变原数组
//console.log([2,3,4].flatMap((x)=>[x,x*2]));//[2,4,3,6,4,8]

//flatMap只能展开一层数组
//console.log([1,2,3,4].flatMap(x=>[[x*2]]));//[ [ 2 ], [ 4 ], [ 6 ], [ 8 ] ]

//flat方法的参数是一个遍历函数，该函数可以接受三个参数：成员，位置，原数组
//flatMap方法可以有第二个参数，绑定遍历函数里面的this

//十、数组的空位
//数组的空位是指数组的某一个位置没有任何值
//Array的构造函数返回的数组都是空位
//console.log(Array(3));//[,,,]

//空位不是undefined，undefined是有值的，空位没有任何值
// console.log(0 in [undefined,undefined,undefined]);//true
// console.log(0 in [,,,]);//false

//ES5对空位的处理很不一致
//forEach(),filter(),reduce(),every(),some()会跳过空位
//map()会跳过空位，但会保留这个值
//join(),toString()会将空位视为undefined，而undefined和null会被处理成空字符串

//forEach
//console.log([,'a'].forEach((x,i)=>console.log(i)));//1
//filter
//console.log(['a',,'b'].filter(x=>true));//['a','b']
//every
//console.log([,'a'].every(x=>x==='a'));true
//reduce
//console.log([1,,2].reduce((x,y=>x+y)));//3
//some
//console.log([,'a'].some(x=>x!=='a'));//false
//map
//console.log([,'a'].map(x=>1));//[,1]
//join
//console.log([,'a',undefined,null].join('#'));//'#a##'
//toString
//console.log([,'a',undefined,null].toString());//',a,,'

//ES6明确将空位转为undefined

//Array.from方法会讲空位转为undefined，不会忽略空位
//console.log(Array.from(['a',,'b']));//['a',undefined,'b']
//扩展运算符...也会将空位转为undefined
//console.log([...['a',,'b']]);//['a',undefined,'b']
//copyWithin()会讲空位一起拷贝
//console.log([,'a','b',,].copyWithin(2,0))//[,'a',,'a']
//fill会将空位视为正常的数组位置
//console.log(new Array(3).fill('a'));//['a','a','a']
//for...of循环也会遍历空位
let arrc=[,,]
for(let i of arrc){
    //console.log(1);//1 1
}

//entries,keys,values,find,findIndex会将空位处理成undefined
//entries
//console.log([...[,'a'].entries()]);//[ [ 0, undefined ], [ 1, 'a' ] ]
//keys
//console.log([...[,'a'].keys()]);//[0,1]
//values
//console.log([...[,'a'].values()]);//[undefined,'a']
//find
//console.log([,'a'].find(x=>true));//undefined
//findIndex
//console.log([,'a'].findIndex(x=>true));//0

//建议避免空位

//十一、Array.prototype.sort()的排序稳定性
//排序稳定性是排序算法的重要属性，指排序关键字相同的项目，排序前后的顺序不变
const arrd=[
    'peach',
    'straw',
    'apple',
    'spork',
];

const stableSorting=(s1,s2)=>{//稳定排序
    if(s1[0]<s2[0]) return -1;
    return 1;
};
//console.log(arrd.sort(stableSorting));

const unstableSorting=(s1,s2)=>{
    if(s1[0]<=s2[0]) return -1;
    return 1;
};

console.log(arrd.sort(unstableSorting));

//稳定排序：插入排序、合并排序、冒泡排序
//不稳定排序：堆排序、快速排序