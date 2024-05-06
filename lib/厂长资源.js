var rule={
	title:'厂长资源',
	// host:'https://czspp.com', 
	host:'https://www.cz233.com',
	//https://cz01.pw
	//https://cz01.tv重定位到https://www.czz9.com/
	hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});HOST = jsp.pdfh(html,"h3&&li&&a&&href");log(HOST);',
	url:'/fyclassfyfilter',
	filterable:1,//是否启用分类筛选,
	filter_url:'{{fl.cateId}}{{fl.class}}{{fl.area}}/page/fypage',
	filter: {
		"movie_bt":[
			{"key":"area","name":"分类","value":[{"v":"","n":"全部"}]},
			{"key":"class","name":"类型","value":[{"n":"全部","v":""}]}
		]
	},
	searchUrl:'http://test.210985.xyz/czzysearch.php?wd=**',
	searchable:2,
	filterable:0,
	headers:{
		'User-Agent': 'okhttp 4.3.12',
		'Cookie': 'esc_search_captcha=1'
	},
	class_name:'电影&电视剧',
	class_url:'movie_bt&dbtop250&gaofenyingshi&zuixindianying&reyingzhong&/movie_bt_series/zhanchangtuijian&/movie_bt_series/dyy&/movie_bt_series/dianshiju&/movie_bt_series/dohua&/movie_bt_series/guochanju&/movie_bt_series/rj&/movie_bt_series/hj&/movie_bt_series/mj&/movie_bt_series/hwj&/movie_bt_series/eluosidianying&/movie_bt_series/jianadadianying&/movie_bt_series/huayudianying&/movie_bt_series/yindudianying&/movie_bt_series/ribendianying&/movie_bt_series/meiguodianying&/movie_bt_series/faguodianying&/movie_bt_series/yingguodianying&/movie_bt_series/hanguodianying&movie_bt//movie_bt_tags/jlpp',
	play_parse:true,

	// lazy代码:源于海阔香雅情大佬 / 小程序：香情影视 https://pastebin.com/L4tHdvFn
	lazy:`js:
		pdfh = jsp.pdfh;
		var html = request(input);
		var ohtml = pdfh(html, '.videoplay&&Html');
		var url = pdfh(ohtml, "body&&iframe&&src");
		if (/Cloud/.test(url)) {
			var ifrwy = request(url);
			let code = ifrwy.match(/var url = '(.*?)'/)[1].split('').reverse().join('');
			let temp = '';
			for (let i = 0x0; i < code.length; i = i + 0x2) {
				temp += String.fromCharCode(parseInt(code[i] + code[i + 0x1], 0x10))
			}
			input = {
				jx: 0,
				url: temp.substring(0x0, (temp.length - 0x7) / 0x2) + temp.substring((temp.length - 0x7) / 0x2 + 0x7),
				parse: 0
			}
		} else if (/decrypted/.test(ohtml)) {
			var phtml = pdfh(ohtml, "body&&script:not([src])&&Html");
			eval(getCryptoJS());
			var scrpt = phtml.match(/var.*?\\)\\);/g)[0];
			var data = [];
			eval(scrpt.replace(/md5/g, 'CryptoJS').replace('eval', 'data = '));
			input = {
				jx: 0,
				url: data.match(/url:.*?[\\'\\"](.*?)[\\'\\"]/)[1],
				parse: 0
			}
		} else {
			input
		}
	`,
	推荐:'.bt_img;ul&&li;*;*;*;*',
	double:true,
	一级:'.bt_img&&ul&&li;h3.dytit&&Text;img.lazy&&data-original;.jidi&&Text;a&&href',
	二级:{
		"title": "h1&&Text;.moviedteail_list li&&a&&Text",
		"img": "div.dyimg img&&src",
		"desc": ".moviedteail_list li:eq(3) a&&Text;.moviedteail_list li:eq(2) a&&Text;.moviedteail_list li:eq(1) a&&Text;.moviedteail_list li:eq(7)&&Text;.moviedteail_list li:eq(5)&&Text",
		"content": ".yp_context&&Text",
		"tabs": ".mi_paly_box span",
		"lists": ".paly_list_btn:eq(#id) a"
	},
	搜索:'.search_list&&ul&&li;*;*;*;*',
	搜索:`js:
	var html = request(input);
	var d=[];
	if (html.indexOf('|')>0){
		let episodes = html.split('$$$');
		episodes.forEach(function(ep) {
			let tp=ep.split('|');
			d.push({
			title:tp[1],
			img:tp[2],
			desc:tp[3],
			url:HOST+'/movie/'+tp[0]+'.html'})
		})
		setResult(d);
	}
	`	
}
