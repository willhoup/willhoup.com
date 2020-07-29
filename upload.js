"use strict";

// simple ftp-uploader

require("dotenv").config();
const ftp = require("basic-ftp");

const options = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
};

const flags = process.argv.slice(2);
const beta = flags.includes("beta");
const archive = flags.includes("archive");

// paths
const base = "willhoup.com";
let remotePath;

if (beta) {
  remotePath = `beta.${base}`;
} else if (archive) {
  remotePath = `archive.${base};`;
}

const localPath = "./out/";

const upload = async () => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access(options);
    await client.ensureDir(remotePath);
    await client.clearWorkingDir();
    await client.uploadDir(localPath);

    console.clear(); // since the above gets noisy
    console.log(`Link: ${remotePath}`);

    client.close();
  } catch (e) {
    console.log("error in upload()", e);
  }
};

upload();
