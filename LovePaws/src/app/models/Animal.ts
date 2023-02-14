
export class Animal {
 

    #name!:string;
    #specie!:string;
    #breed!:string;
    #age!:number;
    #sex!:string;
    #neutered!:string;
    


    constructor (name:string, specie: string, breed: string, age: number, sex: string, neutered: string ) {
    
        this.#name = name;
        this.#specie = specie;
        this.#breed = breed;
        this.#age = age;
        this.#sex = sex;
        this.#neutered = neutered;
    }


    get Name () {
        return this.#name;
    }

    get Specie () {
        return this.#specie;
    }

    get Breed () {
        return this.#breed;
    }

    get Age () {
        return this.#age;
    }

    get Sex () {
        return this.#sex;
    }

    get Neutered () {
        return this.#neutered;
    }

    

    set Name(name) {
        this.#name = name;
    }

    set Specie(specie) {
        this.#specie = specie;
    }

    set Breed(breed) {
        this.#breed = breed;
    }

    set Age(age) {
        this.#age = age;
    }

    set Sex(sex) {
        this.#sex = sex;
    }

    set Neutered(neutered) {
        this.#neutered = neutered;
    }
    
    getObject () {
        return {
        name: this.#name,
        specie: this.#specie,
        breed: this.#breed,
        age: this.#age,
        sex: this.#sex,
        neutered: this.#neutered  
        }
    }
}