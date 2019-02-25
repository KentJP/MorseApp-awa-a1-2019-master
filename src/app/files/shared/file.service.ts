import { Injectable } from '@angular/core';
import{FileMeta} from './file-meta';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFireStorage} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { }

  upload(file: File): Observable<FileMeta>{
    this.storage.ref('Product-pictures' + file.name)
    return Observable.create();

  }
}
