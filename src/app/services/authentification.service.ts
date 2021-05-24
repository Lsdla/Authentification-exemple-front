import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public host:string="http://localhost:8080";
  public jwtToken=null;
  public roles:Array<any>; // premet de stocker le tableau des roles.

  constructor(private http:HttpClient) { }

  login(user){
    return this.http.post(this.host+"/login", user, {observe:"response"});    
  }

  // methode qui permet de sauvegarder le token en local storage
  saveToken(jwt:string){
    this.jwtToken = jwt;
    localStorage.setItem("token",jwt);
    let jwtHelper = new JwtHelper();  // permet de creer un objet qui a comme dependence le " angular2-jwt " 
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles; // permet de charger les roles au moment de l'enregistrement du token.
  }

  //permet de charger le token. 
  loadToken(){
    this.jwtToken = localStorage.getItem("token");
  }

  //methode pour recuperer les tasks.
  getTasks(){
    if(this.jwtToken == null){
      this.loadToken();
    }
    return this.http.get(this.host+"/tasks", {headers:new HttpHeaders({'Authorization':this.jwtToken})});
  }

   //permet la deconnexion et supprimer le token aussi une fois logout car sinon le jwtToken garde le token en mémoire stocké dans la variable en la réinitialisant a null;
  logout(){
    this.jwtToken = null; //permet de reinitialiser le token en le remettant a null.
    localStorage.removeItem("token");
  }

  //methode qui determine le role de l'utilisateur
  isAdmin(){
    for (let r of this.roles) {
      if (r.authority=='ADMIN') {
        return true;
      }
      return false;  
    }
  }

  // ajouter une nouvelle tache
  saveTask(task){
    return this.http.post(this.host+"/tasks", task, {headers:new HttpHeaders({"Authorization":this.jwtToken})});
  }
}
