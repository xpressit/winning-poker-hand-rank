import { cactusFastRankHand } from './cactusFastRankHand';
import { Card } from './card';

type RankerFunc = (hand: [Card,Card,Card,Card,Card]) => number;

export const STRAIGHT_FLUSH = 10;
export const FOUR_OF_A_KIND = 166;
export const FULL_HOUSE = 322;
export const FLUSH = 1599;
export const STRAIGHT = 1609;
export const THREE_OF_A_KIND = 2467;
export const TWO_PAIR = 3325;
export const PAIR = 6185;
export const NOTHING = 7462;
export const HIGH_CARD = NOTHING;
export const INVALID = 65535;

export const SIXPLUS_FLUSH = 166 + 1277;
export const SIXPLUS_FULL_HOUSE = SIXPLUS_FLUSH + 156;

const t7c5 = [
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 5, 4, 6],
    [0, 1, 2, 3, 6, 4, 5],
    [0, 1, 2, 4, 5, 3, 6],
    [0, 1, 2, 4, 6, 3, 5],
    [0, 1, 2, 5, 6, 3, 4],
    [0, 1, 3, 4, 5, 2, 6],
    [0, 1, 3, 4, 6, 2, 5],
    [0, 1, 3, 5, 6, 2, 4],
    [0, 1, 4, 5, 6, 2, 3],
    [0, 2, 3, 4, 5, 1, 6],
    [0, 2, 3, 4, 6, 1, 5],
    [0, 2, 3, 5, 6, 1, 4],
    [0, 2, 4, 5, 6, 1, 3],
    [0, 3, 4, 5, 6, 1, 2],
    [1, 2, 3, 4, 5, 0, 6],
    [1, 2, 3, 4, 6, 0, 5],
    [1, 2, 3, 5, 6, 0, 4],
    [1, 2, 4, 5, 6, 0, 3],
    [1, 3, 4, 5, 6, 0, 2],
    [2, 3, 4, 5, 6, 0, 1],
];

export type HandRank = {
    rank: number;
    madeHand: [Card, Card, Card, Card, Card]
}

const rank567cardHand = (hand: Card[], f: RankerFunc = cactusFastRankHand): HandRank => {
    if (hand.length === 5) {
        const rank = f([hand[0], hand[1], hand[2], hand[3], hand[4]]);

        return {
            rank,
            madeHand: [hand[0], hand[1], hand[2], hand[3], hand[4]],
        };
    }

    if (hand.length === 6) {
        const possibleHands: [Card, Card, Card, Card, Card][] = [
            [hand[0], hand[1], hand[2], hand[3], hand[4]],
            [hand[0], hand[1], hand[2], hand[3], hand[5]],
            [hand[0], hand[1], hand[2], hand[4], hand[5]],
            [hand[0], hand[1], hand[3], hand[4], hand[5]],
            [hand[0], hand[2], hand[3], hand[4], hand[5]],
            [hand[1], hand[2], hand[3], hand[4], hand[5]],
        ];

        const sortedHands = possibleHands
            .map((hand) => ({
                rank: f(hand),
                madeHand: hand,
            }))
            .sort((a, b) => a.rank - b.rank);

        return sortedHands[0];
    }

    if (hand.length === 7) {
        let r = 0;
        let rank = 9999;
        let bestHand: [Card, Card, Card, Card, Card] = [hand[0], hand[1], hand[2], hand[3], hand[4]];

        for (let i = 0; i < 21; i++) {
            const inputHand: [Card, Card, Card, Card, Card] = [
                hand[t7c5[i][0]],
                hand[t7c5[i][1]],
                hand[t7c5[i][2]],
                hand[t7c5[i][3]],
                hand[t7c5[i][4]],
            ];
            r = f(inputHand);
            if (r < rank) {
                rank = r;
                bestHand = inputHand;
            }
        }
        return {
            rank,
            madeHand: bestHand,
        };
    }

    throw new Error(`Hand ranker doesn't support ${hand.length} cards`);
};

export const rankTexasHand = (hand: Card[], f: RankerFunc = cactusFastRankHand): HandRank => {
    return rank567cardHand(hand, f)
};

export const convertToSixPlusHandRank = (handRank: number): number => {
    if (handRank === 747) {
        handRank = 6;
    } else if (handRank === 6610) {
        handRank = 1605;
    }

    // Swap full_house with flush
    const fixedRank = toFixedTexasRank(handRank);

    if (fixedRank === FULL_HOUSE) {
        handRank = handRank - FOUR_OF_A_KIND + 166 + 1277;
    } else if(fixedRank === FLUSH) {
        handRank = handRank - FULL_HOUSE + 166;
    }
    return handRank;
}

export const rankShortDeckHand = (hand: Card[]) => {
    const f = (hand: [Card,Card,Card,Card,Card]) => {
        const handRank = cactusFastRankHand(hand);
        return convertToSixPlusHandRank(handRank);
    };

    return rank567cardHand(hand, f);
};

export const toFixedTexasRank = (r: number) => {
    if (r <= STRAIGHT_FLUSH) {
        return STRAIGHT_FLUSH;
    }
    if (r <= FOUR_OF_A_KIND) {
        return FOUR_OF_A_KIND;
    }
    if (r <= FULL_HOUSE) {
        return FULL_HOUSE;
    }
    if (r <= FLUSH) {
        return FLUSH;
    }
    if (r <= STRAIGHT) {
        return STRAIGHT;
    }
    if (r <= THREE_OF_A_KIND) {
        return THREE_OF_A_KIND;
    }
    if (r <= TWO_PAIR) {
        return TWO_PAIR;
    }
    if (r <= PAIR) {
        return PAIR;
    }
    if (r != INVALID) {
        return NOTHING;
    }
    return INVALID;
};

export const toFixedSixPlusRank = (r: number) => {
    if (r <= STRAIGHT_FLUSH) {
        return STRAIGHT_FLUSH;
    }
    if (r <= FOUR_OF_A_KIND) {
        return FOUR_OF_A_KIND;
    }
    if (r <= SIXPLUS_FLUSH) {
        return SIXPLUS_FLUSH;
    }
    if (r <= SIXPLUS_FULL_HOUSE) {
        return SIXPLUS_FULL_HOUSE;
    }
    if (r <= STRAIGHT) {
        return STRAIGHT;
    }
    if (r <= THREE_OF_A_KIND) {
        return THREE_OF_A_KIND;
    }
    if (r <= TWO_PAIR) {
        return TWO_PAIR;
    }
    if (r <= PAIR) {
        return PAIR;
    }
    if (r != INVALID) {
        return NOTHING;
    }
    return INVALID;
};
