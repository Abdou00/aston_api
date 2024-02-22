FROM node:18
WORKDIR /project
COPY package.json .
RUN npm i
COPY . .
CMD npm start