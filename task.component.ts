import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import {FormsModule} from '@angular/forms'
import { Task } from './task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [CommonModule,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{

  ngOnInit(): void {
      this.getAllTasks();
  }
     constructor(private taskservice:TaskService){}
     newTask={description:" ",completed:false}
     tasks:Task[]=[];
     updatedTask:Task={description:"",completed:false};
     editingTask:Task|null=null;



     createTask():void{
      this.taskservice.createTask(this.newTask).subscribe((createTask)=>{this.newTask={description:" ",completed:false}});
     }
     getAllTasks(){
      this.taskservice.getAllTasks().subscribe((tasks)=>{
        this.tasks = tasks;
      })
     }
     editTask(task:Task){
      this.editingTask=task;
      this.updatedTask={...task};//create  a copy for editing
    }
    updateTask():void{
      if(this.editingTask){
          this.taskservice.updateTask(this.editingTask.id!,this.updatedTask)
          .subscribe((result)=>{
            const index=this.tasks.findIndex((task)=>task.id == this.editingTask!.id)
            if(index !== -1){
              this.tasks[index]=result;
            }
          })
      }
    }
canceledit(){
this.editingTask=null;
this.updatedTask={description:"",completed:false};
}
deleteTask(taskid: any) {
  this.taskservice.deleteTask(taskid).subscribe(() => {
    this.tasks.filter((task) => task.id !== taskid);

    if(this.editingTask && this.editingTask.id == taskid){
      this.canceledit();


    }
  })
}




}
