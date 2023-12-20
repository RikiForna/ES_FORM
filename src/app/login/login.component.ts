import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  isLoginPage: boolean = true;
  isRegisterPage: boolean = false;
  //form per il login
  
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      pwd: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')

        ]
      ],
 
     });


  }

  name: string = "";
  pwd: string = "";

  risposta:boolean = true;
  
    async login(){
      console.log(this.loginForm.value);

      let dati ={
        name: this.loginForm.controls["name"].value,
        pwd: this.loginForm.controls["pwd"].value
      }
      console.log(dati);
          
     let busta = await fetch("http://localhost:1337/login", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: JSON.stringify(dati)
      });

      this.risposta = await busta.json();
      console.log(this.risposta);
    }


  showLoginPage() {
    this.isLoginPage = true;
    this.isRegisterPage = false;
  }

  showRegisterPage() {
    alert("CLICCA cambia componente per cambiare pagina!!")
  }



}
