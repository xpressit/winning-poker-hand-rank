import { Card } from './card';
import { rankOmahaHand, rankShortDeckHand, rankTexasHand } from './cardRank';
import { GameType } from './types';

export const calcBestHand = (gameType: GameType, pocketCards: Card[], communityCards: Card[]) => {
    const getHandRanker = () => {
        if (gameType === 'short_deck') {
            return rankShortDeckHand;
        }
        if (gameType === 'omaha') {
            return rankOmahaHand;
        }
        return rankTexasHand;
    };

    const rankHand = getHandRanker();

    const cards = [...pocketCards, ...communityCards];

    const { rank, madeHand } = rankHand(pocketCards, communityCards);

    return {
        rank,
        madeHand,
        unused: cards.filter((c) => !madeHand.find((mc) => mc === c)),
    };
};
