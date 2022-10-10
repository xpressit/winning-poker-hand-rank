import { cardCompareDescFn, toCard, toPlayingCard } from './card';
import { PlayingCard } from './types';

test.each([
    ['AH' as PlayingCard, 0x10002c29],
    ['KS' as PlayingCard, 0x08001b25],
    ['2H' as PlayingCard, 0x00012002],
])('should format PlayingCard to Card %i', (playingCard, card) => {
    expect(toCard(playingCard)).toBe(card);
});

it('should sort cards correctly', () => {
    const cards = ['2S', '2H', 'AH', 'KH'] as PlayingCard[];

    expect(cards.map(toCard).sort(cardCompareDescFn).map(toPlayingCard)).toEqual(['AH', 'KH', '2H', '2S'] as PlayingCard[]);
});
