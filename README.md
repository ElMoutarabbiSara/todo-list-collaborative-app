# FocusFlow-todo-list-collaborative-app

Une application web **collaborative** permettant à des utilisateurs de :

- 🔐 Créer un compte et se connecter
- 🗂️ Gérer plusieurs **projets**
- ✅ Ajouter des **tâches** liées à ces projets
- 📊 Suivre l’état d’avancement via un tableau de bord

---

## ⚙️ Stack Technique

| Côté         | Technologie                  |
|--------------|------------------------------|
| Frontend     | React `18.2.0`               |
| Backend      | Spring Boot `3.3.11`, Java `17` |
| Base de données | MySQL via WampServer `3.3.5 - 64bit` |

---

## 📁 Structure des entités

### 👤 Utilisateur
- ID
- Nom d'utilisateur
- Mot de passe
- Liste des projets

### 📁 Projet
- ID
- Titre
- Description
- Liste des tâches

### ✅ Tâche
- ID
- Contenu
- État (à faire, en cours, terminé)
- Projet associé

---

## 🔧 Configuration Backend

`src/main/resources/application.properties` :

```properties
spring.application.name=backend

spring.datasource.url=jdbc:mysql://localhost:3308/todolist
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.security.user.name=admin
spring.security.user.password=admin
server.port=8080
```

✅ **Base de données :** `todolist`  
✅ **Port MySQL :** `3308` (via WampServer)

---

## 🚀 Démarrer le projet

### 🔹 Backend

```bash
cd backend
mvn spring-boot:run
```

🌐 API : [http://localhost:8080](http://localhost:8080)

### 🔹 Frontend

```bash
cd frontend
npm install
npm start
```

🖥️ Application : [http://localhost:3000](http://localhost:3000)

> ℹ️ Assurez-vous que CORS est activé côté Spring Boot.

---

## 🔐 Connexion par défaut

| Identifiant       | Valeur  |
|-------------------|---------|
| Nom d'utilisateur | `admin` |
| Mot de passe      | `admin` |

> Modifiables dans le fichier `application.properties`

---

## 🧭 Fonctionnalités principales

- 🧑‍💼 Authentification utilisateur sécurisée
- 📁 Gestion de projets
- ✅ Ajout et gestion des tâches
- 🟢 Indicateur d’état visuel des tâches (à faire, en cours, terminé)
- 📊 Affichage dans un tableau de bord

---

## 📂 Arborescence du projet

```
projet-todolist/
├── backend/              # Spring Boot
│   ├── src/
│   └── pom.xml
├── frontend/             # React
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   └── package.json
└── README.md
```

## 📄 Licence

Projet open source, libre pour usage pédagogique et personnel.

---

## 👥 Contribuer

Pull requests bienvenues !  
Forkez, codez, proposez !

