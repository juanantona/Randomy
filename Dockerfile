# Base image from Docker Hub we want to build from
FROM node:6.17.0-jessie

# Default directory that is used for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions.
# To use a pre-existing folder /usr/src/app is better suited for this
WORKDIR /usr/src/app

# Copy your package.json and package-lock.json before you copy your code into the container
# Docker will cache installed node_modules as a separate layer
COPY package*.json ./
RUN npm install

# Copy entire local directory into working directory on docker container to bundle the application source code
# ".": current directory / ".": workdir on docker container
COPY . .

# Default command to execute our container
CMD [ "npm", "start" ]
