///**
// * 1.1.1 = 1*100*100 + 1*100 + 1
// * 1.2.2 = 1*100*100 + 2*100 + 3
// *
// * 1 = 0*100 +1
// */ 
//function encode_id_with_array(opts,arr) {
//	var result = 0;
//  	for(var z = 0; z < arr.length; z++ ) {  
//		result += factor(opts, arr.length - z ,arr[z]);
//  	}
//
//	return result;
//}
//
//
///**
// * 1.1.1 = 1*100*100 + 1*100 + 1
// * 1.2.2 = 1*100*100 + 2*100 + 3
// *
// * 1 = 0*100 +1
//
//	1,1 = 100
//
// */ 
//function get_parent_id_with_array(opts,arr) {
//	var result_arr = [];
//
//  	for(var z = 0; z < arr.length; z++ ) {  
//		result_arr.push(arr[z]);
//  	}
//	result_arr.pop();
//	//console.log(result_arr.pop());
//	
//	var result = 0;
//  	for(var z = 0; z < result_arr.length; z++ ) {  
//		result += factor(opts,result_arr.length - z,result_arr[z]);
//  	}
//	
//	return result;
//}
//
//function factor(opts ,count,current) {
//	if(1 == count) {
//		return current;
//	}
//	
//	var str = '';
//	for(var i = count - 1;i > 0; i-- ) {
//		str += current * opts.step+'*';
//	}
//
//	return eval( str + '1' );
//}
//
//;(function($) {
//	/*
//	 * 根据header创建目录内容
//	 */	
//	function create_toc(opts) {
//		$(opts.documment_selector).find(':header').each(function() {
//			var level = parseInt(this.nodeName.substring(1), 10);
//			
//			_rename_header_content(opts,this,level);
//			
//			_add_header_node(opts,$(this));
//		});//end each
//	}
//	
//	/*
//	 * 渲染ztree
//	 */	
//	function render_with_ztree(opts) {
//		var t = $(opts._zTree);
//		//t = $.fn.zTree.init(t,opts.ztreeSetting,opts._header_nodes).expandAll(opts.is_expand_all);
//		t = $.fn.zTree.init(t,opts.ztreeSetting,opts._header_nodes);
//		// alert(opts._headers * 88);
//		// $(opts._zTree).height(opts._headers  * 33 + 33);
//		
////		if(opts.is_posion_top == true){
////			opts.ztreeStyle.top = '0px';
////			
////			if( opts.ztreeStyle.hasOwnProperty('bottom') )
////				delete opts.ztreeStyle.bottom ;
////		}else{
////			opts.ztreeStyle.bottom = '0px';
////			
////			if( opts.ztreeStyle.hasOwnProperty('top') )
////				delete opts.ztreeStyle.top;
////		}
//			
//		$(opts._zTree).css(opts.ztreeStyle);
//	}
//	
//	/*
//	 * 将已有header编号，并重命名
//	 */	
//	function _rename_header_content(opts ,header_obj ,level) {
//		if(opts._headers.length == level) {
//			opts._headers[level - 1]++;
//		} else if(opts._headers.length > level) {
//			opts._headers = opts._headers.slice(0, level);
//			opts._headers[level - 1] ++;
//		} else if(opts._headers.length < level) {
//			for(var i = 0; i < (level - opts._headers.length); i++) {
//			  // console.log('push 1');
//			  opts._headers.push(1);
//			}
//		}
//		
//		if(opts.is_auto_number == true) {
//			//另存为的文件里会有编号，所以有编号的就不再重新替换
//			if($(header_obj).text().indexOf( opts._headers.join('.') ) != -1){
//				
//			}else{
//				$(header_obj).text(opts._headers.join('.') + '. ' + $(header_obj).text());
//			}
//		}
//	}
//	
//	/*
//	 * 给ztree用的header_nodes增加数据
//	 */	
//	function _add_header_node(opts ,header_obj) {
//		var id  = encode_id_with_array(opts,opts._headers);
//		var pid = get_parent_id_with_array(opts,opts._headers);
//	  	//console.log('pid:'+pid);
//      	// 设置锚点id
//		$(header_obj).attr('id',id);
//
//		log($(header_obj).text());
//		
//		opts._header_offsets.push($(header_obj).offset().top - opts.highlight_offset);
//		
//		log('h offset ='+( $(header_obj).offset().top - opts.highlight_offset ) );
//		
//		opts._header_nodes.push({
//			id:id, 
//			pId:pid , 
//			name:$(header_obj).text()||'null', 
//			open:false,
//			url:'#'+ id,
//			target:'_self'
//		});
//	}
//	
//	/*
//	 * 根据滚动确定当前位置，并更新ztree
//	 */	
//	function bind_scroll_event_and_update_postion(opts) {
//		var timeout;
//	    var highlight_on_scroll = function(e) {
//			if (timeout) {
//				clearTimeout(timeout);
//			}
//			
//			timeout = setTimeout(function() {
//				var top = $(window).scrollTop(),highlighted;
//				
//				//if(opts.debug) console.log('top='+top);
//			
//				for (var i = 0, c = opts._header_offsets.length; i < c; i++) {
//					// fixed: top+5防止点击ztree的时候，出现向上抖动的情况
//					if (opts._header_offsets[i] >= (top + 5) ) {
//						//console.log('opts._header_offsets['+ i +'] = '+opts._header_offsets[i]);
//						$('a').removeClass('curSelectedNode');
//						
//						// 由于有root节点，所以i应该从1开始
//				  		var obj = $('#tree_' + (i) + '_a').addClass('curSelectedNode');
//						break;
//					}
//				}
//			}, opts.refresh_scroll_time);
//		};
//		
//	    if (opts.highlight_on_scroll) {
//	      $(window).bind('scroll', highlight_on_scroll);
//	      highlight_on_scroll();
//	    }
//	}
//	
//	/*
//	 * 初始化
//	 */	
//	function init_with_config(opts) {
//		opts.highlight_offset = $(opts.documment_selector).offset().top;
//	}
//	
//	/*
//	 * 日志
//	 */	
//	function log(str) {
//		return;
//		if($.fn.ztree_toc.defaults.debug == true) {
//			console.log(str);
//		}
//	}
//
//	$.fn.ztree_toc = function(options) {
//		// 将defaults 和 options 参数合并到{}
//		var opts = $.extend({},$.fn.ztree_toc.defaults,options);
//		
//		return this.each(function() {
//			opts._zTree = $(this);
//			
//			// 初始化
//			init_with_config(opts);
//			
//			// 创建table of content，获取元数据_headers
//			create_toc(opts);
//			
//			// 根据_headers生成ztree
//			render_with_ztree(opts);
//			
//			// 根据滚动确定当前位置，并更新ztree
//		    bind_scroll_event_and_update_postion(opts);
//		});
//		// each end
//	}
//	
//	//定义默认
//	$.fn.ztree_toc.defaults = {
//		_zTree: null,
//		_headers: [],
//		_header_offsets: [],
//		_header_nodes: [],
//		debug: false,
//		highlight_offset: 0,
//		highlight_on_scroll: true,
//		/*
//		 * 计算滚动判断当前位置的时间，默认是50毫秒
//		 */
//		refresh_scroll_time: 50,
//		documment_selector: 'body',
//		/*
//		 * ztree的位置，默认是在上部
//		 */
//		is_posion_top: true,
//		/*
//		 * 默认是否显示header编号
//		 */
//		is_auto_number: false,
//		/*
//		 * 默认是否展开全部
//		 */	
//		is_expand_all: true,
//		/*
//		 * 是否对选中行，显示高亮效果
//		 */	
//		is_highlight_selected_line: true,
//		step: 100,
//		ztreeStyle: {
//			width:'210px',
//			overflow: 'auto',
//			'z-index': 2147483647,
//			height:(window.innerHeight-30)+'px'
//		},
//		ztreeSetting: {
//			view: {
//				dblClickExpand: true,
//				showLine: true,
//				showIcon: true,
//				selectedMulti: false
//			},
//			data: {
//				simpleData: {
//					enable: true,
//					idKey : "id",
//					pIdKey: "pId",
//					// rootPId: "0"
//				}
//			},
//			callback: {
//				beforeClick: function(treeId, treeNode) {
//					$('a').removeClass('curSelectedNode');
//				}
//			}
//		}
//	};
//
//})(jQuery);

