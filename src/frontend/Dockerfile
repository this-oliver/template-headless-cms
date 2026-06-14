FROM node:24-bookworm-slim@sha256:2c87ef9bd3c6a3bd4b472b4bec2ce9d16354b0c574f736c476489d09f560a203

# Define build arguments (with defaults) and set environment variables
ARG PORT=3000

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
COPY app/ ./app/
COPY public/ ./public/
COPY README.md ./
COPY nuxt.config.ts ./
COPY tsconfig.json ./

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE $PORT

# Set user to run the application and give them permissions to the app directory
RUN chown -R node:node /app
USER node

# Start the application
ENTRYPOINT ["node", ".output/server/index.mjs"]
