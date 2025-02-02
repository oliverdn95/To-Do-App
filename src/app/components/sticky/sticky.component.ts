import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor, NgIf } from '@angular/common';
import { Task, TaskList } from '../../interfaces/task';
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
    this.gettingTasks();
  }

  gettingTasks(){
    this.taskService.getTasks().subscribe( async (tasks:Task[]) => {
      this.organizeList(tasks);
    },
    (error) => {
      console.log("Erro ao carregar tarefas", error);
    });
  }

  organizeList(listFromDb:Task[]):void {
    this.todo = listFromDb.filter((task) => task.status === "todo").sort((a, b) => a.index - b.index)
    this.working = listFromDb.filter((task) => task.status === "working").sort((a, b) => a.index - b.index)
    this.done = listFromDb.filter((task) => task.status === "done").sort((a, b) => a.index - b.index)
  }

  verifyAndPush(task:Task){
    switch(task.status){
      case "todo":{
        task.index = this.todo.length || 0;
        this.todo.push(task);
        break;
      }
      case "working":{
        task.index = this.working.length || 0;
        this.working.push(task);
        break;
      }
      case "done":{
        task.index = this.done.length || 0;
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
    
    // this.verifyAndPush(updatedTask);

    this.orderByIndex();
    const taskList: TaskList = {
      todoList: this.todo.map(task => ({ ...task })),
      workingList: this.working.map(task => ({ ...task })),
      doneList: this.done.map(task => ({ ...task })),
    };
    this.taskService.updateOrder(taskList).subscribe((response) => {
      console.log("Tarefas atualizadas");
    },
      (error) => {
        console.log("Deu ruim")
      });
    this.gettingTasks();
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

  orderByIndex(){
    this.todo.forEach((task, index) => task.index = index);
    this.working.forEach((task, index) => task.index = index);
    this.done.forEach((task, index) => task.index = index);
  }
  
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }

    const movedTask = event.container.data[event.currentIndex];
    if (event.container.id === 'todo') {
      movedTask.status = 'todo';
    } else if (event.container.id === 'working') {
      movedTask.status = 'working';
    } else if (event.container.id === 'done') {
      movedTask.status = 'done';
    }
  
    this.orderByIndex();

    const taskList: TaskList = {
    todoList: this.todo.map(task => ({ ...task })),
    workingList: this.working.map(task => ({ ...task })),
    doneList: this.done.map(task => ({ ...task })),
    };

    this.taskService.updateOrder(taskList).subscribe((response) => {
      console.log("Tarefas atualizadas");
    },
  (error) => {
    console.log("Deu ruim")
  });
    
  }
  
}
