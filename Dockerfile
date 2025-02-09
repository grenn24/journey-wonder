FROM node:lts-jod

WORKDIR /app

COPY ./backend .

RUN npm install

RUN useradd app

RUN mkdir /logs

EXPOSE 3000

CMD ["npm","start"]