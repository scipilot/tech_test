// Format a standard API response
export function wrap(response: any, dataProp:string, success:boolean = true, message:string = ""){
	return {
		success,
		message,
		data: {
			[dataProp]: response,
		},
	}
}
