$(".delete-btn").click(function () {
		if (confirm('Vous voullez vraiment supprimer cette client ?')) {
			$.ajax({
			url: '/removeclient/'+ this.id,
			type: 'DELETE',
			success: function(result) {
				if (result.message == "Client was deleted successfully!") window.location.replace("/clients");
				else {
					$(".message-in-row").append("&nbsp;&nbsp;&nbsp; Cannot delete client.");
				}
			}
		});
		} else {
			console.log("Nope")
		}
});

$(".edit-btn").click(function(){
	let id = this.id
	$("#save-edit-btn").click(function () {
			var conceptName = $('#client').find(":selected").text();
			if (conceptName == "Nom"){
				conceptName = "Nom_Client";
			}else if (conceptName == "Email"){
				conceptName = "email_client";
			}else if(conceptName == "Adresse livraison") {
				conceptName = "adresse_livraison";
			}else if(conceptName == "Telephone") {
				conceptName = "telephone_client";
			}
			var updatedValue = document.getElementById("updatedValue").value
			if (confirm('Vous voullez vraiment modifier cette client ?')) {
				$.ajax({
				url: '/updateclient/'+ id,
				type: 'PUT',
				data:{ updatedValue : updatedValue,conceptName : conceptName},
				success: function(result) {
					console.log(result.message)
					if (result.message == "Client was updated successfully.")  window.location.replace("/clients");
					else {
						$("#updatedValue").toggleClass("is-invalid");
						result.message = result.message.split(":")
						$(".message").append("&nbsp;&nbsp;&nbsp;"+result.message[1]);
					}
				}
			});
			} else {
				console.log("Nope")
			}
			
	});
});