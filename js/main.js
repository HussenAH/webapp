
function $ (selector) {
	return document.querySelector(selector);
}


function all(selector){
	return document.querySelectorAll(selector);
}

function updateNotification (notification) {
	if(notification !==undefined){
		$(".notifications").innerHTML = notification;
	}
}


//update data -nav section from json
function updateNavsections(quickActions){
	if(quickActions!== undefined)
	{
		var navSections=all(".nav-section");

		var actionList=all(".action-list");
		for(var i=0;i<(navSections.length);i++)
		{
		 var label=quickActions[i].label;
         var icon=quickActions[i].icon;
		 var actionsLabel=quickActions[i].actionsLabel;
		 var actions=quickActions[i].actions;
			navSections[i].innerHTML="<p>"+label+"</p>"+ navSections[i].innerHTML;
			navSections[i].style.background="url(./img/icons/"+ icon + ".png) left 50% top 55px no-repeat black";

		 var  actionLI=actionList[i].getElementsByTagName("li");
         for(var j=0;j<(actionLI.length);j++)
		 {
			var myid="#op-"+(i+1)+"-"+(j+1);
			$(myid).childNodes[0].innerHTML=actions[j].label;
			$(myid).childNodes[0].href=actions[j].url; 	
	
		 }
		}	

	}
	
}


function loadPageData(response){
//	alert('asd');
		updateNotification(response.notification);
}
function tempLoadDataFromJson(data){
    if(data!==null){
		localStorage.setItem("localData",data);
		updateNotification(data.notification);
		updateNavsections(data.quickActions);
	}else{
		updateNotification("Failed To Load App Data!");
	}	
}


function deactiveCurrentTab(){
	var deactiveList=all('.active-tab');

	for(var i=0 ;i<deactiveList.length;i++){
     deactiveList[i].classList.remove("active-tab");
	 if(deactiveList[i].id=='tab-item1')
	 {
		 $('#quick-reports').classList.add("hidden");
	 }else if(deactiveList[i].id=='tab-item3')
	 {
		 $('#my-team-folders').classList.add("hidden");	
	 }else if(deactiveList[i].id=='tab-item2')
	 {
		 $('#my-folders').classList.add("hidden");	
	 }else if(deactiveList[i].id=='tab-item4')
	 {
		 $('#public-folders').classList.add("hidden");	
	 }
	
	
}
}


function activeClickedTab(tabId){

    $('#'+tabId).classList.add("active-tab");
	$('#'+tabId+'>a').classList.add("active-tab");
	window.location.hash=$('#'+tabId+'>a').hash.substr(1);//set the hash
	if(tabId=='tab-item1')
	{
	  $('#quick-reports').classList.remove("hidden");
	}else if(tabId=='tab-item3')
	{
		$('#my-team-folders').classList.remove("hidden");
	}else if(tabId=='tab-item2')
	{
		$('#my-folders').classList.remove("hidden");
	}else if(tabId=='tab-item4')
	{
		$('#public-folders').classList.remove("hidden");
	}

 
}

function manageClickedTab(tabId){
    deactiveCurrentTab();
	activeClickedTab(tabId);
	
	return;
	
}



/**********************************************************************/
//managed tab list on click
var ul = document.getElementById('tabs-list'); // Parent

ul.addEventListener('click', function (e) {
    var target = e.target; // Clicked element
    while (target && target.parentNode !== ul) {
        target = target.parentNode; // If the clicked element isn't a direct child
        if(!target) { return; } // If element doesn't exist
    }
    if (target.tagName === 'LI'){
		manageClickedTab(target.id);
    }
});


/**********************************************************************/

//active the setting button
var settings = document.getElementsByClassName("settings-btn");

var activeSetting = function() {
	var settbtn=document.getElementsByClassName("settings-btn");
	var rep_area=document.getElementsByClassName("reports-area");
	for(var i=0;i<settbtn.length;i++){
	 	settbtn[i].classList.toggle("active-btn");
	    rep_area[i].classList.toggle("hidden");		
	}
	
};

for (var i = 0; i < settings.length; i++) {
    settings[i].addEventListener('click', activeSetting, false);
}
/**********************************************************************/

//active the expand button
var expand=document.getElementsByClassName("expand-btn");
var expandBtn = function() {
    if(this.getAttribute("id")=="my-folder-expand-btn")
	{
		window.open($('#my-folders-frame').src,'_blank');
	}
	if(this.getAttribute("id")=="public-folders-btn")
	{
		window.open($('#public-folders-frame').src,'_blank');
	}

	
	
};

