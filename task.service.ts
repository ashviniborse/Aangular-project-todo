import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private apiurl="http://localhost:8080/api/tasks"; //This api used in all the places
 constructor(private httpclient:HttpClient) { //Inject HttpClinet into the service
}
//method to create a newTask
createTask(newTask:Task):Observable<Task>{
  return this.httpclient.post<Task>(this.apiurl,newTask);

  }
    // Method to get all tasks
  getAllTasks(): Observable<Task[]> {
    return this.httpclient.get<Task[]>(this.apiurl);  // GET request to fetch all tasks
  }
  //Method to update
  updateTask(taskid:number,updatedTask:Task):Observable<Task>{
    return this.httpclient.put<Task>(this.apiurl+'/'+taskid,updatedTask) //to append the id
  }
  //method to delete
  deleteTask(taskid:number){
    return this.httpclient.delete(this.apiurl+ '/' + taskid)
  }


}
