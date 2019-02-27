import { Injectable } from '@angular/core';
import{FileMeta} from './file-meta';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {from} from 'rxjs/internal/observable/from';
import {catchError, finalize, first, map, switchMap} from 'rxjs/operators';
import {defer} from 'rxjs/internal/observable/defer';
import {throwError} from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  upload(file: File): Observable<FileMeta> {
    return this.addFileMetadata(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }
    ).pipe(
      switchMap(fileMeta => {
        return defer(() =>
          this.storage.ref('product-pictures/' + fileMeta.id)
            .put(file)
            .then()
        ).pipe(
          map(fileRef => {
            return fileMeta;
          })
        );
      })
    );
  }




  addFileMetadata(meta: FileMeta): Observable<FileMeta> {
    debugger;
    return defer(() =>
      this.db.collection('Files')
        .add(meta)
    ).pipe(
      map(documentRef => {
        meta.id = documentRef.id;
        return meta;
      })
    );
  }
}
