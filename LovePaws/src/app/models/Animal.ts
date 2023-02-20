
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


    get name () {
        return this.#name;
    }

    get specie () {
        return this.#specie;
    }

    get breed () {
        return this.#breed;
    }

    get age () {
        return this.#age;
    }

    get sex () {
        return this.#sex;
    }

    get neutered () {
        return this.#neutered;
    }

    

    set name(name) {
        this.#name = name;
    }

    set specie(specie) {
        this.#specie = specie;
    }

    set breed(breed) {
        this.#breed = breed;
    }

    set age(age) {
        this.#age = age;
    }

    set sex(sex) {
        this.#sex = sex;
    }

    set neutered(neutered) {
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