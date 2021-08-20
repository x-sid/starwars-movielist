FROM node:14-alpine

# setting working directory in the container
WORKDIR /home/node/app

COPY package*.json ./

# installing the dependencies into the container
RUN npm install

# create user in the docker image
USER node

COPY . .

# container exposed network port number
EXPOSE 4000

# command to run within the container
CMD [ "npm", "start" ]