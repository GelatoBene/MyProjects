 //масив в който ще се съхраняват събитията като обекти
var events=[];

//променлива от която ще зависи дали функциите могат да бъдат изпълнени
var allow = true;

//функция за създаване на обекти за масива- едно събитие може да се добави повече от 1 път, ако е нужно
function createEvent(name,forMinors,repeat,price){
if(allow == false){
    console.log("Sorry, but the system is currently offline! Please stop by later ^^")
}
else{

// var reDate = new RegExp("^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$");
// if(reDate.test(time)){
// console.log("invalid time format");
// time = "invalid";
// }
//ако име не еподадено, то функцията ще спре
if(name == null || name == ""){
console.log("Sorry, but without a name, we cannot create an event!\n The event creator will now stop running.");
return;
}

console.log("this event will be added " + repeat + " times");

//ако не е описано дали е за непълнолетни,или ако са въведени неправилни данни, се счита че събитието не е подходящо
if(typeof forMinors != "boolean" ){
    forMinors = false;
    console.log("The entered information was not valid, so\n the event has been set an inappropriate\n for children as a precaution");
    }


if(price == null) {
    price=0;
}  

//цикъл за добавяне на елементите като обект във масива отговарящ за Събитията
for (var i = 0;i<repeat;i++){ 
events.push({
eId:(events.length),
eName:name,
eMinor:forMinors,
ePrice:price,
eClients: [],
eArchived : false,
eRating : 0,
eRated : false,
})
}
}
}

//функция за показване на събитията
function showEvents(){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{
    for(var i =0;i<events.length;i++){
        console.log(events[i]);
        
    }
}
}

//функция за изтриване на събития- може да се изтрият множество събития от една начална точка
function deleteEvents(start,finish){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{

events.splice(start,finish);
console.log(finish + " elements have been deleted successfully")
    }
}

//функция за промяна на данните на едно събитие, при въведено ID
function updateEvents(id,name,forMinors){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{

    if(name == null || name == ""){
        console.log("Sorry, but without a name, we cannot create an event!\n The event creator will now stop running.");
        return;
        }

    if(typeof forMinors != "boolean" ){
        forMinors = false;
        console.log("The entered information was not valid, so\n the event has been set an inappropriate\n for children as a precaution");
        }
    for(var i=0;i<events.length;i++){
        if(events[id] == events[i]){
            events[id].eName = name;
            events[id].eMinor = forMinors;
        }
    }
}
}

//функция която добавя данните за клиента който участва в събитието 
function addClients(clId,evId){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{

    //Object.assign
        if(events[evId].eArchived == true){
            console.log("Event is archived!")
            return;
        }
        else{

        if(clients[clId].cMoney < events[evId].ePrice){
            console.log("insufficient funds");
            return;
        }
        else{

   (events[evId].eClients.push({
       participantId:clients[clId].cId,
       participantFname: clients[clId].firstName,
       participantSecondName: clients[clId].secondName,
       participantAge: clients[clId].cAge,
       participantGender: clients[clId].cGender,
       participantMoney: Number(clients[clId].cMoney) - Number(events[evId].ePrice),
    }));


//проверява се възрастта на клиента, и ако не отговаря на изискванията на събитието, ще бъде изнесено предупреждение
     if(events[evId].eClients.participantAge<18 && events[evId].eMinor==false){
         console.log("Клиента не отговаря на възрастовата граница\n и ще бъде изритан ако е без придружител")
    }
    else{
        console.log("Клиента бе успешно записан!")
    }
}
}
}
}

//izpisva vsichki klienti

function showClients(eventId,gender){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{
   
        for(var i=0;i<events[eventId].eClients.length;i++)
        {
            if(events[eventId].eClients.participantId != null)
            {
            console.log(events[eventId].eClients.participantId)
            }
        }
        
    }
}


function separateGenders(eventId,gender){

 
for(var i=0;i<events[eventId].eClients.length;i++){
}



for(var i=0;i<events[eventId].eClients.length;i++){
    
        
    
    if(gender == "male"){
        console.log("All " + gender + " participants");
        console.log(
            events[eventId].eClients.participantId +
            events[eventId].eClients.participantFname +
            events[eventId].eClients.participantSecondName +
            events[eventId].eClients.participantGender +
            events[eventId].eClients.participantAge +
            events[eventId].eClients.participantMoney)
}
    else if(gender == "female"){
        console.log("All " + gender + " participants");
        console.log(
            events[eventId].eClients.participantId +
            events[eventId].eClients.participantFname +
            events[eventId].eClients.participantSecondName +
            events[eventId].eClients.participantGender +
            events[eventId].eClients.participantAge +
            events[eventId].eClients.participantMoney)
    }
}
}



//premahvane na klienti

function removeClients(clientId,eventId){


    for(var i=0;i<events.length;i++){
        
       if(events[eventId].eClients[eventId].participantId == clientId){
        events[eventId].eClients.splice(i,1)
        
       }
    }
}


//функция която предотвратява изпълнението на всички други функции
function stopExecuting(){

    allow = false;
}
//функция която отново позволява изпълнеието на другите функции
function startExecuting(){
    allow = true;
}



