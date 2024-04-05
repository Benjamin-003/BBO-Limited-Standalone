export class Compte {
    id!: number;
    nomFamille!: string;
    prenom!: string;
    dateNaissance!: number;
    email!: string;
    password!: string;
    option!: boolean;
    constructor(obj?: Partial<Compte>) {
        if (obj) { Object.assign(this, obj) }
    }
}