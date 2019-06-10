# CSRF
## Whats the CSRF?
> 跨站请求伪造（Cross-site request forgery），也称为one-click attack或session riding，
> 缩写CSRF、XSRF，
> 也就是，冒充用户发起请求，由攻击代码自主调用接口，完成攻击者想要的目的，
> 请求是攻击者发出的，而不是用户自己操作发出的。

**为什么会出现CSRF？**   

原因在于，服务端对客户端发过来的请求，服务端可以通过cookie知道请求来自哪个用户，   
但是服务端并不知道这个请求是否是用户批准才发送的。   

## How To defense？

防御CSRF的关键，就是在客户端页面增加一些提供身份认证的字段。   

例如，一个比较常见的表单提交，   
在渲染html页面时，后台存一份随机数，并给前台的form表单设置这个随机数，   
接着，页面交互，form表单的请求提交到后台，后台从请求的数据中拿随机数和后台比对，以此验证身份。   
```
<form method="POST" action="/submitBank">
　　<input type="hidden" name="hash" value="${randomHash}" />
　　<input type="text" name="bankId" />
　　<input type="text" name="money" />
　　<input type="submit" name="submit" value="Submit" />
</form>

    <!-- 注意这个hidden的input，里面的value就是后台设置上去的 -->
```
这样的做法，其实是从后台的角度来做的，
前后端分离的时代，交互数据全都用ajax进行，   
这样的方式，**显然，不够与时俱进**。

————等待更新————
