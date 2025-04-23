deploy-dev:
	docker-compose -f docker-compose-dev.yml up -d --build

deploy-production:
	    docker-compose up -d --build