/* eslint-disable require-jsdoc */
import {OneColorPngWriter} from "/scripts/OneColorPngWriter.js";

const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const downloadLinkEl = document.getElementById("downloadLink");

const resolutionsTable = document.getElementById("resolutionsTable");
resolutionsTable.addEventListener("click", (event) => {
    if (event.target.nodeName === "TD") {
        const row = event.target.parentNode;
        widthInput.value = row.dataset.width;
        heightInput.value = row.dataset.height;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        // console.log(row);
    }
}, true);


function writeAndDownloadWallpaper() {

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
