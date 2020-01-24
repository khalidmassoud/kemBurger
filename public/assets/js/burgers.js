$(document).ready(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
      var burgers = data.burgers;
      var len = burgers.length;

      console.log("burgers data: " + burgers);

      var burgers_elem = $("#waitingBurger");
      var burgers_devoured = $("#devourBurger");
      
      for (var i = 0; i < len; i++) {
        console.log("devoured boolean: " + burgers[i].devoured);
        if  (burgers[i].devoured == false){
          
           burgers_elem.append(
           "<li><p>" +
            burgers[i].id +
            "." +
            burgers[i].burger_name +
            "," +
            "<button data-burgerid='" +
            burgers[i].id +
            "' class='devourburger'>Devour Burger!</button></p></li>"
        )}
        else{
          burgers_devoured.append(
            "<li><p>" +
             burgers[i].id +
             "." +
             burgers[i].burger_name +
             "," +
             "<button data-burgerid='" +
             burgers[i].id +
             "' class='deleteburger'>Delete Burger!</button></p></li>"
           ) };
      }
    });
  
    $(document).on("click", ".devourburger", function(event) {
      // Get the ID from the button.
      // This is shorthand for $(this).attr("data-planid")
      var id = $(this).data("burgerid");
      console.log(id);
  
      // Send the get request.
      $.ajax("/burgers/" + id, {
        method: "Put"
      }).then(function() {
        
       // Reload the page to get the updated list

        location.reload();
      });
    });

      
    $("#addBurger").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      // [name=plan] will find an element with a "name" attribute equal to the string "plan"
      var newburger = {
        burger: $("#addBurger [name=addBurger]")
          .val()
          .trim(),
        devoured: false
      };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newburger),
        dataType: "json",
        contentType: "application/json"
      }).then(function() {
        console.log("created new plan");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $("#updateburgers").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var id = $("#burger_id")
        .val()
        .trim();
  
      var updatedburger = {
        burgers: $("#devourburger [name=devouredb]")
          .val()
          .trim()

      };

    
    
    });

    $(document).on("click", ".deleteburger", function(event) {
      event.preventDefault();
      console.log("delete called!")
      // Get the ID from the button.
      // This is shorthand for $(this).attr("data-planid")
      var id = $(this).data("burgerid");
      console.log("delete burger: " + id);
  
      // Send the get request.
      $.ajax("/burgers/" + id, {
        type: "delete"
      }).then(function() {
        
       // Reload the page to get the updated list

        location.reload();
      });
    });
  });
  