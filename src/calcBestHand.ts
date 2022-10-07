import { Card, cardCompareDescFn, RANK_FIVE, RANK_NINE } from "./card";
import { rankTexasHand, rankShortDeckHand, toFixedTexasRank, STRAIGHT_FLUSH } from "./cardRank";
import { GameType } from "./types";

const calcOmahaBestHand = (_pocketCards: Card[], _communityCards: Card[]) => {
    // TODO: implement
    throw new Error('Not implemented');
} 

export const calcBestHand = (gameType: GameType, pocketCards: Card[], communityCards: Card[]) => {
    if (gameType === 'omaha') {
        return calcOmahaBestHand(pocketCards, communityCards);
    }
    const rankHand = gameType === 'short_deck' ? rankShortDeckHand : rankTexasHand;

    const hand = [...pocketCards, ...communityCards];

    const {rank, madeHand} = rankHand(hand);

    return {
        rank, 
        madeHand, 
        unused: hand.filter(c => !madeHand.find(mc => mc === c)),
    }
}
