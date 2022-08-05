var $currentDay = $("#currentDay");
var $blocksTime = $(".time-block");
var $scheduleSet = $(".schedule");

var toDoStuff = [];


var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule(){
     console.log(toDoStuff);

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

function timeBlocksSetup(){
    $blocksTime.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        if (thisBlockHr == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");

        }

        if (thisBlockHr < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");

        }

        if (thisBlockHr > currentHour) {
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

}

function saveItem(){

    var $thisBlock = $(this).parent();
    var hourToUpdate = $(this).parent().attr("data-hour");

    var thingToAdd = (($(this).parent()).children("textarea")).val();

    for (var j = 0; j < toDoStuff.length; j++){
        if (toDoStuff[j].hour == hourToUpdate){

          toDoStuff[j].text = thingToAdd;
        }
      }
      localStorage.setItem("todos", JSON.stringify(toDoStuff));
      makeSchedule();
    }

    $(document).ready(function(){

        timeBlocksSetup();

        if(!localStorage.getItem("todos")){
            initializeSchedule();
        }

        $currentDay.text(currentDate);
        makeSchedule();
        $scheduleSet.on("click", "button", saveItem);

    });
