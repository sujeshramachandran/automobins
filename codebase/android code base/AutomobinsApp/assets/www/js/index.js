// Initialize JQuery Variable
var $j = jQuery.noConflict();

/*********** Events *******************/
$j("#navigation-screen-page").live("pageshow", function() {	
	self.setTimeout("navRefreshValidate()", 2000);
});

$j("#appExitId").live("click", function() {
	backButtonClick();
});

$j("#navRefreshID").live("click", function() {
	navRefresh();
});

$j("#navigation_all_claims_id").live("click", function() {	
	commonUtils.showLoading();
	forcetkClient.query(requestHelper.getAllClaimsQuery(), onSuccessSfdcClaims, onErrorApp);
});

$j("#navigation_today_claims_id").live("click", function() {	
	commonUtils.showLoading();
	forcetkClient.query(requestHelper.getTodaysClaimsQuery(), onSuccessSfdcClaims, onErrorApp);
});

$j("#navigation_contact_id").live("click", function() {
	navigationComponent.goToContactUs();
});

$j("#navigation_about_id").live("click", function() {
	navigationComponent.goToAbout();	
});

/******** Function ************/
function navRefreshValidate() { 
	if($j("#navClaimCountID").html() == "loading..."){
		navRefresh();
	}
}

function navRefresh() {	
	commonUtils.showLoading();
	forcetkClient.query(requestHelper.getTodaysClaimCountQuery(), onSuccessSfdcCount, onErrorApp);	
}

function onSuccessSfdcCount(response) { 
	var totalClaims=0;
	var closedClaims=0;
	$j.each(response.records, function(i, claims) {
		totalClaims = totalClaims + 1;		
		if((claims.Assignment_Status__c.toLowerCase() == 'closed') || (claims.Assignment_Status__c.toLowerCase() == 'on hold')){
			closedClaims = closedClaims + 1;
		}
	});
	
	var meterUsed=0;	
	meterUsed = (closedClaims/totalClaims * 100);
	meterUsed = Math.round(meterUsed);	
	$j('.meterUsed').css('width',meterUsed + '%');
	$j('.meterAvailable').css('width',(100-meterUsed) + '%');
	
	$j("#navClaimCountID").text(closedClaims + " of " + totalClaims);
	commonUtils.hideLoading();	
}

function onSuccessSfdcClaims(response) { 
	var html = ""; 
	var statusClass="";
    $j.each(response.records, function(i, claims) {
    	if(claims.Assignment_Status__c.toLowerCase() == 'open')
    		{
    			statusClass="claimOpenStatus";
    		}
    		else if(claims.Assignment_Status__c.toLowerCase() == 'closed')
    		{
    			statusClass="claimClosedStatus";
    		}
    		else
    		{
    			statusClass="claimOnHoldStatus";    			
    		}
    	
    	html = html.concat(""    			
    		+ "<div class='claimsMainContainer'>"
			+	"<div class='claimsSubContainer'>"	
			+		"<div class='claimsNameDiv blueColor'>"
			+			claims.InsuranceMaster__r.Contact__r.FirstName + " " + claims.InsuranceMaster__r.Contact__r.LastName
			+		"</div>"
			+		"<div class='claimsVehicleDiv'>"
			+			claims.InsuranceMaster__r.Vehicle_Model__c 
			+		"</div>"
			+		"<div class='ui-grid-a' style='margin-top:10px;'>"					
			+			"<div class='ui-block-a' style='text-align:left;'>"
			+				"<div class='claimsStatusDiv "+ statusClass +"'></div>"
			+				"<div class='claimsStatusTextDiv'>"
			+					claims.Assignment_Status__c
			+				"</div>"
			+			"</div>" 
			+			"<div class='ui-block-b' style='text-align:right;'>"
			+				"<div class='claimsDetailsDiv' data-id='" + claims.Id + "' data-status='" + claims.Assignment_Status__c + "' data-imageID='" + claims.Image_ID__c + "' data-no='" + claims.Name + "' data-incDate='" + claims.Incident_Date__c + "' data-mobile='" + claims.InsuranceMaster__r.Contact__r.MobilePhone + "' data-firstname='" + claims.InsuranceMaster__r.Contact__r.FirstName + "' data-lastname='" + claims.InsuranceMaster__r.Contact__r.LastName + "' data-vehType='" + claims.InsuranceMaster__r.VehicleTypeMaster__r.Type__c + "' data-vehNo='" + claims.InsuranceMaster__r.Vehicle_No__c + "' data-vehModel='"+ claims.InsuranceMaster__r.Vehicle_Model__c +"'>"
			+					"Details <span style='color:#0080FF;'> >> </span>"
			+				"</div>"
			+			"</div>"		
			+		"</div>"		
			+	"</div>"
			+ "</div>"
			);
    });    
    innerClaimHtml = html;    
    commonUtils.hideLoading();
    navigationComponent.goToClaims();
}