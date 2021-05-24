import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public tasks:any;

  constructor(public authService:AuthentificationService, private router:Router) { }

  ngOnInit(): void {
    this.authService.getTasks()
      .subscribe(data=>{
        this.tasks = data;
      }, err=>{
        this.authService.logout();
        this.router.navigateByUrl("/login");
      })
  }

  onNewTask(){
    this.router.navigateByUrl("/new-task");
  }

}
