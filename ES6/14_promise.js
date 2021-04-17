//Promise

//判断是否是Promise实例
function isPromise(obj){
    return !!obj && (typeof obj==='object' || typeof obj==='function') && typeof obj.then==='function';
}

//Promise.all()
Promise.all=function(arr){
    let result=[];
    let counter=0;
    return new Promise(function(resolve,reject){
        arr.forEach((promise)=>{
            if(isPromise(promise)){
                promise.then(function(value){
                    result.push(value);
                    counter++;
                    if(counter===arr.length){
                        resolve(result);
                    }
                },reject);
            }
            else
                result.push(promise);
        });
    });
}

//Promise.race()
Promise.race=function(arr){
    return new Promise(function(resolve,reject){
        arr.forEach((promise)=>{
            promise.then(value=>{
                resolve(value);
            },reject);
        });
    })
}
