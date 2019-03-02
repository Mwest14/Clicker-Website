var gameData = {
  fish: 0,
  fishPerClick: 1,
  fishPerClickCost: 10,
  fisherman: 1,
  villagers: 1,
  goldSecond: 0,
  totalGold: 0,
  fishSecond: 0,
  fishermanCost: 1,
}
function catchFish() {
  gameData.fish += 1;
  document.getElementById("fishCaught").innerHTML = gameData.fish + " Fish Caught"
}
// function buyFishPerClick(){
//   if(gameData.fish >= gameData.fishPerClickCost){
//     gameData.fish -= gameData.fishPerClickCost
//     gameData.fishPerClick += 1
//     gameData.fishPerClickCost *= 2
//     document.getElementById("fishCaught").innerHTML = gameData + " Fish Caught"
//     document.getElementById("perClickUpgrade").innerHTML = "Upgrade Fishing Rod (Current Level " +
//     gameData.fishPerClick + ") Cost: " + gameData.fishPerClickCost + " Fish"
//   }
// }
var mainGameLoop = window.setInterval(function() {
  fishPerSecond(), goldPerSecond(), incrementFish(), incrementGold()
}, 100)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('fishingIncrementalSave', JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("fishingIncrementalSave"))
if (savegame !== null) {
  gameData = savegame
}

function villagersToFisherman(){
  if(gameData.villagers <= 0){
    document.getElementById("villagersError").innerHTML = "Not Enough Villagers"
  }
  else{
    gameData.villagers -= 1;
    gameData.fisherman += 1;
    document.getElementById("villagers").innerHTML = gameData.villagers + " villagers"
    document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
  }
}

function fishermanMake() {
  if(gameData.totalGold < gameData.fishermanCost){
    document.getElementById("NotEnoughFunds").innerHTML = "Need More Gold"
  }
  else{
    gameData.fisherman += 1;
    fishermanCost = gameData.fishermanCost *= 2;
    document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
    document.getElementById("buyFisherman").innerHTML = "Buy Fisherman: " + fishermanCost + " gold"
    gameData.totalGold = gameData.totalGold - gameData.fishermanCost
    document.getElementById("NotEnoughFunds").innerHTML = ""
  }
}

function fishermanToVillagers(){
  if(gameData.fisherman <= 0){
    document.getElementById("fishermanError").innerHTML = "Not Enough fisherman"
  }
  else{
    gameData.villagers += 1;
    gameData.fisherman -= 1;
    document.getElementById("villagers").innerHTML = gameData.villagers + " villagers"
    document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
    document.getElementById("fishermanError").innerHTML = ""
  }
}
function fishPerSecond(){
  fishSecond = gameData.fisherman * .5
  document.getElementById("fishermanfishpersecond").innerHTML = fishSecond + " fish per second";
}
function goldPerSecond(){
  goldSecond = gameData.villagers * .2
  document.getElementById("villagersgoldpersecond").innerHTML = goldSecond + " gold per second";
}
function incrementGold(){
  gameData.totalGold = gameData.totalGold + (goldSecond/10)
  document.getElementById("totalGold").innerHTML = gameData.totalGold + " gold ";
}
function incrementFish(){
  gameData.fish = gameData.fish + (fishSecond/10)
  document.getElementById("fishCaught").innerHTML = gameData.fish + " Fish Caught";
}

var expeditionCostFisherman = [1, 3, 8, 15];
var expeditionCostGold = [10, 15, 25, 50];
var expeditionCostTime = [1, 2, 5, 10];
function startExpedition(){
// alert(gameData.fisherman)
if(gameData.fisherman < expeditionCostFisherman[0]){
  document.getElementById("expeditionError").innerHTML = "Not Enough Funds";
}
else{
  gameData.totalGold = gameData.totalGold - expeditionCostGold[0]
  gameData.fisherman = gameData.fisherman - expeditionCostFisherman[0]
  document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
  document.getElementById("totalGold").innerHTML = gameData.totalGold + " gold"
  var width = 0;
  var elem = document.getElementById("myBar");
  var myVar = setInterval(function(){
    if(width < 60){
      width++;
      elem.style.width = width + '%';
    }
    else{
      gameData.fisherman = gameData.fisherman + expeditionCostFisherman[0]
      gameData.totalGold = gameData.totalGold + expeditionCostGold[0]
    }
  },1000*expeditionCostTime[3]);
}
}
