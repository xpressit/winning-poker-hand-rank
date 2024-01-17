import { Card, toCard } from './card';
import { convertToSixPlusHandRank, getAceRank, rankEightOrBetter } from './cardRank';
import { PlayingCard } from './types';

test.each([
    [167, 1444],
    [322, 1599],
    [323, 167],
    [1599, 1443],
])('should compute texas rank to six plus rank %i', (texasRank, sixPlusRank) => {
    expect(convertToSixPlusHandRank(texasRank)).toBe(sixPlusRank);
});

test.each([
    ['AS', 0],
    ['2S', 1],
    ['3S', 2],
    ['3H', 2],
])('set card %s to correct ace rank %i', (playingCard, rank) => {
    const card = toCard(playingCard as PlayingCard);

    expect(getAceRank(card)).toBe(rank);
});

test.each([
    ['4S 3S 2C 4C 5C', 32798],
    ['AS 2C 3S 4C 5C', 31],

    ['AS 2C 3S 4C 6C', 47],
    ['AS 2C 3S 5C 6C', 55],
    ['AS 2C 4S 5C 6C', 59],
])('rankEightOrBetter %s should low rank to %i', (madeHandCards, rank) => {
    const cards = madeHandCards.split(' ').map((c) => toCard(c as PlayingCard));

    expect(rankEightOrBetter(cards as [Card, Card, Card, Card, Card])).toBe(rank);
});
