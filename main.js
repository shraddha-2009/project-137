status1="";
objects=[];

function preload(){

}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTMl="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized");
    status1=true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,480,380);
    if(status1!=""){
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Have Been Detected";
            document.getElementById("number_objects").innerHTML="Number of Objects Detected: "+objects.length;

            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
        }
        
    }
}
