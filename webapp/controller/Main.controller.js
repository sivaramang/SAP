sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("SFG.controller.Main", {
	  onInit: function() {
	  	var oModel = new sap.ui.model.json.JSONModel();
	  	var sURL = jQuery.sap.getModulePath("SFG/model","/data.json");
	  	oModel.loadData("./model/data.json");
	  	this.getView().setModel(oModel);
	  },
	  
	  onOpenView: function(oEvent){
	  	var oView = this.getView();
	  	this.oDialog = oView.byId("filterDialog");
		
		if(!this.oDialog){
		 this.oDialog = sap.ui.xmlfragment(oView.getId(), 
										   "SFG.view.viewSetting",
										    this);
		 oView.addDependent(this.oDialog);
		}
		this.oDialog.open();
	  },
	  
	  onConfirm: function(oEvent) {
	  	var oTable = this.getView().byId("Table");
	  	var oBinding = oTable.getBinding("items");
	    var aFilter = [];
	    var aGroup = [];
	  	var mParams = oEvent.getParameters();
	  	
	  	  if(mParams.groupItem){
	  	   var sPath = mParams.groupItem.getKey();
	  	   var bDescending = mParams.groupDescending;
/*	  	   var vGroup = function(oContext){
	  	   	return oContext.getProperty("Address/City");
	  	   };*/
	  	   var vGroup = function(oContext){
	  	    var value = oContext.getProperty("Address/City");
	  	    return {
	  	    	key : value,
	  	    	text : value
	  	    };
	  	   };
	  	   
	  	   aGroup.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
	  	  };
	  	   oBinding.sort(aGroup);
	  	  
	  	  if(mParams.filterItems.length !== 0)
		  	for(var i=0, l=mParams.filterItems.length; i<l; i++) {
		  	  var items = mParams.filterItems[i];
		  	  var aSplit = items.getKey().split("__");
		  	  var sPath = aSplit[0];
		  	  var sOperator = aSplit[1];
		  	  var iValue1 = aSplit[2];
		  	  var iValue2 = aSplit[3];
		 	  var filter = new sap.ui.model.Filter(sPath, sOperator, iValue1, iValue2);
			  aFilter.push(filter);
		  	}
		      oBinding.filter(aFilter);
	  }
	}); 
});