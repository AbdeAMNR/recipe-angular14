import { Ingredient } from "../shared/ingredient/ingredient.model";

export class Recipe {

    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[] = [];

    constructor(theId: number, name: string, desc: string, imgUrl: string, ingred: Ingredient[]) {
        this.id = theId;
        this.name = name;
        this.description = desc;
        this.imagePath = imgUrl;
        this.ingredients = ingred;
    }

    toString(): string {
        return "[" + this.id + "]" + ", " + this.name;
    }


}