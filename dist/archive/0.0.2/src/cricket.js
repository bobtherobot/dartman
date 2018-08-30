this.cricket = (function(){

	var Anums = [20,19,18,17,16,15,25];

	var MODE_ADD 	= "adding"; // These are css classNames, so be carefull
	var MODE_MINUS 	= "minusing"; // These are css classNames, so be carefull
	var mathMode = MODE_ADD;

	var toggleMathButton;

	var storedElems = {};
	var numKlassRef = [
		"",
		"one",
		"two",
		"three"
	];


	var numCharRef = [
		"",
		"1",
		"2",
		"3"
	];

	var Oscore = {};
	Oscore.p1 = {};
	Oscore.p1.n20 = 0;
	Oscore.p1.n19 = 0;
	Oscore.p1.n18 = 0;
	Oscore.p1.n17 = 0;
	Oscore.p1.n16 = 0;
	Oscore.p1.n15 = 0;
	Oscore.p1.n25 = 0;
	Oscore.p1.score = 0;

	Oscore.p2 = {};
	Oscore.p2.n20 = 0;
	Oscore.p2.n19 = 0;
	Oscore.p2.n18 = 0;
	Oscore.p2.n17 = 0;
	Oscore.p2.n16 = 0;
	Oscore.p2.n15 = 0;
	Oscore.p2.n25 = 0;
	Oscore.p2.score = 0;

	var pps = ["p1", "p2"];
	var elemRef = {};

	function doScore(evt){
		var data = evt.target.dataset;
		if(mathMode == "minusing"){
			subtractScore(data.num, data.player);
		} else {
			addScore(data.num, data.player);
		}
	}

	function toggleMode(){
		// flop
		mathMode = (mathMode == MODE_ADD) ? MODE_MINUS : MODE_ADD;
		applyMathMode();
	}

	function applyMathMode(){
		toggleMathButton.className = "toggleMathButton " + mathMode;
	}

	function resetMathMode(){
		mathMode = MODE_ADD;
		applyMathMode()
	}

	function addScore(theNum, thePlayer){

		var plr = Oscore[thePlayer];
		var nid = "n" + theNum;
		var marks = ++plr[nid]; // ++ in front to set and get now (otherwise the setting occurs after this line, and too late.

		// See if opponant has 3 marks so we can score points.
		if(marks > 3){

			var opp = (thePlayer == "p1") ? "p2" : "p1";

			// Opponant sucks, ring up some points.
			if(Oscore[opp][nid] < 3){
				Oscore[thePlayer].score += parseInt(theNum);
				updateScores();
			}

		// Otherwise, render marks
		} else {
			
			if(marks > 3){
				marks = plr[nid] = 3;
			}

			applyCheck(thePlayer + "_" + theNum, marks);
		}
	
	}

	function subtractScore(theNum, thePlayer){

		var plr = Oscore[thePlayer];

		// Take one off
		var marks = --plr["n" + theNum]; // -- in front to get/set now
		if(marks < 1){
			marks = plr["n" + theNum] = 0;
		}
		
		// If this guy already scored on this number, reduce total score.
		// No need to re-render (x), since this guy's still has 3 strikes
		if(marks > 2){

			plr.score -= parseInt(theNum);
			if(plr.score < 0){
				plr.score = 0;
			}
			updateScores();
		
		// Now there are < 3 checks, so re-render.
		} else {

			applyCheck( thePlayer + "_" + theNum , marks);
		
		}
	
	}

	var htmlSpace = "&nbsp;"

	function applyCheck(imageID, Nscore) {
		if(Nscore > 3){
			Nscore = 3;
		}
		if( !Nscore || Nscore < 1 ){
			Nscore = htmlSpace;
		}
		elemRef[imageID].innerHTML = Nscore;
		//elemRef[imageID].className = "mark " + numKlassRef[Nscore];
		save();
	}

	function updateScores(){
		p1ScoreElem.innerHTML = Oscore.p1.score;
		p2ScoreElem.innerHTML = Oscore.p2.score;
		save();
	}

	function save(){
		storeset.set("dartman.cricket.score", Oscore);
		var names = {
			p1 : p1_nameElem.value,
			p2 : p2_nameElem.value,
		}
		storeset.set("dartman.cricket.names", names);
	}

	var p1_nameElem;
	var p2_nameElem;
	function init(){

		new FastClick(document.body);
		toggleMathButton = document.getElementById("toggleMathButton");
		toggleMathButton.addEventListener("mousedown", toggleMode, false);

		p1ScoreElem = document.getElementById("player1score");
		p2ScoreElem = document.getElementById("player2score");

		p1_nameElem = document.getElementById("p1_name");
		p2_nameElem = document.getElementById("p2_name");

		p1_nameElem.addEventListener("input", save, false);
		p2_nameElem.addEventListener("input", save, false);

		var resetElem = document.getElementById("resetGame");
		resetElem.addEventListener("mousedown", resetButtonClicked, false);

		// Get the mark elemets
		for(var i=0; i<Anums.length; i++){
			var num = Anums[i];
			for(var k=0; k<pps.length; k++){
				var plyr = pps[k]
				var id = plyr + "_" + num;
				var elem = document.getElementById(id);
				elem.dataset.player = plyr;
				elem.dataset.num = num;
				elem.addEventListener("mousedown", doScore, false);
				elemRef[id] = elem;
			}
		}

		var existing = storeset.get("dartman.cricket");
		if(existing && existing.score){
			restore(existing.score);
			if(existing.names){
				p1_nameElem.value = existing.names.p1;
				p2_nameElem.value = existing.names.p2;
			}
		}

	}

	function restore(data){

		Oscore.p1 = {};
		Oscore.p2 = {};
		for(var i=0; i<Anums.length; i++){
			var num = Anums[i];
			for(var k=0; k<pps.length; k++){
				var plyr = pps[k];
				var marks = data[plyr]["n" + num]
				Oscore[plyr]["n" + num] = marks;
				applyCheck( plyr + "_" + num , marks);
			}
		}
		Oscore.p1.score = parseInt(data.p1.score || 0);
		Oscore.p2.score = parseInt(data.p2.score || 0);

		updateScores();

	}

	function resetScores(restore){

		Oscore.p1 = {};
		Oscore.p2 = {};
		Oscore.p1.n20 = 0;
		Oscore.p1.n19 = 0;
		Oscore.p1.n18 = 0;
		Oscore.p1.n17 = 0;
		Oscore.p1.n16 = 0;
		Oscore.p1.n15 = 0;
		Oscore.p1.n25 = 0;
		Oscore.p1.score = 0;

		Oscore.p2.n20 = 0;
		Oscore.p2.n19 = 0;
		Oscore.p2.n18 = 0;
		Oscore.p2.n17 = 0;
		Oscore.p2.n16 = 0;
		Oscore.p2.n15 = 0;
		Oscore.p2.n25 = 0;
		Oscore.p2.score = 0;
	}

	function resetButtonClicked(e){
		var ok = confirm("Are you sure? (This will zero all scoring)");
		if(ok){
			reset();
		}
	}

	function reset(){
		resetScores();

		for(var prop in elemRef){
			var elem = elemRef[prop];
			elem.innerHTML = htmlSpace;
		}

		updateScores();
		resetMathMode();
		console.log("reset", Oscore.p1.n20, Oscore.p1.score);
	
	}
	
	
	return {
		init : init,
		doScore : doScore,
		toggleMode : toggleMode,
		reset : reset
	}

}());

document.addEventListener("DOMContentLoaded", cricket.init);