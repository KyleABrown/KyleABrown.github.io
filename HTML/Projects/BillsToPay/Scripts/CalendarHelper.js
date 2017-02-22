$(document).ready(function() {   

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
	}

	initilizePackages();

	/* Stuff I have to do with Bill Data */
	$('.transaction').each(function( index ) {
		var num = $(this).attr('data-date');
		$(this).click(function() {
			$("[data-number=" + num +"]").click();
		})
	});

	$('.monthly-day-event:nth-child(2n)').append('<div class="monthly-day-total monthly-day-total-positive">+$1,233.76</div>');
	$('.monthly-day-event:nth-child(2n+1)').append('<div class="monthly-day-total monthly-day-total-negative">-$1,233.76</div>');

	/*************************************/

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
		else {
			type = "transaction-positive";
			typeSign = "+";
		}

		$('#transactionTable').append('<tr class="transaction '+ type +'" data-date='+ startDate + '><td>'+ startDate +'</td><td>'+ name +'</td><td>' + typeSign +' $'+ amount +'</td></tr>');
		$('#addTransactionModal').modal('hide');
	});

	$('#addBillModalSave').click(function () {
		var name = $('#addBillName').val();
		var amount = $('#addBillAmount').val();
		var startDate = $('#addBillStartDate').val();
		startDate = startDate.split('-')[2];
		var frequency = $('#addBillFrequency').val();
		$('#billTable').append('<tr class="transaction transaction-negative" data-date='+ startDate + '><td>'+ startDate +'</td><td>'+ name +'</td><td>- $'+ amount +'</td></tr>');
		$('#addBillModal').modal('hide');
	});

	$('#addIncomeModalSave').click(function () {
		var name = $('#addIncomeName').val();
		var amount = $('#addIncomeAmount').val();
		var startDate = $('#addIncomeStartDate').val();
		startDate = startDate.split('-')[2];
		var frequency = $('#addIncomeFrequency').val();
		$('#incomeTable').append('<tr class="transaction transaction-positive" data-date='+ startDate + '><td>'+ startDate +'</td><td>'+ name +'</td><td>+ $'+ amount +'</td></tr>');
		$('#addIncomeModal').modal('hide');
	});

	switch(window.location.protocol) {
		case 'http:':
		case 'https:':
		// running on a server, should be good.
		break;
		case 'file:':
			//alert('Just a heads-up, events will not work when run locally.');
	}
});