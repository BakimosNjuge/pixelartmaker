/*This is the Main JS file for the Pixel Animation Project.
*Google Developers Challange Scholarship 2017-2018
*/

//Below is the javaScript Code for creating the canvas



function makeGrid(){
// Declaring Constants in a function

const height = $("#input_height").val(); // determines the table height(rows)
const width = $("#input_width").val(); // determines the table width(columns)
const table  = $("#pixel_canvas"); // determines the table canvas

// Empty Previous Table Input

 table.children().remove();

// create grid using for loop using the input

for (let i = 0; i < height; i++) //function loops by adding new table rows(height) until the value in the input field height -> Condition is false
{
    table.append("<tr></tr>");  
      for (let i = 0; i < width; i++) //function loops by adding new table columns(width) until the value in the input field width -> Condition is false
{
        table.children().last().append("<td></td>");
      }
    }
}

// Creating an Event that Calls the Function onClick. This creates the canvas grid

$("button#submit").click(function(event) {
  event.preventDefault();
  makeGrid();




//Using Left Click Mouse Button for Color Painting Canvas

  $("td").click(function(pickColor) {
    switch (pickColor.which) {
      case 1:
        $(this).css("background-color",
         document.getElementById("colorPicker").value);
        
        //No need to use to break; it's irrelevant in this particular case
    }
  });


//Using Right Click Button to Erase Color by restoring color to white

$("td").contextmenu(function(event) {
    event.preventDefault()
    $(this).css("background-color", "#f7f7f7")
  });


});


// Event Listener that triggers submit input values upon clicking Keyboard Enter Key

function submitKeyPress(e)
{
    if (e.keyCode == 13)
    {
        document.getElementById('submit').click();
        return false;
    }
    return true;
}

// Limiting Input Field Values Entered

  function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }
    
  function isNumeric (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }


// Creation of Typewriting Effect


var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
