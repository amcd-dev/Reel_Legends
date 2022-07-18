import * as fishImports from "./fishtypes.js";
import * as questImports from "./questScript.js";


//Global Variables
let latestCaughtFish = {};
let latestPlayerState = {};
let latestAquariumState = [];

//Global Functions
const aquariumLastArray = property => { //Finds the most recent fish in the aquarium array for logging purposes
    return player.aquarium[(player.aquarium.length) - 1][property]
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

//APIs
const getFish = async () => {
    console.log('Fetching Fish...')
    await fetch('http://127.0.0.1:3001/getFish')
        .then(response => response.json())
        .then(data => latestCaughtFish = data);
};

const getPlayerState = async () => {
    console.log('Fetching Player State')
    await fetch('http://127.0.0.1:3001/getPlayerState')
        .then(response => response.json())
        .then(data => latestPlayerState = data);
}

const getPlayerAquarium = async () => {
    console.log('Fetching Player State')
    await fetch('http://127.0.0.1:3001/getAquariumState')
        .then(response => response.json())
        .then(data => latestAquariumState = data);
}
//*** ON PAGE LOAD CODE ***\\
//**************************\\
//TODO combine into one function and take off await?
await getPlayerState()
console.log('logging player state on page load', latestPlayerState)
await getPlayerAquarium()
console.log('logging aquarium state on page load', latestAquariumState)

//*** MENU CODE ***\\
//******************\\

//Collapsible Menu
const collapsibleMenu = document.getElementsByClassName('collapsible-menu-header');

for (let i = 0; i < collapsibleMenu.length; i++) {
    collapsibleMenu[i].addEventListener('click', function () {
        let options = this.nextElementSibling;
        if (options.style.display === 'flex') {
            options.style.display = 'none';
        } else {
            options.style.display = 'flex';
        }
    });
}

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

questMenuBtn.addEventListener('click', () => { questModal.style.display = 'flex'; }); //shorthand one line for practise
questCloseBtn.addEventListener('click', () => { questModal.style.display = 'none'; });

//Catch Modal
const catchModal = document.getElementById('catch-main-container');
const catchCloseBtn = document.getElementById('catch-close-btn');
const releaseCatchBtn = document.getElementById('release-catch-btn');

catchCloseBtn.addEventListener('click', () => { catchModal.style.display = 'none'; });
releaseCatchBtn.addEventListener('click', releaseCatch);

//*** FISH GENERATION CODE ***\\
//*****************************\\
const castButton = document.getElementById('cast-button');
castButton.addEventListener('click', castOut);

async function castOut() {
    console.log('starting cast fetch & checking last caught fish: ', latestCaughtFish)
    await getFish()
    console.log('finished cast fetch & checking last caught fish', latestCaughtFish)

    //TODO up to this point <----

    // if (catchOrMiss()) {
    //
    //     fishRoll();
    //     catchLogging();
    //     showCatch();
    // } else {
    //     missLogging();
    // }
    // console.log(player.aquarium);
}

function fishRoll() {
    let newCatch = fishImports.locationFishLootRoll(player.currentLocation);

    newCatch.setWeight(); //TODO up to this point <----
    player.luck = 0;
    return player.aquarium.push(newCatch);
}

const showCatch = () => {
    const catchQuality = document.getElementById('catch-modal-quality');
    const catchType = document.getElementById('catch-modal-type');
    const catchWeight = document.getElementById('catch-modal-weight');
    const catchImage = document.getElementById("caught-fish-img");

    catchModal.style.display = 'flex'
    catchQuality.innerHTML = aquariumLastArray('quality');
    catchType.innerHTML = aquariumLastArray('type');
    catchWeight.innerHTML = aquariumLastArray('weight') + ' kg';
    catchImage.src = aquariumLastArray('img');
};

function catchLogging() {
    player.lifeTimeStats.fishCaught++;
    document.getElementById('fish-caught-data').innerHTML = player.lifeTimeStats.fishCaught;

    achievementChecks();
    fillAquariumTable();
    expBarUpdate();
    successfulEventLog();
}

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
    player.lifeTimeStats.fishReleased++;
    player.lifeTimeStats.fishCaught--;
    document.getElementById('fish-release-data').innerHTML = player.lifeTimeStats.fishReleased;
    document.getElementById('fish-caught-data').innerHTML = player.lifeTimeStats.fishCaught;

    catchModal.style.display = 'none';
}

