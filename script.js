function getAccessToken(){
	return '232cc7da1d40ce46291a30cdd3f862f04fe8834ad6770b3eee4fb3b1bf29224465a3b1cdc862a3dc27642';
}

function getOwnerId() {
	//return 15910946;
	return 37606557;
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
	var html = 'ТЕСТ<br/>' + wall.length;

	for (var i = 0; i < wall.length; i++) {
		var note = wall[i];

		//console.log(note.text);

		/*html += 
		'<li>'
			+ '<a target="_blank" href="https://vk.com/mrhazard?w=wall' + note.owner_id + '_' + note.id + '"/>'// + 'Перейти на запись' + '</a>'
		 	+ '<img src="' + note.attachments[0].photo.photo_604 + '"/>'
		+'</li>';*/
		html += 
		'<li>'
			+ '<div>'
		 		+ '<h3> <a target="_blank" href="https://vk.com/tatyana_podakina?w=wall' + note.owner_id + '_' + note.id + '">' + 'Перейти на запись' + '</a> </h3>'
		 		+ "<br/>"
		 		+ note.text
		 	+ '</div>'
		 	+ '<img src="' + note.attachments[0].photo.photo_604 + '"/>'
		+'</li>';
	}

	$('ul').html(html);
}