this.dartman = this.dartman || {}
this.dartman.main = (function(){

	var store;
	var page = "home";

	var pageList = {
		home : {},
		cricket : {},
		ohone : {},
		help : {}
	};

	var chooseCricketButton;
	var chooseCricketButton;

	var router;

	function init(){

		store = null; //storeset.getDataObject();


		var elem = document.getElementById("chooseCricket");
		elem.addEventListener("mousedown", chooseCricket);

		elem = document.getElementById("choose301");
		elem.addEventListener("mousedown", choose301);

		elem = document.getElementById("chooseHelp");
		elem.addEventListener("mousedown", chooseHelp);

		/*
		var root = null;
		var useHash = true; // Defaults to: false, shoudl use to be crawlable by google
		var hash = '#!'; // Defaults to: '#'
		var router = new Navigo(root, useHash, hash);
		 */
		router = new Navigo(null, true, "#");
		router.on(function(){ gotoPage("home") })
		router.on('cricket', function(){ gotoPage("cricket") })
  		router.on('ohone', function(){ gotoPage("ohone") })
  		router.on('301', function(){ gotoPage("ohone") })
  		router.on('help', function(){ gotoPage("help") })
  		router.on('home', function(){ gotoPage("home") })

		//gotoPage(store.page);
		var hash = location.hash ? location.hash.replace("#", "") : null;

		if( ! pageList[hash]){
			hash = null;
		}

		gotoPage( hash || "home");

	}

	function chooseHome(){
		router.navigate('#home');
	}

	function chooseCricket(){
		router.navigate('#cricket');
	}

	function choose301(){
		router.navigate('#ohone');
	}

	function chooseHelp(){
		router.navigate('#help');
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
		console.log("Vpage", Vpage, dartman);

		if(dartman[Vpage]){
			console.log("Vpage", Vpage, dartman[Vpage]);
			dartman[Vpage].init();
		}
		

	}


	return {
		init : init
	}

}());


document.addEventListener("DOMContentLoaded", dartman.main.init);