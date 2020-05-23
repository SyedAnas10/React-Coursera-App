import { Dishes } from "../shared/dishes";
import { Leaders } from "../shared/leaders";
import { Promotions } from "../shared/promotions";

export const initialState = {
    dishes: Dishes,
    leaders: Leaders,
    promotions: Promotions
}

export const Reducer = (state = initialState, action) => {
    return state;
}