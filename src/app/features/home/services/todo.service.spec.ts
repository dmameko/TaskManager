import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo-item.interface';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const mockToken = 'mock-token';

  beforeEach(() => {
    localStorage.setItem('token', mockToken);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todo list', () => {
    const mockTodos: TodoItem[] = [{ _id: '1', title: 'Test Todo', active: false }];

    service.getTodoList().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should create a todo', () => {
    const title = 'New Todo';

    service.createTodo(title).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title });
    req.flush({});
  });

  it('should delete a todo', () => {
    const id = '1';

    service.deleteTodo(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/todos/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should mark a todo as done', () => {
    const id = '1';

    service.doneTodo(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/todos/${id}/active`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ active: false });
    req.flush({});
  });
});
