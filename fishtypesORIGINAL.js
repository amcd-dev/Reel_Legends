//Global Functions

export const generateRanNum = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRanWeightNum = (max, min) => {
    return (Math.random() * (max - min + 1) + min).toFixed(2);
}

export const locationFishLootRoll = (locationObj) => {
    let totalWeight = 0;
    let runningTotal = 0;
    for (let i = 0; i < locationObj.fishPool.length; i++) { //Calculates total weight of the array
        totalWeight += locationObj.fishPool[i].rarityWeight;        
    };
    console.log('The Total weight of the loot array is ' + totalWeight);

    let ranNum = Math.floor(Math.random() * (totalWeight - 0 + 1)) + 0 //Rolls a random number within the total weight

    console.log('The random number rolled is ' + ranNum)
    for (let j = 0; j < locationObj.fishPool.length; j++) { 
        runningTotal += locationObj.fishPool[j].rarityWeight;
        if (ranNum < runningTotal) {
            console.log('The fish selected is ' + locationObj.fishPool[j].type);
            return locationObj.fishPool[j].type;
        };
    };
}

const qualityTierRoll = (tierArray) => {
    let totalWeight = 0;
    let runningTotal = 0;
    for (let i = 0; i < tierArray.length; i++) { //Calculates total weight of the array
        totalWeight += tierArray[i].rarityWeight;        
    };
    console.log('The Total weight of the loot array is ' + totalWeight);

    let ranNum = Math.floor(Math.random() * (totalWeight - 0 + 1)) + 0 //Rolls a random number within the total weight

    console.log('The random number rolled is ' + ranNum)
    for (let j = 0; j < tierArray.length; j++) { 
        runningTotal += tierArray[j].rarityWeight;
        if (ranNum < runningTotal) {
            console.log('The quality selected is ' + tierArray[j].quality);
            return tierArray[j].quality;
        };
    };
}

//*** RARITY ROLL OBJECTS ***\\
//*************************\\
const tierOneQuality = [
    {
        quality: 'Rare',
        rarityWeight: 150
    },
    {
        quality: 'Uncommon',
        rarityWeight: 350
    },
    {
        quality: 'Common',
        rarityWeight: 500
    },
];

const tierTwoQuality = [
    {
        quality: 'Exceptional',
        rarityWeight: 100
    },
    {
        quality: 'Rare',
        rarityWeight: 300
    },
    {
        quality: 'Uncommon',
        rarityWeight: 600
    },
];

const tierThreeQuality = [
    {
        quality: 'Legendary',
        rarityWeight: 50
    },
    {
        quality: 'Exceptional',
        rarityWeight: 250
    },
    {
        quality: 'Rare',
        rarityWeight: 700
    },
];

const tierFourQuality = [
    {
        quality: 'Mythical',
        rarityWeight: 35
    },
    {
        quality: 'Legendary',
        rarityWeight: 165
    },
    {
        quality: 'Exceptional',
        rarityWeight: 800
    },
];

const tierFiveQuality = [
    {
        quality: 'Mythical',
        rarityWeight: 30
    },
    {
        quality: 'Legendary',
        rarityWeight: 970
    },
];

//*** LOCATION OBJECTS ***\\
//*************************\\

export const startIslandShore = {
    locationName: 'Starting Island Shore',
    levelReq: 0,
    fishPool: [
        {
            type: 'Kingfish',
            rarityWeight: 5
        },
        {
            type: 'Snapper',
            rarityWeight: 15
        },
        {
            type: 'Whiting',
            rarityWeight: 30
        },
        {
            type: 'Toadfish',
            rarityWeight: 50
        }
    ]
};




//*** FISH OBJECTS ***\\ ORIGINAL
//*********************\\

export class Toadfish {
    constructor(id) {
        this.id = id;
        this.type = 'Toadfish';
        this.tier = 1,
        this.quality = '';
        this.weight = 0;
        this.exp = 25;
        this.briefDescription = 'placeholder'
        this.funFact = 'placeholder'
    }
    setQuality() {
        this.quality = qualityTierRoll(tierOneQuality);
    }
    setWeight() {
        return this.weight = generateRanWeightNum(1.50, 0.50);
    }
};

export class Whiting {
    constructor(id) {
        this.id = id;
        this.type = 'Whiting';
        this.tier = 2,
        this.quality = '';
        this.weight = 0;
        this.exp = 75;
        this.briefDescription = 'placeholder'
        this.funFact = 'placeholder'
    }
    setQuality() {
        this.quality = qualityTierRoll(tierTwoQuality);
    }

    setWeight() {
        return this.weight = generateRanWeightNum(6, 1.50);
    }
};

export class Snapper {
    constructor(id) {
        this.id = id;
        this.type = 'Snapper';
        this.tier = 2,
        this.quality = '';
        this.weight = 0;
        this.exp = 100;
        this._briefDescription = 'placeholder'
        this._funFact = 'placeholder'
    }
    setQuality() {
        this.quality = qualityTierRoll(tierTwoQuality);
    }

    setWeight() {
        return this.weight = generateRanWeightNum(12, 2);
    }
};

export class Kingfish {
    constructor(id) {
        this.id = id;
        this.type = 'Kingfish';
        this.tier = 3,
        this.quality = '';
        this.weight = 0;
        this.exp = 250;
        this.scientificName = 'placeholder'
        this.briefDescription = 'placeholder'
        this.funFact = 'placeholder'
    }
    setQuality() {
        this.quality = qualityTierRoll(tierThreeQuality);
    }

    setWeight() {
        return this.weight = generateRanWeightNum(15, 4);
    }
};

//*** CORE ITEM OBJECTS ***\\
//*********************\\

//Tier One items
export const rodTierOne = {
    name: 'Driftwood Rod',
    catchModifier: 100,
    briefDescription: '',
    url: '',
}

export const reelTierOne = {
    name: 'Cotton Reel',
    catchModifier: 100,
    briefDescription: '',
    url: '',
}

export const hookTierOne = {
    name: 'Rusty Tin Hook',
    catchModifier: 100,
    briefDescription: '',
    url: '',
}