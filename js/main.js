
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
    if(response!==null){
	//	localStorage.setItem("localData",data);
		updateNotification(response.notification);
		updateNavsections(response.quickActions);
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
	if(this.getAttribute("id")=="quick-reports-expand-btn")
	{
		window.open($('#quick-reports-frame').src,'_blank');
	}
	if(this.getAttribute("id")=="my-team-folders-expand-btn")
	{
		window.open($('#my-team-folders-frame').src,'_blank');
	}	
	
};

for (var i = 0; i < expand.length; i++) {
    expand[i].addEventListener('click', expandBtn, false);
}
/*********************************** save btn ***********************************/
function manageNewSave(){
	var tab=location.hash;
	tab=tab.substring(1);
	var links=[];
	var urlRegex = new RegExp("https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}", i);	
	var linkRegex = new RegExp(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/);	
	if(tab=="quick-reports"){
		var reportRow=all(".report-form .row");	
 /***********************************************************************************************************************************************************/
		
 		var data = JSON.parse(localStorage.getItem("localData"));
		if(data !==null && data.length !== 0){
            for(var i=0;i<data.length;i++){
				if(data[i].Id=="my-team-folders"){
				links.push({
					 Id:data[i].Id,	
					 Name:data[i].Name,
					 URL:data[i].URL
					});	
				}
			}
		}	
 /***********************************************************************************************************************************************************/
		for(var i=0;i<reportRow.length;i++){
			var name =reportRow[i].children[1].children[1].value;
			var url=reportRow[i].children[2].children[1].value;
			if(name !== "" && url !== ""){
				reportRow[i].children[1].classList.remove('warrning');				
				reportRow[i].children[2].classList.remove('warrning');					
				if (urlRegex.test(url)){
				links.push({
				 Id:tab,	
				 Name:name,
				 URL:url
				});	
				}else if((url.substring(0, 4) == 'www.') ||(!urlRegex.test(url) && linkRegex.test(url))) {
					
				if(url.substring(0, 4) == 'www.'){
					alert("yes");
					var newURL = "http://";
					newURL+=url;
					links.push({
					 Id:tab,	
					 Name:name,
					 URL:newURL
					});	
				}
				if(linkRegex.test(url)){
					var newURL = "http://www.";
					newURL+=url;
					links.push({
					 Id:tab,	
					 Name:name,
					 URL:newURL
					});	
				}					
				}else {
					reportRow[i].children[2].classList.add('warrning');
					manageNewSave();
				}		
			}else if(name == "" && url !== ""){
				manageNewSave();
				reportRow[i].children[1].classList.add('warrning');
			}else if(name !== "" && url == ""){
				reportRow[i].children[2].classList.add('warrning');
				manageNewSave();
			}else{
				reportRow[i].children[1].classList.remove('warrning');				
				reportRow[i].children[2].classList.remove('warrning');				
			}
		}
        				
		localStorage.setItem('localData', JSON.stringify(links));
		updateInputs(tab);
		updateSelectOpttion(tab);
	}else if(tab=="my-team-folders"){
		var folderRow=all(".folder-form .row");	
 /***********************************************************************************************************************************************************/
		
 		var data = JSON.parse(localStorage.getItem("localData"));
            if(data !==null && data.length !== 0){
		
            for(var i=0;i<data.length;i++){
				if(data[i].Id=="quick-reports"){
				links.push({
					 Id:data[i].Id,	
					 Name:data[i].Name,
					 URL:data[i].URL
					});	
				}
			}
		}		
		
/***********************************************************************************************************************************************************/
		
		for(var i=0;i<folderRow.length;i++){
			var name =folderRow[i].children[1].children[1].value;
			var url=folderRow[i].children[2].children[1].value;
			if(name !== "" && url !== ""){
				folderRow[i].children[1].classList.remove('warrning');				
				folderRow[i].children[2].classList.remove('warrning');
				if (urlRegex.test(url)){			
						links.push({
						 Id:tab,	
						 Name:name,
						 URL:url
						});	
					}else if((url.substring(0, 4) == 'www.') ||(!urlRegex.test(url) && linkRegex.test(url))) {
					
					if(url.substring(0, 4) == 'www.'){
					alert("yes");
					var newURL = "http://";
					newURL+=url;
					links.push({
					 Id:tab,	
					 Name:name,
					 URL:newURL
					});	
					}
					if(linkRegex.test(url)){
						var newURL = "http://www.";
						newURL+=url;
						links.push({
						 Id:tab,	
						 Name:name,
						 URL:newURL
						});	
				  }					
				
	
		    	}else {
					folderRow[i].children[2].classList.add('warrning');
					manageNewSave();
				}		
			}else if(name == "" && url !== ""){
				manageNewSave();
				folderRow[i].children[1].classList.add('warrning');
			}else if(name !== "" && url == ""){
				folderRow[i].children[2].classList.add('warrning');
				manageNewSave();
			}else{
				folderRow[i].children[1].classList.remove('warrning');				
				folderRow[i].children[2].classList.remove('warrning');				
			}
		}		
		localStorage.setItem('localData', JSON.stringify(links));
		updateInputs(tab);
		updateSelectOpttion(tab);
	
	}	
}


