import { toCard } from "./card";
import { PlayingCard } from "./types";

test.each([
    [ 'AH' as PlayingCard, 0x10002c29 ],
    [ 'KS' as PlayingCard, 0x08001b25 ],
    [ '2H' as PlayingCard, 0x00012002 ],
])('should format PlayingCard to Card %i', (playingCard, card) => {
    expect(toCard(playingCard)).toBe(card);
});
