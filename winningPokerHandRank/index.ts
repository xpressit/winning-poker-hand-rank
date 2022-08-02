import { cardStringsToArrayOfNumbers } from './utils';

export type TableCard = string | string[] | undefined;

type CardInMatrix = number;

type HandRanks = {
    [key: string]: boolean;
};

type RankStrength = number;

type RankDescription = string;

type Hand = number[];

type PokerType = 'texasHoldem' | 'omaha';

const valuesInDeck = 13;
const suitsInDeck = 4;
const cardsInHand = 5;
const aceValue = 2 ** 13;
const straightLowAceIndicator = 0b10000000011110;
const tenCardPosition = 8;
const rankBaseValue = 10 ** 9;

const cardValues = '23456789TJQKA';
const cardSuits = ['C', 'D', 'H', 'S'];

export const winningPokerHandRank = (
    communityCards: TableCard[],
    pocketCards: TableCard[][],
    pokerType: PokerType = 'texasHoldem',
): string | undefined => {
    if (communityCards.length === 0) {
        return undefined;
    }

    const communityCardsInMatrix = cardStringsToArrayOfNumbers(communityCards);

    // Make cards in readable format
    const cardsInReadableFormat = (hand: Hand) => {
        return hand
            .reduce((tableCards: TableCard[], item: number) => {
                tableCards.push(`${cardValues[item % valuesInDeck]}${cardSuits[Math.floor(item / valuesInDeck)]}`);
                return tableCards;
            }, [])
            .join(' ');
    };

    const handRank = (
        hand: Hand,
    ): {
        rankStrength: RankStrength;
        rankDescription: RankDescription;
        communityCards: TableCard[];
    } => {
        const suits = new Array(suitsInDeck).fill(0);
        const values = new Array(valuesInDeck).fill(0);

        hand.forEach((card: CardInMatrix) => {
            suits[Math.floor(card / valuesInDeck)] += 1;
            values[card % valuesInDeck] += 1;
        });

        let rankStrength: RankStrength = values.reduce((total, val, index) => {
            let strength: number = total;
            strength += ((val === 1 && 2 ** index + 1) || 0) + ((val > 1 && (2 ** index + 1) * aceValue * val) || 0);
            return strength;
        }, 0);

        const firstCardIndex: number = values.findIndex((index) => index === 1);

        const handRanks: HandRanks = {
            royalFlush: false,
            straightFlush: false,
            fourOfAKind: values.some((count) => count === 4),
            fullHouse: values.filter(Boolean).length === 2,
            flush: suits.some((count) => count === cardsInHand),
            straight:
                values.slice(firstCardIndex, firstCardIndex + cardsInHand).filter((count) => count === 1).length === 5 ||
                rankStrength === straightLowAceIndicator,
            threeOfAKind: values.some((count) => count === 3),
            twoPairs: values.filter((count) => count === 2).length === 2,
            pair: values.filter((count) => count === 2).length === 1,
            highCard: true,
        };
        handRanks.straightFlush = handRanks.flush && handRanks.straight;
        handRanks.royalFlush = handRanks.straightFlush && firstCardIndex === tenCardPosition;

        let rankIndex = 0;
        let rankDescription = '';

        Object.keys(handRanks).every((key, index) => {
            rankIndex = 10 - index;
            rankDescription = key;
            return !handRanks[key];
        });

        rankStrength += rankIndex * rankBaseValue - ((rankStrength === straightLowAceIndicator && aceValue - 1) || 0);

        rankDescription = rankDescription
            .split(' ')
            .map((description) => description.charAt(0).toUpperCase() + description.slice(1))
            .join(' ')
            .replace(/(\B[A-Z])/g, ' $1');

        return {
            rankStrength,
            rankDescription,
            communityCards: [cardsInReadableFormat(communityCardsInMatrix)],
        };
    };

    const compareHands = (
        hands: Hand[],
    ): {
        rankStrength: RankStrength;
        rankDescription: RankDescription;
        communityCards: TableCard[];
    }[] => hands.map((hand: Hand) => handRank(hand)).sort((a, b) => b.rankStrength - a.rankStrength);

    const bestHand = (
        playerCards: CardInMatrix[],
        tableCards: CardInMatrix[],
    ): {
        rankStrength: RankStrength;
        rankDescription: RankDescription;
        communityCards: TableCard[];
    }[] => {
        const hands: Hand[] = [];

        hands.push(tableCards);

        if (pokerType === 'texasHoldem') {
            for (let c = 0; c < 2; c += 1) {
                for (let t = 0; t < 5; t += 1) {
                    const newHand = [...tableCards];
                    newHand[t] = playerCards[c];
                    hands.push(newHand);
                }
            }

            for (let t = 0; t < 4; t += 1) {
                for (let r = t + 1; r < 5; r += 1) {
                    const newHand = [...tableCards];
                    const first = playerCards[0];
                    const second = playerCards[1];
                    newHand[t] = first;
                    newHand[r] = second;

                    if (playerCards.length !== 2) {
                        throw new Error('In Texas Holdem poker player needs to have 2 cards!');
                    }

                    hands.push(newHand);
                }
            }
            // Omaha poker type
        } else {
            for (let t = 0; t < 4; t += 1) {
                for (let r = t + 1; r < 5; r += 1) {
                    for (let x = 0; x < 3; x += 1) {
                        for (let y = x + 1; y < 4; y += 1) {
                            const newHand = [...tableCards];
                            newHand[t] = playerCards[x];
                            newHand[r] = playerCards[y];

                            if (playerCards.length !== 4) {
                                throw new Error('In Omaha poker player needs to have 4 cards!');
                            }

                            hands.push(newHand);
                        }
                    }
                }
            }
        }

        return compareHands(hands);
    };

    const players = pocketCards.map((cards, _index) => ({
        cards,
        winningHand: {
            rankStrength: 0,
            rankDescription: '',
        },
    }));

    players.forEach((p) => {
        const player = p;
        const [hand] = bestHand(cardStringsToArrayOfNumbers(player.cards), communityCardsInMatrix);
        player.winningHand = hand;
        player.cards = [cardsInReadableFormat(cardStringsToArrayOfNumbers(player.cards))];
    });

    const rankPlayers = players.sort((a, b) => b.winningHand.rankStrength - a.winningHand.rankStrength);

    const { rankDescription: winningPokerHandRankDescription } = rankPlayers[0].winningHand;

    return winningPokerHandRankDescription;
};
