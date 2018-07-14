/*
 *  Pitch Black Wallpaper Download. Copyright (c) 2018 Tecdrop. MIT License.
 *  https://www.tecdrop.com
 */

/* global readyMadeWallpapers */

/**
 * Cached DOM elements.
 */
const downloadLinkEl = document.getElementById("download-link");
const filterInputEl = document.getElementById("filter-input");
const readyMadeElems = document.querySelectorAll("#device-list .list-group__item, #standards-list .list-group__item");

/**
 * Generates a pitch black wallpaper using HTML Canvas.
 * @param {Number} width The width of the wallpaper.
 * @param {Number} height The height of the wallpaper.
 * @param {callback} callback A callback function with the wallpaper image Blob object as a single argument.
 * @returns {void}
 */
function generatePitchBlackWallpaper(width, height, callback) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.toBlob(callback);
}

/**
 * Downloads a ready-made or a custom size generated wallpaper when the user clicks the Get Wallpaper button.
 * @returns {void}
 */
function getWallpaperEvent() {

    const width = document.getElementById("width-input").value;
    const height = document.getElementById("height-input").value;
    const resolution = `${width}x${height}`;
    downloadLinkEl.download = `pitchblackwallpaper-${resolution}.png`;

    if (readyMadeWallpapers.includes(resolution)) {
        // We already have a ready-made wallpaper with this resolution, so go ahead and download it
        downloadLinkEl.href = `/wallpapers/pitchblackwallpaper-${resolution}.png`;
        downloadLinkEl.click();
    } else {
        // Generate a wallpaper with the required resolution and download it
        generatePitchBlackWallpaper(width, height, (blob) => {
            downloadLinkEl.href = URL.createObjectURL(blob);
            // downloadLinkEl.dataset.revoke = true;
            downloadLinkEl.click();
        });
    }
}

/**
 * Filters the ready-made wallpapers download list when the user changes the value of the Search/Filter input.
 * @returns {void}
 */
function filterInputEvent() {
    const filterExp = RegExp(filterInputEl.value, "i");
    readyMadeElems.forEach((sizeElem) => {
        const filterResult = filterExp.test(sizeElem.textContent);
        sizeElem.hidden = !filterResult;
    });
}

/**
 * Initializes the app by setting up event listeners.
 * @returns {void}
 */
function initApp() {
    document.getElementById("get-wallpaper-button").addEventListener("click", getWallpaperEvent);
    filterInputEl.addEventListener("input", filterInputEvent);
}

initApp();
