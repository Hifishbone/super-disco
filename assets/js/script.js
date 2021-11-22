var tasks = {};
var hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
var descriptionClassNames = 'col-8 description ';

var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
      tasks = {};
      hours.forEach(function(hour) {
        tasks[hour] = "";
      });
  }
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};



$(document).ready (function () {
    var curDay = moment().format('dddd, MMMM Do');
    $('#currentDay').text(curDay);

    loadTasks();
    $.each(tasks, function(hour, description) {
        console.log(hour, description);
        // then loop over sub-array
        var timeBlockElement = document.createElement("div");
        timeBlockElement.className = 'row time-block';
        timeBlockElement.setAttribute('id', hour);
        
        var hourElement = document.createElement("div");
        hourElement.className = 'col hour';
        hourElement.textContent = hour;

        var descriptionElement = document.createElement("div");
        var classNames = descriptionClassNames;
        if (moment().isSame(moment(hour, 'hhA'), 'hour')) {
            classNames += 'present';
        } else if ((moment().isBefore(moment(hour, 'hhA'), 'hour'))) {
            classNames += 'future';
        } else if ((moment().isAfter(moment(hour, 'hhA'), 'hour'))) {
            classNames += 'past';
        }
        descriptionElement.className = classNames;
        descriptionElement.textContent = description;
        
        var saveBtnElement = document.createElement("div");
        saveBtnElement.className = 'col saveBtn';
        saveBtnElement.innerHTML = '<span class="oi oi-clipboard"></span>';

        timeBlockElement.appendChild(hourElement);
        timeBlockElement.appendChild(descriptionElement);
        timeBlockElement.appendChild(saveBtnElement);
        
        $("#timeBlocks").append(timeBlockElement);
    });

})


