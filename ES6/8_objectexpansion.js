//对象的扩展

//一、属性的简洁表示法
//ES6允许在大括号里直接写入变量和函数，作为对象的属性和方法
const foo='bar';
const baz={foo};//简洁表示
//console.log(baz);//{ foo: 'bar' }

//等同于
const bazs={foo:foo};
//console.log(bazs);

function f(x,y){//简洁表示
    return {x,y};
}

//等同于
function f1(x,y){
    return {x:x,y:y};
}

//console.log(f(1,2));//{ x: 1, y: 2 }

//除了属性可以简写，方法也可以简写
const o={
    method(){
        return "Hello!";
    }
}

//等同于
const o1={
    method:function(){
        return "Hello!";
    }
};
//console.log(o1.method());//Hello!

let birth='2000/01/01';
const Person={
    name:'zzg',
    birth,
    hello(){
        console.log('my name is ',this.name);
    }
};

//用于函数的返回值
function getPoint(){
    const x=1;
    const y=10;
    return {x,y};
}
getPoint();

//CommonJS输出一组变量

//属性的赋值器和取值器get和set
const cart={
    _wheels:4,

    get wheels(){
        return this._wheels;
    },

    set wheels(value){
        if(value<this._wheels){
            throw new Error('too small');
        }
        this._wheels=value;
    }
}

//打印对象
let user={
    name:'test'
};

let foo1={
    bar:'baz'
};

//console.log(user,foo1);

//console.log({user,foo1});

//简写的对象方法不能用于构造函数
const obj={
    f(){
        this.foo='bar';
    }
}

//new obj.f();//报错

//二、属性名表达式
//JS定义对象的属性有两种方法
//方法一
obj.foo=true;
//方法二
obj['a'+'bc']=123;

//ES6允许字面量定义对象时，把表达式放在方括号内
let propKey='foo';
let obja={
    [propKey]:true,
    ['a'+'bc']:123,
};

let lastWord='last word';

const a={
    'first word':'hello',
    [lastWord]:'world',
};

// console.log(a['first word']);//'hello'
// console.log(a[lastWord]);//'world'
// console.log(a['last word']);//'world'

//表达式也可以用于定义方法名
let objb={
    ['h'+'ello'](){
        return 'hi';
    },
};

//console.log(objb.hello());//'hi'

//属性名表达式与简洁表示法不能同时使用

//属性名表达式如果是一个对象，默认hi把对象自动转换为字符串[object object]
const keyA={a:1};
const keyB={b:2};

const myObject={
    [keyA]:'valueA',
    [keyB]:'valueB',
};

//console.log(myObject);//{ '[object Object]': 'valueB' }

//三、方法的name属性
//函数的name属性，返回函数名，对象方法也是函数，也有name属性
const person={
    sayName(){
        console.log('hello!');
    },
};

//console.log(person.sayName.name);//'sayName'

const objc={
    get foo(){},
    set foo(x){},
};

//如果对象的方法使用了取值函数和存值函数，则name属性不在方法上面，而是在方法属性的描述对象的get和set属性上
//返回的是方法名前加上get和set
//console.log(obj.foo.name);//TypeError

const descriptor=Object.getOwnPropertyDescriptor(objc,'foo');

//console.log(descriptor.get.name);//'get foo'
//console.log(descriptor.set.name);//'set foo'

//有两种特殊情况：bind，Function
//bind方法创造的函数，name属性返回bound加上原函数名字
var doSomething=function(){

};
//console.log(doSomething.bind().name)//'bound doSomething'

//Function构造函数创造的函数，name属性返回anonymous
//console.log((new Function()).name);//'anonymous'

//如果对象的方法是一个Symbol值，name属性返回Symbol值的描述
const key1=Symbol('description');
const key2=Symbol();//没有描述
let objd={
    [key1](){},
    [key2](){},
};
//console.log(objd[key1].name);//'description'
//console.log(objd[key2].name);//''

//四、属性的可枚举性和遍历
//1.可枚举性
//对象的每个属性都有一个描述对象，用来控制该属性的行为
//Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象
let obje={foo:123};
//console.log(Object.getOwnPropertyDescriptor(obj,'foo'));
//{ value: true, writable: true, enumerable: true, configurable: true }
//描述对象的enumerable属性称为可枚举性，如果该属性为false，表示某些操作会忽略当前属性

//有四个操作会忽略enumerable为false的属性
//for...in：只遍历对象自身的和继承的可枚举的属性
//Object.keys()：返回对象自身的所有可枚举的属性的键名
//JSON.stringify()：只串行化对象自身的可枚举的属性
//Object.assign()：忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

//对象原型的toString方法和数组的length属性通过可枚举性避免被for...in遍历
// console.log(Object.getOwnPropertyDescriptor(Object.prototype,'toString').enumerable);//false
// console.log(Object.getOwnPropertyDescriptor([],'length').enumerable);//false

//ES6规定，所有Class的原型的方法都是不可枚举的
//console.log(Object.getOwnPropertyDescriptor(class {foo(){}}.prototype,'foo').enumerable);//false
//尽量不要用for...in循环，用Object.keys()代替

