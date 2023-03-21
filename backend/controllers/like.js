// Liker et disliker
exports.likeProfil = (req, res, next) => {
    const profilLikeObject = req.body;
    console.log(profilLikeObject);
    Profil.findOne({ _id: req.params.id })
        .then((profil) => {
            // like = +1
            if ((!profil.usersLiked.includes(req.body.userId)) && (req.body.like == 1)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Like ajouté" }))
                    .catch((error) => { res.status(400).json({ error }) });
            };
            // like = 0
            if ((profil.usersLiked.includes(req.body.userId)) && (req.body.like == 0)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Like supprimé" }))
                    .catch((error) => { res.status(400).json({ error }) });
            }
            // like = -1 (dislike = +1)
            if ((!profil.usersDisliked.includes(req.body.userId)) && (req.body.like == -1)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Dislike ajouté" }))
                    .catch((error) => { res.status(400).json({ error }) });
            };
            // dislike = 0
            if ((profil.usersDisliked.includes(req.body.userId)) && (req.body.like == 0)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Dislike supprimé" }))
                    .catch((error) => { res.status(400).json({ error }) });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};
