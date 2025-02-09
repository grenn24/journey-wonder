FROM node:lts-jod

WORKDIR /app

COPY ./backend/package*.json .
RUN npm install

COPY ./backend .

RUN useradd app

RUN mkdir /logs

EXPOSE 3000

CMD ["npm","start"]