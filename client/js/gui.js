$(document).ready(function() {
  $('#screen-main').show(600);
});

$('#authenticate-link').click(function() {
  $('#screen-main').hide();
  $('#screen-login').show(600);
});
