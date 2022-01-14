$(".delete-btn").click(function () {
		if (confirm("Vous voullez vraiment supprimer cette achat de l'historique?")) {
			$.ajax({
			url: '/removeachat/'+ this.id,
			type: 'DELETE',
			success: function(result) {
                console.log(result.message);
				if (result.message == "Achat was deleted successfully!") window.location.replace("/achats");
				else {
					$(".message-in-row").append("&nbsp;&nbsp;&nbsp; Cannot delete client.");
				}
			}
		});
		} else {
			console.log("Nope")
		}
});