import querystring from 'query-string';

const API_ENDPOINT = 'https://localhost:5000/';

function buildHeaders(headers){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };
}

function request(props){
  const {
    url,
    init, 
    query,
    option,
  } = props;
 
  let strQuery = query ? `?${querystring.stringify(query)}` : '',
      fetchUrl = `${API_ENDPOINT}/${url}${strQuery}`;
 console.log(strQuery); 
  return fetch(fetchUrl, {
      method: init.method,
      headers: buildHeaders(init.headers),
    })
    .then(handleErrorResponse)
}

function handleErrorResponse(response) {
  return response.json()
    .then(result => {
      if (result.error) return Promise.reject(result.error)
      return result;
    })
}

const Api = {
	get: (url, option) => {
    console.log('api');
		return request({
      url,
			init: {
        method: 'GET',
      },
      option,
    })
  },
  post: (url, option) => {
    console.log('api post');
		return request({
      url,
			init: {
        method: 'POST',
      },
      option,
    })
	}
}

export default Api;