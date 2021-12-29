# Wln js framework for Vue
Wlniao Studio 前端开发适配框架Vue版本,主要有以下特点：
* 自带Axios、Vue、Vuex、Vue-Router引用
* 针对时间、字符串提供format扩展
* 针对XCenter的Tab页适配`openTab`、`backTab`等方法
* 基于`Axios`提供直接的`get`、`post`、`asyncGet`、`asyncPost`方法调用
* 支持uploader本地上传
* 添加了插件vue-cookie

## Build Setup
``` bash
# default build
npm run build-wln

# build for vue framework
npm run build-wln
```
file output in `static` folder

## How Use
``` html
<script type="text/javascript" src="//static.wlniao.com/wln-vue/wln-vue.js"></script>
```

## Version
* `1.9.11` 2019年11月10日发布，第一个版本；
* `1.9.12` 2019年12月27日发布，进一步精简代码，同时实现了[v-cloak]标签；
* `2.0.8`   2021年04月16日发布，增加含key,order,sortby等字段的query对象；


