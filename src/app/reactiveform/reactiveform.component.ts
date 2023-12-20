import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit{

  //Gestione del server

  dati: any = []; // array di oggetti
async ngOnInit() {
  let busta = await fetch("http://localhost:1337/auto", {
    method: "POST",
    headers: {"Content-Type": "application/json"}
  });
  this.dati = await busta.json();
  console.log(this.dati);
}  

automobili:any = {
  id_Auto:  0,
  marca:  "",
  modello:  "",
  costo:  0,
  categoria:  "",
  alimentazione:  "",
  dat_tecnici:{
    pot:  0,
    cons: 0,
  } 

}

display = "none";

mostraModal(){
  this.display = "blockn ";
}

chiudiModal(){
  this.display = "none";
}

async inviaDatiAlServer(dato:any){
    this.automobili = dato;
  console.log(dato);
  
  await fetch("http://localhost:1337/infoAuto", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: JSON.stringify(dato)
  });
}


async compraAutomobile() {
  console.log(this.automobili);
  let busta = await fetch("http://localhost:1337/compraAutomobile", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
    body: JSON.stringify(this.automobili)
  });
  let risposta = await busta.json();
  console.log(risposta);
}

}

