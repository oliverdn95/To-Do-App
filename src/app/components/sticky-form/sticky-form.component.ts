import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Task } from '../../interfaces/task';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sticky-form',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './sticky-form.component.html',
  styleUrl: './sticky-form.component.css'
})
export class StickyFormComponent {
  task: Task = {
    id: 0,  
    name: "",
    status: "",
    priority: "",
    complexity: "",
    summary: "",
    index: 0
  };
  isEdit: boolean = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<StickyFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    if (data) {
      this.isEdit = true;
      this.task = { ...data.task };
    }
  }

  saveTask() {
    this.bottomSheetRef.dismiss(this.task);
  }
}