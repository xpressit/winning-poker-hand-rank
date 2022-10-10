import {
    FLUSH,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    HIGH_CARD,
    PAIR,
    SIXPLUS_FLUSH,
    SIXPLUS_FULL_HOUSE,
    STRAIGHT,
    STRAIGHT_FLUSH,
    THREE_OF_A_KIND,
    TWO_PAIR,
    toFixedSixPlusRank,
    toFixedTexasRank,
} from './cardRank';
import { Combination, GameType } from './types';

export const toCombination = (gameType: GameType, rank: number): Combination => {
    if (gameType === 'short_deck') {
        const fixedRank = toFixedSixPlusRank(rank);
        if (fixedRank === STRAIGHT_FLUSH) {
            return 'StraightFlush';
        }
        if (fixedRank === FOUR_OF_A_KIND) {
            return 'FourOfAKind';
        }
        if (fixedRank === SIXPLUS_FLUSH) {
            return 'Flush';
        }
        if (fixedRank === SIXPLUS_FULL_HOUSE) {
            return 'FullHouse';
        }
        if (fixedRank === STRAIGHT) {
            return 'Straight';
        }
        if (fixedRank === THREE_OF_A_KIND) {
            return 'ThreeOfAKind';
        }
        if (fixedRank === TWO_PAIR) {
            return 'TwoPair';
        }
        if (fixedRank === PAIR) {
            return 'Pair';
        }
        if (fixedRank === HIGH_CARD) {
            return 'HighCard';
        }
        return 'Invalid';
    }

    const fixedRank = toFixedTexasRank(rank);

    if (fixedRank === STRAIGHT_FLUSH) {
        return 'StraightFlush';
    }
    if (fixedRank === FOUR_OF_A_KIND) {
        return 'FourOfAKind';
    }
    if (fixedRank === FULL_HOUSE) {
        return 'FullHouse';
    }
    if (fixedRank === FLUSH) {
        return 'Flush';
    }
    if (fixedRank === STRAIGHT) {
        return 'Straight';
    }
    if (fixedRank === THREE_OF_A_KIND) {
        return 'ThreeOfAKind';
    }
    if (fixedRank === TWO_PAIR) {
        return 'TwoPair';
    }
    if (fixedRank === PAIR) {
        return 'Pair';
    }
    if (fixedRank === HIGH_CARD) {
        return 'HighCard';
    }
    return 'Invalid';
};
