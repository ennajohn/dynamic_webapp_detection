img = "";
status = "";
objects = [];

function preload(){
}

function setup(){
canvas = createCanvas(350,350);
canvas.center();
video = createCapture(VIDEO);
video.size(350,350);
video.hide();
objectDetector = ml5.objectDetector("cocossd", modelLoaded);

}

function modelLoaded(){
    console.log("The Model is Loaded");
    status = true;
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,350,350);
    

    if(status != ""){
        for(i=0; i< objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);

            objectDetector.detect(video, gotResults);
            document.getElementById("status").innerHTML = "Status: Objects are Detected";
            document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected are " + objects.length;
            percent = Math.floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label+ " " + percent + "%" , objects[i].x + 15, objects[i].y+15);
            noFill();
           rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height);
           stroke(r,g,b);  
        }
            
        
                

    }
}



function start(){
    
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
   
}


