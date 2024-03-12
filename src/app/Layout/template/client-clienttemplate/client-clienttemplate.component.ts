import { Component } from '@angular/core';

@Component({
  selector: 'app-client-clienttemplate',
  templateUrl: './client-clienttemplate.component.html',
  styleUrls: ['./client-clienttemplate.component.css']
})
export class ClientClienttemplateComponent {

  receivedKeyword!: string;
  constructor(){}
  ngOnInit(){}

  receiveKeyword(keyword: string) {
    this.receivedKeyword = keyword;
  }
}
