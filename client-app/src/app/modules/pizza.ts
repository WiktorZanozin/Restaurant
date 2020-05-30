import { pizzaCategory } from "./pizzaCategory";

export interface IPizza{
    id:string;
    name:string;
    description:string;
    isAvailable:boolean;
    priceForSmall:number;
    priceForLarge:number;
    priceForXXL:number;
    pizzaCategory:pizzaCategory;
}