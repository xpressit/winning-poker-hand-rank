import { PlayingCard } from "./types";

// primes are the first 13 prime numbers (one per card rank).
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

export type Card = number;

type Rank = number;
type Suit = number;

export const RANK_TWO = 0;
export const RANK_THREE = 1;
export const RANK_FOUR = 2;
export const RANK_FIVE = 3;
export const RANK_SIX = 4;
export const RANK_SEVEN = 5;
export const RANK_EIGHT = 6;
export const RANK_NINE = 7;
export const RANK_TEN = 8;
export const RANK_JACK = 9;
export const RANK_QUEEN = 10;
export const RANK_KING = 11;
export const RANK_ACE = 12;

const runeToRank: {[key: string]: Rank | undefined} = {
    '2': RANK_TWO ,
    '3': RANK_THREE,
    '4': RANK_FOUR ,
    '5': RANK_FIVE ,
    '6': RANK_SIX ,
    '7': RANK_SEVEN,
    '8': RANK_EIGHT,
    '9': RANK_NINE ,
    'T': RANK_TEN ,
    'J': RANK_JACK ,
    'Q': RANK_QUEEN,
    'K': RANK_KING ,
    'A': RANK_ACE,
}
const runeToSuit: {[key: string]: Suit | undefined} = {
    'S': 1 ,
    'H': 2,
    'D': 4 ,
    'C': 8 ,
}

const toRankAndSuit = (playingCard: PlayingCard) => {
    const rank = runeToRank[playingCard[0]];
    const suit = runeToSuit[playingCard[1]];
    if(!suit || rank === undefined) {
        throw new Error(`Invalid playing card: ${playingCard}`);
    }
    return [rank, suit];
}

export const toCard = (playingCard: PlayingCard): Card => {
    const [rank, suit] = toRankAndSuit(playingCard);
    return 1 << rank << 16 | suit << 12 | rank << 8 | PRIMES[rank];
}

const rankToRune: {[key: string]: string | undefined} = {
    '12': 'A',
    '11': 'K',
    '10': 'Q',
    '9': 'J',
    '8': 'T',
    '7': '9',
    '6': '8',
    '5': '7',
    '4': '6',
    '3': '5',
    '2': '4',
    '1': '3',
    '0': '2',
}

const suitToRune: {[key: string]: string | undefined} = {
    '8': 'C',
    '4': 'D',
    '2': 'H',
    '1': 'S',
}

const getCardRank = (card: Card) => {
    return card >> 8 & 0xf;
}

const getCardSuit = (card: Card) => {
    return card >> 12 & 0xf;
}

export const toPlayingCard = (card: Card): PlayingCard => {
    const rankRune = rankToRune['' + getCardRank(card)];
    const suitRune = suitToRune['' + getCardSuit(card)];
    if (!rankRune || !suitRune) {
        throw new Error(`Cannot convert Card ${card} to PlayingCard`);
    }
    return rankRune + suitRune as PlayingCard;
}

export const cardCompareDescFn = (c1: Card, c2: Card) => {
    const r1 = getCardRank(c1);
    const r2 = getCardRank(c2);
    if (r1 === r2) {
        const s1 = getCardSuit(c1);
        const s2 = getCardSuit(c2);
        return s2 - s1;

    }
    return r2 - r1;
}
