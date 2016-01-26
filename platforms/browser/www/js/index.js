/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Get per la chiamata del serivzio "lista"
$(document).on("pageinit", "#list-page", function () {
	$.ajax({
		type: "GET",
		url: "https://nsoci-hiring.azure-mobile.net/api/news",
		dataType: 'json',
		//autenticazione
		beforeSend: function (request){
		    request.setRequestHeader("X-ZUMO-APPLICATION", "StSYducBChrIUOPMmwwNYfgsqUYPhv11");
			request.setRequestHeader("Content-Type", "application/json");
	    },
	   
	    success: function(data){
	       var output = "";
	       $.each(data, function (index, value) {
	       		if(new Date().getTime() <= value.deadlineDate) {
		        	output += '<li class="linkNotizia"><a href="#"  idNotizia="' + value.id +'"><img src="' + value.image +'"><h2>' + value.category +'</h2><p>' + value.title +'</p></a></li>';
				}
			});
			$('#listaNotizie').html(output).listview("refresh");
	       
	    },
	    error: function (jqXHR, textStatus, errorThrown){
	        var output = "<h2> Attenzione si &eacute; verificato un errore</h2>";
	        output += "<p>" +JSON.stringify(textStatus) + "</p>";
	        console.log(JSON.stringify(errorThrown));
	        $('#listaNotizie').html(output).listview("refresh");
	    }
	});
});

var idNotizia;

//Eventi click sulla notizia, apro il dettaglio
$(document).on('vclick', '#listaNotizie li a', function(){  
    idNotizia = $(this).attr('idNotizia');
    $.mobile.changePage("#details-page", { transition: "slide", changeHash: false });
    
});

//Get per la chiamata del servizio "dettaglio"
$(document).on("pagebeforeshow", "#details-page", function () {
   $.ajax({
		type: "GET",
		url: "https://nsoci-hiring.azure-mobile.net/api/news?id=" + idNotizia,
		dataType: 'json',
		//autenticazione
		beforeSend: function (request){
		    request.setRequestHeader("X-ZUMO-APPLICATION", "StSYducBChrIUOPMmwwNYfgsqUYPhv11");
			request.setRequestHeader("Content-Type", "application/json");
	    },
	   
	    success: function(data){
	    	if(new Date().getTime() > data.deadlineDate) {
	    		var output = "<p>Notizia scaduta in data: " + DataDaJson(data.deadlineDate) +"</p>"
	    	}
	    	else {
		       var output = "<h2>" + data.title +"</h2>"
		       output += "<img src=" + data.image + ">"
		       output += "<p>" + data.body +"</p>"
		       output += "<p> Data dipubblicazione: " +  DataDaJson(data.publishDate) + "</p>"
		       output += "<a href=" + data.link +">Fonte</a>"
		       
		   }
	       $("#dettaglio").html(output);
	    },
	    error: function (jqXHR, textStatus, errorThrown){
	        var output = "<h2>Attenzione si &eacute; verificato un errore</h2>";
	        output += "<p>" +JSON.stringify(textStatus) + "</p>";
	        console.log(JSON.stringify(errorThrown));
	        $('#listaNotizie').html(output).listview("refresh");
	        $("#dettaglio").html(output);
	    }
	});
});

//evento click pulsante indietro
$(document).on('vclick', '#bottoneIndietro', function(){ 
    $.mobile.changePage("#list-page", { transition: "slide", changeHash: false }); 
});


//ritorna data gg/mm/aaaa
function DataDaJson(data) {
	var giorno = new  Date(data).getDay();
	var mese = new Date(data).getMonth();
	var anno = new Date(data).getFullYear();
	return  giorno + "/" + mese + "/" +  anno	
}



//*****************************************************************************

		
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        
    }
};

app.initialize();