
export class User {

    #user!:string;
    #pass!:string;
    #rol!:string;
    #name!:string;
    #lastname!:string;
    #mail!:string;
    #mobile!:number;
    


    constructor (user:string, pass:string, rol:string, name:string, lastname:string, mail: string, mobile:number) {
        this.#user = user;
        this.#pass = pass;
        this.#rol = rol;
        this.#name = name;
        this.#lastname = lastname;
        this.#mail = mail;
        this.#mobile = mobile;
    }

    get User () {
        return this.#user;
    }

    get Pass () {
        return this.#pass;
    }

    get Rol () {
        return this.#rol;
    }

    get Name () {
        return this.#name;
    }

    get Lastname () {
        return this.#lastname;
    }

    get Mail () {
        return this.#mail;
    }

    get Mobile () {
        return this.#mobile;
    }

    
    set User(user) {
        this.#user = user;
    }

    set Pass(pass) {
        this.#pass = pass;
    }

    set Rol(rol) {
        this.#rol = rol;
    }

    set Name(name) {
        this.#name = name;
    }

    set Lastname(lastname) {
        this.#lastname = lastname;
    }

    set Mail(mail) {
        this.#mail = mail;
    }

    set Mobile(mobile) {
        this.#mobile = mobile;
    }
    
    getObject () {
        return {
        user: this.#user,
        pass: this.#pass,
        rol: this.#rol,
        name: this.#name,
        lastname: this.#lastname,
        mail: this.#mail,
        mobile: this.#mobile   
        }
    }
}