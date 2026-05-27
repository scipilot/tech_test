/*
* API CLIENT
*
* Note: this lib was borrowed from another of my (Pip's) projects I originally wrote with a larger API and lots of helpers.
* 	For this tech-test demo I have removed the bells and whistles, authentication, CORS, downloads etc.
*/

import {ApiResponse, GetScoresResponse, SimpleResponse} from "./types"

// TODO Move config to dotenv or similar
const API_URL = "http://localhost:7000/api/"

// region client API

export async function SubmitScore(player: string, score: number): Promise<SimpleResponse> {
	return postApi(`scores/`, { player, score })
}
export async function GetScores(): Promise<GetScoresResponse> {
	return getApi(`scores/`)
}

// end region

// region Method wrappers for any noun ---------------------------------------------------------------

async function getApi(path: string): Promise<ApiResponse<any>> {
	const options = {
		method: 'GET',
		headers: await headers()
	}
	return fetchApi(path, options)
}

/*
async function downloadApi(path: string): Promise<ApiDownloadResult> {
	const options = {
		method: 'GET',
		headers: await headers()
	}
	return fetchDownload(path, options)
}

async function deleteApi(path: string, body?: object): Promise<SimpleResponse> {
	const options = {
		method: 'DELETE',
		headers: await headers()
	}
	if(body) options['body'] = JSON.stringify(body)
	return fetchApi(path, options)
}
*/

async function postApi(path: string, body: object): Promise<SimpleResponse> {
	const options = {
		method: 'POST',
		headers: await headers(),
		body: JSON.stringify(body)
	}
	return fetchApi(path, options)
}

/*
async function putApi(path: string, body: object): Promise<SimpleResponse> {
	const options = {
		method: 'PUT',
		headers: await headers(),
		body: JSON.stringify(body)
	}
	return fetchApi(path, options)
}
*/

async function headers() {
	// const token = await getAccessToken()
	// console.debug('API.headers got', {token})
	return {
		'Accept': 'application/json',
		'Content-Type': 'application/json;charset=UTF-8',
		// inject auth from FB auth state
		// 'Authorization': 'Bearer ' + token
	}
}

// All API verbs requiring Body call this internally (except download)
async function fetchApi(path: string, options: object) {
	let body = { success: false, message: '', data: null }
	// console.debug(`fetchApi ${options.method} ${path}}`, {url, options})
	const response = await fetchResponse(path, options)
	if (response && response.ok) body = await response.json()
	// else body.message = response?.statusText

	return body
}


// internal function common to get/put +body and get +download
async function fetchResponse(path: string, options: object): Promise<Response | null> {
	let response: Response | null = null

	try {
		response = await fetch(API_URL + path, options)
		// console.debug("api ...received", {response})
		// Catch 403/401 and redirect to login page
		if (response.status == 403) {
			console.warn('api got 403 forbidden/unauthenticated - perhaps Firestore token has expired ', { response })
			// this means the user is unauthenticated.
			// TODO AUTH: authHandler.on403Forbidden()
		} else if (response.status == 401) {
			// trigger login/refresh token
			console.warn('api got unauthorised - perhaps Firestore token has expired ', { response })
			// Detect the special case of Firebase token expiry every hour or so, then this whole thing could be retried.
			const body = await response.json()
			const expired = body.code === 'auth/id-token-expired'
			// TODO AUTH: authHandler.on401Unauthorized(expired)

			// The token should now be refreshed.
			if (expired) {
				// Retry the original fetch - assumes the API is idempotent! (and nothing happened due to the 401)
				// response = await fetch(API_URL + path, options)
				// response = await fetchAfter(API_URL + path, options, 500)
			}
		}
	} catch (e) {
		console.warn('api ...caught', { e })
	}

	return response
}
// endregion
