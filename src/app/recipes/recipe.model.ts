import { Steps } from './../shared/steps.model';
import { Ingredient } from './../shared/ingredient.model';


export class Recipe {
    constructor(public name: string, 
        public description: string,
        public image: string,
        public video: string,
        public ingredients: Ingredient[],
        public steps: Steps[],
        public userName: string,
        public category: string,
        public region: string
){} }