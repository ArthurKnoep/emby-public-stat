FROM node:latest
ENV EMBY_KEY=<KEY>
ENV EMBY_URL=<URL>
RUN mkdir /app 
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000

## wait for mongo
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start
