/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combination, GameType } from './types';

import { rankHands } from '.';

type Input = [GameType, string, string, string, Combination, Combination, 0 | 1 | -1];

const inputs: Input[] = [
    ['texas', '9C 7D 8D AS QS', 'TC TS', 'AC AD', 'Pair', 'ThreeOfAKind', 1],
    ['texas', '5C 5D 8D AS QS', 'TC TS', '5S 5H', 'TwoPair', 'FourOfAKind', 1],
    ['texas', '5D 8D TD AS QS', 'TC TS', '2D 3D', 'ThreeOfAKind', 'Flush', 1],
    ['texas', 'KC QH JC TD 8D', 'AC 5H', 'AH 6C', 'Straight', 'Straight', 0],
    ['short_deck', 'AS 7D AD 6S 6D', '8D TD', 'AC 5H', 'Flush', 'FullHouse', -1],
    ['short_deck', 'AS 7D AD 6S 6D', 'AC 5H', '8D TD', 'FullHouse', 'Flush', 1],
    ['short_deck', 'KC QH JC TD 8D', 'AC 5H', 'AH 6C', 'Straight', 'Straight', 0],
    ['short_deck', 'KC QH JC TD 8D', 'AH 6C', 'AC 5H', 'Straight', 'Straight', 0],
    ['omaha', 'TC 6C 2S 3S AS', 'KD QS JS 8H', '9H 9D 4H 4D', 'Flush', 'Pair', -1],
    ['omaha', 'TC 6C 2S 3S AS', '9H 9D 4H 4D', 'KD QS JS 8H', 'Pair', 'Flush', 1],
    ['omaha', '4S 3H 6C 2D KD', 'KH QS 5H 2C', '7S 7C 4H 2S', 'Straight', 'TwoPair', -1],
    ['omaha', '4S 3H 6C 2D KD', '7S 7C 4H 2S', 'KH QS 5H 2C', 'TwoPair', 'Straight', 1],
];

test.each(inputs)(
    'should rankHands %s, %s, %s, %s',
    (gameType, board, player1, player2, player1Combo, player2Combo, winnerIndex) => {
        const cardBoard = board.split(' ').map((c) => c as any);
        const player1Pocket = player1.split(' ').map((c) => c as any);
        const player2Pocket = player2.split(' ').map((c) => c as any);

        const res1 = rankHands(gameType, cardBoard as any, [player1Pocket] as any);
        const res2 = rankHands(gameType, cardBoard as any, [player2Pocket] as any);

        const player1Rank = res1.find((r) => r.rank)?.rank ?? 0;
        const player2Rank = res2.find((r) => r.rank)?.rank ?? 0;

        const compare = (r1: number, r2: number) => {
            if (r1 === r2) {
                return 0;
            }
            if (r1 > r2) {
                return 1;
            } else {
                return -1;
            }
        };

        expect(res1.find((r) => r.combination)?.combination === player1Combo).toBe(true);
        expect(res2.find((r) => r.combination)?.combination === player2Combo).toBe(true);

        expect(compare(player1Rank, player2Rank)).toBe(winnerIndex);
    },
);
