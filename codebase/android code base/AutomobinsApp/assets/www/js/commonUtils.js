// Initialize Global Variables
var userID;
var innerClaimHtml="";
var cutLongitude;
var curLattitude;
var claimID;
var claimStatus;
var claimVehModel;
var claimVehType;
var claimIncDate;
var claimMobile;
var claimfirstName;
var claimLastName;
var claimNo;
var claimVehicleNo;
var claimImageID;

var commonUtils = {
    showLoading: function() {
    	$j.mobile.showPageLoadingMsg();    	
    },
    hideLoading: function() {
    	$j.mobile.hidePageLoadingMsg();
    },
    getCurrentDate: function(){
    	var d = new Date();
    	var month = d.getMonth()+1;
    	var day = d.getDate();

    	var curDate = d.getFullYear() + '-' +
    	    (month<10 ? '0' : '') + month + '-' +
    	    (day<10 ? '0' : '') + day;
    	
    	return curDate;
    }
};

function onErrorApp(error){
	commonUtils.hideLoading();
    alert(JSON.stringify(error));
}

function backButtonClick() {
	if ($j(".ui-loader").css('display') != 'none')
	{	
		return;
	}
	
	if ($j.mobile.activePage.is('#navigation-screen-page')){			
		navigator.notification.confirm(
				"You want to exit app?",  // message
			     userConfirm,             // callback to invoke with index of button pressed
			     "Exit",            	  // title
			     "Yes,No"          		  // buttonLabels
		);
	}
	else {
		window.history.back();
	}
}

function userConfirm(button) {
	if(button == 1) // if user press yes button
	{		
		SalesforceOAuthPlugin.logout();
		navigator.app.exitApp();		
	}
};

