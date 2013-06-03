var requestHelper = {
		getAllClaimsQuery: function() {
			return "select Id, Name, Assignment_Status__c, Executive_Comment__c, " +
					"InsuranceMaster__r.VehicleTypeMaster__r.Type__c, InsuranceMaster__r.Vehicle_No__c, InsuranceMaster__r.Vehicle_Model__c, " +
					"InsuranceMaster__r.Contact__r.FirstName, InsuranceMaster__r.Contact__r.LastName, " +
					"InsuranceMaster__r.Contact__r.MobilePhone, Incident_Date__c, Image_ID__c  " +
					" from ClaimMaster__c where ExecutiveMaster__r.User__r.ID='"+ userID +"'" +
					" order by InsuranceMaster__r.Contact__r.FirstName";
	    },
	    getTodaysClaimsQuery: function() { 
	    	var curDate = commonUtils.getCurrentDate();	    	
			return "select Id, Name, Assignment_Status__c, Executive_Comment__c, " +
					"InsuranceMaster__r.VehicleTypeMaster__r.Type__c, InsuranceMaster__r.Vehicle_No__c, InsuranceMaster__r.Vehicle_Model__c, " +
					"InsuranceMaster__r.Contact__r.FirstName, InsuranceMaster__r.Contact__r.LastName, " +
					"InsuranceMaster__r.Contact__r.MobilePhone, Incident_Date__c, Image_ID__c  " +
					" from ClaimMaster__c where AssignedDate__c>= " + curDate + " and AssignedDate__c <= " + curDate + "" +
					" and ExecutiveMaster__r.User__r.ID='"+ userID +"' order by InsuranceMaster__r.Contact__r.FirstName";
	    },
	    getTodaysClaimCountQuery: function(){
	    	var curDate = commonUtils.getCurrentDate();	    	
	    	return "select Assignment_Status__c from ClaimMaster__c where " +
	    	    " AssignedDate__c>= " + curDate + " and AssignedDate__c <= " + curDate + "" +
				" and ExecutiveMaster__r.User__r.ID='" + userID + "'";
	    }
};