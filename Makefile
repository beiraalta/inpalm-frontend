deploy-dev:
	docker-compose -f docker-compose-dev.yml up -d

deploy-production:
	docker-compose -f docker-compose.yml up -d