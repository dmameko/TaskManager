import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service'; // Adjust the import path as needed
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let routerMock: Router;

  beforeEach(() => {
    const routerMockStub = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMockStub },
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerMock = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should login and store token in localStorage', () => {
    const mockResponse = { token: 'test-token' };
    const username = 'testUser';
    const password = 'testPass';

    authService.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('test-token');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register and store token in localStorage', () => {
    const mockResponse = { token: 'test-token' };
    const username = 'newUser';
    const password = 'newPass';

    authService.register(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('test-token');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
