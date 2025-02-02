import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskList } from './interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_URL = "http://127.0.0.1:8000/tasks/";

  constructor(private http: HttpClient) { }

  public getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.API_URL}tasks/`);
  }

  public newTask(req:any):Observable<Task>{
    return this.http.post<Task>(`${this.API_URL}tasks/create`, req);
  }
  
  public getTask(pk:number):Observable<Task>{
    return this.http.get<Task>(`${this.API_URL}tasks/${pk}`);
  }

  public editTask(req:Task, pk:number):Observable<Task>{
    return this.http.put<Task>(`${this.API_URL}tasks/${pk}`, req);
  }

  public completeTask(req:Task, pk:number):Observable<Task>{
    return this.http.put<Task>(`${this.API_URL}done/${pk}`, req);
  }

  public deleteTask(pk:number):Observable<Task>{
    return this.http.delete<Task>(`${this.API_URL}tasks/${pk}`);
  }

  public updateOrder(req:TaskList):Observable<TaskList>{
    return this.http.put<TaskList>(`${this.API_URL}update/`, req);
  }
}
