## Winning Poker Hand Rank

Winning Poker Hand Rank is a library for evaluating poker hand ranks written in Typescript. This is a rewrite from https://github.com/cardrank/cardrank and supports the following game types:
* Texas Holdem
* Omaha
* Ace to Six (Shortdeck)

## Installation

`npm install winning-poker-hand-rank`

## Usage

```
const gameType = 'texas';
const board = '5D 8D TD AS QS';
const player1Cards = 'TC TS';
const player2Cards = '2D 3D';

const result = rankHands(gameType, board, [player1Cards, player2Cards]);
```

Output:

```
[
    {
        rank: 1875,
        combination: 'ThreeOfAKind',
        madeHand: [ 'TC', 'TS', 'TD', 'AS', 'QS' ],
        unused: [ '5D', '8D' ]
    },
    {
        rank: 1531,
        combination: 'Flush',
        madeHand: [ '2D', '3D', '5D', '8D', 'TD' ],
        unused: [ 'AS', 'QS' ]
    }
]
```