//Global Functions


//*** QUEST OBJECTS ***\\
//*********************\\

const quest001 = {
    qid: 1,
    available: true,
    title: 'Wishing Good Fishing',
    type: 'Main',
    complete: false,
    reward: '',
    description: '"Aye Lad, ye been tasked with catchin five Snapper weighin over 5kg, now be quick aboot it!"',
    requirements: {
        fish: [{
            type: 'Snapper',
            amount: 5,
            minWeight: 5,
            maxWeight: 12,
            caught: 0,
            toCatch: 5,
        }]
    }
};

const quest002 = {
    qid: 1,
    available: true,
    title: 'Fish Salas',
    type: 'Main',
    complete: false,
    reward: '',
    description: '"Aye Lad, the missus has asked for a few different types of fish for a salad. Fetch me one each of a Snapper, Whiting and Kingfish"',
    requirements: {
        fish: [{
            type: 'Snapper',
            amount: 1,
            minWeight: 5,
            maxWeight: 12,
            caught: 0,
            toCatch: 1,
        }, {
            type: 'Whiting',
            amount: 1,
            minWeight: 2,
            maxWeight: 6,
            caught: 0,
            toCatch: 1,
        }, {
            type: 'Kingfish',
            amount: 1,
            minWeight: 4,
            maxWeight: 15,
            caught: 0,
            toCatch: 1,
        }],
    }
};