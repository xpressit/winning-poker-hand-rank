import { TableCard, winningPokerHandRank } from '.';

it('should return High Card rank', () => {
    const communityCards: TableCard[] = ['CARD_5D', 'CARD_6D', 'CARD_4C', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_AD', 'CARD_3H'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('High Card');
});

it('should return Pair rank', () => {
    const communityCards: TableCard[] = ['CARD_5D', 'CARD_6D', 'CARD_4C', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_AD', 'CARD_6H'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Pair');
});

it('should return Two Pairs rank', () => {
    const communityCards: TableCard[] = ['CARD_5D', 'CARD_6D', 'CARD_4C', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_5H', 'CARD_6H'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Two Pairs');
});

it('should return Three Of A Kind rank', () => {
    const communityCards: TableCard[] = ['CARD_5D', 'CARD_6D', 'CARD_4C', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_5H', 'CARD_5C'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Three Of A Kind');
});

it('should return Straight rank', () => {
    const communityCards: TableCard[] = ['CARD_7D', 'CARD_8D', 'CARD_9C', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_5H', 'CARD_6C'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Straight');
});

it('should return Flush rank', () => {
    const communityCards: TableCard[] = ['CARD_AC', 'CARD_3C', 'CARD_4C', 'CARD_TC', 'CARD_JS'];
    const pocketCards: TableCard[][] = [
        ['CARD_3D', 'CARD_3H'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Flush');
});

it('should return Full House rank', () => {
    const communityCards: TableCard[] = ['CARD_7D', 'CARD_7C', 'CARD_7H', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_5H', 'CARD_5C'],
        ['CARD_KC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Full House');
});

it('should return Four Of A Kind rank', () => {
    const communityCards: TableCard[] = ['CARD_5D', 'CARD_5S', 'CARD_TH', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_5H', 'CARD_5C'],
        ['CARD_TC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Four Of A Kind');
});

it('should return Straight Flush rank', () => {
    const communityCards: TableCard[] = ['CARD_2H', 'CARD_3H', 'CARD_4H', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_5H', 'CARD_6H'],
        ['CARD_TC', 'CARD_JH'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Straight Flush');
});

it('should return Royal Flush rank', () => {
    const communityCards: TableCard[] = ['CARD_QH', 'CARD_KH', 'CARD_AH', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [
        ['CARD_TH', 'CARD_JH'],
        ['CARD_TC', 'CARD_JC'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Royal Flush');
});

it('should return Royal Flush rank with one player pocket cards', () => {
    const communityCards: TableCard[] = ['CARD_QH', 'CARD_KH', 'CARD_AH', 'CARD_TC', 'CARD_8S'];
    const pocketCards: TableCard[][] = [['CARD_TH', 'CARD_JH']];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('Royal Flush');
});

it('should return High Card if community cards contains only flop cards', () => {
    const communityCards: TableCard[] = ['CARD_4S', 'CARD_6D', 'CARD_8H'];
    const pocketCards: TableCard[][] = [['CARD_AS', 'CARD_JH']];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('High Card');
});

it('should return High Card if community cards contains only turn cards', () => {
    const communityCards: TableCard[] = ['CARD_4S', 'CARD_6D', 'CARD_8H', 'CARD_TC'];
    const pocketCards: TableCard[][] = [['CARD_AS', 'CARD_JH']];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe('High Card');
});

it('should return undefined if there are no community cards', () => {
    const communityCards: TableCard[] = [];
    const pocketCards: TableCard[][] = [['CARD_AS', 'CARD_JH']];

    expect(winningPokerHandRank(communityCards, pocketCards)).toBe(undefined);
});

it('should return Full House in Omaha poker type', () => {
    const communityCards: TableCard[] = ['CARD_QS', 'CARD_KC', 'CARD_9C', 'CARD_8S', 'CARD_9D'];
    const pocketCards: TableCard[][] = [
        ['CARD_4S', 'CARD_6D', 'CARD_8H', 'CARD_TC'],
        ['CARD_QC', 'CARD_QD', 'CARD_9H', 'CARD_5C'],
    ];

    expect(winningPokerHandRank(communityCards, pocketCards, 'omaha')).toBe('Full House');
});
