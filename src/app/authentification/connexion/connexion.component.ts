import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageManagementService } from 'src/app/templates/message-management.service';
import { RouterLinkWithHref } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthComponent } from '../../templates/layouts/auth/auth.component';


@Component({
    selector: 'ltd-connexion',
    templateUrl: './connexion.component.html',
    standalone: true,
    imports: [AuthComponent, ReactiveFormsModule, NgIf, RouterLinkWithHref]
})
export class ConnexionComponent implements OnInit {
  public formulaireLogIn!: UntypedFormGroup;
  public messagesErreur!: string[];
  public getErrorMessages!: Subscription;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageManagementService,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.getErrorMessages = this.messageService.getErrorMessages().subscribe((resultatlisteMessage) => {
      this.messagesErreur = resultatlisteMessage;
    });
    this.formulaireLogIn = this.formBuilder.group({
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
      checkboxConnected: [true],
    });
  }

  //Methode qui va recuperer les infos d'authentification de l'utilisateur et les transmettre au service
  logIn() {
    const email = this.formulaireLogIn.get('email')?.value
    const password = this.formulaireLogIn.get('password')?.value
    this.authService.logInUser(email,password)
  }
}
