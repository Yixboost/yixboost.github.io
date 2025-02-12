"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

/**
 * Haalt URL-parameters op
 */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  handleSubmission();
});

async function handleSubmission() {
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
}

// Check of er parameters zijn in de URL en verwerk ze
window.addEventListener("DOMContentLoaded", () => {
  const smParam = getQueryParam("sm");
  const qParam = getQueryParam("q");

  if (smParam) searchEngine.value = smParam;
  if (qParam) address.value = qParam;

  if (smParam || qParam) {
    handleSubmission();
  }
});
