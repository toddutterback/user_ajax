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
 

});
