export async function onRequestPost(context) { // Contents of context object  
	const {
		request, // same as existing Worker API    
		env, // same as existing Worker API    
		params, // if filename includes [id] or [[path]]   
		waitUntil, // same as ctx.waitUntil in existing Worker API    
		next, // used for middleware or to fetch assets    
		data, // arbitrary space for passing data between middlewares 
	} = context;
	context.request

	const url = new URL(request.url);
	const response = await fetch('https://telegra.ph/' + url.pathname + url.search, {
		method: request.method,
		headers: request.headers,
		body: request.body,
	});


	console.log('https://telegra.ph/' + url.pathname + url.search);
	console.log(request.headers);
	console.log(request.body);

	const bin_data = await response.json();
	console.log("bin_data", bin_data);
	const info = JSON.stringify(bin_data);


	if(request.method === 'OPTIONS'){
		return new Response('ok', {
			status: 200,
			statusText: 'ok',
			headers: {
				'Access-Control-Allow-Origin': request.url,
				'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
				'Access-Control-Allow-Headers': 'x-requested-with, accept, origin, content-type'
			}
		
		});
	}




	return new Response(info, {
		status: 200,
		statusText: '',
		headers: {
			'Access-Control-Allow-Origin': request.url,
			'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
			'Access-Control-Allow-Headers': 'x-requested-with, accept, origin, content-type'
		}

	});

	return response;

}
