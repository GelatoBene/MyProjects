var Ajax = {

    ajax : null,
 
    init() {
 
        if(!this.ajax) {
            this.ajax = new XMLHttpRequest();  
        }
 
        return this.ajax;
    }, 
 
    get(url, callback) {
 
        var request = this.init();
        request.open("GET", url)
        request.send();
        request.onload = () => {
    
            callback(JSON.parse(request.responseText));
        };
    },
 
    post(url, data, callback) {
 
        var request = this.init();
        request.open("POST", url);
        request.send(data);
        request.onload = () => {
            callback(JSON.parse(request.responseText));
        };
 
    }
 };

function GenerateTeamResults(){
    Ajax.get("http://worldcup.sfg.io/matches/country?fifa_code=ARG", (data)  => {

        var RepeatCount = document.getElementById("TeamResultsQuantity").value

        for(var i=0;i<RepeatCount;i++){
            if(typeof data[i].location === 'undefined'){
                data[i].location ==" Unspecified Location "
            }
            else{
        var ul = document.getElementById("TeamResults")
        var li = document.createElement("li");
            li.innerHTML ="According to data, " + data[i].location + "'s match in " + data[i].venue + " has ended in favour of : " + data[i].winner ;
            
            console.log(li);
            ul.appendChild(li);
            }
        }        
    }) 
}

function UserTracker(){

    var ul = document.getElementById("UserTrackerData")
    var li = document.createElement("li");

    li.innerHTML = " Aha, the unsuspecting user has clicked on our page! ";
    
    ul.appendChild(li);
    
   

    console.log("User Click Test - Working!")
}

function VenueFinder(){
    Ajax.get("http://worldcup.sfg.io/matches", (data)  => {


        var id = document.getElementById("SearchLocation");

        document.getElementById("FindLocation").value = data[id.value].location + ", " + data[id.value].venue + ", where a match with fifa id of '" + data[id.value].fifa_id + "' was played.";
        console.log(id.value)
        console.log(data[id.value].venue)


        var ul = document.getElementById("UserTrackerData")
        var li = document.createElement("li");
    
        li.innerHTML = "User Searched for specifics around a stadium!"
        ul.appendChild(li);
    })
}

function NameFinder(){

    Ajax.get("http://worldcup.sfg.io/teams/", (data)  => {


        var id = document.getElementById("SearchTeam");

        document.getElementById("FindTeam").value = data[id.value].country + ", " + 
        data[id.value].fifa_code + " for short, situated in group " + data[id.value].group_letter + 
        " with an ID of " + data[id.value].group_id + ".";
       
        var ul = document.getElementById("UserTrackerData")
        var li = document.createElement("li");
    
        li.innerHTML = "User Searched for specifics around a team!"
        ul.appendChild(li);
    })

}

function GroupFinder(){

    Ajax.get("http://worldcup.sfg.io/teams/group_results", (data)  => {


        var id = document.getElementById("SearchGroup");

        var teamCount = data[id.value].ordered_teams;

        var teamCount2 = Object.keys(teamCount).length;

        var teamNames = "";

        for(var i=0; i< teamCount2;i++){
            teamNames += (" " + teamCount[i].country + "(" + teamCount[i].goal_differential + " goal differendial) ")
            console.log(teamNames)
        }

        document.getElementById("FindGroup").value = "Group Name: " + data[id.value].letter + " group, containing " + teamCount2 + " teams:" + teamNames;
       

    })

    var ul = document.getElementById("UserTrackerData")
    var li = document.createElement("li");

    li.innerHTML = "User Searched for specifics around a group!"
    ul.appendChild(li);
}