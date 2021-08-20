FROM node:14-alpine

# create user in the docker image
USER node

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /home/node/app && chown -R 777 node:node /home/node/app

# setting working directory in the container
WORKDIR /home/node/app

COPY package*.json ./

# installing the dependencies into the container
RUN npm install

COPY . .

# container exposed network port number
EXPOSE 4000

# command to run within the container
CMD [ "npm", "start" ]