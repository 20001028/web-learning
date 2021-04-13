//发布订阅模式（观察者模式）

//ES6
class Publisher{
    constructor(){
        this.obeservers=[];
    }
    subscribe(observer){
        if(this.obeservers.includes(observer))
            return;
        this.obeservers.push(observer);
    }
    unsebscribe(observer){
        this.obeservers.splice(this.obeservers.indexOf(observer),1);
    }
}