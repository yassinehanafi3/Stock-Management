$(".delete-btn").click(function () {
		if (confirm('Vous voullez vraiment supprimer cette fournisseur ?')) {
			$.ajax({
			url: '/removefournisseur/'+ this.id,
			type: 'DELETE',
			success: function(result) {
				if (result.message = "Fournisseur was deleted successfully!") window.location.replace("/fournisseurs");
				else {
					$(".message-in-row").append("&nbsp;&nbsp;&nbsp; Cannot delete fournisseur.");
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
			var conceptName = $('#fournisseur').find(":selected").text();
			if (conceptName == "Societe"){
				conceptName = "Societe_fournisseur";
			}else if (conceptName == "Email"){
				conceptName = "email_fournisseur";
			}else if(conceptName == "Adresse") {
				conceptName = "adresse_fournisseur";
			}else if(conceptName == "Telephone") {
				conceptName = "telephone_fournisseur";
			} else if(conceptName == "Contact"){
				conceptName = "contact_fournisseur";
			}
			var updatedValue = document.getElementById("updatedValue").value
			if (confirm('Vous voullez vraiment modifier cette fournisseur ?')) {
				$.ajax({
				url: '/updatefournisseur/'+ id,
				type: 'PUT',
				data:{ updatedValue : updatedValue,conceptName : conceptName},
				success: function(result) {
					console.log(result.message)
					if (result.message == "Fournisseur was updated successfully.")  window.location.replace("/fournisseurs");
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