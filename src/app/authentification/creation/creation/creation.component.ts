import { MessageManagementService } from './../../../templates/message-management.service';
import { Email } from './../../../interfaces/email';
import { AuthService } from "./../../auth.service";
import { Compte } from "./../../../models/compte";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLinkWithHref } from "@angular/router";
import { map, Subscription } from "rxjs";
import * as moment from 'moment';
import { NgIf } from '@angular/common';
import { AuthComponent } from '../../../templates/layouts/auth/auth.component';
@Component({
    selector: "ltd-creation",
    templateUrl: "./creation.component.html",
    standalone: true,
    imports: [AuthComponent, ReactiveFormsModule, NgIf, RouterLinkWithHref]
})
export class CreationComponent implements OnInit {
  public formulaire!: UntypedFormGroup;
  //Boolean qui affiche ou non le tooltip si le mail existe déjà
  public estDoublon = false;
  public estJetable = false;
  public dateInvalide = false;
  public messagesErreur!: string[];
  public getErrorMessages!: Subscription;
  //Variable qui va contenir la date d'hier afin de bloquer la séléction des dates ultérieures.
  public dateHier!: string

  constructor(
    private formBuilder: UntypedFormBuilder,
    private registration: AuthService,
    private messageService: MessageManagementService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.dateHier = moment().subtract(1, 'days').format("YYYY-MM-DD");
    this.getErrorMessages = this.messageService.getErrorMessages().subscribe((resultatlisteMessage) => {
      this.messagesErreur = resultatlisteMessage;
    });
    this.messageService.tooltipBootstrap();
    this.formulaire = this.formBuilder.group({
      nomFamille: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.'\s-]{2,20}$/
          ),
        ],
      ],
      prenom: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.'\s-]{2,20}$/
          ),
        ],
      ],
      dateNaissance: ["", [Validators.required, this.dateValidation]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ),
        ],
      ],
      confirmationPassword: [
        "",
        [
          Validators.required,
          ,
        ],
      ],
      option: [true],
    }, { validators: [this.validationMatchingPassword] });

  }

  ngDoCheck() {
    if (this.formulaire.controls['email'].invalid) {
      this.estDoublon = false;
      this.estJetable = false;
    }
    if (this.formulaire.controls['dateNaissance'].invalid) {
      this.dateInvalide = true;
    }
    if (this.formulaire.controls['dateNaissance'].hasError('required')) {
      this.dateInvalide = false;
    }

  }

  yesterdayDate(): moment.Moment {
    return moment().subtract(1, 'days')
  }

  ngOnDestroy() {
    this.getErrorMessages.unsubscribe();
  }

  //On vérifie si le mot de passe de confirmation match avec l'autre champs .
  validationMatchingPassword: ValidatorFn = (controle: AbstractControl): ValidationErrors | null => {
    const password = controle.get('password');
    const confirmationPassword = controle.get('confirmationPassword');
    return password?.value === confirmationPassword?.value ? null : { notmatched: true };
  };

  //On vérifie si la date de naissance est antérieure à la date du jour .
  dateValidation(controle: AbstractControl): { [s: string]: boolean } | null {
    if (controle.value) {
      const birthdate = moment(controle.value);
      const today = moment();
      if (birthdate.isBefore(today, 'day')) {
        return null;
      }
    }
    return { 'invalidDate': true };
  }

  //Cette méthode appelle le service pour recuperer la liste des utilisateurs afin de vérifier si le mail saisi est jetable ou en doublon dans le back .
  validationAdresseEmail() {
    //On split l'adresse Email pour récupérer le domaine
    let domaineJetable = this.formulaire.get('email')?.value.split("@").pop();
    this.registration.checkIfDisposableMail().pipe(
      map((tabJson: String[]) => {
        if (tabJson.includes(domaineJetable)) {
          return true;
        }
        else {
          return false;
        }
      }
      )
    ).subscribe((resultat) => {
      if (resultat) {
        this.estJetable = true;
        this.estDoublon = false;
      }
      else {
        this.registration.getAllEmails().pipe(
          map((tabJson: Email[]) => {
            return tabJson.find((ligneCompte: Email) => {
              return ligneCompte.email === this.formulaire.get('email')?.value;
            })
          })
        ).subscribe((resultat) => {
          if (resultat) {
            this.estDoublon = true;
            this.estJetable = false;
          }
          else {
            this.estDoublon = false;
            this.soumettreInscription();
          }
        })
      }
    }, (error) => {
      console.log("error: " + error)
      this.registration.erreurBack();
    })
  }


  //On soumet le compte au service pour la création
  soumettreInscription() {
    const registerObject = new Compte(this.formulaire.value);
    registerObject.dateNaissance = Math.floor(
      new Date(registerObject.dateNaissance).getTime() / 1000);
    sessionStorage.setItem('userName', registerObject.prenom);
    this.registration.saveAccount(registerObject).subscribe({
      error: () => {
        this.registration.erreurBack();
      },
      complete: () => {
        this.route.navigate(['auth/succes'])
      }
    });
  }
}

