/**
 * 打开frame 
 * @param {Object} option
 * 		frmName: 名称
 * 		bounces： 是否动弹
 */
function openfrmFromWin(option){
	var header = $api.dom('header');
    $api.fixStatusBar(header);
    var headerPos = $api.offset(header);
    api.openFrame({
        name: option.frmName,
        url: './'+ option.frmName +'.html',
        bounces: !!option.bounces,
        rect: {
            x: 0,
            y: headerPos.h,
            w: 'auto',
            h: 'auto'
        },
        pageParam: option.pageParam
    });
}

function openWin(name){
	api.openWin({
	    name: name,
	    url: './'+name+'.html',
		delay: api.systemType == 'ios' ? 0 : 300
	});
}

function closeWin(){
	api.closeWin({
		animation:{
		    type:"push",
		    subType:"from_left",
		    duration:300
		}
	})
}

/**
 * 安卓增加双击返回退出事件 
 */
function addDoubleClickQuitListener(){
	var backButtonPress = 0;
	api.addEventListener({
	    name:'keyback'
	},function(ret,err){
		backButtonPress++;
		if (backButtonPress > 1) {
			api.closeWidget({
            	silent : true
            });
		} else {
			api.toast({
                msg:'再按一次退出应用'
            });
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
	});
}


var basePath = '';
function post(act, data, fn){
	if(api.connectionType == 'unknown' || api.connectionType == 'none'){
		api.hideProgress();
		api.toast({
	        msg: '网络不可用，请检查您的网络'
        });
        return;
	}
	var admininfo = $api.getStorage('admininfo');
	api.ajax({
	    url: basePath + '/webservices/json.aspx?mod=mp&act=' + act,
	    method: 'post',
	    data: {
	    	values: data
	    }
	}, function(ret, err) {
//		log('============='+act+'==============')
//		log(data)
//		log(ret)
//		log(err)
//		log('==================================')
		if(err){
			api.toast({
	            msg: err.msg
            });
            return;
		}
		if(ret.errno == '1'){
			api.toast({
	            msg: ret.errors[0] || '请求失败'
            });
		}
		if(fn) fn(ret)
	});
}

function log(msg){
	if(msg !== null && typeof msg === 'object'){
		console.log(JSON.stringify(msg))
	}else{
		console.log(msg)
	}
}

/**
 * 退出登录 
 */
function logout(){
	confirm('提示', '确定要退出当前账号吗？', ['确 定', '不，我点错了'], function(index){
		if(index == 0){
	    	var admininfo = $api.getStorage('admininfo');
	    	post('systemout', {id: admininfo.id}, function(ret){})
	    	$api.rmStorage('remember');
	    	$api.rmStorage('admininfo');
	    	api.openWin({
		        name: 'login',
		        url: 'login.html',
		        slidBackEnabled: false,
		        animation: {
				    type:"push",
				    subType:"from_left",
				    duration:300
				}
	        });
	    }
	})
}

function alert(msg, btnText, fn){
	confirm(undefined, msg, btnText, fn)
}

function confirm(title, msg, btnText, fn){
	var eventId = 'alert_evet_' +　Date.now();
	api.openFrame({
        name: 'alert',
        url: 'widget://html/alert_frm.html',
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.winHeight
        }, 
        pageParam: {
	        title: title,
	        msg: msg,
	        btnText: btnText,
	        eventId: fn ? eventId : 0
	    },
        animation: {
		    type: 'fade',
		    duration: 80 
		}
    });
    if(fn) {
    	api.addEventListener({
		    name: eventId
	    }, function(ret, err){
	    	fn(ret.value.index)
	    	api.removeEventListener({
	            name: eventId
            });
	    });
    }
}