var $currentDay = $("currentDay");
var $Blockstime = $(".block-time");
var $schedule = $(".schedule");

var toDoStuff = [];

//creating an hour and text property for each item

var currentDate = moment().format("dddd, MMMM do");
var currentHour = moment().format("H");

function initializeSchedule(){

    $Blockstime.each(function()){
        var $thisBlock = $(this);
        var thisBlock = parseInt($thisBlock.attr("data-hour"));

        var todoObj = {
            hour: thisBlockHr,

            text:"",
        }

        toDoItems.push(todoObj);
        });

        localStorage.setItem("todos", JSON.stringify(toDoItems));

    }
function makeSchedule(){
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    for (var i = 0; i < toDoItems.length; i++){
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);

    }

    console.log(toDoItems);
}


}