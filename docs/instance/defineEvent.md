# 自定义事件处理
Vue.js中有四个事件API可以用来处理自定义事件，分别是\$on，\$once，\$off，\$emit。

## 初始化
当引入Vue.js时会给Vue Function原型上绑定一些方法和属性。源码在`vue-2.6.11/src/core/instance/index.js`
```javascript
function Vue (options) {
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```
其中eventsMixin方法中给Vue Function原型上绑定了\$on，\$once，\$off，\$emit四个方法。源码在`vue-2.6.11/src/core/instance/index.js`
```javascript
export function eventsMixin (Vue) {
   Vue.prototype.$on = function (event, fn) {}
   Vue.prototype.$once = function (event, fn) {}
   Vue.prototype.$off = function (event, fn) {}
   Vue.prototype.$emit = function (event) {}
}
```
在initMixin方法中调用了initEvents方法初始化了事件对象。源码在`vue-2.6.11/src/core/instance/index.js`
```javascript
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
}
```
## $on
\$on方法用来在vm实例上监听一个自定义事件，该事件可用$emit触发。
**用法**
第一个参数是字符串或者数组，第二个是回调函数。
```javascript
this.$on('event',()=>{})
this.$on(['event1','event2'],()=>{})
```
**源码**
```javascript
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function){
    const vm = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm
  }
```
源码意思是当在实例上使用\$on监听一个自定义事件时，会执行原型上的$on方法。先判断第一个参数event是否是个数组，如果是个数组就扁平处理，直到它不是个数组为止。不是数组的话先判断事件对象_event中有没有key为event的属性，如果没有就给_event对象上建立一个key为event的空数组，然后将回调函数fn添加到数组中。如果有key为event属性的数组，就直接将fn添加到数组中。最后事件对象就是这样子：

```javascript
_event:{
   event: [func1, func2, func3]
}
```
## $once
$once监听一个只能触发一次的事件，在触发以后会自动移除该事件。
**用法**
第一个参数是字符串，第二个是回调函数。
```javascript
this.$once('event',()=>{})
```
**源码**
```javascript
  Vue.prototype.$once = function (event: string, fn: Function){
    const vm = this
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }
```
源码意思是当在实例上监听一个只能触发一次的自定义事件时，会执行\$once方法。先定义了一个on函数。然后将回调函数fn绑定在on函数上（原因在解释\$off上会说明）。最后调用了\$on方法监听事件，第二参数变为了on函数。on函数中先移除自定义事件再执行了回调函数。其实\$once就是对回调函数fn做了重写，为了让回调函数fn只执行一次就移除。
## $off
$off用来移除自定义事件.
**用法**
第一个参数是字符串或数组，第二个是回调函数。
- 情况1：如果没有提供参数，则移除所有的事件监听器；
- 情况2：如果只提供了事件，则移除该事件所有的监听器；
- 情况3：如果同时提供了事件与回调，则只移除这个回调的监听器。
```javascript
this.$off()
this.$off('event')
this.$off('event',callback)
```
**源码**
```javascript
  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function){
    const vm = this
    // all
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }
```
源码意思是当在实例上移除自定义事件时，会执行\$off方法。

1. 如果没有参数就直接将事件对象_event变为空对象并return。对应情况1。

2. 否则判断事件event是不是个数组，如果是数组就扁平处理，直到不是个数组。然后获取到事件对象_event中key为event的值。如果不存在就return。否则继续判断如果回调函数fn不存在就会将事件名为event的属性值变为null然后return。对应情况2。

3. 如果事件存在，并且回调函数也存在，则循环事件对象中对应属性event中的数组。直到在数组中找到和回调函数fn相同的引用。这里有两种情况，一种就是直接使用\$on监听的事件，另一种是使用\$once监听的事件，使用\$once监听的事件因为重写导致事件对象_event对应key的值添加的是on函数。执行\$off的话会在数组中找不到对应得回调函数。所以在\$once中给on函数绑定了原始的回调函数fn。找到后删除数组中对应事件并退出循环。对应情况3。
## $emit
$emit用来触发指定的自定义事件。
**用法**
第一个参数是事件名，类型为字符串，附加参数都会传给监听器回调。
```javascript
this.$emit('event')
this.$emit('event','n1','n2')
```
**源码**
```javascript
  Vue.prototype.$emit = function (event: string){
    const vm = this
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
      	//args ? handler.apply(context, args) : handler.call(context)
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
```
源码意思是当在实例上触发一个自定义事件时，会执行\$emit方法。先在事件对象_event中获取对应的事件值。如果存在就获取除了第一个参数后的所有参数。然后转为数组。最后循环执行事件数组中的方法。并把参数数组传给对应得回调函数。

## 总结
以上就是自定义事件处理的原理。阅读源码后有三个疑问。
1. 使用$once，为什么第一个参数不能为数组，官网文档和源码中第一个参数类型只有字符串，没写数组。我测试传入数组是没问题的啊。
2. 使用\$off移除事件在最后的while循环中为什么找到后只执行一次就break了，如果数组里面还存在相同的呢。针对这个问题，我用\$on监听了两个相同事件和相同回调函数。再使用$off移除相同事件和相同的回调函数，结果只移除了一个，还有一个存在。不知道为什么这么做。
3. 在$emit中为什么要执行`cbs = cbs.length > 1 ? toArray(cbs) : cbs`这句。toArray这个在源码中意思是将类数组转为数组。在这看cbs一定是个数组不需要转啊。不知道是为什么考虑的。