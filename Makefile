#!/usr/bin/make

include .env
.ONESHELL:
MAKEFLAGS += --silent

#----------- Make Environment ----------------------
.DEFAULT_GOAL := help
COMPOSE_CONFIG=--env-file .env -p "trello" -f docker/docker-compose.yml -f docker/docker-compose.${ENVIRONMENT}.yml

help: ## Show this help
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

---------------: ## ------[ ACTIONS ]---------
#Actions --------------------------------------------------
check: ## Check your configuration
	docker-compose $(COMPOSE_CONFIG) config
up: down ## Start all containers (in background)
	docker-compose $(COMPOSE_CONFIG) up --build --no-recreate -d
down: ## Stop all started containers
	docker-compose $(COMPOSE_CONFIG) down
restart:  ## Restart all started containers
	docker-compose $(COMPOSE_CONFIG) restart
---------------: ## ------[ EXEC ]---------
#Exec --------------------------------------------------
api_exec: ## exec bash on api container
	docker exec -it $(API_SERVICE_CONTAINER) bash
client_exec: ## exec bash on api container
	docker exec -it $(CLIENT_SERVICE_CONTAINER) bash

---------------: ## ------[ LOGS ]---------
#Logs --------------------------------------------------
api_log: ## Show log from api container
	docker logs -tf -n 1000 $(API_SERVICE_CONTAINER)
client_log: ## Show log from api container
	docker logs -tf -n 1000 $(CLIENT_SERVICE_CONTAINER)
---------------: ## ------[ Initial ]---------
#Initial --------------------------------------------------
init: down client_init server_init prisma_init prisma_push ## Init whole project
	echo 'All done'
client_init: ## Init client
	echo 'Init Client'
	cd client;npm i
	echo 'Client initialization successful'
server_init: ## Init server
	echo 'Init Server'
	cd server;npm i
	echo 'Server initialization successful'
prisma_init: ## Init prisma client
	echo 'Init prisma client'
	docker-compose $(COMPOSE_CONFIG) run --no-deps api npx prisma generate
	echo 'Prisma client initialization successful'
---------------: ## ------[ Prisma ]---------
#Prisma --------------------------------------------------
prisma_studio: ## Run prisma studio
	docker exec -it $(API_SERVICE_CONTAINER) npx prisma studio
prisma_push: down ## Push prisma schema to db
	docker-compose $(COMPOSE_CONFIG) run --no-deps -d --name ${DB_SERVICE_CONTAINER} db
	sleep 5
	docker-compose $(COMPOSE_CONFIG) run --no-deps api npx prisma migrate deploy
	docker kill ${DB_SERVICE_CONTAINER}
	docker rm ${DB_SERVICE_CONTAINER}
prisma_flush_db: down ## Flush db
	docker-compose $(COMPOSE_CONFIG) run --no-deps -d --name ${DB_SERVICE_CONTAINER} db
	sleep 5
	docker-compose $(COMPOSE_CONFIG) run --no-deps api npx prisma migrate reset
	docker kill ${DB_SERVICE_CONTAINER}
	docker rm ${DB_SERVICE_CONTAINER}
