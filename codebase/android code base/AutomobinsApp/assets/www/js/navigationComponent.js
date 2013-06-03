var navigationComponent = {
	goToClaims: function(error) {
		$j.mobile.changePage("./claims.html"); 
    },
    goToClaimsDetails: function() {
    	$j.mobile.changePage("./claimDetails.html");
    },
    goToContactUs: function() {
    	$j.mobile.changePage("./contactUs.html");
    },
    goToAbout: function() {
    	$j.mobile.changePage("./about.html");
    }
};