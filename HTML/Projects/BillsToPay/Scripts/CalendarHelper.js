$(document).ready(function() {   
	/************************************************  FUNCTIONS ********************************************************/
	function initilizePackages() {
		/* Initilize Calendar */
		$('#mycalendar').monthly({
			mode: 'event',
			//jsonUrl: 'events.json',
			//dataType: 'json'
			xmlUrl: '../Data/events.xml'
		});

		/* Initilize DateTime Picker */
		$(".form_datetime").datetimepicker({
			format: 'yyyy-mm-dd',
			autoclose: true,
			minView: 2,
			todayHighlight: true,
		});

		/* Mask for amount inputs */
		$("#addTransactionAmount").maskMoney({allowZero:true, prefix: '$'});
		$("#addBillAmount").maskMoney({allowZero:true, prefix: '$'});
		$("#addIncomeAmount").maskMoney({allowZero:true, prefix: '$'});
		$("#currentBalanceAmount").maskMoney({allowZero:true, allowNegative:true, prefix: '$'});
		$("#editTransactionAmount").maskMoney({allowZero:true, prefix: '$'});

		/* Add close button to event list div */
		$(document).mouseup(function (e) {
		    var container = $('.monthly-event-list');
		    if (!container.is(e.target) // if the target of the click isn't the container...
		        && container.has(e.target).length === 0) // ... nor a descendant of the container
		    {
		        container.hide();
		    }
		});


	}

	function sortTable(table) {
		var table  = table,
		    rows   = $('tr', table);

	    rows.sort(function(a, b) {
	        var keyA = $('td',a).text();
	        var keyB = $('td',b).text();
	        return (keyA > keyB) ? 1 : 0;
	    }); 
	    rows.each(function(index, row) {
	        table.append(row);
	    });

	    updateTotals();
	}

	function updateTotals () {
		$('#transactionTable').each(function() {
			var total = 0;
			$('#transactionTable tr td:nth-child(3)').each(function() {
				var num = $(this).text().replace(' ','').replace('$','').replace(',','');
				total = parseFloat(total, 10) + parseFloat(num, 10);
			});

			$('#transactionTable').next().text(convertToCurrency(total));
		});

		$('#billTable').each(function() {
			var total = 0;
			$('#billTable tr td:nth-child(3)').each(function() {
				var num = $(this).text().replace(' ','').replace('$','').replace(',','');
				total = parseFloat(total, 10) + parseFloat(num, 10);
			});

			$('#billTable').next().text(convertToCurrency(total));
		});

		$('#incomeTable').each(function() {
			var total = 0;
			$('#incomeTable tr td:nth-child(3)').each(function() {
				var num = $(this).text().replace(' ','').replace('$','').replace(',','');
				total = parseFloat(total, 10) + parseFloat(num, 10);
			});

			$('#incomeTable').next().text(convertToCurrency(total));
		});
	};

	function convertToCurrency(salary) {
        // round up to 2 decimal places
        var i = parseFloat(salary);
        if (isNaN(i)) { i = 0.00; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        s = new String(i);
        if (s.indexOf('.') < 0) { s += '.00'; }
        if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + s;
        // insert commas for every 3 positions
        s = s.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        // add $
        if (s.includes('-')) {
        	s = [s.slice(0, 1), '$', s.slice(1)].join('');
        }
        else {
        	s = ("$" + s);
    	}
        return s;
    };


	initilizePackages();
	/******************************************* LOGIC TO UPDATE CURRENT BALANCE*********************************************/

	$('#currentBalanceModal').modal('show');

	$('#currentBalanceModalSave').click(function () { 
		var newBal = $('#currentBalanceAmount').val();

		if (newBal.includes('-')) {
			$('.monthly-today').append('<div class="monthly-day-total monthly-day-total-negative">'+ newBal +'</div>');
		}
		else {
			$('.monthly-today').append('<div class="monthly-day-total monthly-day-total-positive">'+ newBal +'</div>');
		}


		$('#currentBalanceModal').modal('hide');
	});


	/************************************************************************************************************************/



	/**************************************  Stuff I have to do with Bill Data *********************************************/
	$('.transaction').each(function( index ) {
		$(this).click(function() {

			var date = "";
			var name = "";
			var amount = "";

			$(this).children().each(function( index  ) {
				console.log($(this).text());
				if (index == 0) {
					date = $(this).text();
				}
				else if (index == 1) {
					name = $(this).text();
				}
				else if (index == 2) {
					amount = $(this).text();
				}

			});

			$('#editTransactionName').val(name);
			$('#editTransactionAmount').val(amount);
			$('#editTransactionStartDate').val('');
			$('#editTransactionFrequency').val('');

			$('#editTransactionModal').modal('show');
		})
	});

	//$('.monthly-day-event:nth-child(2n)').append('<div class="monthly-day-total monthly-day-total-positive">+$1,233.76</div>');
	//$('.monthly-day-event:nth-child(2n+1)').append('<div class="monthly-day-total monthly-day-total-negative">-$1,233.76</div>');
	updateTotals();
	/************************************************************************************************************************/




	/************************************** THIS IS FOR ADDING TRANSACTIONS *************************************************/
	$('#addTransactionModalSave').click(function () {
		var name = $('#addTransactionName').val();
		var amount = $('#addTransactionAmount').val();
		var startDate = $('#addTransactionStartDate').val();
		startDate = startDate.split('-')[2];
		var frequency = $('#addTransactionFrequency').val();

		var type = "";
		var typeSign = "";

		if ($('#addTransactionType').val() == "Bill") {			
			type = "transaction-negative";
			typeSign = "-";
		}
		else if($('#addTransactionType').val() == "Income") {
			type = "transaction-positive";
			typeSign = "+";
		}


		var pass = true;
		if (name == "" || name == undefined || name == null) {
			pass = false;
			$('#addTransactionName').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (type == "" || type == undefined || type == null) {
			pass = false;
			$('#addTransactionType').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (amount == "" || amount == undefined || amount == null) {
			pass = false;
			$('#addTransactionAmount').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (startDate == "" || startDate == undefined || startDate == null) {
			pass = false;
			$('#addTransactionStartDate').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (frequency == "" || frequency == undefined || frequency == null) {
			pass = false;
			$('#addTransactionFrequency').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}

		if (pass == true) {
			$('#transactionTable').append('<tr class="transaction '+ type +'" data-date='+ startDate + '><td>'+ startDate +'</td><td>'+ name +'</td><td>' + typeSign +' '+ amount +'</td></tr>');
			sortTable($('#transactionTable'));
			$('#addTransactionModal').modal('hide');
		}
	});

	$('#addBillModalSave').click(function () {
		var name = $('#addBillName').val();
		var amount = $('#addBillAmount').val();
		var startDate = $('#addBillStartDate').val();
		startDate = startDate.split('-')[2];
		var frequency = $('#addBillFrequency').val();

		var pass = true;
		if (name == "" || name == undefined || name == null) {
			pass = false;
			$('#addBillName').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (amount == "" || amount == undefined || amount == null) {
			pass = false;
			$('#addBillAmount').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (startDate == "" || startDate == undefined || startDate == null) {
			pass = false;
			$('#addBillStartDate').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (frequency == "" || frequency == undefined || frequency == null) {
			pass = false;
			$('#addBillFrequency').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}

		if (pass == true) {
			$('#billTable').append('<tr class="transaction transaction-negative" data-date='+ startDate + '><td>'+ startDate +'</td><td>'+ name +'</td><td>- '+ amount +'</td></tr>');
			sortTable($('#billTable'));
			$('#addBillModal').modal('hide');
		}
	});

	$('#addIncomeModalSave').click(function () {
		var name = $('#addIncomeName').val();
		var amount = $('#addIncomeAmount').val();
		var startDate = $('#addIncomeStartDate').val();
		startDate = startDate.split('-')[2];
		var frequency = $('#addIncomeFrequency').val();

		var pass = true;
		if (name == "" || name == undefined || name == null) {
			pass = false;
			$('#addIncomeName').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (amount == "" || amount == undefined || amount == null) {
			pass = false;
			$('#addIncomeAmount').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (startDate == "" || startDate == undefined || startDate == null) {
			pass = false;
			$('#addIncomeStartDate').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}
		if (frequency == "" || frequency == undefined || frequency == null) {
			pass = false;
			$('#addIncomeFrequency').css({
				'-webkit-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'-moz-box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
				'box-shadow': 'inset 0px 0px 38px 20px rgba(231,77,60,1)',
			});
		}

		if (pass == true) {
			$('#incomeTable').append('<tr class="transaction transaction-positive" data-date='+ startDate + '><td>'+ startDate +'</td><td>'+ name +'</td><td>+ '+ amount +'</td></tr>');
			sortTable($('#incomeTable'));
			$('#addIncomeModal').modal('hide');
		}
	});

	// Reset inputs and clear red highlight
	$('.addModal').on('hidden.bs.modal', function () {
		$('input').val('');
		$('select').val('');
		$('input').css({
			'-webkit-box-shadow': 'none',
			'-moz-box-shadow': 'none',
			'box-shadow': 'none',
		});
		$('select').css({
			'-webkit-box-shadow': 'none',
			'-moz-box-shadow': 'none',
			'box-shadow': 'none',
		});
	})
	/**************************************************************************************************************************/


	switch(window.location.protocol) {
		case 'http:':
		case 'https:':
		// running on a server, should be good.
		break;
		case 'file:':
			//alert('Just a heads-up, events will not work when run locally.');
	}
});