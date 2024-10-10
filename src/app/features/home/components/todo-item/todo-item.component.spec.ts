import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';
import { TodoItem } from '../../models/todo-item.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoServiceMock: jasmine.SpyObj<TodoService>;
  const todoItemMock: TodoItem = { _id: '1', title: 'Test Todo', active: false };

  beforeEach(() => {
    todoServiceMock = jasmine.createSpyObj('TodoService', ['doneTodo', 'deleteTodo']);
    todoServiceMock.doneTodo.and.returnValue(of());
    todoServiceMock.deleteTodo.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [
        TodoItemComponent,
        HttpClientTestingModule,
    ],
      providers: [
        { provide: TodoService, useValue: todoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todoItem = todoItemMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call doneTodo and emit listUpdated on doneItem', () => {
    spyOn(component.listUpdated, 'emit');
    component.doneItem();
    fixture.detectChanges();

    expect(component.listUpdated.emit).toHaveBeenCalled();
  });

  it('should call deleteTodo and emit listUpdated on deleteItem', () => {
    spyOn(component.listUpdated, 'emit');
    component.deleteItem();
    fixture.detectChanges();

    expect(component.listUpdated.emit).toHaveBeenCalled();
  });
});
