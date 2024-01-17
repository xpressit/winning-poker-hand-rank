import { Card } from './card';
import { rankOmahaHand, rankShortDeckHand, rankTexasHand } from './cardRank';
import { GameType } from './types';

export const calcBestHand = (gameType: GameType, pocketCards: Card[], communityCards: Card[]) => {
    const getHandRanker = () => {
        if (gameType === 'short_deck') {
            return rankShortDeckHand;
        }
        if (gameType === 'omaha' || gameType === 'omaha_hi_lo') {
            return rankOmahaHand;
        }
        return rankTexasHand;
    };
    const shouldLow = gameType === 'omaha_hi_lo';

    const rankHand = getHandRanker();

    const cards = [...pocketCards, ...communityCards];

    const { rank, madeHand, low } = rankHand(pocketCards, communityCards, shouldLow);

    return {
        rank,
        madeHand,
        unused: cards.filter((c) => !madeHand.find((mc) => mc === c)),
        low: low ? { rank: low.rank, madeHand: low.madeHand } : undefined,
    };
};
