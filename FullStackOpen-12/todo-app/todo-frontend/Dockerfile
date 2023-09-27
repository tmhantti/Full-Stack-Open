FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# install packages
RUN npm ci

COPY . .

# tests
# RUN npm test

# build
RUN npm run build

# serve
RUN npm install -g serve

CMD ["serve", "-s", "build"]