for (var i = 0; i < expand.length; i++) {
    expand[i].addEventListener('click', expandBtn, false);
}
/**********************************************************************/
function manageNewSave(){
	var tab=location.hash;
	tab=tab.substring(1);
	var reportsLinks=[];
	var folderLinks=[];

	if(tab=="quick-reports"){
		var reportRow=all(".report-form .row");		
	//  	alert(tab);
		for(var i=0;i<reportRow.length;i++){
			var name =reportRow[i].children[1].children[1].value;
			var url=reportRow[i].children[2].children[1].value;
			if(name !== "" && url !== ""){
				//here must check if url is legal
				reportsLinks.push({
				 Id:tab,	
				 Name:name,
				 URL:url
				});			
			}
		}		
		localStorage.setItem("localData", JSON.stringify(reportsLinks));
		updateInputs(tab);
	
	}else if(tab=="my-team-folders"){
		var folderRow=all(".folder-form .row");		
		for(var i=0;i<folderRow.length;i++){
			var name =folderRow[i].children[1].children[1].value;
			var url=folderRow[i].children[2].children[1].value;
			if(name !== "" && url !== ""){
				//here must check if url is legal
				folderLinks.push({
				 Id:tab,	
				 Name:name,
				 URL:url
				});			
			}
		}		
		localStorage.setItem("localData", JSON.stringify(folderLinks));
		updateInputs(tab);
	
	}

		
}

function saveReportLink(name , url){

	
}



function saveFolderLink(name , url){
	
}


function addSelectOption(selectId){
	
}

function removeSelectOption(selectId){
	
}

function updateInputs(tab){

	if(tab=="quick-reports")
	{
		var repLinks = JSON.parse(localStorage.getItem("localData"));
		var inputNames=all('.report-form .name-in');
		var inputURL=all('.report-form .url-in');		
		for(var i=0;i<repLinks.length;i++)
		{
			if(repLinks[i].Id==tab){
				inputNames[i].value=repLinks[i].Name;
				inputURL[i].value=repLinks[i].URL;
			//	alert(repLinks[i].Name);
			}
		}
	}else if(tab=="my-team-folders")
	{
		var repLinks = JSON.parse(localStorage.getItem("localData"));
		var inputNames=all('.folder-form .name-in');
		var inputURL=all('.folder-form .url-in');		
		for(var i=0;i<repLinks.length;i++)
		{
			if(repLinks[i].Id==tab){
				inputNames[i].value=repLinks[i].Name;
				inputURL[i].value=repLinks[i].URL;
			//	alert(repLinks[i].Name);
			}
		}
	}
}


//active the setting button
var save_btn = document.getElementsByClassName("save-btn");


for (var i = 0; i < save_btn.length; i++) {
    save_btn[i].addEventListener('click', manageNewSave, false);
}

/**********************************************************************/








var jsonData={
	"notification": "The data of UTF BI would be updated at 16:00 pm.",
	"quickActions": [
		{
			"label": "Select<br>Reporting Platform",
			"icon": "action-report-new",
			"actionsLabel": "Choose QS report",
			"actions": [
				{
					"label": "Corporate",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Simple",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Business",
					"url": "http://netcraft.co.il"
				}
			]
		}, {
			"label": "Select<br>Dashboard",
			"icon": "action-report-top",
			"actionsLabel": "Choose Dashboard",
			"actions": [
				{
					"label": "Account Dashboard",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Daily Huddle Dashboard",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Tier 2 Dashboard",
					"url": "http://netcraft.co.il"
				}, {
					"label": "ADM Dashboard",
					"url": "http://netcraft.co.il"
				}
			]
		}, {
			"label": "Help &amp;<br>Tutorials",
			"icon": "actions-help",
			"actionsLabel": "Choose guide",
			"actions": [
				{
					"label": "Real Time",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Past Data",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Corporate Data",
					"url": "http://netcraft.co.il"
				}
			]
		}
	],
	"tabsList": [
		{
			"options": {
				"rowLabel": "Report"
			}
		}, {
			"options": {
				"url": "http://www.paulirish.com/"
			}
		}, {
			"options": {
				"rowLabel": "Folder"
			}
		}, {
			"options": {
				"url": "http://addyosmani.com/"
			}
		}
	]
}



function initWebApp() {

//UTILS.ajax("data/config.json",{done:loadPageData});
tempLoadDataFromJson(jsonData);
	var tab=location.hash;
	tab=tab.substring(1);
	updateInputs(tab);
}

window.onLoad =  initWebApp();



