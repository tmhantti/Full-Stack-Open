# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy just the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 3000
# ENV PORT=3000
# ENV HOST=0.0.0.0

# Define the command to run on container start
# CMD ["npm", "start"]
CMD ["npm", "dev"]

# Make the wait-for-it script executable
# COPY wait-for-it.sh wait-for-it.sh
# RUN chmod +x wait-for-it.sh
#CMD ["./wait-for-it.sh", "mongo:27017", "--", "npm", "start"]
