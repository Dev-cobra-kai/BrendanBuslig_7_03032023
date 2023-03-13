// Models : Permet de créer des schémas de données qui contiennent les champs souhaités
// pour indiquer leur type ainsi que leur caractère (obligatoire ou non)
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose

// Pour enregistrer un nouvel utilisateur
class User {
  constructor(userId, email, password, nom, prenom, imageUrl) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.nom = nom;
    this.prenom = prenom,
    this.imageUrl = imageUrl;
  }
  // Hasher le password avant de l'envoyer dans la BDD
  hashPassword = async function () {
    try {
      const hashPassword = bcrypt.hash(this.password, 10);
      return hashPassword;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = User;