function updateSelectOpttion(tab){
	if(tab=="quick-reports"){
		var Qselect=$("#quick-reports-select");
		var Qframe=$("#quick-reports-frame");
		var Qexpand=$("#quick-reports-expand-btn");
		for(var i=0;i<Qselect.childNodes.length;i++){
			 Qselect.remove(Qselect.i);
		}
		var links = JSON.parse(localStorage.getItem("localData"));
			if(links.length==0){
				Qselect.classList.add("hidden");
				Qframe.classList.add("hidden");
				Qexpand.classList.add("hidden");				
			}
			for(var i=0; i<links.length; i++){
				if(links[i].Id == tab){
					var name = links[i].Name;
					if(name != ""){
						Qselect.classList.remove("hidden");
						Qframe.classList.remove("hidden");
						Qframe.src=links[0].URL;
						Qexpand.classList.remove("hidden");
						Qexpand.src=links[0].URL;
						}
					var newOption = document.createElement("option");
					newOption.text = name;
					newOption.value = name; 
					Qselect.appendChild(newOption);
				}	
			}
		activeSetting();	
	}else if(tab=="my-team-folders"){
		var Fselect=$("#my-team-folders-select");
		var Fframe=$("#my-team-folders-frame");
		var Fexpand=$("#my-team-folders-expand-btn");
		
		for(var i=0;i<Fselect.childNodes.length;i++){
			 Fselect.remove(Fselect.i);
			 
		}
		var links = JSON.parse(localStorage.getItem("localData"));
			if(links.length==0){ 
				Fframe.classList.add("hidden");			
				Fselect.classList.add("hidden");
				Fexpand.classList.add("hidden");				
				
			}		
			for(var i=0; i<links.length; i++){
				if(links[i].Id == tab){
					var name = links[i].Name;
					if(name != "") {
					Fselect.classList.remove("hidden");
					Fframe.classList.remove("hidden");
					Fframe.src=links[0].URL;	
						Fexpand.classList.remove("hidden");
						Fexpand.src=links[0].URL;					
					}
					var newOption = document.createElement("option");
					
					newOption.text = name;
					newOption.value = name; 
					Fselect.appendChild(newOption);
				}	
			}		
		activeSetting();	
	}
}



function updateInputs(tab){
	if(tab=="quick-reports")
	{
		var repLinks = JSON.parse(localStorage.getItem('localData'));
		var inputNames=all('.report-form .name-in');
		var inputURL=all('.report-form .url-in');
			var j=0;		
		for(var i=0;i<repLinks.length;i++)
		{
			if(repLinks[i].Id==tab){
				inputNames[j].value=repLinks[i].Name;
				inputURL[j].value=repLinks[i].URL;
			//	alert(repLinks[i].Name);
			 j++;
			}
		}
	}else if(tab=="my-team-folders")
	{
		var repLinks = JSON.parse(localStorage.getItem('localData'));
		var inputNames=all('.folder-form .name-in');
		var inputURL=all('.folder-form .url-in');	
			var j=0;			
		for(var i=0;i<repLinks.length;i++)
		{
			if(repLinks[i].Id==tab){
				inputNames[j].value=repLinks[i].Name;
				inputURL[j].value=repLinks[i].URL;
				j++;
			//	alert(repLinks[i].Name);
			}
		}
	}
}


function updateSelect(sel){
	var i = sel.selectedIndex;
	var data = JSON.parse(localStorage.getItem("localData"));
	var optionVal;
	for(var j=0;j<data.length;j++){
		if(data[j].Name==sel.options[i].text){
			optionVal=data[j].URL;
		}
	}
	
	updateFrame(optionVal);
	updateExpand(optionVal);
    //alert(optionVal);
	
	
}
function updateFrame(optionVal){
	var tab=location.hash;
	tab=tab.substring(1);
	if(tab=="quick-reports"){
		var Qframe=$("#quick-reports-frame");
		Qframe.src=optionVal;
		
	}else if(tab=="my-team-folders"){
		var Fframe=$("#my-team-folders-frame");
		Fframe.src=optionVal;

		
	}
}
function updateExpand(optionVal){
	var tab=location.hash;
	tab=tab.substring(1);
	if(tab=="quick-reports"){
		var Qexpand=$("#quick-reports-expand-btn");
		Qexpand.src=optionVal;
	}else if(tab=="my-team-folders"){
		var Fexpand=$("#my-team-folders-expand-btn");
		Fexpand.src=optionVal;

	}
}

//manage select options 
var select = document.getElementsByClassName("webs-select");

for (var i = 0; i < select.length; i++) {
  //  select[i].addEventListener('onchange', updateSelect, false);
	select[i].onchange = function() {updateSelect(this)};
}


//active the setting button
var save_btn = document.getElementsByClassName("save-btn");


for (var i = 0; i < save_btn.length; i++) {
    save_btn[i].addEventListener('click', manageNewSave, false);
}

/**********************************************************************/


function updateTabOnLoad(){

	var currTab=location.hash;
	currTab=currTab.substring(1);
	var currTabId;
	if(currTab=='quick-reports'){
		currTabId='tab-item1';
	}
	else if(currTab=='my-folders'){
		currTabId='tab-item2';
	}
	else if(currTab=='my-team-folders'){
		currTabId='tab-item3';
	}
	else if(currTab=='public-folders'){
		currTabId='tab-item4';
	}
	for(var i=1;i<=4;i++)
	{
      manageClickedTab('tab-item'+i)		
	}	
	updateSelectOpttion("quick-reports");
	updateInputs("quick-reports");
	updateSelectOpttion("my-team-folders");
	updateInputs("my-team-folders");
	if(currTabId==undefined){
		currTabId='tab-item1';
	}
		manageClickedTab(currTabId)
	
}


/**********************************************************************/





function initWebApp() {

UTILS.ajax("data/config.json",{done:loadPageData});

updateTabOnLoad();

}


window.onLoad =  initWebApp();


