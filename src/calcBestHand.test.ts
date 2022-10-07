import { toCard } from './card';
import { FLUSH, PAIR, SIXPLUS_FLUSH, SIXPLUS_FULL_HOUSE, STRAIGHT, STRAIGHT_FLUSH, toFixedSixPlusRank, toFixedTexasRank, TWO_PAIR } from './cardRank';
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
    ['omaha', 'TD 2C JD 4C 5C', 'AS AH QH 3S', 'AD AC 7D 4D', STRAIGHT, PAIR, -1],
    ['omaha', 'TD 2C JD 4C 5C', 'AD AC 7D 4D', 'AS AH QH 3S', PAIR, STRAIGHT, +1],
    ['omaha', 'KC QH JC 8D 4S', 'AC TD 3H 6C', 'AH TC 2C 3C', STRAIGHT, STRAIGHT, 0],
    ['omaha', 'KC QH JC 8D 4S', 'AH TC 2C 3C', 'AC TD 3H 6C', STRAIGHT, STRAIGHT, 0],
    ['omaha', '2D 3H 8S 8H 2S', 'KD TS TD 4H', 'JD 7D 7C 4C', TWO_PAIR, TWO_PAIR, -1],
    ['omaha', '2D 3H 8S 8H 2S', 'JD 7D 7C 4C', 'KD TS TD 4H', TWO_PAIR, TWO_PAIR, +1],
    ['omaha', 'TC 6C 2S 3S AS', 'KD QS JS 8H', '9H 9D 4H 4D', FLUSH, PAIR, -1],
    ['omaha', 'TC 6C 2S 3S AS', '9H 9D 4H 4D', 'KD QS JS 8H', PAIR, FLUSH, +1],
    ['omaha', '4S 3H 6C 2D KD', 'KH QS 5H 2C', '7S 7C 4H 2S', STRAIGHT, TWO_PAIR, -1],
    ['omaha', '4S 3H 6C 2D KD', '7S 7C 4H 2S', 'KH QS 5H 2C', TWO_PAIR, STRAIGHT, +1],
])(
    'should calc correct hand strength %s, %s, %s, %s',
    (gameType, board, player1, player2, player1HandRank, player2HandRank, exp) => {
        const cardBoard = board.split(' ').map((c) => toCard(c as any));
        const player1Pocket = player1.split(' ').map((c) => toCard(c as any));
        const res1 = calcBestHand(gameType as any, player1Pocket, cardBoard);

        const player2Pocket = player2.split(' ').map((c) => toCard(c as any));
        const res2 = calcBestHand(gameType as any, player2Pocket, cardBoard);

        const toFixedRank = gameType === 'short_deck' ? toFixedSixPlusRank : toFixedTexasRank;

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
