FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# build + serve
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]

# npm start is the command to start the application in development mode
CMD ["npm", "start"]