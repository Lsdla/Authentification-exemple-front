import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public task:any;
  public mode:number=0;

  newTaskForm = new FormGroup({
    taskName: new FormControl('', Validators.required)
  });
  constructor(private authService:AuthentificationService, private router:Router) { }

  ngOnInit(): void {
    this.mode = 1;
  }

  onSaveTask(){
    this.authService.saveTask(this.newTaskForm.value)
      .subscribe(resp=>{
        this.task = resp;
        this.mode = 2;
      }, err=>{
          console.log(err); 
        })
  }

  onNewTask(){
    this.mode = 1;
    this.newTaskForm.reset();
  }
}
