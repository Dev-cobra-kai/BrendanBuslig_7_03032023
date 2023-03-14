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
  hashPassword = async() => {
    try {
      const hashPassword = bcrypt.hash(this.password, 10);
      return hashPassword;
    } catch (err) {
      console.log(err);
    }
  };
}

// Afficher tous les users
User.getAllUser = (result) =>{
  mysqldb.query('SELECT * FROM user WHERE is_deleted=0', (err, res)=>{
      if(err){
          console.log('Erreur pour voir tous les users', err);
          result(null,err);
      }else{
          console.log('Aperçu de tous les users');
          result(null,res);
      }
  })
}

// create new user
User.createUser  = (userData, result) =>{
  mysqldb.query('INSERT INTO user SET ? ', (err, res)=>{
      if(err){
          console.log('Error while inserting data');
          result(null, err);
      }else{
          console.log('Employee created successfully');
          result(null, res)
      }
  })
}

module.exports = User;

