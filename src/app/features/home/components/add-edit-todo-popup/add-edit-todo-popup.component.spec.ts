import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditTodoPopupComponent } from './add-edit-todo-popup.component';
import { DialogRef } from '../../../../shared/dialog/dialog-ref';
import { DIALOG_DATA } from '../../../../shared/dialog/dialog-tokens';

describe('AddEditTodoPopupComponent', () => {
  let component: AddEditTodoPopupComponent;
  let fixture: ComponentFixture<AddEditTodoPopupComponent>;
  let dialogRefMock: jasmine.SpyObj<DialogRef>;
  const dialogDataMock = 'add';

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('DialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [AddEditTodoPopupComponent],
      providers: [
        { provide: DialogRef, useValue: dialogRefMock },
        { provide: DIALOG_DATA, useValue: dialogDataMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTodoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close() on cancel', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close() with correct data on submit', () => {
    component.title = 'Test Todo';
    component.submit();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ title: 'Test Todo' });
  });

  it('should initialize with correct dialog data', () => {
    expect(component.data).toBe(dialogDataMock);
  });
});
