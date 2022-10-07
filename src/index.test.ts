import { rankHands } from '.';
import { Combination, GameType } from './types';

type Input = [GameType, string, string, string, Combination, Combination, 0|1];

const inputs: Input[] = [
    ['texas', 'AS 7D AD 6S 6D', '8D TD', 'AC 5H', 'Pair', 'Pair', 1],
];

test.each(inputs)(
    'should rankHands %s, %s, %s, %s',
    (gameType, board, player1, player2, player1Combo, player2Combo, winnerIndex) => {
    },
);
