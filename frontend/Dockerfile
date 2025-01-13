# Use official Node.js image
FROM node:14

# Set working directory for frontend
WORKDIR /app

# Copy frontend-specific files
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the React frontend
RUN npm run build

# Expose port 3000 for frontend
EXPOSE 3000

# Serve the React app using a lightweight server (like serve)
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
