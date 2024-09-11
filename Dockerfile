# Use an official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port for the frontend
EXPOSE 3000

# Start the React application with npm start
CMD ["npm", "start"]
