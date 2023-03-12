// Pour enregistrer un nouvel utilisateur
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
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