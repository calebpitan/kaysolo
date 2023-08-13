#!/usr/bin/env bash

# https://stackoverflow.com/a/70976611/8124214
psql -U ${POSTGRES_USER} <<-END
  CREATE DATABASE kaybot
    WITH
    OWNER = ${POSTGRES_USER}
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

  CREATE DATABASE "kaybot_test"
    WITH
    OWNER = ${POSTGRES_USER}
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
END
