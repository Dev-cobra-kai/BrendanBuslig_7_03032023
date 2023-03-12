// Models : Permet de créer des schémas de données qui contiennent les champs souhaités
// pour indiquer leur type ainsi que leur caractère (obligatoire ou non)
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose

class User {
  constructor(userId, nom, prenom, imageUrl){
    this.userId = userId;
    this.nom = nom;
    this.prenom = prenom,
    this.imageUrl = imageUrl,
    this.like = like;
  }
}

module.exports = User;