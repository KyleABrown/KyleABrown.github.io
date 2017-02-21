$(document).ready(function() {   

	$('#mycalendar').monthly({
		mode: 'event',
		//jsonUrl: 'events.json',
		//dataType: 'json'
		xmlUrl: '../Data/events.xml'
	});

	$('#mycalendar2').monthly({
		mode: 'picker',
		target: '#mytarget',
		setWidth: '250px',
		startHidden: true,
		showTrigger: '#mytarget',
		stylePast: true,
		disablePast: true
	});

	$('.monthly-day-event:nth-child(2n)').append('<div class="monthly-day-total monthly-day-total-positive">+$1,233.76</div>');
	$('.monthly-day-event:nth-child(2n+1)').append('<div class="monthly-day-total monthly-day-total-negative">-$1,233.76</div>');

	$('.transaction').each(function( index ) {
		var num = $(this).attr('data-date');
		$(this).click(function() {
			$("[data-number=" + num +"]").click();
		})
	});

	// $("[id=choose]")

	// $('.toggler').hover(function(){
 //        $(this).stop().animate({left: '-20px'}, 500)
 //    }, function(){
 //        $(this).stop().animate({left: '-110px'}, 500)
 //  	});

	// $("#transaction-table tr").click(function() {
	// 	var row=$(this)//add some .parent() untill you get the TR element
	// 	var val=$(this).val(); //<select> value if you want to use it for some conditions
	// 	$('<table style="width: 100%; padding: 0; margin: 0;"><tr class="rowOptions"><td width="50%"><i class="fa fa-pencil" aria-hidden="true"></i></td><td width="50%"><i class="fa fa-times" aria-hidden="true"></i></td></tr></table>').insertAfter(row);
	// })

	switch(window.location.protocol) {
		case 'http:':
		case 'https:':
		// running on a server, should be good.
		break;
		case 'file:':
			//alert('Just a heads-up, events will not work when run locally.');
	}
});