//2.属性的遍历
//1)for...in：循环遍历对象自身的和继承的可枚举属性（不包括Symbol属性）
//2)Object.keys(obj)：返回一个数组包括对象自身的所有可枚举属性（不含Symbol属性）的键名
//3)Object.getOwnPropertyNames(obj):返回一个数组，包含对象自身的所有属性（不包括Symbol属性，但是包括不可枚举属性）的键名
//4)Object.getOwnPropertySymbols(obj):返回一个数组，包含对象自身的所有Symbol属性的键名
//5)Reflect.ownKeys(obj):返回一个数组，包含对象自身的所有键名
//遍历规则
//首先遍历数值键，按照升序排列
//其次遍历字符串键，按加入时间升序
//最后遍历所有Symbol键，按照加入时间升序
//console.log(Reflect.ownKeys({[Symbol()]:0,b:0,10:0,2:0,a:0}));//[ '2', '10', 'b', 'a', Symbol() ]


//五、super关键字
//this关键字总是指向函数所在的当前对象，super关键字指向当前对象的原型对象

const proto={
    x:'hello',
    foo(){
        console.log(this.x);
    },
};

const objf={
    x:'world',
    find(){
        return super.x;
    },
    foo(){
        return super.foo();
    },
};
Object.setPrototypeOf(objf,proto);//设置obj的原型对象为proto
//console.log(objf.find());//'hello'

//super表示原型对象只能用于对象的方法中‘

//super.foo指向proto的foo方法，但绑定的this还是指向当前对象objf
//objf.foo();//'world'

//六、对象的扩展运算符

//1.解构赋值
//对象的解构赋值用于从一个对象取值，相当于将目标对象自身1的素有可比案例的、尚未被读取的属性
//分配到指定的对象上面，所有的键和值都会被拷贝到新对象上
let {x,y,...z}={x:1,y:2,a:3,b:4};
//console.log(x,y,z);//1,2,{a:3,b:4}
//z是解构赋值的对象，获取等号右边所有尚未读取的键，连同值一起拷贝

//由于解构赋值等号右边是一个对象，如果等号右边是undefined或null
//报错，因为无法转为对象
//let {...z}=null/undefined;

//解构赋值必须是最后一个参数

//解构赋值的拷贝是浅拷贝，如果一个键的值是复合类型的值、解构赋值拷贝的是值的引用而不是副本

//扩展运算符的解构赋值，不能赋值继承自原型对象的属性
let o1a={a:1};
let o2={b:2};
o2.__proto__=o1a;
let {...o3}=o2;
//console.log(o3);//{b:2}
//console.log(o3.a);//undefined

const oa=Object.create({xa:1,ya:2});
oa.za=3;

let {xa,...newObj}=oa;
let {ya,za}=newObj;
//console.log(xa,ya,za);//1 undefined 3
//xa是单纯的解构赋值，可以读取对象oa继承的属性
//变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性

//如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式
//let {xb,...{yb,zb}}=o;//报错

//扩展某个函数的参数，引入其他操作
function baseFunction({a,b}){

}
function wrapperFunction({x,y,...restConfig}){
    return baseFunction(restConfig);
}

//2.扩展运算符
//对象的扩展运算符用于去除参数对象的所有可遍历属性，拷贝到当前的对象之中
let zz={a:3,b:4};
let n={...zz};
//console.log(n)//{a:3,b:4}

//由于数组是特殊的对象，所以对象扩展运算符也可以用于数组
let fooz={...['a','b','c']};
//console.log(fooz);//{ '0': 'a', '1': 'b', '2': 'c' }

//如果扩展运算符后是一个空对象，则没有效果
//console.log({...{},a:1});//{ a: 1 }

//如果扩展运算符后不是对象，自动转为的对象
//console.log({...1})//{}，整数1会自动转为数值的包装对象Number{1}，该对象没有自身属性，返回一个空对象

//console.log({...true});//{}
//console.log({...undefined});//{}
//console.log({...null});//{}

//如果扩展运算符后面试字符串，自动转为一个类似数组的对象，返回的不是空对象
//console.log({...'hello'});//{ '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }

//对象的扩展运算符等同于使用Object.assig()
//let aClone={...a};
//let aClone=Object.assign({},a);

//完整克隆一个对象，还拷贝对象原型的属性
//写法一
const clone1={
    __proto__:Object.getPrototypeOf(obj),
    ...obj,
};

//写法二
const clone2=Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj,
);

//写法三
const clone3=Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptor(obj),
);

//扩展运算符可以用于合并两个对象
//let ab={...a,...b};
//等同于
//let ab=Object.assign({},a,b);

//如果用户自定义的属性，放在扩展运算符后面，会覆盖内部的同名属性
//let aWithOverrides={...a,x:1,y:2};
//等同于
//let aWithOverrides={...a,...{x:1,y:2}};
//等同于
//let x=1,y=2,aWithOverrides={...a,x,y};
//等同于
//let aWithOverrides=Object.assign({},a,{x:1,y:2});

//用来修改现有对象的部分属性
let newVersion={
    //...previousVersion,
    name:'new name',
};

//把自定义属性放在扩展运算符前面，设置新对象的默认属性值
//let aWithDefaults={x:1,y:2,...a};
//等同于
//let aWithDefaults=Object.assign({},{x:1,y:2},a);
//等同于
//let aWithDefaults=Object.assign({x:1,y:2},a);

//扩展运算符后可以跟表达式
const objz={
    ...(x>1 ? {a:1} : {}),
    b:2,
};

//扩展运算符的参数对象中，如果有get取值函数，函数会执行
let az={
    get x(){
        throw new Error('not throw yet');
    },
};
//let aWithXGetter={...az};//报错


//七、链判断运算符
//如果读取对象内部的某个属性，需要判断该对象是够存在

//八、Null判断运算符
