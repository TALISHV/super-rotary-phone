Webcam.set({
    width:350,
    height:300,
    image_format : 'png' ,
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:', ml5.version);

classifier  = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QV66CQCji/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.error(error);
    }else{

        console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name2").innerHTML = results[1].label;
       prediction_1 = results[0].label;
       prediction_2 = results[1].label;
       speak();
       
       if(results[0].label == "Victory")
       {
        document.getElementById("update_emoji").innerHTML = "&#9996;";
       }

       if(results[0].label == "Good or Yes")
       {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
       }

       if(results[0].label == "Bad job or No")
       {
        document.getElementById("update_emoji").innerHTML = "&#128078;";
       }

       if(results[0].label == "Point up")
       {
        document.getElementById("update_emoji").innerHTML = "&#128070;";
       }

       if(results[0].label == "You!")
       {
        document.getElementById("update_emoji").innerHTML = "&#9758;";
       }








       if(results[1].label == "Victory")
       {
        document.getElementById("update_emoji2").innerHTML = "&#9996;";
       }

       if(results[1].label == "Good or Yes")
       {
        document.getElementById("update_emoji2").innerHTML = "&#128077;";
       }

       if(results[1].label == "Bad job or No")
       {
        document.getElementById("update_emoji2").innerHTML = "&#128078;";
       }

       if(results[1].label == "Point up")
       {
        document.getElementById("update_emoji2").innerHTML = "&#128070;";
       }

       if(results[1].label == "You!")
       {
        document.getElementById("update_emoji2").innerHTML = "&#9758;";
       }
    }
}