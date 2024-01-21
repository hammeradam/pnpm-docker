if [ -f .env ]
then
  export $(cat .env | xargs)
fi

docker compose -f docker-compose.local.yaml up --build --force-recreate