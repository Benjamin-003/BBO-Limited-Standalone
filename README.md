# Application Angular - Front

## Lancement de l'application

Dans un terminal, lancer la commande suivante :
"npm start"

-------

# Serveur API - back

## Lancer le serveur API - back

Dans un terminal, lancer la commande suivante pour pouvoir accéder au serveur API :
"npm run jsonServer"

ATTENTION : de façon préliminaire, il faudra créer le dossier mock_db à la racine du projet et ajouter dans ce dossier un fichier db.json

Ci-dessous un exemple d'élément à positionner dans ce fichier :

```
{
"users": 
  [
    {
    "id": 1,
    "first_name": "Marc",
    "last_name": "DUPONT",
    "e-mail": "marc.dupont@yopmail.com",
    "birthdate": 617650621,
    "password": "Toto",
    "optins": 0
    }
  ],
"admins":
  [
    {
      "id": 1,
      "username": "adminIsTheBest",
      "password": "PaSSW0rd"
    }
  ]
}
```

## APIs disponibles

### GET - Liste des utilisateurs existantes

URL à appeler : http://localhost:3000/users
Type d'appel : GET

### POST - Ajouter un utilisateur

URL à appeler : http://localhost:3000/users
Type d'appel : POST
Champs obligatoires :
* first_name - Le prénom de l'utilisateur - Texte court
* last_name - Le nom de famille de l'utilisateur - Texte court
* e-mail - L'e-mail de l'utilisateur - e-mail
* birthdate - La date de naissance de l'utilisateur - Timestamp
* password - Le mot de passe de l'utilisateur - Texte court
* options - Si l'utilisateur accepte ou non la newsletter - Booléen

En cas d'appel réussit, le back répond :
* Code réponse : 201 Created
* Body de la réponse : id, first_name, last_name, e-mail, birthdate, password et optins

### PATCH - Modifier un utilisateur

URL à appeler : http://localhost:3000/users/{id}
Type d'appel : PATCH
Champs obligatoires :
* first_name - Le prénom de l'utilisateur - Texte court
* last_name - Le nom de famille de l'utilisateur - Texte court
* e-mail - L'e-mail de l'utilisateur - e-mail
* birthdate - La date de naissance de l'utilisateur - Timestamp
* password - Le mot de passe de l'utilisateur - Texte court
* options - Si l'utilisateur accepte ou non la newsletter - Booléen

En cas d'appel réussit, le back répond :
* Code réponse : 200 OK
* Body de la réponse : id, first_name, last_name, e-mail, birthdate, password et optins

### GET - Liste des admins existants

URL à appeler : http://localhost:3000/admins
Type d'appel : GET

### POST - Ajouter un admin

URL à appeler : http://localhost:3000/admins
Type d'appel : POST
Champs obligatoires :
* username - Le login de l'administrateur - Texte court
* password - Le mot de passe de l'administrateur - Texte court

En cas d'appel réussit, le back répond :
* Code réponse : 201 Created
* Body de la réponse : id, username et password

### PATCH - Modifier un admin

URL à appeler : http://localhost:3000/admins/{id}
Type d'appel : PATCH
Champs obligatoires :
* username - Le login de l'administrateur - Texte court
* password - Le mot de passe de l'administrateur - Texte court

En cas d'appel réussit, le back répond :
* Code réponse : 200 OK
* Body de la réponse : id, username et password

-------

# Mise en forme et utilisation du thème

Un thème HTML/CSS a été ajouté au projet.

Le CSS est déjà présent dans les assets et appelés depuis le index.html

Dans le dossier /src/source-theme se trouve le thème source duquel il faudra s'inspirer et comprendre le fonctionnement afin de l'implémenter dans le cadre du projet.

Une live démo du thème est disponible ici : https://technext.github.io/mazer/

Cette URL est mise à disposition afin de pouvoir s'assurer que le rendu final correspond bien à ce qui est prévu.