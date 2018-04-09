var scenes = {
    root: 'ship_outside',
    items: {
        key: {
            name: 'Key',
            image: 'key.png',
        },
        axe: {
            name: 'Axe',
            image: 'axe.png'
        },
        crowbar: {
            name: 'Crowbar',
            image: 'crowbar.png'
        },
        map: {
            name: 'Map',
            image: 'map.png'
        },
        scuba_body: {
            name: 'Scuba Suit Body',
            image: 'scuba_body.png'
        },
        scuba_head: {
            name: 'Scuba Suit Helmet',
            image: 'scuba_head.png'
        },
        scuba_left_arm: {
            name: 'Scuba Suit Left Arm',
            image: 'scuba_left_arm.png'
        },
        scuba_right_arm: {
            name: 'Scuba Suit Right Arm',
            image: 'scuba_right_arm.png'
        },
        scuba_left_leg: {
            name: 'Scuba Suit Left Leg',
            image: 'scuba_left_leg.png'
        },
        scuba_right_leg: {
            name: 'Scuba Suit Right Leg',
            image: 'scuba_right_leg.png'
        },
        scuba_suit: {
            name: 'Scuba Suit',
            image: 'scuba_suit.png'
        },
        shovel: {
            name: 'Shovel',
            image: 'shovel.png'
        },
        trapdoor_locked: {
            name: 'Trapdoor Locked',
            image: 'trapdoor_locked.png'
        }
    },
    events: [
        {
            triggers: ['item collected'],
            conditions: [{
                type: 'inventory contains',
                items: ['scuba_head', 'scuba_body', 'scuba_left_leg', 'scuba_right_leg', 'scuba_left_arm', 'scuba_right_arm']
            }],
            actions: [{
                type: 'take items',
                items: ['scuba_head', 'scuba_body', 'scuba_left_leg', 'scuba_right_leg', 'scuba_left_arm', 'scuba_right_arm']
            }, {
                type: 'give items',
                items: ['scuba_suit']
            }]
        }
    ],
    scenes: {
        end: {
            name: 'The End',
            desc: 'Congratulations, you won!'
        },
        castle_outside: {
            name: 'The Sandcastle',
            desc: 'A large sandcastle with heavy iron doors stands on the beach.',
            back: 'castle_outside.jpg',
            items: [
                {
                    x: 304,
                    y: 296,
                    r: 30,
                    message: 'It\'s locked from the inside. Better find another way in!'
                },
                {
                    x: 105,
                    y: 105,
                    r: 64,
                    draw: true,
                    item: 'scuba_right_arm'
                }
            ],
            doors: [
                {
                    x: 622,
                    y: 312,
                    r: 50,
                    orientation: 'east',
                    scene: 'dock'
                },
                {
                    x: 501,
                    y: 429,
                    r: 50,
                    orientation: 'south',
                    scene: 'tunnel',
                    requires: 'shovel',
                    message: 'You need something to dig with...'
                },
                {
                    x: 23,
                    y: 334,
                    r: 50,
                    orientation: 'west',
                    scene: 'tunnel_outside'
                }

            ]
        },
        dock: {
            name: 'The Dock',
            desc: 'Giant birds circle the sky, the waves crash along the beach.',
            back: 'dock.jpg',
            items: [
                {
                    x: 314,
                    y: 282,
                    r: 64,
                    item: 'scuba_left_leg',
                    draw: true
                }
            ],
            doors: [
                {
                    x: 18,
                    y: 319,
                    r: 100,
                    orientation: 'west',
                    scene: 'castle_outside'
                },
                {
                    x: 602,
                    y: 281,
                    r: 50,
                    requires: 'scuba_suit',
                    orientation: 'east',
                    message: 'You need a scuba suit to go diving.',
                    scene: 'end'
                }
            ]
        },
        tunnel: {
            name: 'The Tunnel',
            desc: 'A giant spider looms, looking to eat you.',
            back: 'tunnel.jpg',
            items: [
                {
                    x: 367,
                    y: 388,
                    item: 'key',
                    draw: true,
                    r: 64
                }
            ],
            doors: [
                {
                    x: 333,
                    y: 42,
                    orientation: 'north',
                    r: 50,
                    scene: 'tunnel_stairs'
                }
            ]
        },
        tunnel_outside: {
            name: 'The Beach',
            desc: 'The sun bears down upon the beach, heating the sand.',
            back: 'tunnel_outside.jpg',
            items: [
                {
                    x: 174,
                    y: 174,
                    r: 64,
                    item: 'crowbar',
                    draw: true
                }
            ],
            doors: [
                {
                    x: 621,
                    y: 230,
                    r: 50,
                    orientation: 'east',
                    scene: 'castle_outside'
                },
                {
                    x: 482,
                    y: 415,
                    r: 50,
                    orientation: 'south-east',
                    scene: 'tunnel_stairs',
                    requires: 'key',
                    message: 'This tunnel is locked from the inside!'
                },
                {
                    x: 26,
                    y: 258,
                    r: 50,
                    orientation: 'west',
                    scene: 'ship_outside'
                }
            ]
        },
        tunnel_stairs: {
            name: 'The Stairs',
            desc: 'A shiny suit of armour stands in the corner.',
            back: 'tunnel_stairs.jpg',
            items: [
                {
                    x: 306,
                    y: 338,
                    r: 30,
                    item: 'scuba_head',
                    requires: 'crowbar',
                    message: 'You need a crowbar to open this box!'
                }
            ],
            doors: [
                {
                    x: 117,
                    y: 54,
                    r: 50,
                    orientation: 'north-west',
                    scene: 'tunnel_outside',
                    requires: 'key',
                    message: 'The door is locked shut!'
                },
                {
                    x: 495,
                    y: 431,
                    r: 50,
                    orientation: 'south-east',
                    scene: 'tunnel'
                }
            ]
        },
        ship_outside: {
            name: 'The Pirate Ship',
            desc: 'Wow, an old pirate ship! I wonder if there\'s any treasure!',
            back: 'ship_outside.jpg',
            doors: [
                {
                    x: 614,
                    y: 301,
                    r: 50,
                    orientation: 'east',
                    scene: 'tunnel_outside'
                },
                {
                    x: 265,
                    y: 345,
                    r: 30,
                    orientation: 'north-west',
                    scene: 'ship_lower_deck'
                }
            ]
        },
        ship_lower_deck: {
            name: 'The Lower Deck',
            desc: 'This pirate ship is very old. There\'s an old crate over there!',
            back: 'ship_lower_deck.jpg',
            items: [
                {
                    x: 275,
                    y: 335,
                    r: 64,
                    item: 'scuba_body',
                    requires: 'crowbar',
                    message: 'You need something to open this box!'
                }
            ],
            doors: [
                {
                    x: 575,
                    y: 311,
                    r: 50,
                    orientation: 'east',
                    scene: 'ship_outside'
                },
                {
                    x: 406,
                    y: 164,
                    r: 50,
                    orientation: 'north',
                    scene: 'ship_deck'
                }
            ]
        },
        ship_deck: {
            name: 'The Deck',
            desc: 'There don\'t appear to be any pirates on board.',
            back: 'ship_deck.jpg',
            items: [
                {
                    x: 464,
                    y: 340,
                    item: 'scuba_left_arm',
                    draw: true,
                    r: 64
                }
            ],
            doors: [
                {
                    x: 289,
                    y: 410,
                    r: 50,
                    orientation: 'south',
                    scene: 'ship_lower_deck'
                },
                {
                    x: 601,
                    y: 361,
                    r: 50,
                    orientation: 'east',
                    scene: 'ship_outside'
                },
                {
                    x: 21,
                    y: 237,
                    r: 30,
                    orientation: 'west',
                    scene: 'ship_captain'
                }
            ]
        },
        ship_captain: {
            name: 'The Captain\'s Quarters',
            desc: 'There are some old books lying around...',
            back: 'ship_captain.jpg',
            items: [
                {
                    x: 450,
                    y: 410,
                    r: 64,
                    item: 'shovel',
                    draw: true
                },
                {
                    x: 203,
                    y: 208,
                    r: 64,
                    item: 'map',
                    draw: true
                }
            ],
            doors: [
                {
                    x: 629,
                    y: 243,
                    r: 30,
                    orientation: 'east',
                    scene: 'ship_deck'
                },
                {
                    x: 117,
                    y: 75,
                    r: 30,
                    orientation: 'north',
                    scene: 'ship_upper_deck'
                }
            ]
        },
        ship_upper_deck: {
            name: 'The Upper Deck',
            desc: 'There\'s a steering wheel!',
            back: 'ship_upper_deck.jpg',
            items: [
                {
                    x: 291,
                    y: 275,
                    r: 64,
                    item: 'scuba_right_leg',
                    draw: true
                }
            ],
            doors: [
                {
                    x: 118,
                    y: 416,
                    r: 30,
                    orientation: 'south',
                    scene: 'ship_captain'
                }
            ]
        }
    }
};