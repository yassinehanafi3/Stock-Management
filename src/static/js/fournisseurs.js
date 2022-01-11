function showForm() {
	$(".modal").css("display", "block");
}
function CloseModal() {
	$(".modal").css("display", "none");
}

$.delete = function (url, data, callback, type) {

	if ($.isFunction(data)) {
		type = type || callback,
			callback = data,
			data = {}
	}

	return $.ajax({
		url: url,
		type: 'DELETE',
		success: callback,
		data: data,
		contentType: type
	});
}
$(".delete-btn").onclick(function (this) {
	alert(this.id);
	/*$.delete("/removefournisseur/" + this.Code_Client,
		function (this) {
			console.log(this.message);
			if (this.message = "Client was deleted successfully!") window.location.replace("/clients");
		});*/
})