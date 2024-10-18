
# Documentation de l'API de cours Nest.js

## Introduction
Ce projet est une API Nest.js pour la gestion des cours. Il utilise Prisma pour la connexion à la base de données PostgreSQL, Swagger pour la documentation de l'API, class-Validator pour la validation des données, et Docker/Docker-Compose pour la portabilité.

## Prérequis
- Node.js 18.20
- Docker(Optionnel)
- Docker-Compose(Optionnel)

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/bambadiagne/course_api
    cd course_api
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez les variables d'environnement :
    Créez un fichier `.env` et ajoutez votre chaîne de connexion PostgreSQL :
    ```
    DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
    ```
4. Demarrer le serveur:
    ```bash
    npm run start:dev
    ```
    

5. Exécutez Docker-Compose(Optionnel) :
    ```bash
    docker-compose up -d
    ```


## Utilisation

1. Démarrez l'application :
    ```bash
    npm run start:dev
    ```
2. Accédez à la documentation Swagger :
    Ouvrez votre navigateur et allez à `http://localhost:3000/api`.

## Validation
Ce projet utilise `class-validator` et `class-transformer` pour valider les données entrantes. Assurez-vous que vos DTOs (Data Transfer Objects) sont correctement décorés avec des décorateurs de validation.

## Prisma
Prisma est utilisé pour la connexion à la base de données et l'ORM. Pour appliquer les migrations de la base de données, exécutez :
```bash
npx prisma migrate dev
```
Prisma nous fournit aussi un petit dashboard pour visualiser les données à travers la commande:
```bash
npx prisma studio
```
Une alternative legere à pgadmin

## Docker
L'application est conteneurisée à l'aide de Docker. Utilisez le `docker-compose.yml` fourni pour exécuter l'application dans un conteneur Docker.
