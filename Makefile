deploy-vthub-dev:
	docker build --build-arg type_env=dev -t inpalm-frontend:dev .
	docker-compose -f composes/dev/docker-compose.yml up -d

deploy-vthub-production:
	docker build --build-arg type_env=production -t inpalm-frontend:production .
	docker-compose -f composes/production/docker-compose.yml up -d