import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../models/User"; 
import { Observable,  BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from "./error-handler.service";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
//   private url= "http://localhost:3000/auth";
//   isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
//   userId!: Pick<User, "id">;

//   httpOptions: { headers: HttpHeaders } = {
//     headers: new HttpHeaders({ "Content-Type": "application/json" }),
//   };

  
//   constructor(
//     private http: HttpClient,
//      private errorHandlerService: ErrorHandlerService,
//      private router: Router
//      ) { }
 

//   signup(user: Omit<User, "id">): Observable<User> {
//     return this.http
//       .post<User>(`${this.url}/signup`, user, this.httpOptions)
//       .pipe(
//         first(),
//         catchError(this.errorHandlerService.handleError<User>("signup"))
//       );
//   }

//   login(
//     email: Pick<User, "email">,
//     password: Pick<User, "password">
//   ): Observable<{
//     token: string;
//     userId: Pick<User, "id">;
//   }> {
//     return this.http
//       .post(`${this.url}/login`, { email, password }, this.httpOptions)
//       .pipe(
//         first(Object),
//         tap((tokenObject: { token: string; userId: Pick<User, "id"> }) => {
//           this.userId = tokenObject.userId;
//           localStorage.setItem("token", tokenObject.token);
//           this.isUserLoggedIn$.next(true);
//           this.router.navigate(["offres"]);
//         }),
//         catchError(
//           this.errorHandlerService.handleError<{
//             token: string;
//             userId: Pick<User, "id">;
//           }>("login")
//         )
//       );
//   }


// }

isUserLoggedIn$ = new BehaviorSubject<boolean>(false); //globally : tells us if the user is logged in or not
  userId!: Pick<User, 'id'>; //if a particular user is signed in or not
 //if a particular user is signed in or not
  private url = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
   // private userService: UserService
  ) {}

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions) //sending the user
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string;
    userId: Pick<User, 'id'>;
    role: string;
  }> {
    //will pick from the user the email and the password
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions) //sending the email and the password
      .pipe(
        first(Object),
        tap(
          (tokenObject: {
            token: string;
            userId: Pick<User, 'id'>;
            role: string
          }) => {
            this.userId = tokenObject.userId;
            localStorage.setItem('token', tokenObject.token); //store the response in local storage
            this.isUserLoggedIn$.next(true);
          //  this.userService.setRole(tokenObject.role == 'admin');
            //console.log(tokenObject.role);
            this.router.navigate(['offres']);
          }
        ),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, 'id'>;
            role: string;
          }>('login')
        )
      );
  }

  //loggedIn() {
    //return !!localStorage.getItem('token');
 // }
}
