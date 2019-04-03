FROM node:6.17.0-jessie

# Set default directory that is used for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions.
# Use a pre-existing folder/usr/src/app that is better suited for this
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
