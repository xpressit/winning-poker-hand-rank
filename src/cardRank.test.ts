import { convertToSixPlusHandRank } from "./cardRank";

test.each([
    [ 167, 1444 ],
    [ 322, 1599 ],
    [ 323, 167 ],
    [ 1599, 1443 ],
])('should compute texas rank to six plus rank %i', (texasRank, sixPlusRank) => {
    expect(convertToSixPlusHandRank(texasRank)).toBe(sixPlusRank);
});
