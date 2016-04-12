##MyEye    -----Chrome 插件
###功能
-	1.去广告，目前仅支持网站[http://www.theguardian.com/](http://www.theguardian.com/ "新闻")上的具体文章页面
-	2.划词翻译
-	3.响应式分页（进行中……）
##安装
将MyEye项目下载到本地，直接在chrome浏览器的扩展工具中打开。
##使用
打开网站[http://www.theguardian.com/](http://www.theguardian.com/ "新闻")上的某一篇文章后，在chrome浏览器右上角点击插件图标，会弹出小页面，在小页面的右上角登录。
登录之后，小页面下方有【使用广告过滤和划词翻译】按钮，点击即可

##说明
本插件借用了扇贝网开发者工具提供的原插件的架子，不影响原插件的正常使用。扇贝网要先登录才可以调用其API。
-   过滤广告实现，使用的是js注入的方法
-   划词实现，使用js注入，同时本页面与扩展通信，在扩展中进行ajax调用查询单词意思并返回



##备注
借用了扇贝网开发者工具提供的原插件，尊重和保护原作者版权。原始插件[[http://en.wikipedia.org/wiki/Public_Domain][Public Domain]]