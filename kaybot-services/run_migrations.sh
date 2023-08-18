#!/usr/bin/env bash

echo "running migrations commands..."

# shift the $@ args by one to skip $0 which is the name of the running executable
shift

# whatever args are passed to this script when run are redirected to the
# `alembic revision --autogenerate` command
python -m alembic revision --autogenerate $@ # -m "create inital tables"
python -m alembic upgrade head

echo "applied migrations!"