(function($) {
  $.fn.preventScroll = function() {
    var _this = this.get(0);
    _this.onmousewheel = function(e) {
      e = e || window.event;
      _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
      e.returnValue = false
    };
    return this;
  };
})(jQuery);


(function() {

  var trees = [];
  var lastObj = {};
  var gid = 1;

  function createRootNode(num, node) {
    var newObj = {
      name: num,
      id: gid,
      children: [],
      parent: null,
      node: node
    };
    trees.push(newObj);
    lastObj = newObj;
  }


  function buildData(inArr) {
    //第一个
    lastObj = {
      name: inArr[0].lv,
      id: gid,
      children: [],
      parent: null,
      node: inArr[0].node
    };
    trees.push(lastObj);
    $(inArr[0].node).attr("id", gid);

    for (i = 1; i < inArr.length; i++) {
      gid++;
      var node = inArr[i].node;
      var lv = inArr[i].lv;
      $(node).attr("id", gid);
      if (lv > lastObj.name) {
        var newObj = {
          name: lv,
          id: gid,
          children: [],
          parent: lastObj,
          node: node
        };
        lastObj.children.push(newObj);
        lastObj = newObj;
      } else if (lv == lastObj.name) {
        if (lastObj.parent != null) {
          var newObj = {
            name: lv,
            id: gid,
            children: [],
            parent: lastObj.parent,
            node: node
          };
          lastObj.parent.children.push(newObj);
          lastObj = newObj;
        } else {
          createRootNode(lv, node);
        }
      } else if (lv < lastObj.name) {
        searchUp(lastObj, lv, node);
      }
    }
    //console.log("trees= ",trees)
    return trees;
  }

  function searchUp(obj, num, node) {
    //log("num ",num);
    var p = obj.parent;
    while (p != null) {
      //找到同等级的层
      if (num == p.name) {
        //log("find same",num);
        if (p.parent != null) {
          var newObj = {
            name: num,
            id: gid,
            children: [],
            parent: p.parent,
            node: node,
          };
          p.parent.children.push(newObj);
          lastObj = newObj;
        } else {
          createRootNode(num, node);
        }
        return;
      } else if (p.name < num) {
        //log("find parent",p);
        var newObj = {
          name: num,
          id: gid,
          children: [],
          parent: p,
          node: node
        };
        p.children.push(newObj);
        lastObj = newObj;
        return
      }
      //log("p.name ",p.name);
      p = p.parent
    }
    createRootNode(num, node);
  }

  //-------------------------------------------------

  function convert2TreeData(arr, isOpen) {
    var outArr = [];

    var drillDown = function(obj) {
      for (var k = 0; k < obj.children.length; k++) {
        var pid = obj.children[k].parent == null ? 0 : obj.children[k].parent.id
        outArr.push({
          id: obj.children[k].id,
          pId: pid,
          name: obj.children[k].node.textContent,
          url: "javascript:void(0);",
          open: isOpen
        })
        drillDown(obj.children[k])
      }
    }

    for (var j = 0; j < arr.length; j++) {
      outArr.push({
        id: arr[j].id,
        pId: 0,
        name: arr[j].node.textContent,
        url: "javascript:void(0);",
        open: isOpen
      })
      drillDown(arr[j]);
    }

    return outArr;
  }

  window.buildTreeData = function(arr, isOpen) {
    return convert2TreeData(buildData(arr), isOpen);
  }


})();

