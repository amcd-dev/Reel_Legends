import * as fishImports from "./fishtypes.js";
import * as questImports from "./questScript.js";

const player = {
    userName: 'player01',
    userExp: 0,
    userLevel: 0,
    luck: 0,
    rodType: fishImports.rodTierOne,
    reelType: fishImports.reelTierOne,
    hookType: fishImports.hookTierOne,
    baitType: '',
    specialItem: '',
    currentLocation: fishImports.startIslandShore,
    aquarium: [],
    lifeTimeStats: {
        timesCast: 0,
        fishCaught: 0,
        heaviestFish: 0
    },
}

//Global Variables
let uniqueID = 0;

//Global Functions
const generateUniqueID = () => { //Generates a unique ID
    uniqueID++
    return uniqueID;
};

function catchChance () {
    let newCatchChance = (player.rodType['catchModifier'] + player.reelType['catchModifier'] + player.hookType['catchModifier'] + player.luck);
    return newCatchChance;
}

const aquariumLastArray = property => { //Finds the most recent fish in the aquarium array for logging purposes
    return player.aquarium[(player.aquarium.length) - 1][property]
};

const addExperience = fish => { //Gets the base experience of the fish caught then adds extra for the rarity
    switch (fish.quality) {
        case 'Common':
            player.userExp += (fish.exp + 10);
            break;
        case 'Uncommon':
            player.userExp += (fish.exp + 25);
            break;
        case 'Rare':
            player.userExp += (fish.exp + 50);
            break;
        case 'Exceptional':
            player.userExp += (fish.exp + 150);
            break;
        case 'Legendary':
            player.userExp += (fish.exp + 300);
            break;
        case 'Mythical':
            player.userExp += (fish.exp + 600);
            break;
    };
};

const expBarUpdate = () => { //Updates the exp bar in the UI
    const expText = document.getElementById('exp').children;
    expText[0].innerHTML = player.userExp;
};

const updateLogEventBasic = text => {
    const newPara = document.createElement('p');  
    newPara.innerHTML = `[${new Date().toLocaleTimeString()}] ${text}`;
    document.getElementById('log').appendChild(newPara);
}

//*** MENU CODE ***\\
//******************\\

//Map Modal
const mapModal = document.getElementById('map-main-container');
const mapMenuBtn = document.getElementById('map-btn');
const mapCloseBtn = document.getElementById('map-close-btn');

mapMenuBtn.addEventListener('click', () => { mapModal.style.display = 'flex'; });
mapCloseBtn.addEventListener('click', () => { mapModal.style.display = 'none'; });

//Quest Modal
const questModal = document.getElementById('quest-main-container');
const questMenuBtn = document.getElementById('quest-btn');
const questCloseBtn = document.getElementById('quest-close-btn');

questMenuBtn.addEventListener('click', () => { questModal.style.display = 'flex'; }); //short hand one line for practise
questCloseBtn.addEventListener('click', () => { questModal.style.display = 'none'; });

//Catch Modal
const catchModal = document.getElementById('catch-main-container');
const catchCloseBtn = document.getElementById('catch-close-btn');
const releaseCatchBtn = document.getElementById('release-catch-btn');

catchCloseBtn.addEventListener('click', () => { catchModal.style.display = 'none'; });
releaseCatchBtn.addEventListener('click', releaseCatch);

//*** FISH GENERATION CODE 2.0 BELOW ***\\
//***********************************\\
const castButton = document.getElementById('cast-button');
castButton.addEventListener('click', castOut);

function castOut() {
    //to do consumables & stats
    if (catchOrMiss()) {
        fishRoll();
        catchLogging();
        showCatch();
    } else {
        missLogging();
    };
    console.log(player.aquarium);
};

function catchOrMiss() {
    const ranNum = fishImports.generateRanNum(1000, 0);
    console.log('For catch chance the ranNum is ' + ranNum + ' The catchChance modifier is ' + catchChance() + ' and player luck is currently ' + player.luck);
    if (ranNum + catchChance() <= 700) {
        return false;
    } else {
        return true;
    };
}

