/* eslint-disable require-jsdoc */

// const wallpaperPathPrefix = "/images/wallpapers/pitchblackwallpaper-{resolution}.png";
const wallpaperPathPrefix = "/images/wallpapers/pitchblackwallpaper-";
const wallpaperPathSuffix = ".png";

let screenResolutions;

const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const downloadLinkEl = document.getElementById("downloadLink");

const deviceList = document.getElementById("deviceList");
const standardList = document.getElementById("standardList");

let commonSizesElems;

const builtinWallpapers = [
    "1080x1920", "1200x1920", "1366x768", "1440x2560", "1440x2960", "1440x900", "1536x2048", "1600x2560",
    "1920x1080", "1920x1200", "2048x1536", "2160x1440", "2304x1440", "2560x1440", "2560x1600", "2560x1700",
    "272x340", "2732x2048", "2736x1824", "280x280", "2880x1800", "3000x2000", "312x390", "320x290", "320x320",
    "320x325", "320x330", "320x480", "480x854", "5120x2880", "640x1136", "640x960", "720x1280", "750x1334",
    "768x1024", "768x1280", "800x1280"
];


function generatePitchBlackWallpaper(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        downloadLinkEl.href = URL.createObjectURL(blob);
        console.log(downloadLinkEl.href);
        downloadLinkEl.click();
    });

    // return canvas.toDataURL();
}

function writeAndDownloadWallpaper(event) {
    event.preventDefault();

    const width = widthInput.value;
    const height = heightInput.value;
    const widthHeight = `${width}x${height}`;

    downloadLinkEl.download = `pitchblackwallpaper-${widthHeight}.png`;

    if (builtinWallpapers.includes(widthHeight)) {
        downloadLinkEl.href = `/images/wallpapers/pitchblackwallpaper-${widthHeight}.png`;
        console.log(downloadLinkEl.href);
        downloadLinkEl.click();
    } else {
        generatePitchBlackWallpaper(width, height);
    }

    // const pngWriter = new OneColorPngWriter(width, height, [0, 0, 0]);
    // pngWriter.write();
    // downloadLinkEl.href = pngWriter.getObjectURL();
    // downloadLinkEl.href = generatePitchBlackWallpaper(width, height);
    // downloadLinkEl.click();

    // event.target.blur();
}

const downloadButtonEl = document.getElementById("downloadButton");
downloadButtonEl.addEventListener("click", writeAndDownloadWallpaper);

// console.log(commonSizesElems);
// commonSizesElems.forEach(sizeElem => {
//     sizeElem.hidden = !sizeElem.textContent.includes("Apple");
// });

const filterInputEl = document.getElementById("filterInput");

filterInputEl.addEventListener("input", () => {
    const filterExp = RegExp(filterInputEl.value, "i");
    commonSizesElems.forEach((sizeElem) => {
        const filterResult = filterExp.test(sizeElem.textContent);
        sizeElem.hidden = !filterResult;
    });
});

function swapEvent(event) {
    const downloadButton = event.target.parentElement.querySelector(".button--download");

    const widthHeight = downloadButton.textContent.split("x").map((item) => item.trim());
    downloadButton.textContent = `${widthHeight[1]} x ${widthHeight[0]}`;
    downloadButton.href = `${wallpaperPathPrefix}${widthHeight[1]}x${widthHeight[0]}${wallpaperPathSuffix}`;
}

function insertScreenResolutions(parentElement, screenResolutions, addSwap) {
    Object.keys(screenResolutions).forEach((resolution) => {
        // console.log(screenResolutions[resolution]);

        const itemListHtml = screenResolutions[resolution].reduce((html, item) => `${html}<li data-type="${item.type}">${item.name}</li>`, "");
        const swapButtonHtml = addSwap ? '<button class="button button--swap"></button>' : "";
        
        parentElement.insertAdjacentHTML("beforeend", `
            <li class="container--fluid">
                <ul class="device-list">
                    ${itemListHtml}
                </ul>
                ${swapButtonHtml}
                <a class="button button--download" href="${wallpaperPathPrefix}${resolution}${wallpaperPathSuffix}" download>${resolution.replace("x", " x ")}</a>
            </li>`
        );

        const swapButton = parentElement.querySelector("li:last-child .button--swap");
        if (swapButton) swapButton.addEventListener("click", swapEvent);

    });
    commonSizesElems = document.querySelectorAll(".download-list > li");

}


fetch("/data/device-resolutions.json")
    .then((response) => response.json())
    .then((data) => insertScreenResolutions(deviceList, data));

fetch("/data/standard-resolutions.json")
    .then((response) => response.json())
    .then((data) => insertScreenResolutions(standardList, data, true));
