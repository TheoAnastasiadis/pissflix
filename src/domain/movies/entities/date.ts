import * as t from "io-ts"

interface DateI {
    readonly Date: unique symbol
}

const DateBrand = t.brand(
    t.number,
    (n): n is t.Branded<number, DateI> => !!new Date(String(n)).getFullYear(),
    "Date"
)

type DateBrandType = t.TypeOf<typeof DateBrand>

export { DateBrand, DateBrandType }
