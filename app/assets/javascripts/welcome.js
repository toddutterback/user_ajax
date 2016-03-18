$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';
  
  if(location.pathname === '/') {
    $.ajax({
      url: baseUrl,
      type: 'GET',
      dataType: 'JSON',
      success: function(data){
        var tbody = $('#users');
        data.users.forEach(function(user) {
        var row = '<tr><td>' + user.first_name + '</td>';
            row += '<td>' + user.last_name + '</td>';
            row += '<td>' + user.phone_number + '</td>';
            row += '<td><button data-id="' + user.id + '" class="btn btn-primary">Show</button></td></tr>'
            tbody.append(row);
        })
      }
    })
  }

  $(document).on('click', '.btn', function() {
    var id = this.dataset.id;
    location.href = '/welcome/' + id;
  });
 

  var re = /\/welcome\/\d+/;
  if (location.pathname.match(re)) {
    var panel = $('#panel');
    var id = panel.data('id');
    $(document).on('click', '#remove', function() {
      $.ajax({
        url: baseUrl + '/' + id, 
        type: 'DELETE',
        dataType: 'JSON',
        success: function() {
          location.href = '/';
        },
        error: function(error) {
          location.href = '/';
        }
      });
    });
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var user = data.user
        panel.children('#heading').html(user.first_name);
        var list = $('#user');
        var first_name = '<li>First Name: ' + user.first_name + '</li>';
        var last_name =  '<li>Last Name: ' + user.last_name + '</li>';
        var phone_number =  '<li>Phone Number: ' + user.phone_number + '</li>';
        var remove = '<li><button class="btn btn-danger" id="remove">Delete</button></li>';
        list.append(first_name);
        list.append(last_name);
        list.append(phone_number);
        list.append(remove);
      }
    })
  };   



});
