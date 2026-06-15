"use strict";

const crypto = require("node:crypto");
const path = require("node:path");
const process = require("node:process");
const fs = require("fs-extra");

function generateHexToken(byteLength = 16) {
  // Generate the random bytes
  const buffer = crypto.randomBytes(byteLength);

  // Convert the buffer to a hexadecimal string
  return buffer.toString("hex");
}

function generateEnvFile() {
  const ENV_FILE_PATH = path.join(process.cwd(), ".env");

  const ENV = {
    SERVER: {
      HOST: "0.0.0.0",
      PORT: 1337
    },
    SECRETS: {
      APP_KEYS: `${generateHexToken()},${generateHexToken()},${generateHexToken()}`,
      API_TOKEN_SALT: "",
      ADMIN_JWT_SECRET: generateHexToken(),
      TRANSFER_TOKEN_SALT: "",
      ENCRYPTION_KEY: generateHexToken()
    },
    DATABASE: {
      DATABASE_CLIENT: "sqlite",
      DATABASE_HOST: "",
      DATABASE_PORT: "",
      DATABASE_NAME: "",
      DATABASE_USERNAME: "",
      DATABASE_PASSWORD: "",
      DATABASE_SSL: false,
      DATABASE_FILENAME: ".database/data.db",
      JWT_SECRET: generateHexToken()
    }
  };

  // create a .env file
  if (!fs.existsSync(ENV_FILE_PATH)) {
    let payload = "";
    for (const section in ENV) {
      let sectionVariables = `${payload.length > 0 ? "\n#" : "#"} ${section}\n`;
      for (const v in ENV[section]) {
        sectionVariables += `${v}=${ENV[section][v]}\n`;
      }
      payload += sectionVariables;
    }
    fs.writeFileSync(ENV_FILE_PATH, payload);
    console.log(`Generated a new .env file at ${ENV_FILE_PATH}`);
  } else {
    console.log("The .env file already exists! Delete or rename it and try again.");
  }
}

async function main() {
  generateEnvFile();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
