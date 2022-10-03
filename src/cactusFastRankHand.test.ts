import { cactusFastRankHand } from "./cactusFastRankHand";
import { toCard } from "./card";

test.each([
    [ [0x802713, 0x8004b25, 0x200291d, 0x21103, 0x22103], 5811 ],
    [ [toCard('AH'), toCard('KH'),toCard('QH'),toCard('JH'),toCard('TH')], 1 ],
    [ [toCard('AH'), toCard('TH'),toCard('QH'),toCard('JH'),toCard('KH')], 1 ],
    [ [toCard('8D'), toCard('TD'),toCard('AS'),toCard('7D'),toCard('AD')], 3469 ],
])('should calc correct strength %i', (hand, str) => {
    expect(cactusFastRankHand([hand[0], hand[1], hand[2], hand[3], hand[4]])).toBe(str);
});
