import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log'
import { LogService } from '../../services/log.service'

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string
  text: string
  date: any

  isNew: boolean = true

  constructor(private _logService: LogService) { }

  ngOnInit() {
    // SUBSCRIBE to the selectedLog Observable
    this._logService.selectedLog.subscribe(log => {
      if(log.id != null) {
        this.isNew = false
        this.id = log.id
        this.text = log.text
        this.date = log.date
      }
    })
  }

  onSubmit() {
    // CHECK FOR NEW LOG
    if(this.isNew) {
      // CREATE NEW LOG
      const newLog = {
        id: this.generateID(),
        text: this.text,
        date: new Date()
      }
      // ADD LOG
      this._logService.addLog(newLog)
    } 
    else {
      // EDIT LOG
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this._logService.editLog(updLog)
    }

    // CLEAR STATE
    this.clearState()
  }
  clearState() {
    this.isNew = true
    this.id = ''
    this.text = ''
    this.date = ''
    this._logService.clearState()
  }
  generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
