import { calcBestHand } from './calcBestHand';
import { toCard, toPlayingCard } from './card';
import { toCombination } from './toCombination';
import { Combination, GameType, PlayingCard } from './types';

type HandRank = {
    rank: number;
    combination: Combination;
    madeHand: [PlayingCard, PlayingCard, PlayingCard, PlayingCard, PlayingCard];
    unused: PlayingCard[];
};

type PocketCards<T = GameType> = T extends 'omaha'
    ? [PlayingCard, PlayingCard, PlayingCard, PlayingCard]
    : [PlayingCard, PlayingCard];

export const rankHands = <T extends GameType>(
    gameType: T,
    board: [PlayingCard, PlayingCard, PlayingCard, PlayingCard, PlayingCard],
    hands: PocketCards<T>[],
): HandRank[] => {
    return hands.map((hand) => {
        const bestHand = calcBestHand(
            gameType,
            hand.map((c) => toCard(c)),
            board.map((c) => toCard(c)),
        );

        return {
            rank: bestHand.rank,
            combination: toCombination(gameType, bestHand.rank),
            madeHand: bestHand.madeHand.map((c) => toPlayingCard(c)) as [
                PlayingCard,
                PlayingCard,
                PlayingCard,
                PlayingCard,
                PlayingCard,
            ],
            unused: bestHand.unused.map((c) => toPlayingCard(c)),
        };
    });
};
