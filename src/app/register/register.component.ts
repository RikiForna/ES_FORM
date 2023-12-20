import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  isLoginPage: boolean = false;
  isRegisterPage: boolean = true;

  //Form per il register

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      cognome: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      ind: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      mail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+\\.[a-z]{2,}$')
        ]
      ],
      cod: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$')
        ]
      ],
      pwd: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$') //contiene almeno 8 caratteri!!

        ]
      ]
 
     });
   
    

  }

  user: string = "";
pasw: string = "";
cod: string = "";
email: string = "";
cog: string = "";
ind: string = "";


  async registerUser(){
    console.log(this.registerForm.value);
 let dati = {
  user: this.registerForm.controls["name"].value,
  cog: this.registerForm.controls["cognome"].value,
  ind:this.registerForm.controls["ind"].value,
  email: this.registerForm.controls["mail"].value,
  cod:this.registerForm.controls["cod"].value,
  pasw: this.registerForm.controls["pwd"].value,

 }
    
    await fetch("http://localhost:1337/register", {
      method: "POST",
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: JSON.stringify(dati)
    });
  }
  

  showLoginPage() {
   alert("CLICCA cambia componente per cambiare pagina!!")
  }

  /*
  showRegisterPage() {
    this.isLoginPage = false;
    this.isRegisterPage = true;
  }
  */

}