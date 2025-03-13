# Makefile
CONTAINER_NAME=api_mwongozo

# Définir l'alias pour docker-compose en fonction de ce qui est installé
DOCKER_COMPOSE_CMD := $(shell command -v docker-compose >/dev/null 2>&1 && echo docker-compose || (command -v docker >/dev/null 2>&1 && echo "docker compose" || echo ""))
# Commande pour démarrer le conteneur avec `docker-compose up`
up:
	$(DOCKER_COMPOSE_CMD) up
# Commande pour arrêter le conteneur
down:
	$(DOCKER_COMPOSE_CMD) down

# Commande pour ouvrir un terminal dans le conteneur
container:
	docker exec -it $(CONTAINER_NAME) bash
	
# Commande pour installer les dépendances dans le conteneur
install:
	docker exec -it $(CONTAINER_NAME) npm install

# Commande pour exécuter l'application
start:
	docker exec -it $(CONTAINER_NAME) npm run start:dev

# Commande pour exécuter les tests (si tu en as)
test:
	docker exec -it $(CONTAINER_NAME) npm run test

# Commande pour créer une migration
generate:
	docker exec -it $(CONTAINER_NAME) npx drizzle-kit generate

# Commande pour faire une migration
migrate:
	docker exec -it $(CONTAINER_NAME) npx drizzle-kit migrate