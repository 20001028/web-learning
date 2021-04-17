//Class的基本语法

//一、简介

//1.类的由来
//构造函数生成实例对象
function Point(x,y){
    this.x=x;
    this.y=y;
}

Point.prototype.toString=function(){
    return '('+this.x+','+this.y+')';
};

var p=new Point(1,2);

//console.log(p.toString());//(1,2)

//class关键字可以定义类
class Point1{
    constructor(x,y){//构造函数,this表示实例对象
        this.x=x;
        this.y=y;
    }

    toString(){//前面不需要加function，方法之间不需要逗号分隔
        return '('+this.x+','+this.y+')';//
    }
}

//ES6的类可以看作构造函数你会的另一种写法
//console.log(typeof Point1);//function，类的数据类型就是函数，类本身就指向构造函数
//console.log(Point===Point.prototype.constructor);//true

//直接对类new
class Bar{
    doStuff(){
        console.log('stuff');
    }
}

const b=new Bar();
//b.doStuff();//stuff

//构造函数的prototype属性，在ES6中类里继续存在，类的所有方法都定义在prototype属性上
class Point2{
    constructor(){

    }
    toString(){

    }
    toValue(){

    }
}

//等同于
Point2.prototype={
    constructor(){},
    toString(){},
    toValue(){},
};

//在类的实例上调用方法，就是调用原型上的方法
class B{}
const b1=new B();

//console.log(b1.constructor===B.prototype.constructor);//true

//类的刑罚可以添加在prototype上
class Point3{
    constructor(){

    }
}

Object.assign(Point3.prototype,{
    toString(){},
    toValue(){},
});

//prototype对象的constructor属性直接指向类本身
//console.log(Point3.prototype.constructor===Point3);//true

//类内部定义的所有方法都不可枚举
//console.log(Object.keys(Point3.prototype));//[ 'toString', 'toValue' ],不含有constructor
//console.log(Object.getOwnPropertyNames(Point3.prototype));//[ 'constructor', 'toString', 'toValue' ]

//2.constructor方法
//类的默认方法，通过new命令生成对象实例时，自动调用该方法，类必须有constructor方法
//如果没有显式定义，会默认添加

//constructor方法默认返回实例对象this，可以指定返回另外一个对象
class Foo{
    constructor(){
        return Object.create(null);
    }
}

//console.log(new Foo() instanceof Foo);//false

//类必须要new，否则会报错，普通的构造函数不需要new

//3.类的实例
//new生成类的实例

//实例的属性除非显式定义在本身this对象上，否则定义在原型上
class Point4{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        return '('+this.x+','+this.y+')';
    }
}

var point4=new Point4(2,3);
point4.toString();
// console.log(point4.hasOwnProperty('x'));//true
// console.log(point4.hasOwnProperty('y'));//true
// console.log(point4.hasOwnProperty('toString'));//false
// console.log(point4.__proto__.hasOwnProperty('toString'));//true

//类的实例共享一个原型对象
const point41=new Point4(2,3);
const point42=new Point4(3,2);

//console.log(point41.__proto__===point42.__proto__);//true

//proto属性改写原型会改变类的原始定义，影响所有实例


//取值函数getter和存值函数setter
class MyClass{
    constructor(){

    }
    get prop(){
        return 'getter';
    }
    set prop(value){
        console.log('setter'+value);
    }
}

const inst=new MyClass();

//inst.prop=123;//调用setter函数
//console.log(inst.prop);//调用getter函数

//存值函数和取值函数都在Descriptor对象上
class CustomHTMLElement{
    constructor(element){
        this.element=element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML=value;
    }
}

var descriptor=Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,'html');

//console.log('get' in descriptor);//true
//console.log('set' in descriptor);//true

//4.属性表达式
//类的属性名可以采用表达式
let methodName='getArea';

class Square{
    constructor(length){

    }
    [methodName](){

    }
}

//5.Class表达式
const MyClass1=class Me{//类名Me只在类内部可用，外部只能用MyClass1引用
    //如果类的内部没有用到Me，也可以省略Me
    getClassName(){
        return Me.name;
    }
}

let inst1=new MyClass1();
//console.log(inst1.getClassName());//Me
//console.log(Me.name);//Me not defined

//写出立即执行的Class
let person=new class{
    constructor(name){
        this.name=name;
    }
    sayName(){
        console.log(this.name);
    }
}('zzg');

//person.sayName();//zzg

//二、注意点
//1.严格模式
//类和模块内部默认使用严格模式

//2.不存在变量提升
//使用必须在定义之后

//3.name属性
//name属性总是返回紧跟在class关键字后面的类名

//4.Generator方法
//在某个方法前加上*号，表示该方法是一个Generator函数

//5.this指向
//类的方法内部如果有this，默认指向类的实例

//三、静态方法
//类相当于实例的原型，在类中定义的方法都会被实例继承，
//在方法前加上static关键字，表示该方法不会被实例继承，而是直接通过类调用

class Foo1{
    static classMethod(){
        return 'hello';
    }
}

//console.log(Foo1.classMethod());//'hello'

var foo=new Foo1();
//foo.classMethod();//not a function

//如果静态方法包含this关键字，this指向类而不是实例

//父类的静态方法可以被子类继承
class Bar1 extends Foo1{

}
//console.log(Bar1.classMethod());//'hello'

//静态方法也可以从super对象调用
class Bar2 extends Foo1{
    static classMethod(){
        return super.classMethod()+' world';
    }
}

//console.log(Bar2.classMethod());//'hello world'

//三、实例属性的新写法
//实例属性除了写在constructor方法里的this上，也可以写在类的最顶层
class IncreasingCounter{
    _count=0;
    get value(){
        console.log('Getting the current count');
        return this._count;
    }
    increment(){
        this._count++;
    }
}


//四、静态属性
//Class本身的属性，而不是定义在实例对象this上的属性
class Foo2{
    static prop=1;
}

//五、私有方法和私有属性

//六、new.target属性
//new是从构造函数生成实例对象的命令
//new.target属性一般用在构造函数中，返回new命令作用于哪个构造函数
//如果构造函数不是通过new或Reflect.construct()调用，new.target返回undefined
//这个属性用来确定构造函数怎么调用的
function Person(name){
    if(new.target !==undefined){
        this.name=name;
    }
    else{
        throw new Error('必须使用new命令生成实例');
    }
}

function Person2(name){
    if(new.target===Person){
        this.name=name;
    }
    else{
        throw new Error('必须使用new命令生成实例');
    }
}

var person1=new Person('张三')
//var notAPerson=Person.call(person1,'zzg');//报错

//Class内部戴傲勇new.target发挥当前Class

//子类继承父类时，new.target返回子类

//可以写出不能独立使用，必须继承后才能使用的类
class Shape{
    constructor(){
        if(new.target===Shape){
            throw new Error('不能实例化');
        }
    }
}
class Rectangle extends Shape{
    constructor(length,width){
        super();
    }
}
//var x=new Shape();//报错
var y=new Rectangle(3,4);

//在函数外部使用new.target会报错