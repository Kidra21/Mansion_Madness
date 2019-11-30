export function readGameState(){
	var gameState = localStorage.getItem('gameState')
	if (gameState == null){
		return {
			wingSpanRects:100,
		}
	}
	return JSON.parse(gameState);
}
export function saveGameState(gameState){

	localStorage.setItem('gameState',JSON.stringify(gameState))
}

export function readRunState(){
	var runState = localStorage.getItem('runState');


	if (runState == null){
		return null;
	}
	return JSON.parse(runState);
}
export function saveRunState(runState){

	localStorage.setItem('runState',JSON.stringify(runState))
}
export function addCoins(coins){
	var game_state = readGameState();
	game_state.coinsNumber+=coins;
	saveGameState(game_state);
}

export let number = Phaser.Math.Between(0,1);
export let eyeInpocket = 0;
export let appleInpocket = 0;
export let eatEye = 0;
export let eatApple = 0;
export let monsterFull = 0;

export function setEye( number){
	eyeInpocket= number;
}
export function setApple( number){
	appleInpocket= number;
}
export function eatenEye(number){
	eatEye = number;
}
export function eatenApple(number){
	eatApple = number;
}
export function monsterEat(number){
	monsterFull = number;
}


export let places = Phaser.Utils.Array.NumberArrayStep(0, 4, 0);
for(var i=0; i<2;){
	var r = Phaser.Math.Between(0,3);
	if (places[r]!= 1){
	places[r]=1
		i++;
	}
}
export let counter = 0;
export function points(){
	counter++;
}
export function kill(){
	counter = 0;
	eyeInpocket = 0;
	appleInpocket = 0;
	eatEye = 0;
	eatApple = 0;
	monsterFull = 0;
	for(var i=0; i<2;){
		var r = Phaser.Math.Between(0,3);
		if (places[r]!= 1){
			places[r]=1
			i++;
		}
	}

}


//export let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });




