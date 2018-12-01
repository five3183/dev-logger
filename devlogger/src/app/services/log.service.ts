import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'

import { Log } from '../models/log'

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[]

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null})
  selectedLog = this.logSource.asObservable()

  private stateSource = new BehaviorSubject<boolean>(true)
  stateClear = this.stateSource.asObservable()

  constructor() { 
    this.logs = [
      // {id:'1', text: 'Generated Component 1', date: new Date()},
      // {id:'2', text: 'Generated Component 2', date: new Date},
      // {id:'3', text: 'Generated Component 3', date: new Date()},
    ]
  }
  getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null) {
      this.logs = []
    } 
    else {
      this.logs = JSON.parse(localStorage.getItem('logs'))
    }
    return of(this.logs.sort((a, b) => {
      return b.date - a.date
    }))
  }
  setFormLog(log: Log) {
    this.logSource.next(log)
  }
  addLog(log: Log) {
    this.logs.unshift(log)

    // ADD TO LOCAL STORAGE
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }
  editLog(log: Log) {
    this.logs.forEach((current, index) => {
      if(log.id === current.id) {
        this.logs.splice(index, 1)
      }
    })
    this.logs.unshift(log)
    localStorage.setItem('logs', JSON.stringify(this.logs))

  }
  deleteLog(log: Log) {
    this.logs.forEach((current, index) => {
      if(log.id === current.id) {
        this.logs.splice(index, 1)
      }
    })
    localStorage.setItem('logs', JSON.stringify(this.logs))

  }
  clearState() {
    this.stateSource.next(true)
  }

}
