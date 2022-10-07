import { toCard } from './card';
import { PAIR, SIXPLUS_FLUSH, SIXPLUS_FULL_HOUSE, STRAIGHT, STRAIGHT_FLUSH, toFixedSixPlusRank, toFixedTexasRank } from './cardRank';
import { calcBestHand } from './calcBestHand';

test.each([
    ['short_deck', 'AS 7D AD 6S 6D', '8D TD', 'AC 5H', SIXPLUS_FLUSH, SIXPLUS_FULL_HOUSE, -1],
    ['short_deck', 'AS 7D AD 6S 6D', 'AC 5H', '8D TD', SIXPLUS_FULL_HOUSE, SIXPLUS_FLUSH, +1],
    ['short_deck', 'KC QH JC TD 8D', 'AC 5H', 'AH 6C', STRAIGHT, STRAIGHT, 0],
    ['short_deck', 'KC QH JC TD 8D', 'AH 6C', 'AC 5H', STRAIGHT, STRAIGHT, 0],
    ['short_deck', '9C 7D 8D AS QS', 'AC 6S', 'TC TS', STRAIGHT, PAIR, -1],
    ['short_deck', '9C 7D 8D AS QS', 'TC TS', 'AC 6S', PAIR, STRAIGHT, +1],
    ['short_deck', '9S 7S 8S AC QS', 'AS 6S', 'TC TS', STRAIGHT_FLUSH, SIXPLUS_FLUSH, -1],
    ['short_deck', '9S 7S 8S AC QS', 'TC TS', 'AS 6S', SIXPLUS_FLUSH, STRAIGHT_FLUSH, +1],
])(
    'should calc correct hand strength %s, %s, %s, %s',
    (gameType, board, player1, player2, player1HandRank, player2HandRank, exp) => {
        const cardBoard = board.split(' ').map((c) => toCard(c as any));
        const player1Pocket = player1.split(' ').map((c) => toCard(c as any));
        const res1 = calcBestHand(gameType as any, player1Pocket, cardBoard);

        const player2Pocket = player2.split(' ').map((c) => toCard(c as any));
        const res2 = calcBestHand(gameType as any, player2Pocket, cardBoard);

        const toFixedRank = (gameType === 'short_deck') ? toFixedSixPlusRank : toFixedTexasRank;

        expect(toFixedRank(res1.rank)).toBe(player1HandRank);
        expect(toFixedRank(res2.rank)).toBe(player2HandRank);

        
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

        expect(compare(res1.rank, res2.rank)).toBe(exp);
    },
);
