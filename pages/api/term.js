// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import { promises as fs } from 'fs';

let currentTime = 35
let randomNum = 0

export default async function handler(req, res) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');

  // Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/web3terms.json', 'utf8');
  const termsObj = JSON.parse(fileContents)

  // Gets a random term from the list (json)
  var index = randomNum
  if (currentTime != new Date().getMinutes()) {
    currentTime = new Date().getMinutes()
    index = Math.floor(Math.random() * 125);
    randomNum = index
  }
  const termInfo = termsObj['terms'][index]

  // Return the content of the data file in json format
  res.status(200).json(termInfo);
}
