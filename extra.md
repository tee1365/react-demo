# task 2

## 知识点1

`shortcut for --optimize-minimize --define process.env.NODE_ENV="production"`  
-p 会自动在命令行的后面加上--optimize-minimize和--define process.env.NODE_ENV="production"  
--optimize-minimize会自动调用UglifyJSPlugin  
  --define process.env.NODE_ENV="'production'"会把process.env.NODE_ENV变量的值设置为production。部分库在设置为production下会进行进一步的代码优化。  
一句话概括就是-p会为生产条件自动做出优化。

## 知识点2

`https://tee1365.github.io/react-demo/build/index.html`

# task 3

## 知识点1

    import React from 'react'; // 为什么要 import React
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, Component</h1>;
      }
    }

    export default Welcome // 为什么要 export，为什么要加 default

1.为什么要 import React  
因为在把JSX语法转化成JS语法的过程中，babel需要调用React.createElement方法。
2.为什么要 export  
export语句用于在创建JavaScript模块时，从模块中导出函数、对象或原始值，以便其他程序可以通过 import 语句使用它们。  
这里的Welcome是一个React模块，所以用了ES6原生的export语句导出。  
3.为什么要加 default  
export 和 export default的区别  
export在导出时需要使用花括号，并在花括号内写出想要导出的所有名称。在引入时需要使用同样的名称或者使用import {xxx as xxx} from xxx来进行改名。export可以导出多次。  
export default 就是在导出时把名字定为default,在引用时则是import {default as xxx} from xxx。这种情况下可以不使用花括号，但是因为default的名字只有一个，所以一个模块中只能有一个export default。

## 知识点2

input 里的文字用 input.value 就可以获得了，为什么还要用 newTodo 来容纳呢？  

用newTodo容纳可以把值保存在父组件中，方便同todoList一起修改。

## 知识点3

为什么 return 时要加圆括号？

在return多行的情况下需要加括号，加括号是因为JS会自动给行末添加分号，如果不加括号就会变成return;

# 待办列表功能：  
~~忘记密码~~  
~~重构~~  
~~恢复被删除项~~  
~~搜索被删除项~~  
详细内容  
截止日期  
表单验证  
# 进程：


# 问题:
~~登出后报warning~~  
~~登录登出不显示错误~~  
注册失败时直接进入错误页面  
