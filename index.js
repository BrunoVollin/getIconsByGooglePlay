const { getAppIconUrl, saveImage } = require("./utils");
const fs = require("fs");

saveImageByURL = async (url, fileName) => {
    fileName = fileName.toLowerCase();
    try {
        const iconUrl = await getAppIconUrl(url);
        await saveImage(iconUrl, fileName);
        console.log("Image saved successfully in " + fileName + ".png");
    } catch (error) {
        console.error(error);
        throw error
    }
};

fs.readFile("images.txt", "utf-8", (error, data) => {
    if (error) {
        console.error(error);
        return;
    }

    const lines = data.split("\n");


    for (const line of lines) {
        const url = line;
        const fileName = line.split(/[=&]/)[1]
        saveImageByURL(url, fileName);
    }
});