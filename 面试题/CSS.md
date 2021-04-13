# CSS

### **CSS选择器和优先级**

- !important>行内样式>ID选择器>类选择器>元素>通配符>浏览器自定义或继承
- 同一级别后写的覆盖先写的
- 内联样式（元素内部的style）>内部样式表（写在head的style里）>外部样式表（style引入）>导入样式（import）

### **水平垂直居中方案**

- 绝对定位和负边距

  一定要设置父元素的宽高，不会强行撑开，父元素absolute和relative没有关系，子元素必须是absolute

  需要知道具体的盒子的宽高

  ```css
  .box{
                  width: 300px;
                  height: 300px;
                  position: absolute;
                  background-color: black;
              }
  .box span{
                  position: absolute;
                  width: 100px;
                  height: 50px;
                  top: 50%;
                  left: 50%;
                  margin-left: -50px;
                  margin-top: -25px;
                  text-align: center;
                  background-color: brown;
              }
  ```

- 绝对定位加translate

  一定要设置父元素的宽高，不会强行撑开，父元素absolute和relative没有关系，子元素必须是absolute

  不需要知道子元素的宽高，可以自动撑开

  ```css
  .box{
                  width: 300px;
                  height: 300px;
                  position: relative;
                  background-color: black;
              }
  .box span{
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%);
                  text-align: center;
                  background-color: brown;
              }
  ```

- 绝对定位加margin:auto

  子元素absolute，需要设置宽高，设置top、left、right、bottom为0

  ```css
  .box{
                  width: 300px;
                  height: 300px;
                  position: relative;
                  background-color: black;
              }
  .box span{
                  position: absolute;
                  width: 100px;
                  height: 100px;
                  top: 0;
                  bottom: 0;
                  right: 0;
                  left: 0;
                  margin: auto;
                  text-align: center;
                  background-color: brown;
              }
  ```

- flex

  ```css
  .box{
                  width: 300px;
                  height: 300px;
                  display: flex;
                  align-items: center;
      			justify-content:center;
                  background-color: black;
              }
  .box div{
                  width: 150px;
                  height: 100px;
                  background-color: brown;
              }
  ```

- table-cell

  适用于子元素为行级元素，因为text-align:center

  ```css
  .box{
                  width: 300px;
                  height: 300px;
                  text-align: center;
                  vertical-align: middle;
                  display: table-cell;
                  background-color: wheat;
              }
  .box div{
                  width: 150px;
                  height: 100px;
                  background-color: brown;
              }
  ```

### **CSS属性继承**

- 不可继承：盒子的margin、border、padding、跟宽高有关的，display，position，left四件，float
- 所有可继承：visibility，cursor
- 内联元素可继承：字体样式，字间距
- 列表元素可继承：list-style
- 表格元素可继承：border-collapse

### **BFC：块级格式上下文**

- 是一个独立的渲染区域，只有盒级box参与，规定了内部box如何布局，并且与区域外部毫不相关

- 布局规则

  - 内部的box垂直方向放置
  - box垂直方向的距离由margin决定，一个BFC内部的相邻box的margin会重叠
  - BFC的区域不会与float box重叠
  - BFC是页面上一个隔离的独立容器，里面的元素不会影响到外面

- 创建方法（以下之一即可）

  - 根元素
  - 浮动元素（float不是none）
  - 绝对定位元素（absolute或fixed）
  - 内联块（display:inline-block)
  - 元素具有display:table-cell/table-caption/flow-root
  - overflow值不是visible的块元素

- 作用

  - 利用BFC避免margin重叠

    统一BFC的两个相邻的box会发生margin重叠，可以把第二个box用div包起来成为一个BFC

  - 自适应两栏布局

    每个盒子margin box左边，与包含块border box的左边接触，即使left是浮动的（float:left)

    BFC的区域不会与float box重叠，可以把右边right单独作为一个BFC，左边left浮动

  - 清除浮动

    不给父元素设置高度，子节点设置浮动时，会发生高度塌陷，我们需要清除浮动

    计算BFC的高度时，浮动元素参与计算，我们可以把父元素激活为BFC

### **getComputedStyle和element.style的异同**

- 相同点：返回的都是CSSStyleDeclaration对象
- 不同点：
  - element.style只读取元素的内联样式（写在style属性里的样式），getComputedStyle读取最终样式
  - element.style支持读写（可修改样式），getComputedStyle仅支持读

### CSS预处理

1. 预先处理CSS，扩展了CSS，增加了变量函数等编程特性，更容易维护和扩展

2. CSS的缺点：语法不够强大，无法嵌套书写，需要书写很多重复的选择器

   ​						没有变量和复用机制

3. 预处理的优点：提供样式复用机制，减少冗余的代码提高可维护性