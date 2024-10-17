# Utiliser une image de base Node.js
FROM node:20.10.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Exposer le port 3000 (ou le port que votre application utilise)
# EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
