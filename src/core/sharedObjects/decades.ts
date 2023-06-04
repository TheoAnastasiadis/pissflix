export type decade =
    | 1920
    | 1930
    | 1940
    | 1950
    | 1960
    | 1970
    | 1980
    | 1990
    | 2000
    | 2010

export const decades: decade[] = Array(10)
    .fill(1920)
    .map((v, i) => (Number(v) + i * 10) as decade)
