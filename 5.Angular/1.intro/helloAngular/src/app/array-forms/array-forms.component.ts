import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-array-forms',
  standalone: true, // For standalone components
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './array-forms.component.html',
  styleUrls: ['./array-forms.component.css'] // Fix the typo from `styleUrl` to `styleUrls`
})
export class ArrayFormsComponent { 
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      skills: this.fb.array([]) // Name this 'skills' to match the template
    });
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control('')); // Add a new control to the FormArray
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index); // Remove the control at the specified index
  }
}
