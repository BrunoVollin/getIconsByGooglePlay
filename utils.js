const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const getAppIconUrl = async (url) => {
  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar a URL: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();

    const $ = cheerio.load(responseText);
    const iconUrl = $(".T75of").attr("src");

    return iconUrl;
  } catch (error) {
    console.error(error);
    throw error
  }
};



const saveImage = async (url, fileName) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const filePath = `images/${fileName}.png`;
    response.data.pipe(fs.createWriteStream(filePath));

    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });

      response.data.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error(error);
    throw error
  }
};

module.exports = {
  getAppIconUrl,
  saveImage,
};

