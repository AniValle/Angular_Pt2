/**
 * @authors   Ani Valle and Andrea Morales
 * @file      Class of animal.
 *            With getetrs and setters.
 */

export class Animal {
 
    #_id!:number;
    #name!:string;
    #specie!:string;
    #breed!:string;
    #age!:number;
    #sex!:string;
    #neutered!:string;
    


    constructor (id: number, name:string, specie: string, breed: string, age: number, sex: string, neutered: string ) {
        
        this.#_id = id;
        this.#name = name;
        this.#specie = specie;
        this.#breed = breed;
        this.#age = age;
        this.#sex = sex;
        this.#neutered = neutered;
    }

    get id () {
        return this.#_id;
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

    set id (id) {
        this.#_id = id
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
        id: this.#_id,
        name: this.#name,
        specie: this.#specie,
        breed: this.#breed,
        age: this.#age,
        sex: this.#sex,
        neutered: this.#neutered  
        }
    }
}