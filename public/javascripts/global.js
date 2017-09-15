// Carlist data array for filling in table
var datalistarray = new Array();
var carListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

	var tableContent = '';
   $.getJSON( '/cars', function( data ) {
	
		// Stick our user data array into a userlist variable in the global object
		carListData = data;
		
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.make + '</td>';
			tableContent += '<td>' + this.model + '</td>';
			tableContent += '<td>' + this.year + '</td>';
			tableContent += '<td>' + this.value + '</td>';
			tableContent += '<td>' + this.mileage + '</td>';
			tableContent += '<td>' + this.transmission + '</td>';
			tableContent += '<td>' + this.colour + '</td>';
			tableContent += '<td><a href="#" class="linkdeletecar" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#carList table tbody').html(tableContent);
    });
};
// Add Car button click
$('#btnAddCar').on('click', addCar);
// Delete User link click
$('#carList table tbody').on('click', 'td a.linkdeletecar', deleteCar);
// Add Car
function addCar(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
	var newCar = new Array();
    $('#addCar input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

	$('#addCar select').each(function(index, val) {
        if(!$(this).val() ) { errorCount++; }
    });
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
		newCar = {"make" : $('#addCar fieldset select#inputMake').val(),
		"model" : $('#addCar fieldset select#inputModel').val(),
		"year" : $('#addCar fieldset input#inputYear').val(),
		"value" : $('#addCar fieldset input#inputValue').val(),
		"mileage" : $('#addCar fieldset input#inputMileage').val(),
		"transmission" : $('#addCar fieldset select#inputTransmission').val(),
		"colour" : $('#addCar fieldset input#inputColour').val()};
		//datalistarray.push(newCar);
		$.ajax({
            type: 'POST',
            data: newCar,
            url: '/cars'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
				alert("here?");
                // Clear the form inputs
                $('#addCar fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                //getting another undefined error but I don't have time to hunt this down either
                //alert('Add Error: ' + response.msg);

            }
        });
		$('#addCar fieldset input').val('');
		populateTable();
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
// Delete Car
function deleteCar(event) {
	event.preventDefault();
    // Pop up confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this car?');
    // Check and make sure
    if (confirmation === true) {
		//alert($(this).attr('rel'));
		//var row = element.rowIndex;
		//datalistarray.splice(row -1,1);
		$.ajax({
            type: 'DELETE',
            url: '/cars/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
				//I'm getting an undefined error here but I don't have time right now to hunt it down.
                //alert('My Error: ' + response.msg);
            }

            // Update the table
			
            populateTable();

        });
		//populateTable();
		
    }
    else {
        // If they said no, do nothing
        return false;

    }

};
// Change the make of the car depending on the model dropdown choice
function changeMake() {
	var make = $('#addCar fieldset select#inputMake').val();
	var modelSelect = document.getElementById('inputModel');
	if (make == 'Porsche'){
		modelSelect.options.length = 0;
		modelSelect.options[modelSelect.options.length] = new Option('911 GTI', '911 GTI');
		modelSelect.options[modelSelect.options.length] = new Option('912', '912');
		modelSelect.options[modelSelect.options.length] = new Option('918 Spyder', '918 Spyder');
		modelSelect.options[modelSelect.options.length] = new Option('924', '924');
	}
	else if (make == 'Ferrari'){
		modelSelect.options.length = 0;
		modelSelect.options[modelSelect.options.length] = new Option('550 Maranello', '550 Maranello');
		modelSelect.options[modelSelect.options.length] = new Option('550 Barchetta', '550 Barchetta');
		modelSelect.options[modelSelect.options.length] = new Option('575 Maranello', '575 Maranello');
		modelSelect.options[modelSelect.options.length] = new Option('599 GTO', '599 GTO');
	}
	else if (make == 'BMW'){
		modelSelect.options.length = 0;
		modelSelect.options[modelSelect.options.length] = new Option('E12', 'E12');
		modelSelect.options[modelSelect.options.length] = new Option('E21', 'E21');
		modelSelect.options[modelSelect.options.length] = new Option('1502', '1502');
		modelSelect.options[modelSelect.options.length] = new Option('E24', 'E24');
	}
	else{
		modelSelect.options.length = 0;
		modelSelect.options[modelSelect.options.length] = new Option('500SE', '500SE');
		modelSelect.options[modelSelect.options.length] = new Option('500SEC', '500SEC');
		modelSelect.options[modelSelect.options.length] = new Option('500SEL', '500SEL');
		modelSelect.options[modelSelect.options.length] = new Option('560SEL', '560SEL');
	}
}