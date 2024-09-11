# Use an official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port on which the backend listens
EXPOSE 5000

# Start the application using npm run dev
CMD ["npm", "run", "dev"]
