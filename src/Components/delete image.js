const handleDelete = (uid) =>{
    db.collection("blog").doc(uid).get()
    .then((documentSnapshot)=>{
        if(documentSnapshot.exists){
            const {imageUrl} = documentSnapshot.data()
            if(imageUrl != null){
              const storageRef = storage.refFromURL(imageUrl)
              const imageRef = storage.ref(storageRef.fullPath)

              imageRef
              .delete()
              .then(()=>{
                  console.log("image deleted")
                  deleteFirestoreData(uid)
              })
              .catch((e)=>{
                  console.log(e);
              })
            }
        }    
    })
  }