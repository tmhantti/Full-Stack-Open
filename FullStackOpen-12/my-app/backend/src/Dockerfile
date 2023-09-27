# Use an official Node runtime as the parent image
FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci 

EXPOSE 3000

# Define the command to run on container start
CMD [ "npm", "run", "start" ]

