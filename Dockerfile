# Dockerfile for building backend and nginx images

# Step 1: Backend api server
FROM node:current-alpine3.21 as backend

# Create new user and set working directory
RUN adduser -D -h /home/app -s /bin/sh app
WORKDIR /backend

# Install backend dependencies
COPY --chown=app:app ./backend/package*.json .
RUN npm install

# Copy backend files
COPY --chown=app:app ./backend/ ./

RUN mkdir /logs && chown -R app:app /logs && chmod 777 /logs

EXPOSE 3000

CMD ["npm","start"]


# Step 2: Compile frontend dist files
FROM node:current-alpine3.21 AS frontend

# Create new user and set working directory
RUN adduser -D -h /home/app -s /bin/sh app

WORKDIR /frontend

# Install frontend dependencies
COPY --from=backend /backend/ /backend/
COPY --chown=app:app ./frontend/package*.json .
RUN npm install

# Copy frontend files
COPY --chown=app:app ./frontend/ ./

RUN npm run build


# Step 3: Setup Nginx server
FROM nginx:stable-alpine3.20-perl AS nginx

# Create new user, directories for volume sharing
RUN adduser -D -h /home/app -s /bin/sh app
RUN mkdir -p /usr/share/nginx/html/.well-known/acme-challenge/ /usr/share/nginx/html/seo/ /etc/nginx/ssl/ /var/log/nginx/
WORKDIR /nginx

# Copy Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy over dist static files compiled in step 2
COPY --from=frontend /frontend/dist/ /usr/share/nginx/html/journey-wonder

EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]
