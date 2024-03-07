import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { expectedUsers } from './testdata/user';

describe('AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registers a user', () => {
    let mockUser = {
      firstName: 'user',
      lastName: 'user',
      email: 'user@gmail.com',
      password: 'user',
    };
    service
      .registerUser(mockUser)
      .subscribe((res) => {
        expect(res.message).toEqual('Account created successfully');
      });

    const mockReq = testingController.expectOne('http://localhost:3000/users/register');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(mockUser);
    mockReq.flush({ message: 'Account created successfully' });
  });

  // it('logs in a user', ()=>{
  //   service.loginUser('user@gmail.com',).subscribe((res) => {
  //     expect(res.message).toEqual('Logged  in successfully');
  //   });

  //   let mockUser = {
  //     email: 'user@gmail.com',
  //     password: 'user',
  //   };

  //   const mockReq = testingController.expectOne('http://localhost:4000/users/auth/login');
  //   expect(mockReq.request.method).toEqual('POST')
  //   expect(mockReq.request.body).toEqual(mockUser)
  //   mockReq.flush({message: "Logged  in successfully"})
  // })

  
});
