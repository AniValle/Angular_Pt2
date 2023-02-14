
export class User {

    #user:string|undefined;
    #password:string|undefined;
    #rol:string|undefined;
    #name:string|undefined;
    #lastname:string|undefined;
    #mail:string|undefined;
    #mobile:number|undefined;
    


    constructor (user?:string, password?:string, rol?:string, name?:string, lastname?:string, mail?: string, mobile?:number) {
        this.#user = user;
        this.#password = password;
        this.#rol = rol;
        this.#name = name;
        this.#lastname = lastname;
        this.#mail = mail;
        this.#mobile = mobile;
    }

    public get user () {
        return this.#user!;
    }

    public get password () {
        return this.#password!;
    }

    public get rol () {
        return this.#rol!;
    }

    public get name () {
        return this.#name!;
    }

    public get lastname () {
        return this.#lastname!;
    }

    public get mail () {
        return this.#mail!;
    }

    public get mobile () {
        return this.#mobile!;
    }

    
    public set user(user:string) {
        this.#user = user;
    }

    public set password(password:string) {
        this.#password = password;
    }

    public set rol(rol:string) {
        this.#rol = rol;
    }

    public set name(name:string) {
        this.#name = name;
    }

    public set lastname(lastname:string) {
        this.#lastname = lastname;
    }

    public set mail(mail:string) {
        this.#mail = mail;
    }

    public set mobile(mobile:number) {
        this.#mobile = mobile;
    }
    
    getObject () {
        return {
        user: this.#user,
        password: this.#password,
        rol: this.#rol,
        name: this.#name,
        lastname: this.#lastname,
        mail: this.#mail,
        mobile: this.#mobile   
        }
    }
}