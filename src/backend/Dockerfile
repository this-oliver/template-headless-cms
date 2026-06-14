FROM node:24-bookworm-slim@sha256:2c87ef9bd3c6a3bd4b472b4bec2ce9d16354b0c574f736c476489d09f560a203

# Define build arguments (with defaults) and set environment variables
ARG HOST=0.0.0.0
ENV HOST=$HOST
ARG DATABASE_CLIENT=sqlite
ENV DATABASE_CLIENT=$DATABASE_CLIENT
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG PORT=1337

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install dependencies
RUN npm install -g pnpm@11.5.0 \
  && pnpm install

# Copy the rest of the application code
COPY config/ ./config/
COPY database/ ./database/
COPY public/ ./public/
COPY src/ ./src/
COPY favicon.png ./
COPY tsconfig.json ./

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE $PORT

# Set user to run the application and give them permissions to the app directory
RUN chown -R node:node /app
USER node

# Start the application
ENTRYPOINT ["pnpm", "start"]
