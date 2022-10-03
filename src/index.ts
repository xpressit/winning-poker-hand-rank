import { GameType, PlayingCard, Rank } from "./types"


type HandRank = {
    strength: number,
    rank: Rank,
    madeHand: PlayingCard[], // 5 cards that make your hand
}

type Input = {
    gameType: GameType;
    board: PlayingCard[];
    hands: [PlayingCard, PlayingCard];
};

type Output = {
    handRands: HandRank[],
}