(function() {

  function createTree(arr) {
    var tmpArr = [];
    for (i = 0; i < arr.length; i++) {
      tmpArr.push({
        lv: parseInt(arr[i].tagName.charAt(1)),
        node: arr[i]
      });
    }

    var setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      view: {
        expandSpeed: ""
      }
    };

    $(document).ready(function() {
      var treeH = window.innerHeight - $("#toolbar").height();
      $.fn.zTree.init($("#tree"), setting, buildTreeData(tmpArr, arr.length < treeH / 18));
      $("#sider").height(window.innerHeight);
      $("#tree").height(treeH);
    });
  }

  window.init = function() {
    var arr = $(":header");
    if (arr.length > 2) {
      createTree(arr);
      $("body").removeClass("noTree");
    } else {
      $("body").addClass("noTree");
    }
  }

})();


(function() {

  init();

  document.getElementById("tree").addEventListener("click", function() {
    var name = event.target.tagName.toUpperCase();
    if (name == "A" || name == "SPAN") {
      var id = event.target.id.split("_")[1];
      $("html,body").animate({
        scrollTop: $("#" + id).offset().top
      }, 0);
    }
  });

  $("#tree").preventScroll();
  $("#expendAll").click(function() {
    var treeObj = $.fn.zTree.getZTreeObj("tree");
    treeObj.expandAll(true);
  });

  $("#collapseAll").click(function() {
    var treeObj = $.fn.zTree.getZTreeObj("tree");
    treeObj.expandAll(false);
  });

  $("#hidePanel").click(function() {
    $("#sider").toggleClass("hideSider");
    $("#myContent").toggleClass("myContent_min");
    $("#hidePanel").attr("title", $("#hidePanel").attr("title") == "隐藏" ? "显示" : "隐藏");
  });

})();