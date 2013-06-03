/*********** Events *******************/

$j("#claims-screen-page").live("pagebeforecreate", function() {
	$j("#claims_content_id").html(innerClaimHtml);
});

$j("div.claimsDetailsDiv").live("click", function() {	
	claimID = $j(this).attr("data-id");
	claimVehModel = $j(this).attr("data-vehModel");
	claimStatus = $j(this).attr("data-status");	
	claimVehType = $j(this).attr("data-vehType");
	claimIncDate = $j(this).attr("data-incDate");
	claimMobile = $j(this).attr("data-mobile");
	claimfirstName = $j(this).attr("data-firstname");
	claimLastName = $j(this).attr("data-lastname");
	claimImageID = $j(this).attr("data-imageID");
	claimNo = $j(this).attr("data-no");
	claimVehicleNo = $j(this).attr("data-vehNo");
	commonUtils.showLoading();
	navigationComponent.goToClaimsDetails();
});