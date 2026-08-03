//#region node_modules/.nitro/vite/services/ssr/assets/storage-D5q-6nwW.js
/**
* Helpers for Supabase Storage URLs.
*/
/**
* Append a cache-busting query parameter to a signed/public storage URL.
* This forces browsers/CDN to fetch the latest version after an image is
* re-uploaded.
*/
function productImageUrl(url) {
	if (!url) return void 0;
	return url.includes("?") ? `${url}&v=3` : `${url}?v=3`;
}
//#endregion
export { productImageUrl as t };
