let request = require('request');

function login(user, pass, callback) {
  request.post({
    url:"http://videowatch.me/login",
    body: {user: user, password: pass},
    json:true
  }, function(error, response, body) {
    callback(body);
  });
}

function register(user, pass, callback) {
  request.post({
    url:"http://videowatch.me/register",
    body: {user: user, password: pass},
    json:true
  }, function(error, response, body) {
    if(body.success) {
      $('#login-success').show();
      $('#login-failed').hide();
    }
    authenticate(callback, false);
  });
}

function authenticate(callback, isRegister) {
  if(isRegister) {
    register($('#login-user').val(), $('#login-pass').val(), callback);
  } else {
    login($('#login-user').val(), $('#login-pass').val(), callback);
  }
}

function success(body) {
  if(body.login) {
    window.key = body.key;
    $('#screen-login').hide(600);
    $('#screen-upload').show(600);
  } else {
    $('#login-failed').show();
  }
}
