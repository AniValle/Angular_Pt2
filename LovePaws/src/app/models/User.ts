/**
 * @authors   Ani Valle and Andrea Morales
 * @file      Class of users.
 *            With getetrs and setters.
 */
export class User {

    #user:string|undefined;
    #password:string|undefined;
    #role:string|undefined;
    #name:string|undefined;
    #lastname:string|undefined;
    #mail:string|undefined;
    #mobile:number|undefined;
    


    constructor (user?:string, password?:string, role?:string, name?:string, lastname?:string, mail?: string, mobile?:number) {
        this.#user = user;
        this.#password = password;
        this.#role = role;
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

    public get role () {
        return this.#role!;
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

    public set role(role:string) {
        this.#role = role;
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
        role: this.#role,
        name: this.#name,
        lastname: this.#lastname,
        mail: this.#mail,
        mobile: this.#mobile   
        }
    }
}