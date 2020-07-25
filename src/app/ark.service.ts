import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ArkStatusResponse } from './arkStatusResponse';
import { ArkConfigResponse } from './arkConfigResponse';
import { ArkSession } from './ArkSession';

@Injectable({
  providedIn: 'root'
})
export class ArkService {
  // private serverControllerUrl = 'http://192.168.1.25:8081/ark';  // URL to web api
  private serverControllerUrl = 'http://127.0.0.1:8081/ark';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {

  }

  /** GET hero by id. Will 404 if id not found */
  getStatus(): Observable<ArkStatusResponse> {
    const url = `${this.serverControllerUrl}/status`;
    return this.http.get<ArkStatusResponse>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to retrieve status`)),
      catchError(this.handleError<ArkStatusResponse>(`error with status check`))
    );
  }

  updateArk(): Observable<any> {
    const url = `${this.serverControllerUrl}/update`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted update action`)),
      catchError(this.handleError<any>(`error with update`))
    );
  }

  startSession(sessionName: String): Observable<any> {
    const url = `${this.serverControllerUrl}/start/${sessionName}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to start session: ${sessionName}`)),
      catchError(this.handleError<any>(`error starting session: ${sessionName}`))
    );
  }

  createAndStartSession(sessionName: String, mapName: String): Observable<any> {
    const url = `${this.serverControllerUrl}/createmap/${sessionName}/${mapName}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to create and start session: ${sessionName}, map: ${mapName}`)),
      catchError(this.handleError<any>(`error creating and starting session: ${sessionName}, map: ${mapName}`))
    );
  }

  saveAndStopSession(): Observable<any> {
    const url = `${this.serverControllerUrl}/stop`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to stop session.`)),
      catchError(this.handleError<any>(`error stopping session.`))
    );
  }

  saveAndExportSession(): Observable<any> {
    const url = `${this.serverControllerUrl}/saveAndExport`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to save session.`)),
      catchError(this.handleError<any>(`error saving session.`))
    );
  }

  getSessions(): Observable<ArkSession[]>  {
    const url = `${this.serverControllerUrl}/sessions`;
    return this.http.get<ArkSession[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to save session.`)),
      catchError(this.handleError<ArkSession[]>(`error saving session.`))
    );
  }

  getConfig(sessionName: String): Observable<ArkConfigResponse>  {
    const url = `${this.serverControllerUrl}/config/${sessionName}`;  
    return this.http.get<ArkConfigResponse>(url, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to retrieve session config.`)),
      catchError(this.handleError<ArkConfigResponse>(`error retrieving config.`))
    );
  }
  
  saveConfig(sessionName: String, configData: String): Observable<String>  {
    const url = `${this.serverControllerUrl}/config/${sessionName}`;
    return this.http.post<String>(url, configData, this.httpOptions).pipe(
      tap(_ => this.log(`attempted to save session config.`)),
      catchError(this.handleError<String>(`error saving config.`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
