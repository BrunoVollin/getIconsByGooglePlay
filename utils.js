const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const getAppIconUrl = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const iconUrl = $(".T75of").attr("src");
        return iconUrl;
    } catch (error) {
        console.error(error);
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
    }
  };
  
module.exports = {
    getAppIconUrl,
    saveImage,
};

