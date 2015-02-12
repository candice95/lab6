'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#worldBankBtn').click(showWorldBank);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
		
	$.get("/project/"+idNumber, addDetail);
	console.log("/project/"+idNumber);
}

function addDetail(result) {
	console.log(result);
	// Get the correct id
	var projID = result['id'];
	var projectHTML = '<img src="' + result['image'] + '"class="detailsImage">' + '<h3>' + result['date'] + '</h3>' + '<h4>' + result['summary'] + '</h4>'
	$("#project"+projID).html(projectHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", changeColor);
}

function changeColor(result) {
	var color = result['colors'];
	var colors = color['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

function showWorldBank(e) {
	console.log("User clicked on worldBank button");
	$.get('http://api.worldbank.org/countries/all/indicators/SP.POP.TOTL?format=json', callbackFunction, 'jsonp');
}

function callbackFunction( result ) {
	console.log(result);
	var country = result['country'];
	var value = country['value'];
	$('#worldBankBtn').append(value);
}