function fishRoll() {
    let newCatch = fishImports.locationFishLootRoll(player.currentLocation);
    newCatch.id = generateUniqueID();
    newCatch.setQuality();
    newCatch.setWeight();
    addExperience(newCatch); //adding experience
    player.luck = 0;
    return player.aquarium.push(newCatch);    
}

const showCatch = () => { //
    const catchQuality = document.getElementById('catch-modal-quality');
    const catchType = document.getElementById('catch-modal-type');
    const catchWeight = document.getElementById('catch-modal-weight');

    catchModal.style.display = 'flex'
    catchQuality.innerHTML = aquariumLastArray('quality');
    catchType.innerHTML = aquariumLastArray('type');
    catchWeight.innerHTML = aquariumLastArray('weight') + ' kg';
    document.getElementById("caught-fish-img").src = aquariumLastArray('img');
};

function catchLogging () {
    fillAquariumTable();
    expBarUpdate();
    successfulEventLog();
};

function missLogging() {
    const newPara = document.createElement('p');  
    newPara.innerHTML = `[${new Date().toLocaleTimeString()}] You cast you line out but unfortunately nothing bites. You reel your line back in disappointment`;
    document.getElementById('log').appendChild(newPara);
}

function releaseCatch() {
    updateLogEventBasic('You instead decide to release the catch, hoping for some extra luck on the next cast');
    document.getElementById('aquarium-table').deleteRow(-1);
    player.luck += 100; 
    player.aquarium.pop();
    catchModal.style.display = 'none';
}

//*** AQUARIUM, LOGGING, STATS & EXP CODE BELOW ***\\
//************************************\\

//Logging the event & stats
function successfulEventLog() {
    const newPara = document.createElement('p'); 
    const logContainer = document.getElementById('log');
    
    newPara.innerHTML = `[${new Date().toLocaleTimeString()}] You cast out your line and reel in a <span>${aquariumLastArray('quality')}</span> ${aquariumLastArray('type')} weighing ${aquariumLastArray('weight')}kg`;
    document.getElementById('log').appendChild(newPara);

    const spanArray = logContainer.querySelectorAll('span');
    
    function colourQuality() {
        switch (aquariumLastArray('quality')) { //Checks through the last caught fish to check for the quality, and then colour it in the log
            case 'Common':
                spanArray[(spanArray.length)-1].style.color = '#B9B9B9';
                break;
            case 'Uncommon':
                spanArray[(spanArray.length)-1].style.color = '#C5FF49';
                break;
            case 'Rare':
                spanArray[(spanArray.length)-1].style.color = '#60B2FF';
                break;
            case 'Exceptional':
                spanArray[(spanArray.length)-1].style.color = '#FF9C07';
                break;
            case 'Legendary':
                spanArray[(spanArray.length)-1].style.color = 'FFE600';
                break;
            case 'Mythical':
                spanArray[(spanArray.length)-1].style.color = '#8F00FF';
                break;
        };
    };
    colourQuality();
}

function fillAquariumTable() {
    //Creating the new rows and cells
    let tableRow = document.getElementById('aquarium-table');
    let newRow = tableRow.insertRow(-1);
    let fishNameCell = newRow.insertCell(0);
    let fishWeightCell = newRow.insertCell(1);
    let fishRarityCell = newRow.insertCell(2);
    //Adding the text
    function createTextNode(fishKey, whichCell) {
        let newText = document.createTextNode(fishKey);
        whichCell.appendChild(newText);
    };
    createTextNode(aquariumLastArray('type'), fishNameCell);
    createTextNode((aquariumLastArray('weight') + ' kg'), fishWeightCell);
    createTextNode(aquariumLastArray('quality'), fishRarityCell);
};


//TO DO


//work out where the code for updating player stats should go

//replace textnodes with 'p's

//Cast timer, expires after 1 minute with no release

//Code an achievment

//Code a quest

//Change weight & rarity code so that weight is generated after rarity, for heavier fish

//Rarity levels can only be reached with certain equipment. I.E max and min weights must be set lower than the number
//possibly new function for generating rarity which checks items equipped which have their own property setting the min / max

//Console testing

//Time based - Every 5 minutes can cast. Can choose whether to auto cast every 5 minutes, or let them stack for manual use
