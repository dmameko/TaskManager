import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthInterceptor]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    httpHandler = TestBed.inject(HttpHandler);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should add Authorization header when token exists', () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    const request = new HttpRequest('GET', '/api/test');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(request, next).subscribe();
  });

  it('should not add Authorization header when token does not exist', () => {
    const request = new HttpRequest('GET', '/api/test');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(request, next).subscribe();
  });
});
