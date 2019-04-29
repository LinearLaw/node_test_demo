#   NODE

    特性：事件驱动、非阻塞式 I/O、单线程。
    优缺点：能做啥，不适合做啥。

    - Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
    - Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
    - Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
    - Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，
            每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。

    NodeAPI如Path、Http、Child Process等，其实现原理。

    Node的底层运行原理、和浏览器的异同。

    Node事件驱动、非阻塞机制的实现原理。


##  单线程与事件驱动

    nodejs是一个单线程的，采用事件驱动和异步回调的机制。
    执行代码时，主线程从上往下依次执行，遇到需要回调的地方，比如I/O，将其加入到事件队列，
    主线程继续往下执行，运行结束后，线程空闲，这时依次执行事件队列中的事件。

    注意：单线程指的是主线程是单线程，主线程用于业务处理，即CPU运算，
        nodejs内部会开启其他的线程去处理I/O，比如worker-thread，
        I/O处理完后会有一个回调事件，回调事件将会放到事件队列里，
        在node进程启动时，会创建一个Event Loop，每一次轮询都会去检查是否有事件需要处理，
        如果有就进行执行，并进行下一次轮询。

    nodejs最大的缺陷也是单线程，如果遇到计算密集的任务，比如计算斐波那契数列，
        主线程将会一直执行计算直至计算完毕再执行其他的任务，即此时的主线程是“阻塞的”。

    队列和栈：队列是先进先出，后进后出；
            栈是先进后出，后进先出；

##  EventEmitter 类

    1、所有的异步I/O操作都会分发事件，产生事件的对象都是一个EventEmitter的实例。
        var EventEmitter = require('events').EventEmitter;
        var event = new EventEmitter();
        event.on('some_event', function() {
            console.log('some_event 事件触发');
        });

    2、监听器一般增加到10个就会发出警告。

    3、要触发事件时，触发emit即可。
        event.emit('some_event');

    4、事件只需要触发一次，用
        event.once("some_event",()=>{  })

    5、移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
        接受两个参数，第一个是事件名称，第二个是回调函数名称。
        event.removeListener('some_event',callback)

    6、EventEmitter定义了一个error事件，当error事件触发时，如果没有响应的监听器，
        Nodejs会将其当做一个异常，退出程序并输出错误信息，
        因此需要设置error事件的监听器，避免遇到错误后整个程序崩溃。

    7、继承EventEmitter：原型继承、类继承（ES6）、对象继承

##  browser和nodejs ，runtime的异同

#   Express

    Connect

##  中间件机制

    Web请求将一个一个经过中间件，并通过其中一个中间件返回。

#   Koa

##  Koa和Express有什么不同？
