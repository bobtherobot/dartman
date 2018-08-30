this.dartman = (function(){

	var store;
	var page = "home";

	var pageList = {
		home : {},
		cricket : {},
		ohone : {}
	};

	var chooseCricketButton;
	var chooseCricketButton;

	var router;

	function init(){

		store = storeset.getDataObject();

		gotoPage(store.page);

		var elem = document.getElementById("chooseCricket");
		elem.addEventListener("mousedown", chooseCricket);

		var elem = document.getElementById("choose301");
		elem.addEventListener("mousedown", choose301);


		router = new Navigo();
		router.on(function(){ gotoPage("home") }).resolve();
		router.on('/cricket', function(){ gotoPage("cricket") }).resolve();
  		router.on('/ohone', function(){ gotoPage("ohone") }).resolve();

	}

	function chooseHome(){
		router.navigate('/home');
	}

	function chooseCricket(){
		router.navigate('/cricket');
	}

	function choose301(){
		router.navigate('/ohone');
	}

	function gotoPage(Vpage){

		page = Vpage || "home";
		for(var prop in pageList){
			var item = pageList[prop];
			if( ! item.elem ){
				item.elem = document.getElementById(prop);
			}
			item.elem.style.display = "none";
		}

		pageList[page].elem.style.display = "block";

		storeset.set("page", page);

	}


	return {
		init : init
	}

}());


document.addEventListener("DOMContentLoaded", dartman.init);