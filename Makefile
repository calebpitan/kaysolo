build:
	docker compose up --build

start:
	docker compose up

clean:
	rm -rf ./.next
	rm -rf ./kaybot/.next
