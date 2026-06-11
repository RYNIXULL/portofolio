const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

async function parseAll() {
  const dir = path.join(__dirname, 'public', 'sertif');
  const files = ['sertif modul 1.pdf', 'sertif modul 2.pdf', 'sertif modul 3.pdf', 'sertif modul 4.pdf'];
  
  for (const file of files) {
    const dataBuffer = fs.readFileSync(path.join(dir, file));
    try {
      const data = await pdf(dataBuffer);
      console.log(`--- ${file} ---`);
      console.log(data.text.substring(0, 500).replace(/\n/g, ' '));
    } catch(e) {
      console.log(e);
    }
  }
}

parseAll().catch(console.error);

parseAll().catch(console.error);
