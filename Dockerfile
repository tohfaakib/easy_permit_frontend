# Use an official Node.js runtime as a base image
FROM node:18.0.0-alpine3.15

# Set the working directory in the container
WORKDIR /home/app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install project dependencies
RUN yarn install

# Copy the entire project to the container
COPY . .

# Fix Browerlist: outdated issue
RUN npx update-browserslist-db@latest

# Build the React app
##RUN yarn build

# Expose a port for the React application (e.g., 3000)
EXPOSE 5000

# Specify the command to run your React app
CMD [ "yarn", "start" ]
