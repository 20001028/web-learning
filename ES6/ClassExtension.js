//Class的继承

//一、简介
//extends关键字实现继承

class Point{

}

class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);//子类必须在constructor方法中调用super方法，如果不调用，子类得不到this对象
        this.color=color;
    }

    toString(){
        return this.color+' '+super.toString();//调用父类的toString方法
    }
}

//ES6的继承是将父类实例对象的属性和方法加到this上，然后用子类构造函数修改this

//不管子类中有没有显示定义constructor方法，都有constructor方法

//在子类构造函数中，只有调用super后才可以使用super关键字

let cp=new ColorPoint(25,8,'green');

// console.log(cp instanceof ColorPoint);//true
// console.log(cp instanceof Point);///true

//父类的静态方法也会被子类继承
class A{
    static hello(){
        console.log('hello world');
    }
}

class B extends A{

}
//B.hello();//'hello world'

//二、Object.getPrototypeOf()
//方法可以用来从子类上获取父类
//判断一个类是否继承另一个类
//console.log(Object.getPrototypeOf(ColorPoint)===Point);//true

//三、super关键字
//super既可以作函数使用，也可以当对象使用

//super作为函数调用时，代表父类的构造函数，子类的构造函数必须执行一次super函数

//super虽然代表父类的构造函数，但是返回子类的实例，super内部的this指向子类的实例
//super相当于A.prototype.constructor.call(this)

//作为函数，super只能用在子类的构造函数中，其他地方会报错

//super作为对象，在普通方法中指向父类的原型对象，在静态方法中指向父类

//定义在父类实例上的方法或属性无法通过super调用
class A1{
    constructor(){
        this.p=2;//p是实例属性
    }
}

class B1 extends A1{
    get m(){
        return super.p;
    }
}

let b1=new B1();
//console.log(b.m);//not defined

//super可以取到定义在父类原型对象上的属性
class A2{}
A2.prototype.x=2;

class B2 extends A2{
    constructor(){
        super();
        console.log(super.x);
    }
}

//let b2=new B2();//2

//在子类普通方法中通过调用父类的方法时，方法内部的this指向当前子类实例
class A3{
    constructor(){
        this.x=1;
    }
    print(){
        console.log(this.x);//this指向子类
    }
}

class B3 extends A3{
    constructor(){
        super();
        this.x=2;
    }
    m(){
        super.print();
    }
}

let b3=new B3();
//b3.m();//2


//因为this指向子类实例，如果通过super对某个属性赋值，super就是this，赋值的属性就会编程子类实例的属性

//如果super作为对象，在静态方法中，super将指向父类而不是父类的原型对象

//在子类的静态方法中通过super调用父类方法时，方法内部的this指向当前子类而不是子类的实例

//使用super时，必须显式指定是作为函数还是对象使用

//因为对象总是继承其他对象，所以可以在任一对象中使用super关键字
var obj={
    toString(){
        return 'MyObject:'+super.toString();
    }
};

//console.log(obj.toString());//MyObject:[object Object]

//四、类的prototype属性和proto属性
//每一个对象都有__proto__属性指向对应构造函数的prototype属性
//Class同时有prototype属性和__proto_-属性，因此有两条继承链

//子类的__proto__属性，表示构造函数的继承，总是指向父类
//子类prototype属性的__proto__属性，表示方法的继承，指向父类的prototype属性

class A4{

}
class B4 extends A4{

}
//console.log(B4.__proto__===A4);//true
//console.log(B4.prototype.__proto__===A4.prototype);//true

//实例的__proto__属性
//子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性
//子类的原型的原型是父类的原型
var p1=new Point(2,3);
var p2=new ColorPoint(2,3,'red');
//console.log(p2.__proto__===p1.__proto__);//false
//console.log(p2.__proto__.__proto__===p1.__proto__);//true

//通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
p2.__proto__.__proto__.printName=function(){
    console.log('zzg');
};

//p1.printName();//'zzg'

//五、原生构造函数的继承

//原生构造函数是指语言内置的构造函数
//Boolean,Number,String,Array,Date,Function,RegExp,Error,Object
class MyArray extends Array{
    constructor(...args){
        super(...args);
    }
}

var arr=new MyArray();
arr[0]=12;
//console.log(arr.length);//1

//继承Object的子类有一个行为差异
class NewObj extends Object{
    constructor(){
        super(...arguments);
    }
}

//一旦发现Object方法不是通过new Object()形式调用，会忽略构造函数的参数
var o=new NewObj({attr:true});
//console.log(o.attr===true);//false

//六、Mixin模式的实现
//Mixin是指多个对象合成一个新的对象，新对象有各个成员的接口

const a={
    a:'a',
};
const b={
    b:'b',
};
const c={...A,...b};