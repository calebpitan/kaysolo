FROM tiangolo/uvicorn-gunicorn:python3.11 as server
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /kaysolo/dissertation/kaybot-services
COPY ./kaybot-services/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./kaybot-services .
CMD ["python", "./main.py"]

# Build client
FROM node:16-alpine AS client-build

# Run with `--build-arg server_base_url=http://example.com`
ARG server_base_url

# Required for build as communication is made to server
# during build (`yarn build`)
ENV SERVER_BASE_URL=$server_base_url

# Define working directory for client
WORKDIR /kaysolo/dissertation/kaybot

# Copy package metadata for client
COPY ./kaybot/package.json .
COPY ./kaybot/yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy other source files except those ignored in .dockerignore
COPY ./kaybot .

# Run build script
RUN yarn build


# Build production image
FROM node:16-alpine as client-prod

# Define working directory for client
WORKDIR /kaysolo/dissertation/kaybot

# Copy package metadata for client
COPY ./kaybot/package.json .
COPY ./kaybot/yarn.lock .

# Install production only dependencies
RUN yarn install --production --frozen-lockfile

# Copy build files from previous stage
COPY --from=client-build /kaysolo/dissertation/kaybot/.next ./.next

# Define default container start script
CMD ["yarn", "start"]
