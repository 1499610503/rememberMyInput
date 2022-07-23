// 创建自定义面板，同一个插件可以创建多个自定义面板
// 几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调
chrome.devtools.panels.create('MyPanel', 'img/icon.png', 'mypanel.html', function(panel) {
	console.log('自定义面板创建成功！'); // 注意这个log一般看不到
});

// 创建自定义侧边栏
chrome.devtools.panels.elements.createSidebarPane("Images", function(sidebar) {
	// sidebar.setPage('../sidebar.html'); // 指定加载某个页面
	sidebar.setExpression(
	`
	var imgs=document.querySelectorAll("img");var imgSrc =[...imgs];imgSrc.map(function (item){return {img:item,src:item.src}})
	`
	, 'All Images'); // 通过表达式来指定
	sidebar.setExpression(
	`
	var audios=document.querySelectorAll("audio");var audioSrc =[...audios];audioSrc.map(function (item){return {audio:item,src:item.src}})
	`
	, 'All Audios'); // 通过表达式来指定
	sidebar.setExpression(
	`
	var videos=document.querySelectorAll("video");var videoSrc =[...videos];videoSrc.map(function (item){return {video:item,src:item.src}})
	`
	, 'All Audios'); // 通过表达式来指定
	// sidebar.setObject({aaa: 111, bbb: 'Hello World!'}); // 直接设置显示某个对象
});
