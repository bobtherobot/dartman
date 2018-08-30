var ohone = (function() {
	
	var ohOneSize;
	var gameSize= 301;

	var Anums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25];

	var Oscore = {};
	Oscore.p1 = {};
	Oscore.p2 = {};
	Oscore.p1.stack = [];
	Oscore.p2.stack = [];
	
	var numButtons = {};


	var colorRef = ["black", "bronze", "silver", "gold"];

	var currentPlayer = "p1";
	var scoreTemp = 0;
	var mode = "add";
	var okTextElem;
	var p1_ok;
	var p2_ok;
	var p1_cancelScore;
	var p2_cancelScore;

	var audioPath = "media/";
	var soundTock = [
		new Audio(audioPath + "Tock.mp3"),
		new Audio(audioPath + "Tock.mp3"),
		new Audio(audioPath + "Tock.mp3"),
		new Audio(audioPath + "Tock.mp3"),
		new Audio(audioPath + "Tock.mp3")
	];
	var soundTockIndex = 0;
	var soundDone = new Audio(audioPath + "end_record.mp3");
	var soundSub = [
		new Audio(audioPath + "Tink.mp3"),
		new Audio(audioPath + "Tink.mp3"),
		new Audio(audioPath + "Tink.mp3"),
		new Audio(audioPath + "Tink.mp3"),
		new Audio(audioPath + "Tink.mp3")
	];
	var soundSubIndex = 0;
	var soundErase = new Audio(audioPath + "SIMToolkitSMS.mp3");
	var soundTon = new Audio(audioPath + "oh-yeah.mp3");

	var ohOneSize;

	var numElems = {};

	var p1_inactiveClass;
	var p2_inactiveClass;
	var activeClass;

	var p1_name;
	var p2_name;


	function init() {

		ohOneSize = document.getElementById("ohOneSize");
		ohOneSize.addEventListener("blur", change301);
		toggleModeElem = document.getElementById("toggleMode");
		toggleModeElem.addEventListener("mousedown", toggleMode);
		
		p1_ok = document.getElementById("p1_ok");
		p1_ok.addEventListener("mousedown", commitScore);
		p2_ok = document.getElementById("p2_ok");
		p2_ok.addEventListener("mousedown", commitScore);

		p1_cancelScore = document.getElementById("p1_cancelScore");
		p1_cancelScore.addEventListener("mousedown", cancelScore);
		p2_cancelScore = document.getElementById("p2_cancelScore");
		p2_cancelScore.addEventListener("mousedown", cancelScore);

		p1_minusStack = document.getElementById("p1_minusStack");
		p1_minusStack.addEventListener("mousedown", p1_pop);
		p2_minusStack = document.getElementById("p2_minusStack");
		p2_minusStack.addEventListener("mousedown", p2_pop);
		
		p1_name = document.getElementById("p1_name");
		p1_name.addEventListener("input", save);
		p2_name = document.getElementById("p2_name");
		p2_name.addEventListener("input", save);

		var resetElem = document.getElementById("resetGame");
		resetElem.addEventListener("mousedown", resetGame);

		p1_inactiveClass = getRandomInactiveClass();
		p2_inactiveClass = getRandomInactiveClass();


		flopper = document.getElementById("flopper");
		flopper.addEventListener("mousedown", flop);


		for(var i=0; i<Anums.length; i++){
			var num = Anums[i]
			var id = "n" + num;
			var elem = document.getElementById( id );
			elem.addEventListener("mousedown", doScore);
			numElems[id] = {
				elem : elem,
				num : num
			}
		}

		new FastClick(document.body);
		
		clearColors();

		prepAudio(soundDone);
		prepAudio(soundErase);
		prepAudio(soundTon);

		for(var i=0; i<soundTock.length; i++){
			prepAudio(soundTock[i]);
			prepAudio(soundSub[i]);
		}

		var existing = storeset.get("ohone");
		resetGame();

		if (existing){
			console.log("existing", existing);

			p1_name.value = existing.p1.name;
			p2_name.value = existing.p2.name;
			gameSize = ohOneSize.value = Number(existing.size);

			Oscore = existing;
			currentPlayer = existing.currentPlayer;

			redraw();

		} else {
			activatePlayer("p1");
		}
	}

	function redraw(){
		var temp = currentPlayer;
		currentPlayer = "p1";
		drawStack();

		currentPlayer = "p2";
		drawStack();

		activatePlayer(temp);
	}


	function save(){
		Oscore.size = gameSize;
		Oscore.p1.name = p1_name.value;
		Oscore.p2.name = p2_name.value;
		Oscore.currentPlayer = currentPlayer; //otherPlayer();
		storeset.set("ohone", Oscore);
	}

	function otherPlayer(){
		return currentPlayer == "p1" ? "p2" : "p1";
	}

	function prepAudio(who){
		who.load();
		who.volume = 0.001;
		who.play();
		who.addEventListener("ended", runOffRun, false);
	}

	function runOffRun(e){
		var who = e.target;
		who.volume = 1;
		who.removeEventListener("ended", runOffRun, false);
	}


	function change301() {

		var val = ohOneSize.value;
		if (val) {
			val = parseInt(val);
			if (val >= 10000) {
				val = 9999;
				ohOneSize.value = 9999;
			}
			if (val > 10) {

				gameSize = parseInt(ohOneSize.value);
				ohOneSize.value = gameSize;

				redraw();
				/*
				var temp = currentPlayer;
				currentPlayer = "p1";
				addScore(0);
				currentPlayer = "p2";
				addScore(0);

				currentPlayer = temp;
				*/

				save();

			}

		}
	}

	function resetGame(){
		cancelScore();
		clearColors();
		writeit("", "p1_stack");
		writeit("", "p2_stack");
		Oscore.p1.stack = [];
		Oscore.p2.stack = [];
		writeit(gameSize, "p1_score");
		writeit(gameSize, "p2_score");
	}



	function clearColors() {
		for (var i = 0; i < Anums.length; i++) {
			numButtons["c" + Anums[i]] = 0;
		}
	}

	function toggleMode() {
		if (mode == "add") {
			mode = "sub";
			setClassName("toggleMode", "mathToggler minus", "-");
		} else {
			mode = "add";
			setClassName("toggleMode", "mathToggler", "+");
		}

		/*
		for(var i=0;i<Anums.length; i++){
			swapImage("doit_" + Anums[i], mode + ".png");
		}
		*/

		//swapImage("toggleMathButton", "../images/toggleMath_" + mode + ".png");
	}



	function doScore(e) {
		var theNum = numElems[e.target.id].num;

		if (mode == "add") {
			addScore(theNum);
			soundTockIndex++;
			if (soundTockIndex >= soundTock.length) {
				soundTockIndex = 0;
			}
			soundTock[soundTockIndex].play();
		} else {
			subScore(theNum);
			soundSubIndex++;
			if (soundSubIndex >= soundErase.length) {
				soundSubIndex = 0;
			}
			soundSub[soundSubIndex].play();
		}


	}

	function subScore(theNum) {
		scoreTemp -= theNum;
		if (scoreTemp < 0) {
			scoreTemp = 0;
		}
		numButtons["c" + theNum]--;
		if (numButtons["c" + theNum] < 0) {
			numButtons["c" + theNum] = 0;
		}
		var level = numButtons["c" + theNum];
		if (level < 3 && level > -1) {
			//var theDir = colorRef[level];

			setClassName("n" + theNum, "numb score" + String(level));
			//swapImage("doit_"+theNum, "../images/"+theDir+"/"+theNum+".png");
		}

		writeit(scoreTemp, currentPlayer + "_working");
		if (currentPlayer == "p1") {
			writeit(" ", "p2_working");
		} else {
			writeit(" ", "p1_working");
		}

		//drawStack();

	}

	function addScore(theNum) {
		if (theNum > 0) {
			var level = numButtons["c" + theNum]++;
			if (level < 3) {
				//var theDir = colorRef[level+1];
				setClassName("n" + theNum, "numb score" + String(level + 1));
				//swapImage("doit_"+theNum, "../images/"+theDir+"/"+theNum+".png");
			}
		}
		scoreTemp += theNum;



		writeit(scoreTemp, currentPlayer + "_working");
		if (currentPlayer == "p1") {
			writeit(" ", "p2_working");
		} else {
			writeit(" ", "p1_working");
		}
		//drawStack();


	}

	function flop(){
		currentPlayer = otherPlayer();
		activatePlayer(currentPlayer);
		//addScore(0)
	}

	function setClassName(id, klass, text) {
		var elem = document.getElementById(id);

		elem.className = klass;
		if (text) {
			elem.innerHTML = text;
		}

	}

	function commitScore() {

		Oscore[currentPlayer].stack[Oscore[currentPlayer].stack.length] = scoreTemp;
		drawStack(true);

		cancelScore();

	}

	function cancelScore() {
		for (var i = 0; i < Anums.length; i++) {
			var theNum = Anums[i];
			setClassName("n" + theNum, "numb score0");
			//swapImage("doit_" + theNum, "../images/black/"+theNum+".png");
		}
		scoreTemp = 0;
		activatePlayer( otherPlayer() );
		mode = "add";

		setClassName("toggleMode", "mathToggler", "+");
		addScore(0);
		clearColors();
		soundDone.play();
	}

	function activatePlayer(plyr){
		if (plyr == "p2") {
			currentPlayer = "p2";
			hide(p1_cancelScore);
			show(p2_cancelScore);
			hide(p1_ok);
			show(p2_ok);
			p1_working.innerHTML = "";
			p2_working.classList.add(activeClass);
			p2_working.classList.remove(p2_inactiveClass);
			p1_working.classList.add(p1_inactiveClass);
		} else {
			currentPlayer = "p1";
			hide(p2_cancelScore);
			show(p1_cancelScore);
			hide(p2_ok);
			show(p1_ok);
			p2_working.innerHTML = "";
			p1_working.classList.add(activeClass);
			p1_working.classList.remove(p1_inactiveClass);
			p2_working.classList.add(p2_inactiveClass);
		}

	}

	var inactiveClassList = [
		"inactive1",
		"inactive2",
		"inactive3",
		"inactive4",
	];

	function getRandomInactiveClass(){
		return inactiveClassList[Math.floor(Math.random() * inactiveClassList.length)];
	}



	function hide(elem) {
		elem.style.display = "none";
	}

	function show(elem) {
		elem.style.display = "block";
	}

	function p1_pop(e){
		popLast("p1");
	}
	function p2_pop(e){
		popLast("p2");
	}

	function popLast(thePlayer) {

		Oscore[thePlayer].stack.pop();

		currentPlayer = thePlayer;
		drawStack();
		addScore(0);

		soundErase.play();
	}
	
	var ohYeahThreshold = 80;

	function drawStack(isFinal) {
		var stackLength = Oscore[currentPlayer].stack.length;
		var temp = "";
		var tot = 0;

		var val = 0; // leave at this block-level because we check for the last item to see if ton.
		for (var i = 0; i < stackLength; i++) {
			val = Oscore[currentPlayer].stack[i];
			var isTon = val >= 49;
			var tonNum = "";
			if(isTon){

				if( val > 179 ){
					tonNum = "180";
				
				} else if( val > 169 ){
					tonNum = "170";
				
				} else if( val > 139 ){
					tonNum = "140";
				
				} else if( val > 99 ){
					tonNum = "100";
				
				} else if( val > 79 ){
					tonNum = "80";
				
				} else if( val > 59 ){
					tonNum = "60";
				
				} else if( val > 49 ){
					tonNum = "50";
				}
			}
			
			temp += "<span " + (isTon ? ' class="ton' + tonNum + '"' : "") + ">" + val + "</span>";
			tot += val;
		}
		//if(!isFinal){
		//temp = '<div class="workingScore">'+scoreTemp+'</div><br>' + temp;
		//}
		var writeSore = gameSize - tot;
		var scoreNumber = parseInt(writeSore);

		// somewhere in here we deal with < > 2 for double out.
		if (scoreNumber < 0) {
			popLast(currentPlayer);
		} else {
			writeit(writeSore, currentPlayer + "_score");
			writeit(temp, currentPlayer + "_stack");
			if (val >= ohYeahThreshold && isFinal || scoreNumber === 0) {
				soundTon.play();
			}
		}

		if(isFinal){
			save();
		}

	}


function writeit(text,id){
	if (document.getElementById) {
		var wimpyDoc = document.getElementById(id);
		wimpyDoc.innerHTML = '';
		wimpyDoc.innerHTML = text;
	} else if (document.all) {
		var wimpyDoc = document.all[id];
		wimpyDoc.innerHTML = text;
	} else if (document.layers) {
		var wimpyDoc = document.layers[id];
		text2 = '<P CLASS="testclass">' + text + '</P>';
		wimpyDoc.document.open();
		wimpyDoc.document.write(text2);
		wimpyDoc.document.close();
	}
}


	return {
		init: init,
		doScore : doScore,
		cancelScore :cancelScore,
		commitScore : commitScore
	}

}());
document.addEventListener("DOMContentLoaded", ohone.init);
