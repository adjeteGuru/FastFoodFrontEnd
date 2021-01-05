
// Here is how a single recipe look like

export class Recipe{
    public name: string;
    public description: string;
    // public price: number;
    public imagePath: string;

    /**
     *
     */
    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        // this.price = price;
        this.imagePath = imagePath;

    }
}