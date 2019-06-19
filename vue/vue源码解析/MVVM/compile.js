function Compile(el, vm) {
    //保存vm到compile对象
    this.$vm = vm;
    //将el对应的元素对象保存到compile对象中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    //如果有el元素
    if (this.$el) {
        //将挂载节点下的所有子节点剪切到文档碎片中
        this.$fragment = this.node2Fragment(this.$el);
        //解析文档碎片
        this.init();
        //将解析成功的文档碎片重新挂载回el底下
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        //创建空的fragment
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        //返回fragment
        return fragment;
    },

    init: function() {
        //编译指定的元素（包括所有层次的子节点）
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        //去除最外层所有的子节点
        var childNodes = el.childNodes,
            //保存compile对象
            me = this;

        //Array.prototype.slice.call(childNodes)
       //遍历所有的子节点（text/element）
        [].slice.call(childNodes).forEach(function(node) {
            //得到节点的文本内容
            var text = node.textContent;
            //创建正则对象（匹配大括号表达式）
            var reg = /\{\{(.*)\}\}/;

            //判断节点是否是一个元素节点
            if (me.isElementNode(node)) {
                //编译它（解析指令）
                me.compile(node);
                //判断节点是否是大括号格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                //编译大括号表达式的文本节点
                me.compileText(node, RegExp.$1);
            }
             //如果当前节点还有子节点，通过递归调用实现所有层次节点的编译
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },





    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //解析v-text/{{}}
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
  //解析v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
  //解析v-model
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
  //解析v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        //得到更新节点的函数
        var updaterFn = updater[dir + 'Updater'];
        //调用函数更新节点
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        //为表达式创建一个对应的watcher，实现节点的更新显示
        new Watcher(vm, exp, function(value, oldValue) {
            //更新界面中的指定节点
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        //得到事件类型/名
        var eventType = dir.split(':')[1],
             //从methods中得到表达式所对应的函数（事件回调函数）
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    //从vm得到表达式所对应的值
    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        // damu.age  0 1
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值    exp.length：2
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value; // 触发了set方法
            }
        });
    }
};

//包含多个更新节点的方法的工具对象
var updater = {
    //更新节点的textcontent属性值
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    //更新节点的innerhtml属性值
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
   //更新节点的className属性值
    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};