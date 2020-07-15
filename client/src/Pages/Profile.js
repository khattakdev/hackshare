import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
}

export default Profile;
$(document).ready(function(){
  $(".item").click(function(event) {
      event.preventDefault();             
      $('.item').removeAttr('id','active');
      $(this).attr('id','active');
      var panel = $(this).attr('panel-id');
      if(panel === "meeting"){
          $('#meeting').show();
          $('#profile').hide();
      }else{
          $('#profile').show();
          $('#meeting').hide();                        
      }               
  });
});
$(".open").on("click", function(){
  $(".popup, .popup-content").addClass("active");
  $(".popup, .popup-overlay").addClass("active");
});
$(".close, .popup").on("click", function(){
  $(".popup, .popup-content").removeClass("active");
  $(".popup, .popup-overlay").removeClass("active");
});
