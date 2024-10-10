import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { DialogService } from "../../../../shared/dialog/dialog.service";
import { FormsModule } from "@angular/forms";
import { DialogRef } from "../../../../shared/dialog/dialog-ref";
import { DIALOG_DATA } from "../../../../shared/dialog/dialog-tokens";

@Component({
  standalone: true,
  selector: 'app-add-edit-todo-popup',
  templateUrl: './add-edit-todo-popup.component.html',
  styleUrls: ['./add-edit-todo-popup.component.scss'],
  providers: [
    DialogService,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class AddEditTodoPopupComponent {
  public title: string = '';

  constructor(
    private _dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: 'edit' | 'add',
  ) {}

  public cancel(): void {
    this._dialogRef.close();
  }

  public submit(): void {
    this._dialogRef.close({
      title: this.title,
    });
  }
}
