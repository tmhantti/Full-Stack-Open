FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# install packages
RUN npm ci

COPY . .

CMD ["npm", "run" "build"]