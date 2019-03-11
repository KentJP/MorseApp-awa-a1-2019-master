import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp()

exports.deleteProduct = functions.firestore
  .document('Products/{productID}')
  .onDelete((snap, context) => {
    return new Promise((resolve, reject) => {


      // Get an object representing the document prior to deletion
      // e.g. {'name': 'Marie', 'age': 66}
      const deletedProduct = snap.data();
      if (deletedProduct){
        admin.firestore().collection('Files').doc(deletedProduct.pictureId)
          .delete()
          .then(value=> resolve(value), err=> reject(err))
          .catch(error=> reject(error))

      }
      else{
        reject('error! No product was deleted')
      }
    });
  });

exports.uploadNewProductImage =
  functions.storage.object().onFinalize((object) => {
    return new Promise((resolve, reject) => {
      if(object && object.name && object.metadata) {
        const fileMeta = {
          lastModified: object.updated,
          name: object.metadata.originalName,
          type: 'image/png',
          size: object.size
        };
        const nameForDoc = object.name.split('/')[1];
        admin.firestore().collection('Files')
          .doc(nameForDoc)
          .set(fileMeta)
          .then(value => resolve(value))
          .catch(err => reject(err))
      } else {
        reject('Error happened');
      }
    });
  });

exports.products = functions.https.onRequest((request, response) => {
  admin.firestore().collection('Products')
    .get()
    .then(products => {
      const listOfProducts: any = [];
      products.forEach(product => {
        const prod = product.data();
        prod.id = product.id;
        listOfProducts.push(prod);
      })
      response.json(listOfProducts);
    })
    .catch(err => {console.log(err)})

});
