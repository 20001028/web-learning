//Promise

//实现Promise
//因为Promise需要new，所以需要定义为构造函数或class
//构造函数的参数fn为需要执行的函数
//三个状态：pending、fulfilled、rejected
//resolve函数和reject函数
//如果当前为pending状态，调用resolve函数会改变状态为fulfilled
//调用reject函数会变状态为rejected
//定义then方法在状态改变时调用回调函数
// class Promise{
//     constructor(fn){
//         //三个状态
//         this.state='pending';
//         this.value=undefined;
//         this.reason=undefined;
//         let resolve=value=>{
//             if(this.state==='pending'){
//                 this.state='fulfilled';
//                 this.value=value;
//             }
//         }
//         let reject=value=>{
//             if(this.state==='pending'){
//                 this.state='rejected';
//                 this.reason=value;
//             }
//         }
//         try{
//             fn(resolve,reject);
//         }catch(e){
//             reject(e);
//         }
//     }

//     then(onFulfilled,onRejected){
//         if(this.state==='fullfilled')
//             onFulfilled(this.value);
//         else if(this.state==='rejected')
//             onRejected(this.reason);
//     }
// }

//实现Promise.all()
//只有所有Promise实例都变为resolve，promise才会resolve
//返回一个合并的Promise实例
Promise.all=function(arr){
    let result=[];
    let counter=0;
    return new Promise((resolve,reject)=>{
        arr.forEach(item=>{
            item=Promise.resolve(item);
            item.then(value=>{
                result.push(value);
                counter+=1;
                if(counter===arr.length)
                    resolve(result);
            },reason=>reject(reason));
        })
    })
};

//实现Promise.race()
//哪个Promise先变化就跟随哪个Promise的状态
Promise.race=function(arr){
    return new Promise((resolve,reject)=>{
        arr.forEach(item=>{
            item.then(value=>{
                resolve(value);
            },reason=>reject(reason));
        });
    });
};

let p1 = Promise.resolve('1');
let p2 = Promise.resolve('2');

Promise.race([p1,p2]).then(res=>{
    console.log(res);
});