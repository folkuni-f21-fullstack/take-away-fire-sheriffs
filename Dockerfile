
FROM node:lts-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build
RUN npm run build-backend


EXPOSE 8080


# CMD körs när man startar containern
# CMD ["http-server", "dist", "-p", "1337"]
CMD ["npm", "run", "start-backend"]