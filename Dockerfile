FROM node:lts-jod

RUN useradd --create-home --shell /bin/bash app

WORKDIR /app

COPY --chown=app:app ./backend/package*.json .
RUN npm install

COPY --chown=app:app ./backend ./

RUN mkdir /logs && chown -R app:app /logs && chmod 777 /logs

EXPOSE 3000

CMD ["npm","start"]