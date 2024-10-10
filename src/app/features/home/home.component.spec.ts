import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePageComponent } from './home.component';
import { TodoService } from './services/todo.service';
import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { of, throwError } from 'rxjs';
import { AddEditTodoPopupComponent } from './components/add-edit-todo-popup/add-edit-todo-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogRef } from '../../shared/dialog/dialog-ref';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let todoService: TodoService;
  let authService: AuthService;
  let dialogService: DialogService;
  
  const mockTodos = [
    { _id: '1', title: 'Test Todo 1', active: true },
    { _id: '2', title: 'Test Todo 2', active: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HomePageComponent,
      ],
      providers: [
        {
          provide: TodoService,
          useValue: {
            getTodoList: () => of(mockTodos),
            createTodo: () => of(),
          }
        },
        {
          provide: AuthService,
          useValue: {}
        },
        {
          provide: DialogService,
          useValue: {
            open: () => ({
              afterClosed: () => of({ title: 'New Todo' }),
            }),
          }
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    authService = TestBed.inject(AuthService);
    dialogService = TestBed.inject(DialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter todos correctly', () => {
    component.activeItems = [
      { _id: '1', title: 'Test Todo 1', active: true },
      { _id: '2', title: 'Another Todo', active: true },
    ];
    component.doneItems = [
      { _id: '3', title: 'Done Todo', active: false },
    ];

    component.searchValue = 'Test';
    component.filter();

    expect(component.activeItems.length).toBe(1);
    expect(component.doneItems.length).toBe(0);
  });
});
