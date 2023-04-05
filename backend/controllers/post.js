// Importer les models de sequelize
const db = require('../models');

const Post = db.posts;
const Comment = db.comments;
const Like = db.likes;

// Créer un post
exports.createPost = (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content = req.body.content;

  // vérification que tous les champs sont remplis
  if (title === null || title === '' || content === null || content === '') {
    return res.status(400).json({ 'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un post" });
  }

  const postObject = req.body;

  // Création d'un nouvel objet post
  const post = new Post({
    ...postObject,
  });
  // Enregistrement de l'objet post dans la base de données
  post.save()
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch(error => res.status(400).json({ error }));
}

// Afficher tous les posts
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    order: [
      ['createdAt', 'DESC'],
    ]
  })
    .then(posts => {
      console.log(posts);
      res.status(200).json({ data: posts });
    })
    .catch(error => res.status(400).json({ error }));
};

// Trouver tous les posts de userId
exports.findPostsByUserId = (req, res, next) => {
  Post.findAll({
    where: { userId: req.params.id },
    order: [
      ['createdAt', 'DESC'],
    ]
  })
    .then(posts => {
      console.log(posts);
      res.status(200).json({ data: posts });
    })
    .catch(error => res.status(400).json({ error }));
};

// Afficher un post par son id
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      console.log(post);
      res.status(200).json(post)
    })
    .catch(error => res.status(404).json({ error }));
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content = req.body.content;

  // vérification que tous les champs sont remplis
  if (title === null || title === '' || content === null || content === '') {
    return res.status(400).json({ 'error': "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un post" });
  }

  const postObject = req.body;

  Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  Like.destroy({ where: { postId: req.params.id } })
    .then(() =>
      Comment.destroy({ where: { postId: req.params.id } })
        .then(() =>
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        )
    )
    .catch(error => res.status(400).json({ error }));
};
