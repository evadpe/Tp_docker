# MERN Library Management System

Un projet CRUD complet de gestion de librairie développé avec la stack MERN (MongoDB, Express, React, Node.js).  
Ce projet permet d'ajouter, modifier, supprimer et afficher des livres.

##  Fonctionnalités

- Ajouter, modifier et supprimer des livres
- Afficher une liste de livres
- Recherche de livres via ISBN 
- API RESTful avec Express.js et MongoDB
- Interface utilisateur moderne avec React et Bootstrap
- Conteneurisation avec Docker
- Gestion des erreurs et des réponses 

##  Technologies utilisées

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Autres:** Docker, Axios, Postman (pour tester l’API)

---

## Backend 

### Routes 

| Action                                      | Méthode | Endpoint        |
|---------------------------------------------|---------|-----------------|
| Récupérer la liste des livres               | GET     | /api/books      |
| Ajouter un nouveau livre                    | POST    | /api/books      |
| Récupérer les détails d'un livre spécifique | GET     | /api/books:ISBN |
| Mettre à jour un livre existant             | PUT     | /api/books:ISBN |
| Supprimer un livre                          | DELETE  | /api/books:ISBN |
| Retourner le statut du serveur              | GET     | /status         |

### Codes de réponses 

#### **GET /api/books** → Récupérer tous les livres
- `200 OK` : Succès, retourne la liste des livres.
- `404 Not Found` : Aucun livre dans la base de données.
- `500 Internal Server Error` : Problème interne.

#### **GET /api/books/:ISBN** → Récupérer un livre spécifique
- `200 OK` : Livre trouvé.
- `400 Bad Request` : ID invalide.
- `404 Not Found` : Livre non trouvé.
- `500 Internal Server Error` : Erreur côté serveur.

#### **POST /api/books** → Ajouter un nouveau livre
- `201 Created` : Livre ajouté avec succès.
- `400 Bad Request` : Champs manquants (name, author, ISBN).
- `409 Conflict` : Livre avec le même ISBN déjà existant.
- `500 Internal Server Error` : Problème serveur.

#### **PUT /api/books/:ISBN** → Modifier un livre
- `200 OK` : Livre mis à jour avec succès.
- `400 Bad Request` : Données de mise à jour manquantes.
- `404 Not Found` : Livre non trouvé.
- `500 Internal Server Error` : Erreur lors de la mise à jour.

#### **DELETE /api/books/:ISBN** → Supprimer un livre
- `200 OK` : Livre supprimé avec succès.
- `404 Not Found` : Livre non trouvé.
- `500 Internal Server Error` : Erreur serveur lors de la suppression.


### Infos supplémentaires

Le serveur écoute par défaut sur le port 3000.
Une URL de base pour la connexion à la base de données est définie : 
La gestion minimale des CORS est assurée pour permettre les requêtes depuis le frontend.

## Instructions pour le déploiement en local

###  Cloner le projet avec Git

```bash
git clone https://github.com/votre-repo/mern-library.git
cd mern-library
```
### Démarrer les services avec docker (spoiler : ça marche pas)

Exécutez MongoDB dans un conteneur :

```bash
docker run -d --name mongodb -p 27017:27017 mongo
```
Vérifiez que MongoDB fonctionne :

```bash
docker ps
```

### Démarrer le projet 
#### Backend (Express.js)
Accédez au dossier backend :

```bash
cd backend
```
Installez les dépendances :

```bash
npm install
```
Configurez votre fichier .env :

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/mern_library
```
Démarrez le serveur :

```bash
npm start
```

#### Frontend (React.js)

Accédez au dossier frontend :

```bash
cd ../frontend
```

Installez les dépendances :

```bash
npm install
npm install react-router-dom 
```

Modifiez le fichier .env :

```bash
REACT_APP_API_URL=http://localhost:5000/api

```
Démarrez l’application :

```bash
npm start
```

PS : Merci pour le CTRL SHIFT ECHAP je l'ai utilisé 5 fois ce soir 🤓