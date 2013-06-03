// Initialize Global Variables
var camImagedata;

/*********** Events *******************/ 

$j("#claims-details-screen-page").live("pagebeforeshow", function() {
	$j("#firstNameID").text(claimfirstName);
	$j("#lastNameID").text(claimLastName);
	$j("#mobileNoID").text(claimMobile);
	$j("#mobileDialID").attr('href','tel:+91'+ claimMobile);
	$j("#claimNoID").text(claimNo);
	$j("#incidentDateID").text(claimIncDate);
	$j("#vehModelID").text(claimVehModel);
	$j("#vehTypeID").text(claimVehType);	
	$j("#vehNoID").text(claimVehicleNo);
	$j("#select-status").val(claimStatus);
	$j("#select-status").selectmenu('refresh', true);	
	navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorApp);   
});

$j("#claims-details-screen-page").live("pageshow", function() {
	//usage : To get the image associated with the claim while loading the claim details	
	if(claimImageID != 'null'){
		commonUtils.showLoading();
		forcetkClient.retrieveBlobField("ContentVersion", claimImageID, "VersionData", function(response) {
	        var base64data = base64ArrayBuffer(response);
	        $j('#claimDetailsImgID').attr('src', "data:image/png;base64," + base64data);
	        commonUtils.hideLoading();
	    }, onErrorApp);		
	}
});

$j("#claimDetailsImgID").live("click", function() {	
	capturePicAndUpdateImage();	
});

$j("#claimDetailsSubmitID").live("click", function() {	
	uploadImageAndSubmitDetails();
});

$j("#claimDetailsCancelID").live("click", function() {	
	window.history.back();
});

/******** Function ************/

function onSuccessGeo( position ) {    
    lastCoords = position.coords;
    console.log("****" + position.coords.latitude + " " + position.coords.longitude);
    curLattitude = position.coords.latitude;
    cutLongitude = position.coords.longitude;    
}

function capturePicAndUpdateImage() {
	navigator.camera.getPicture(function(imageData) {        
		camImagedata = imageData;
		$j("#claimDetailsImgID").attr('src', "data:image/jpeg;base64," + camImagedata);
    }, function(errorMsg) {
    	onErrorApp(errorMsg);
    }, {
        quality: 50,
        correctOrientation: true,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function uploadImageAndSubmitDetails() {
	commonUtils.showLoading();
    forcetkClient.create('ContentVersion', {
        "Origin": "H",
        "PathOnClient": claimfirstName + ".png",
        "VersionData": camImagedata
    }, function(data) {
        // Now update the Contact record with the new ContentVersion Id
        console.log('***Created ContentVersion ' + data.id);
        forcetkClient.update('ClaimMaster__c', claimID, {
            "Image_ID__c": data.id,
            "Assignment_Status__c": $j("#select-status").val(),
            "Incident_Location__c": curLattitude + " " + cutLongitude
        }, function() {
        	console.log('***Updated Contact ' + claimID);
        	commonUtils.hideLoading();
        	alert("claim Details Updated...");                        
        }, onErrorApp);
    }, onErrorApp);
}