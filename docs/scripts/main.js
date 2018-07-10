/* eslint-disable require-jsdoc */
import {OneColorPngWriter} from "/scripts/OneColorPngWriter.js";

const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const downloadLinkEl = document.getElementById("downloadLink");

const resolutionsList = document.getElementById("resolutionsList");
resolutionsList.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.nodeName === "A") {
        // const row = event.target.parentNode;
        widthInput.value = event.target.dataset.width;
        heightInput.value = event.target.dataset.height;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        // console.log(row);
    }
}, false);


function writeAndDownloadWallpaper(event) {
    event.preventDefault();

    const width = widthInput.value;
    const height = heightInput.value;

    const pngWriter = new OneColorPngWriter(width, height, [0, 0, 0]);
    pngWriter.write();
    downloadLinkEl.download = `pitchblackwallpaper-${width}x${height}.png`;
    downloadLinkEl.href = pngWriter.getObjectURL();
    downloadLinkEl.click();
}

const downloadButtonEl = document.getElementById("downloadButton");
downloadButtonEl.addEventListener("click", writeAndDownloadWallpaper);


