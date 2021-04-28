export class User {
    constructor(public email: string, public id: string, private _token: string, private tokenExpiration: Date){}
    
    get token(){
        if (!this.tokenExpiration || new Date() > this.tokenExpiration){
            return null;
        }
        return this._token;
    }
}