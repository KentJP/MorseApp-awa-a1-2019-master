import { Injectable } from '@angular/core';
import{FileMeta} from './file-meta';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, finalize, first, map, switchMap} from 'rxjs/operators';
import {defer, from, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  upload(file: File): Observable<FileMeta> {
        const uniqueId = this.db.createId();
        return defer(() =>
          this.storage.ref('product-pictures/' + uniqueId)
            .put(file, {
              customMetadata:{
                originalName: file.name
              }
            })
            .then()
        ).pipe(
          map(fileRef => {
            fileRef.id = uniqueId;
            return fileRef;
          })

    );
  }




  addFileMetadata(meta: FileMeta): Observable<FileMeta> {
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

  getFileUrl(id: string): Observable<any> {
    return this.storage.ref('product-pictures/' + id)
      .getDownloadURL();
  }
}
