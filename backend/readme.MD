# Les poutes pour Postman
Authentification par TOKEN
## La route POST pour s'inscrire
http://localhost:3000/api/auth/signup
Body -> raw -> text = JSON
{
    "email": "bob@free.fr",
    "password": "Azerty123" 
}
## La route POST pour se logger
http://localhost:3000/api/auth/login
Body -> raw -> text = JSON
{
    "email": "bob@free.fr",
    "password": "Azerty123" 
}
## La route POST pour créer l'user
http://localhost:3000/api/user/
Params : KEY -> userId 
         VALUE -> _id user
Authorization : Bearer Token -> Token : xxxxxxx
Body : form-data
KEY : profil
VALUE :
    {
        "userId": "640616da951f56dfae00bed4",
        "nom": "Dubois",
        "prenom": "Martin",
        "imageUrl": "",
        "__v": 0
    }
KEY : image + File
VALUE : Select Files
## La route GET pour voir tous les users
http://localhost:3000/api/user/
Authorization : Bearer Token -> Token : xxxxxxx
Body -> raw -> text = JSON
{
    "userId": "640616da951f56dfae00bed4"
}
## La route GET pour voir l'user
http://localhost:3000/api/user/:id
Authorization : Bearer Token -> Token : xxxxxxx
Params : KEY -> userId 
         VALUE -> 640616da951f56dfae00bed4
## La route PUT pour modifier l'user
http://localhost:3000/api/user/:id
Params : KEY -> userId 
         VALUE -> _id user
Authorization : Bearer Token -> Token : xxxxxxx
Body -> raw -> text = JSON
{
    "email": "test@test.fr",
    "lastName": "Dupont",
    "firstName": "Claude"
}
## La route DELETE pour modifier l'user
http://localhost:3000/api/user/:id
Params : KEY -> userId 
         VALUE -> _id user
Authorization : Bearer Token -> Token : xxxxxxx
## La route POST pour like et dislike
http://localhost:3000/api/user/:id/like
Authorization : Bearer Token -> Token : xxxxxxx
Body -> raw -> text = JSON
{
    "userId": "640616da951f56dfae00bed4"
    "like": 0 (1=like, -1=dislike)
}
