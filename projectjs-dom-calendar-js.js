function calendarClear(){
    document.getElementById("calendar-month-year").innerHTML = "";
    document.getElementById("calendar-dates").innerHTML = "";

    document.getElementById("day").value = 0;
    document.getElementById("month").value = 0;
    document.getElementById("year").value = 0;
}

function createCalendar(){

    document.getElementById("calendar-month-year").innerHTML = "";
    document.getElementById("calendar-dates").innerHTML = "";
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = document.getElementById("month").value;   //1-12
    var year = document.getElementById("year").value;  //any year
    var first_date = month_name[month] + " " + 1 + " " + year;
    //Example February 1 2019
    var tmp = new Date(first_date).toDateString();
    //Example Mon Feb 01 2019 
    var first_day = tmp.substring(0, 3);    //Mon
    var day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var day_no = day_name.indexOf(first_day);   //1
    var days = new Date(year, month, 0).getDate();    //up to 31
    //Example Mon Feb 01 2019 
    var calendar = get_calendar(day_no, days);
    document.getElementById("calendar-month-year").innerHTML = month_name[Number(month)-1]+" "+year;
    document.getElementById("calendar-dates").appendChild(calendar);

    if(Number(document.getElementById("month").value) > 12){
        document.getElementById("month").value =12;
    }
    else if(Number(document.getElementById("day").value) > days.getDate){
        document.getElementById("day").value = Number(document.getElementById("day").value)
    }


    
}

function get_calendar(day_no, days){

    var table = document.createElement('table');
    var tr = document.createElement('tr');
    
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "MTWTFSS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    var space_counter =0;
    for(c=0; c<=6; c++){
        
        if(c == day_no){
            console.log(space_counter)
            break;
        }

        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
 
    }
    
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        if(count == document.getElementById("day").value){
            td.setAttribute("class", "selectedDate")
        }
        tr.appendChild(td);
        count++
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            if(count == document.getElementById("day").value){
                td.setAttribute("class", "selectedDate")
                
            }
            tr.appendChild(td);
            count++;
        }
        table.appendChild(tr);
    }s
    return table;
 }

//functions to change days/months/years 
function nextDay(){

    var d= new Date();
    var month = Number(document.getElementById("month").value);   
    var year = Number(document.getElementById("year").value);
    var days = new Date(year, month, 0).getDate(); 

    if((Number(document.getElementById("day").value)>(Number(days) - 1))){
        return;
    }
    
    document.getElementById("day").value = (Number(document.getElementById("day").value) +1);
}


function previousDay(){

    if(Number(document.getElementById("day").value)  < 2){
        return;
      }

    document.getElementById("day").value = (Number(document.getElementById("day").value) - 1);

}

function nextMonth(){

    if(Number(document.getElementById("month").value)  > 11){
      return;
    }
    document.getElementById("month").value = (Number(document.getElementById("month").value) + 1);

}

function previousMonth(){

    if(Number(document.getElementById("month").value)  < 2){
        return;
      }
    document.getElementById("month").value = (Number(document.getElementById("month").value) - 1);

}

function nextYear(){

    document.getElementById("year").value = (Number(document.getElementById("year").value) + 1);

}

function previousYear(){

    if(Number(document.getElementById("year").value)  < 2){
        return;
      }

    document.getElementById("year").value = (Number(document.getElementById("year").value) - 1);

}

var appointmentCounter =0;
//functions to create/hide/show new appointments on the side bar, and in the json object
function addAppointment(){
       
        var ul = document.getElementById("appointments-list");
        var li = document.createElement("li");

        li.appendChild(document.createTextNode(document.getElementById("appointment-name").value));
        ul.appendChild(li);
        storingObject.Appointments[appointmentCounter] = 
        (document.getElementById("appointment-name").value + " on " +
        Number(document.getElementById("day").value) + " day, of " +
        Number(document.getElementById("month").value) + " month in " + 
        Number(document.getElementById("year").value) + " years.");

        appointmentCounter = appointmentCounter + 1;
    }

function hideAppointments(){

    document.getElementById("appointments-list").style.visibility = "hidden";

    }

function showAppointments(){

    document.getElementById("appointments-list").style.visibility = "visible";
  
    }

//json object that stores information
var storingObject = {
Appointments:
{

}

}

//function to call the event for the currently selected date
function callCurrentEvent(){
    for(var i=0;i<Number(document.getElementById("day").value);i++){
        if((document.getElementById("appointment-name").value + " on " +
        Number(document.getElementById("day").value) + " day, of " +
        Number(document.getElementById("month").value) + " month in " + 
        Number(document.getElementById("year").value) + " years.") == storingObject.Appointments[i]){

            document.getElementById("current-event").value = ("Event: " + storingObject.Appointments[i] )
        }
        else{
            document.getElementById("current-event").value = "No current events! Doby is free! Masta give him sock!"
        }
    }
}

//functions for style
function styleOne(){
    if(document.getElementById("calendar-container").style.visibility == "hidden"){
        document.getElementById("calendar-container").style.visibility = "visible";
    }
    else{
    document.getElementById("calendar-container").style.visibility = "hidden";
    }

}

function styleTwo(){
    if( document.getElementById("calendar-container").style.background == "rgb(58, 181, 45)"){ 
    document.getElementById("calendar-container").style.background = "rgb(196, 76, 247)";
    }
    else{
        document.getElementById("calendar-container").style.background = "rgb(58, 181, 45)";
    }
}

function styleThree(){
if(document.getElementById("calendar-container").style.color == "white"){
    document.getElementById("calendar-container").style.color = "black"
}
else{
    document.getElementById("calendar-container").style.color = "white";
}
}

function styleFour(){
if( document.getElementById("calendar-container").style.background == "black" &&
document.getElementById("calendar-container").style.color == "white"){
    document.getElementById("calendar-container").style.background = "white";
    document.getElementById("calendar-container").style.color = "black";
}
else{
    document.getElementById("calendar-container").style.background = "black";
    document.getElementById("calendar-container").style.color = "white";
}

}

