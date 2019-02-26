var gameData = {
  fish: 0,
  fishPerClick: 1,
  fishPerClickCost: 10,
  fisherman: 0,
  villagers: 0,
  goldPerSecond: 0,
  fishPerSecond: 0,
}
function catchFish() {
  gameData.fish += gameData.fishPerClick
  document.getElementById("fishCaught").innerHTML = gameData.fish + " Fish Caught"
}
function buyFishPerClick(){
  if(gameData.fish >= gameData.fishPerClickCost){
    gameData.fish -= gameData.fishPerClickCost
    gameData.fishPerClick += 1
    gameData.fishPerClickCost *= 2
    document.getElementById("fishCaught").innerHTML = gameData + " Fish Caught"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Fishing Rod (Current Level " +
    gameData.fishPerClick + ") Cost: " + gameData.fishPerClickCost + " Fish"
  }
}
var mainGameLoop = window.setInterval(function() {
  catchFish(), villagersMake(), fishermanMake()
}, 100)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('fishingIncrementalSave', JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("fishingIncrementalSave"))
if (savegame !== null) {
  gameData = savegame
}

function villagersMake(){

  gameData.villagers += 1;
  gameData.fisherman -= 1;
  document.getElementById("villagers").innerHTML = gameData.villagers + " villagers"

}
function fishermanMake() {
  gameData.fisherman += 1;
  document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"

}
