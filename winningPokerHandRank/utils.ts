import { TableCard } from '.';

type PlayerCardMatrixValues = {
    [key: string]: string;
};

type CardsAsArrayOfNumbers = number[];

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export const playerCardMatrixValues: PlayerCardMatrixValues = {};

// Give each card a key as a matrix value
// *  2  3  4  5  6  7  8  9  T  J  Q  K  A
// C 00 01 02 03 04 05 06 07 08 09 10 11 12
// D 13 14 15 16 17 18 19 20 21 22 23 24 25
// H 26 27 28 29 30 31 32 33 34 35 36 37 38
// S 39 40 41 42 43 44 45 46 47 48 49 50 51

for (let key = 0; key < 52; key++) {
    cardValues.forEach((cardValue, index) => {
        if (key < 13) {
            playerCardMatrixValues[index] = `CARD_${cardValue}C`;
        }
        if (key === 13 && key < 26) {
            playerCardMatrixValues[key + index] = `CARD_${cardValue}D`;
        }
        if (key === 26 && key < 39) {
            playerCardMatrixValues[key + index] = `CARD_${cardValue}H`;
        }
        if (key === 39 && key < 52) {
            playerCardMatrixValues[key + index] = `CARD_${cardValue}S`;
        }
    });
}

export const cardStringsToArrayOfNumbers = (communityCards: TableCard[]): CardsAsArrayOfNumbers => {
    const matchesMatrixValue = Object.keys(playerCardMatrixValues).filter((key) =>
        communityCards.includes(playerCardMatrixValues[key]),
    );
    const arrayOfMatrixValues: CardsAsArrayOfNumbers = [];
    matchesMatrixValue.forEach((communityCard: TableCard) => arrayOfMatrixValues.push(Number(communityCard)));
    return arrayOfMatrixValues;
};
