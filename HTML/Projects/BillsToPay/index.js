var variables = {
  loadDIV: {
    loadscreenDIV: "content-loadscreen",
    loadscreenTitle: "content-loadscreen-title",
    loadscreenLoginDIV: "content-loadscreen-login",
    loadscreenRegisterButton: "content-loadscreen-loginRegisterButton",
    loadscreenLoginButton: "content-loadscreen-loginSubmitButton",
  },
  registerName: "",
  registerBillName: "",
  registerBillAmount: "",
  registerBillFrequency: "",

  card: "front",
}

$(document).ready(function() {   

  $('body').css({ 'display' : ''});

  $("#card").flip({
    axis: 'y',
    trigger: 'manual',
  });

  $('.flipToggle').click(function() {
    $("#card").flip('toggle');
  });

  $('#' + variables.loadDIV.loadscreenLoginButton).click(function(e) {
    // Webservice to update last logged in for this user
    location.href = "HTML/Calendar.html";
  });

  function changeNoticeText(num) {
    $('#' + variables.loadDIV.loadscreenTitle).fadeOut(850, function() {

      if (num == 1) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>Create New Bill :</h1>");
        $("#" + variables.loadDIV.loadscreenTitle).append('<div class="col-lg-12" style="background-color: rgba(255,255,255,0.2); padding-bottom: 20px; padding-top: 20px; border-radius: 5px;" ><input id="inputName" type="text" class="form-control" style="margin-top: 10px;" placeholder="Bill Name"><input type="number" id="inputBillAmount" class="form-control" style="margin-top: 10px;" placeholder="Bill Amount ($)" required=""><button type="button" class="btn btn-default dropdown-toggle" id="inputBillFrequencyDropdown" data-toggle="dropdown" aria-haspopup="true" style="width: 100%; text-align: left; border-top-left-radius: 5px; margin-top: 10px; border-bottom-left-radius: 5px;"aria-expanded="false">Bill Frequency <span class="caret pull-right" style="margin-top: 8px;"></span></button><ul id="inputBillFrequency" class="dropdown-menu dropdown-menu-right"><li><a>Yearly</a></li><li><a>Monthly</a></li><li><a>Weekly</a></li><li><a>Daily</a></li></ul><div style="margin-top: 10px;" class="input-group"><span class="input-group-btn"><button class="btn btn-primary" style="width: 50%; border-top-left-radius: 5px; border-bottom-left-radius: 5px;" id="addAnother" type="button">Add Another</button><button class="btn btn-danger" style="width: 51%; border-top-right-radius: 5px; border-bottom-right-radius: 5px;" id="continue" type="button">Continue</button></span></div></div>');
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850, function() {
          
          $('#addAnother').click(function(e) {
            // Webservice to save Bill 
            changeNoticeText(1);
          });

          $('#continue').click(function(e) {
            $("#" + variables.loadDIV.loadscreenTitle).fadeOut(850, function() {
              location.href = "HTML/Calendar.html";
            });
          });
        });
      }

      else if (num == 2) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>First things first.</h1>");
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850);
        changeNoticeText(3);
      }

      else if (num == 3) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>What is your name?</h1>");
        $("#" + variables.loadDIV.loadscreenTitle).append('<div class="col-lg-12"><div class="input-group"><input id="inputName" type="text" class="form-control" placeholder="Name"><span class="input-group-btn"><button class="btn btn-primary" id="inputNameContinue" type="button">Continue</button></span></div></div>');

        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850, function() { $('#inputName').focus(); });

        $('#inputNameContinue').click(function () {
          variables.registerName =  $('#inputName').text();
          changeNoticeText(4);
        });
        $('#inputName').keypress(function (e) {
          var key = e.which;
          if(key == 13) {
            variables.registerName =  $('#inputName').text();
            changeNoticeText(4);
          }
        });
      }

      else if (num == 4) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>Alright.</h1>");
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850);
        changeNoticeText(5);
      }

      else if (num == 5) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>Lets enter some bills.</h1>");
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850);
        changeNoticeText(6);
      }

      else if (num == 6) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>What bill would you like to add?</h1>");
        $("#" + variables.loadDIV.loadscreenTitle).append('<div class="col-lg-12"><div class="input-group"><input type="text" id="inputBillName" placeholder="Bill Name" class="form-control" required=""><span class="input-group-btn"><button class="btn btn-primary" id="inputBillNameContinue" type="button">Continue</button></span></div></div>');

        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850, function() { $('#inputBillName').focus(); });

        $('#inputBillNameContinue').click(function () {
          variables.registerBillName = $('#inputBillName').text();
          changeNoticeText(7);
        });

        $('#inputBillName').keypress(function (e) {
          var key = e.which;
          if(key == 13) {
            variables.registerBillName = $('#inputBillName').text();
            changeNoticeText(7);
          }
        });
      }

      else if (num == 7) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>Cool.</h1>");
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850);
        changeNoticeText(8);
      }

      else if (num == 8) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>How much is it?</h1>");
        $("#" + variables.loadDIV.loadscreenTitle).append('<div class="col-lg-12"><div class="input-group"><input type="number" id="inputBillAmount" class="form-control" placeholder="Bill Amount ($)" required=""><span class="input-group-btn"><button class="btn btn-primary" id="inputBillAmountContinue" type="button">Continue</button></span></div></div>');

        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850, function() { $('#inputBillAmount').focus(); });

        $('#inputBillAmountContinue').click(function () {
          variables.registerBillAmount = $('#inputBillAmount').text();
            changeNoticeText(9);
        });

        $('#inputBillAmount').keypress(function (e) {
          var key = e.which;
          if(key == 13) {
            variables.registerBillAmount = $('#inputBillAmount').text();
            changeNoticeText(9);
          }
        });
      }

      else if (num == 9) {
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>How often is it paid?</h1>");
        $("#" + variables.loadDIV.loadscreenTitle).append('<div class="col-lg-12"><div class="input-group"><div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" id="inputBillFrequencyDropdown" data-toggle="dropdown" aria-haspopup="true" style="width: 80%; text-align: left; border-top-left-radius: 5px; border-bottom-left-radius: 5px;"aria-expanded="false">Bill Frequency <span class="caret pull-right" style="margin-top: 8px;"></span></button><ul id="inputBillFrequency" class="dropdown-menu dropdown-menu-right"><li><a>Yearly</a></li><li><a>Monthly</a></li><li><a>Weekly</a></li><li><a>Daily</a></li></ul><button class="btn btn-primary" id="inputBillFrequencyContinue" style="border-top-right-radius: 5px; border-bottom-right-radius: 5px;" type="button">Continue</button></div></div></div>');
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850, function() { $('#inputBillFrequency').focus(); });

        $('#inputBillFrequency li').click(function(e) { 
          $('#inputBillFrequencyDropdown').html($(this).find("a").text() + '<span class="caret pull-right" style="margin-top: 8px;"></span>');
        });

        $('#inputBillFrequencyContinue').click(function () {
          variables.registerBillFrequency = $('#inputBillFrequencyDropdown').text();
          changeNoticeText(10);
        });

        $('#inputBillFrequencyDropdown').keypress(function (e) {
          var key = e.which;
          if(key == 13) {
            // Webservice to save Bill
            variables.registerBillFrequency = $('#inputBillFrequencyDropdown').text();
            changeNoticeText(10);
          }
        });
      }

      else if (num == 10){
        $("#" + variables.loadDIV.loadscreenTitle).html("<h1>Would you like to add another?</h1>");
        $("#" + variables.loadDIV.loadscreenTitle).append('<div class="col-lg-12"><div class="input-group"><span class="input-group-btn"><button class="btn btn-primary" style="width: 50%; border-top-left-radius: 5px; border-bottom-left-radius: 5px;" id="yes" type="button">Yes</button><button class="btn btn-danger" style="width: 50%; border-top-right-radius: 5px; border-bottom-right-radius: 5px;" id="no" type="button">No</button></span></div></div>');
        $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850, function() {
          $('#no').click(function(e) {
            $("#" + variables.loadDIV.loadscreenTitle).fadeOut(1500, function(){
              location.href = "HTML/Calendar.html";
            });
          });

          $('#yes').click(function(e) {
            $("#" + variables.loadDIV.loadscreenTitle).fadeOut(1500, function() {
              changeNoticeText(1);
            });
          });
        });
      }
    });
  } 

  $('#' + variables.loadDIV.loadscreenRegisterButton).click(function(e) {
    // Webservice to register user
    $('#card').fadeOut(850,function(){
      $('#' + variables.loadDIV.loadscreenTitle).fadeIn(850);
      changeNoticeText(6);
    });
  });
});