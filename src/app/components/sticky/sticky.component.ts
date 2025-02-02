import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor, NgIf } from '@angular/common';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../task.service';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StickyFormComponent } from '../sticky-form/sticky-form.component';

@Component({
  selector: 'app-sticky',
  standalone: true,
  templateUrl: './sticky.component.html',
  styleUrl: './sticky.component.css',
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, NgFor, NgIf, MatCardModule, MatButtonModule, MatIconButton, MatIconModule, MatBottomSheetModule]
})
export class StickyComponent implements OnInit {
  
  todo:Task[] = [];
  working:Task[] = [];
  done:Task[] = [];

  constructor(
    private taskService: TaskService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(){
    this.taskService.getTasks().subscribe( async (tasks:Task[]) => {
      this.initList(tasks);
    },
    (error) => {
      console.log("Erro ao carregar tarefas", error);
    });  
  }

  initList(listFromDb:Task[]):void {

    listFromDb.forEach(task => {
      this.verifyAndPush(task)
    });
  }

  updateList(listFromDb:Task[]):void {
    this.todo, this.working, this.done = []

    listFromDb.forEach(task => {
      this.verifyAndPush(task)
    });
  }

  verifyAndPush(task:Task){
    switch(task.status){
      case "todo":{
        this.todo.push(task);
        break;
      }
      case "working":{
        this.working.push(task);
        break;
      }
      case "done":{
        this.done.push(task);
        break;
      }
    }
  }

  openForm(task?: Task){
    this.bottomSheet.open(StickyFormComponent, {
      data: { task }
    }).afterDismissed().subscribe((result: Task) => {
      if (result){
        if(result.id){
          this.updateTask(result);
        } else {
          this.createNew(result);
        }
      }
    });
  }

  createNew(task: Task){
    this.taskService.newTask(task).subscribe((newTask:Task) => {
      this.verifyAndPush(newTask);
    },
    (error) => {
      console.log("Erro ao criar tarefa", error);
    });
    
  }

  updateTask(task:Task){
    this.taskService.editTask(task, task.id).subscribe((updatedTask:Task) => {
      this.updateListAfterEdit(updatedTask);
    },
    (error) => {
      console.log("Erro ao editar tarefa", error);
    })
    
  }

  updateListAfterEdit(updatedTask:Task){
    this.todo = this.todo.filter(t => t.id !== updatedTask.id);
    this.working = this.working.filter(t => t.id !== updatedTask.id);
    this.done = this.done.filter(t => t.id !== updatedTask.id);
    
    this.verifyAndPush(updatedTask);
  }

  markAsDone(task:Task){
    task.status = 'done';
    this.taskService.completeTask(task, task.id).subscribe((completedTask:Task) => {
      this.updateListAfterEdit(completedTask);
    },
  (error) => {
    console.log("Erro ao marcar tarefa como concluída", error);
  })
  }

  deleteTask(task:Task){
    this.updateBeforeDelete(task);
    this.taskService.deleteTask(task.id).subscribe(() => {
      alert("Tarefa Deletada com sucesso")
    },
  (error) => {
    console.log("Falha ao deletar tarefa", error);
  })
  }
  
  updateBeforeDelete(task:Task){
    switch(task.status){
      case "todo":
        this.todo = this.todo.filter(t => t.id !== task.id);
        break;
      case "working":
        this.working = this.working.filter(t => t.id !== task.id);
        break;
      case "done":
        this.done = this.done.filter(t => t.id !== task.id);
        break;
    }

  }
  
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
    
    const movedTask = event.item.data;
    movedTask.status = event.container.id;
    this.taskService.editTask(movedTask, movedTask.id).subscribe(
      (updatedTask:Task) => console.log("Tarefa Atualizazda:", updatedTask),
      (error) => console.log("Erro ao atualizar tarefa", error)
    );
  }
  
}
