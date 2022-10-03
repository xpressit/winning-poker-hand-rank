import { PlayingCard } from "./types";

// primes are the first 13 prime numbers (one per card rank).
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

export type Card = number;

type Rank = number;
type Suit = number;

const rankFromRune = (r: string): Rank => {
    switch (r.toLowerCase()) {
        case 'a':
            return 12;
        case 'k':
            return 11;
        case 'q':
            return 10;
        case 'j':
            return 9;
        case  't':
            return 8;
        case '9':
            return 7;
        case '8':
            return 6;
        case '7':
            return 5;
        case '6':
            return 4;
        case '5':
            return 3;
        case '4':
            return 2;
        case '3':
            return 1;
        case '2':
            return 0;
        }
        throw new Error(`Invalid rune ${r}`);
}

const suitFromRune = (r: string): Suit => {
    switch (r.toLowerCase()) {
        case 's':
            return 1;
        case 'h':
            return 2;
        case 'd':
            return 4;
        case 'c':
            return 8;
        }
        throw new Error(`Invalid rune ${r}`);
}

const toRankAndSuit = (playingCard: PlayingCard) => {
    return [rankFromRune(playingCard[0]), suitFromRune(playingCard[1])];
}

export const toCard = (playingCard: PlayingCard): Card => {
    const [rank, suit] = toRankAndSuit(playingCard);
    return 1 << rank << 16 | suit << 12 | rank << 8 | PRIMES[rank];
}
