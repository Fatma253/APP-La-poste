import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Offre } from '../models/Offre';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private url = "http://localhost:3000/offre";
 
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Offre[]> {
    return this.http
      .get<Offre[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Offre[]>("fetchAll", []))
      );
  }

  createOffre(
    formData: Partial<Offre>,
    userId: Pick<User, "id">
  ): Observable<Offre> {
    return this.http
      .post<Offre>(
        this.url,
        { titre: formData.titre, description: formData.description, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Offre>("createOffre"))
      );
  }

  deleteOffre(offreId: Pick<Offre, "id">): Observable<{}> {
    return this.http
      .delete<Offre>(`${this.url}/${offreId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Offre>("deleteOffre"))
      );
  }

}
