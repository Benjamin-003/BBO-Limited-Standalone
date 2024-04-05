import { Component, OnInit } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { MessageComponent } from "../../templates/layouts/message/message.component";

@Component({
    selector: "ltd-succes",
    templateUrl: "./succes.component.html",
    standalone: true,
    imports: [MessageComponent, RouterLinkWithHref]
})
export class SuccesComponent implements OnInit {
  public prenomCompte = sessionStorage.getItem("userName");
  constructor() {}

  ngOnInit() {}
  
  ngOnDestroy() {
    sessionStorage.removeItem("userName");
  }
}
