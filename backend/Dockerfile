FROM node
WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
EXPOSE 5000
CMD npm run start:dev
