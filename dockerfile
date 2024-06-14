FROM node:16 

# Set working directory
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install --only=production
RUN npm install typescript

# Copy Node.js application code
COPY . .

# Build the application
RUN npm run build
EXPOSE 3000

# Command to start your application
CMD ["npm", "start"]
