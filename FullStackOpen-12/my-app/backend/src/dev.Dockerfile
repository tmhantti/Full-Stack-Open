# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy just the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install
# RUN npm install -g nodemon 

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Define the command to run on container start
CMD [ "npm", "run", "dev" ]

