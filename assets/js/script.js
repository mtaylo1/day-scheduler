var $currentDay = $("#currentDay");
var $blocksTime = $(".block-time");
var $schedule = $(".schedule");

var toDoStuff = [];

//creating an hour and text property for each item

var currentDate = moment().format("dddd, MMMM do");
var currentHour = moment().format("H");

function initializeSchedule(){

    $blocksTime.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        var todoObj = {
            hour: thisBlockHr,

            text:"",
        }

        toDoStuff.push(todoObj);
        });

        localStorage.setItem("todos", JSON.stringify(toDoStuff));

    }

function timeBlocks(){
    $blocksTime.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        if (thisblockHr == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");

        }

        if (thisblockHr == currentHour) {
            $thisBlock.addClass("past").removeClass("present future");

        }
        if (thisblockHr == currentHour) {
            $thisBlock.addClass("future").removeClass("past present");

        }
    });

}


function makeSchedule(){
    toDoStuff = localStorage.getItem("todos");
    toDoStuff = JSON.parse(toDoStuff);

    for (var i = 0; i < toDoStuff.length; i++){
        var itemHour = toDoStuff[i].hour;
        var itemText = toDoStuff[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);

    }

    console.log(toDoStuff);
}

function saveItem(){

    var $thisBlock = $(this).parent();
    var hourToUpdate = $(this).parent().attr("data-hour");

    var thingToAdd = (($(this).parent()).children("textarea")).val();

    for (var i = 0; i < toDoItems.length; i++){
        if (toDoStuff[i].hour == hourToUpdate){
            toDoStuff[i].text = thingToAdd;     
        }
    localStorage.setItem("todos",JSON.stringify(toDoStuff));
    makeSchedule();
    }

    $(document).ready(function(){

        timeBlocks();

        if(!localStorage.getitem("todos")){
            initializeSchedule();
        }

        $currentDay.text(currentDate);
        makeSchedule();
        $schedule.on("click", "button", saveItem);

    });
}
