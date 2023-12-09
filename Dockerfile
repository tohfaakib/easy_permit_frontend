# Use an official Node.js runtime as a base image
FROM node:18.0.0-alpine3.15

# Set the working directory in the container
WORKDIR /home/app

COPY package.json ./

RUN yarn install --network-timeout=30000
COPY . .
# Expose a port for the React application (e.g., 3000)
EXPOSE 5000

# Specify the command to run your React app
CMD [ "yarn", "start" ]
