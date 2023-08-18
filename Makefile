build:
	docker compose --build

up_build:
	docker compose up --build

start:
	docker compose up

clean:
	rm -rf ./.next
	rm -rf ./kaybot/.next

clean_migrations:
	rm ./kaybot-services/alembic/versions/*

clean_python:
	find . -type d -name "__pycache__" ! -path "./venv/*" -exec rm -rf {} +