//subitie s nai-mnogo posetiteli
function showBiggestEvent(){
    var temp1 = 0;
    for(var i=0;i<events.length;i++){
     
        var temp2 = events[i].eClients.length;
      
        if(temp1<temp2){
            temp1 = temp2;
            var temp3 = i;
            
        }
        

    }


    console.log("This is the biggest event: " + events[temp3])

}






//функция която показва събития подходящи за непълнолетни
function showMinorEvents(){
for(var i=0;i<events.length;i++){
    if(events[i].eMinor == true){
        console.log(events[i]);
    }
}
}

//функция за извеждане на всички събития разделени за пълнолетни и непълнолетни
function showBothEvents(){
    for(var i=0;i<events.length;i++){
       
        if(events[i].eMinor == true){
            console.log("* " + (events[i]));
        }
        else{
            console.log("# " + (events[i]));
        }
        
    }
}

//функция за филтриране на събития по определено име
function filterEventName(name){
    for(var i=0;i<events.length;i++){
        if(events[i].eName == name){
            console.log(events[i])
        }
    }
}


//функция за филтриране на събития по това дали са платени


function showPaidEvents(){
    for(var i=0;i<events.length;i++){
        if(events[i].ePrice == "" || events[i].ePrice == null){
            console.log("! " + events[i]);
        }
        else{
            console.log("$ " + events[i]);
        }
    }
}

//funkciq show client from event

function showEventClients(eventId){
    for(var i=0;i<events.lenght;i++){
        if(client[eventId] = client[i]){
            console.log(event)
        }
    }
}


//arhivirane na subitie
function Archive (eventId){
    for(var i =0; i<events.length;i++){
        if (events[eventId] == events[i]){
            
            events[eventId].eArchived = true;
            events[eventId].eName = "~ " + events[eventId].eName
            console.log("Archiiving complete")

        }
    }
}


//функция за листинг на архивирани събития
function listing(listType){
    if(listType == "all"){
        for(var i =0;i<events.length;i++){
            console.log(events[i]);
            
        }
    }
    else if(listType == "notArchived"){
        for(var i =0;i<events.length;i++){
            if(events[i].eArchived == false){
                console.log(events[i]);
            }
            
        }
    }
    else if(listType == "archived"){
        for(var i =0;i<events.length;i++){
            if(events[i].eArchived == true){
                console.log(events[i]);
            }
        }
    }
    else{
        console.log("Invalid input");
        return;
    }
}



//визуализация за приходи от архивирани събития

function archivedIncome(eventId){
    if(events[eventId].eArchived == false){
        console.log("This event is not archived")
    }
    else{
        console.log(events[eventId].ePrice * events[eventId].eClients.length + "$ of income")
    }
}



// //функция за оценяване на събитията
function Rating(eventId,vote,votingClientId){
    if(events[eventId].eArchived == true){
    for(var i=0;i<events.length;i++){
        if(events[eventId] == events[i]){
            clients[votingClientId].cVoted = true;
            if( vote >= 0 && vote <= 10 ){

            if(vote < 0 )
            {
                vote = 0;
            }
            else if(vote > 6)
            {
                vote = 6;
            }
            clients[votingClientId].cVote = vote;
        }
            else
            {
                console.log("invalid vote");
            }
        }
    }
}
else
{
console.log("the event is not archived, and cannot be rated yet")
}
}

function listRating(eventId){
    if(events[eventId].eArchived == true){
        for(var i =0; i<events.length;i++){
            if (events[eventId] == events[i]){
                var Rating = Rating + clients[i].cVote;
                var Attendance = Attendance + 1;
            }
        }
        var Rating = Rating / Attendance;
        events[eventId].eRating = Rating;
        events[eventId].eRated = true;
    }
}





































//масив за съхраняване на клиентите
var clients=[];

function createClient(fname,sname,gender,age,repeat,money){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{
    
    console.log("this client will be added " + repeat + " times");
    
    //ако не е записан пол,или ако са въведени неправилни данни/липсващи, се счита че пола на клиента не е специфиран
    if(gender == "male" || gender == "female"){
        console.log("client's gender: " + gender)
         
        }
        else{
            gender = "unstated";

            console.log("The entered information was not valid, so\n the client's gender\n has been omitted");
        }

    //ако неправилна стойност за годините бъде въведена, то на клиента ще се постави стойност 0, и няма да 
    //му бъде позволено да присъства на събития за възрастни
    if(typeof age != "number"){
        age = 0;
        console.log("The entered information was not valid, so\n the clien't age has been set to 0\n forbidding them from entering adult events")
    }
    
    //цикъл за добавяне на елементите като обект във масива отговарящ за Клиентите
    for (var i = 0;i<repeat;i++){
     
    clients.push({
    cId:(clients.length),
    firstName:fname,
    secondName:sname,
    cGender:gender,
    cAge:age,
    cMoney:money,
    cVoted:false,
    cVote:0,
    })

    }
}
}

//функция за извеждане на клиентите
function showClients(){
    if(allow == false){
        console.log("Sorry, but the system is currently offline! Please stop by later ^^")
    }
    else{
    for(var i =0;i<clients.length;i++){
        
        console.log(clients[i]);
    }
}
}
    



