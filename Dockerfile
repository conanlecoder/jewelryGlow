# Use official Node.js image
FROM node:14

# Set working directory for backend
WORKDIR /app

# Copy only backend-specific files (root-level package.json)
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (5000 for backend)
EXPOSE 8000

# Command to run the backend server
CMD ["node", "index.js"]
