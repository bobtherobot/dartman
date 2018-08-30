this.dartman = (function(){

	var store;
	var page = "home";

	var pageRef = [];
	var pageList = {};


	function init(){

		store = storeset.getDataObject();

		gotoPage(store.page);


	}

	function gotoPage(Vpage){
		page = Vpage || "home";

	}

	return {
		init : init
	}

}());


document.addEventListener("DOMContentLoaded", dartman.init);