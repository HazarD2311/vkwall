function getAccessToken(){
	return 'be16c1e9b17efe75ca0d276933420b928533e1bf130af69402ec6dd0d92d0ac2a3b63d57fe5742bb9ff41';
}

function getOwnerId() {
	//return 15910946;
	return 53083705;
	//return 1;
	//return 37606557;
}

$('#btnWall').on('click', loadWall);

function getUrl(method, params){
	if (!method) throw new Error('Укажите метод!');
	params = params || {};
	params['access_token'] = getAccessToken();
	return 'https://api.vk.com/method/' + method + '?' + $.param(params) + '&v=5.68';
}

function sendRequest(method, params, getData) {
	$.ajax({
		url: getUrl(method, params),
		method: 'GET',
		dataType: 'JSONP',
		success: getData
	});
}

function loadWall(){
	sendRequest('wall.get', {count: 5, owner_id: getOwnerId}, function getData(data){
		showWall(data.response.items);
		console.log(data.response);
		//console.log(data.response.items.length);
	});
}

function showWall(wall) {
	var html = '';
	for (var i = 0; i < wall.length - 1; i++) {
		var note = wall[i];
		
		html += 
		'<li>'
			+ '<div>'
		 		+ '<h4> <a target="_blank" href="https://vk.com/id' + note.owner_id + '?w=wall' + note.owner_id + '_' + note.id + '">' + 'Перейти на запись' + '</a> </h4>'
		 		+ "<br/>"
		 		+ note.text
		 	+ '</div>';

		try {
			html += '<img src="' + note.attachments[0].photo.photo_604 + '"/>';
	 	} catch(Error) {}

		html += '</li>';
	}

	$('ul').html(html);
}