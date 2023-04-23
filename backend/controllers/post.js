// Importer les models de sequelize
const db = require('../models');

const Post = db.Post;
const Comment = db.Comment;
const Like = db.Like;

// Créer un post
exports.createPost = (req, res, next) => {
  //  Eléments de la requète
  const title = req.body.title;
  //  Vérification que tous les champs soient remplis
  if (title === null || title === '') {
    return res.status(400).json({ 'error': "Veuillez remplir le 'Titre' pour créer un post" });
  }
 
  const postObject = req.file ? {
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  // delete postObject._id;

  // const postObject = req.file ?
  // {
  //   ...req.body.post,
  //   imageUrl: req.file.filename
  // } : { ...req.body };

  const post = new Post({
    ...postObject,
  });

  post.save()
    .then(() => res.status(201).json({ message: "Post créé avec succès !" }))
    .catch(error => res.status(400).json({ error: 'Erreur coté client' }));
};

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
  db.Post.findOne({ where: { id: req.params.id } })
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

  // vérification que tous les champs sont remplis
  if (title === null || title === '') {
    return res.status(400).json({ 'error': "Veuillez remplir le 'Titre' pour créer un post" });
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
