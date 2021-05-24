import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticationForm = new FormGroup({
    userName: new FormControl('admin', Validators.required),
    password: new FormControl('1234', Validators.required)
  });

  public mode:number=0; // c'est juste une variable qui nous permet de faire un ngIf dans le template pour choisir quel partie afficher en fonction du formulaire

  constructor(private authService:AuthentificationService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    //console.log(this.authenticationForm.value);
    this.authService.login(this.authenticationForm.value)
      .subscribe(res=>{
        let jwt = res.headers.get('Authorization'); //permet de recuperer le jwt généré & authorization.  
        //console.log(res.headers.get('Authorization'));
        this.authService.saveToken(jwt);    
        this.router.navigateByUrl("/tasks"); // apres authentification cette ligne permet d'etre redirigé vers la page tasks.
      }, err=>{        
        //console.log(err);
        this.mode = 1
    })
  }

}