//*** ACHIEVEMENT CHECKING CODE ***\\
//**********************************\\

function achievementChecks() {
    for (let i = 0; i < questImports.incompleteAchievements.length; i++) {
        console.log(questImports.incompleteAchievements[i]);
        console.log(player.completedAchievements);
        //check if the current caught fish matches any achievements
        if (questImports.incompleteAchievements[i].complete === false && questImports.incompleteAchievements[i].fishType === aquariumLastArray('type')) {
            //check if the achievement is still in progress, if it is increment..
            if (questImports.incompleteAchievements[i].target !== questImports.incompleteAchievements[i].satisfied) {
                questImports.incompleteAchievements[i].satisfied++
                questImports.incompleteAchievements[i].unsatisfied--
                //after increment check if the achievement is now completed
                if (questImports.incompleteAchievements[i].target === questImports.incompleteAchievements[i].satisfied) {
                    questImports.incompleteAchievements[i].complete = true;
                    player.completedAchievements.push(questImports.incompleteAchievements[i]);
                    //should I also remove this from the achievements array?
                }
            }
        }
    }
}

//*** AQUARIUM, LOGGING, STATS & EXP CODE ***\\
//********************************************\\

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
                spanArray[(spanArray.length) - 1].style.color = '#B9B9B9';
                break;
            case 'Uncommon':
                spanArray[(spanArray.length) - 1].style.color = '#C5FF49';
                break;
            case 'Rare':
                spanArray[(spanArray.length) - 1].style.color = '#60B2FF';
                break;
            case 'Exceptional':
                spanArray[(spanArray.length) - 1].style.color = '#FF9C07';
                break;
            case 'Legendary':
                spanArray[(spanArray.length) - 1].style.color = 'FFE600';
                break;
            case 'Mythical':
                spanArray[(spanArray.length) - 1].style.color = '#8F00FF';
                break;
        }
    }
    colourQuality();
}

function fillAquariumTable() {
    //Creating the new rows and cells
    let tableRow = document.getElementById('aquarium-table');
    let newRow = tableRow.insertRow(-1);
    let fishNameCell = newRow.insertCell(0);
    let fishWeightCell = newRow.insertCell(1);
    let fishRarityCell = newRow.insertCell(2);
    //testing mini image variables
    let fishMiniImgCell = newRow.insertCell(3);
    let fishMiniImg = document.createElement('img');
    //Adding the text
    function createTextNode(fishKey, whichCell) {
        let newText = document.createTextNode(fishKey);
        whichCell.appendChild(newText);
    };
    createTextNode(aquariumLastArray('type'), fishNameCell);
    createTextNode((aquariumLastArray('weight') + ' kg'), fishWeightCell);
    createTextNode(aquariumLastArray('quality'), fishRarityCell);
    //testing mini image function
    function setMiniImage() {
        fishMiniImgCell.appendChild(fishMiniImg);
        fishMiniImg.src = aquariumLastArray('img');
    }
    setMiniImage();
}


//TODO
//TODO Clean up the aquarium table code
//TODO replace textnodes with 'p's
//TODO Cast timer, expires after 1 minute with no release
//TODO Code an achievement
//TODO Code a quest
//TODO Change weight & rarity code so that weight is generated after rarity, for heavier fish
//TODO Rarity levels can only be reached with certain equipment. I.E max and min weights must be set lower than the number
//TODO possibly new function for generating rarity which checks items equipped which have their own property setting the min / max
//TODO Console testing
//TODO Time based - Every 5 minutes can cast. Can choose whether to auto cast every 5 minutes, or let them stack for manual use
