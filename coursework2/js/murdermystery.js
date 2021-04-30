let selectedPerson = []; /*Empty array to push the player chosen characters into once they have visited their page to ask them a question. This was not the original plan, but due to complications in allowing users to navigate back causing the wrong set of buttons to appear, the game was altered so they can now only ask each character one question*/

playNarration=()=>{
  let audio = document.getElementById("narration");
  if (audio.paused == false){
    audio.pause();
  } else{
    audio.play();
  }
}; /*This script is used to trigger the narration to play when the image of the speaker is clicked by the user, and if clicked again, to pause the audio. Comparison operator of == was used to state that if the audio is not paused (false), then the audio should remain paused as it does not need to play, else play the audio.*/

updateAudio=(audiofile)=>{
  let audio = document.getElementById("narration");
  let mp3 = document.getElementById("mp3");
  let ogg = document.getElementById("ogg");
  let wav = document.getElementById("wav");
  mp3.src="audio/" + audiofile + ".mp3";
  ogg.src="audio/" + audiofile + ".ogg"; /* + arithmetic operator used to add the audiofile name into the right part of the src code when changing the file*/wav.src="audio/" + audiofile + ".wav";
  audio.load();
/*This code reloads and chages the source of the audio depending on what page the player is on. It gets each of the 2 audio sources, then using audiofile as the parameter to change, updates the audio using a string, with the correct filename placed in each transition function*/
};

/* The code for the typewriter function on page 1 has been directly taken from https://www.w3schools.com/howto/howto_js_typewriter.asp.*/
let i = 0;
let txt = 'Welcome Detective. It’s time to put your sleuthing skills to the test. Soon you will find yourself in the middle of a dastardly murder case, but with no clear culprit. It’s your job to uncover the truth and catch the killer. But remember Detective, you only have one shot to find the murderer. Good Luck!'; /* The text to type out was changed to the relevant text on the first page of the game*/
let speed = 45; /* The speed/duration of the effect in milliseconds. Originally it was 50, but this was decreased to speed the animation up as it was a bit too slow*/

typeWriter=()=> {
  if (i < txt.length) {
    document.getElementById("welcome").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  };
};

typeWriter();

/*As the transition code is repetitive anyway, for more efficient coding, created a seperate loader function then placed the corresponding boolean output into each transition function. This slimlined the coding, making it much easier to read ad understand*/

setLoader=(loaderTop)=>{
  /*This code sets the height and position of the loader div, which is how the transition is created. It uses its previous position and when called in the transition functions below, alternates them appropriately.*/
  if(loaderTop){
    let loaderHeight = document.getElementById("loader").style.height = "100%";
    let loader = document.getElementById("loader").style.bottom = "100%";
  } else{
    let loaderHeight = document.getElementById("loader").style.height = "0%";
    let loader = document.getElementById("loader").style.bottom = "-100%";
  }
};

/*Based on the above:
setLoader(true); is equal to 100% height, 100% bottom position
setLoader(false); is equal to 0 height, -100% bottom position*/

transition=()=>{
/* https://www.youtube.com/watch?v=LSctH52Ow7A&ab_channel=BensonLuis The following code was a result of watching, but changing and adapting the code shown in this tutorial*/
setLoader(true); /* This corresponds to the height and bottom placement of the loader div to slide it up and down screen as shown in the setLoader(). It works by checking if the position of loaderTop is true or false, thereby alternating the divs position, resulting in a transition*/
let page1 = document.getElementById("page1").style.display = "none"; /*This sets the current page the player is on to none, removing it from view*/
setTimeout (pageDelay, 1000);/* This delays the page content from loading before the red colour block has sweeped across the screen*/
updateAudio("updateFiles"); //This is changing the audio source to that file name
};

/* Originally, below was how the transition functions were coded. The reason for leaving it in is to show the process taken in improving the final code.

let loaderOpacity = document.getElementById("loader").style.opacity = "100";
let loaderAppear = document.getElementById("loader").style.display = "block"; // The first attempt at creating the red swiping transition did not work, as the div did not become visible when set to block. This led to changing the height of the div when called instead.

let loaderHeight = document.getElementById("loader").style.height = "100%";
let loader = document.getElementById("loader").style.bottom = "100%"; // This code works and is still used, just in a seperate function that is now called instead.

The audio code was added to each transition function to update the audio. To begin with, the code was set as narration.src="audio/NAMEHERE.mp3", but this would of course only update the mp3 audio,so it was changed to the following.However, to make the code streamlined, created a sepereate updateAudio function, then in each transition, simply name the audiofile to play.

      let audio = document.getElementById("narration"); //This is here so that the audio.laod() method below will work
      let mp3 = document.getElementById("mp3");
      let ogg = document.getElementById("ogg");
      let wav = document.getElementById("wav");
       mp3.src="audio/updateFiles.mp3";
       ogg.src="audio/updateFiles.ogg";
       wav.src="audio/updateFiles.wav"; // These update each of the audio src's seperately, so that if a user's computer cannot load one of the sources, it can move onto the next one
      audio.load();*/


pageDelay=()=>{
  let page2 = document.getElementById("page2").style.display = "block"; /*This function works with the timeout, so that it knows what code to execute after 1 second. It is used to get the next page of the game, navigating depending on what a player has clicked*/
};

transition2=()=>{
  setLoader(false);
  updateAudio("phone");
  setTimeout (pageDelay2, 650); /*As the page was loading too slowly after this transition, lowered the delay on the timeout to call the page to display as block*/
};

pageDelay2=()=>{
  let page2Phone = document.getElementById("phoneRings").style.display = "block";
  let storyline = document.getElementById("storyline").style.display = "block";
      /*This pageDelay function was altered to accomodate the page remaining in the same div, but updating the content visible in it. This is also why there is no page set to none in the transition2(), as this will happen in the next one.*/
};

transitionAnswered=()=>{
  setLoader(true);
  let page2 = document.getElementById("page2").style.display = "none";
  let footer = document.querySelector("footer").style.display = "none"; /* There is no narration on the next page, therefore the footer is set to none so that the speaker icon does not display. querySelector was used as the footer does not have a class or id*/
  let audio = document.getElementById("narration");
  audio.pause(); /*The audio is told to pause rather than load, with this stopping any errors from occurring. There is no narration on this page, so the pause method means that the audio from the previous page will stop when the next page loads*/
  setTimeout (pageDelayAnswered, 1000);
};

pageDelayAnswered=()=>{
  let page3 = document.getElementById("page3").style.display = "block";
};

/* Due to the way the transition works, if the user has the option to decline the code transition will break at some point depending on what they pick. For example, if they click to decline the first time, all of the setLoader() can be changed to the opposite of their current state and the game will play. However, if the code was changed to this and the user clicked answer the first time, then the transition to the video page would work, but after that the loader is in the wrong position for the rest of the game. This is because it created an odd number, causing the transitions to stop one way or the other. Therefore, as the user has to answer the phone to play the game, the decline option was removed so that the game would play smoothly. Below is code to show when the decline button was in.

transitionDeclined=()=>{
  setLoader(true);
  let page2 = document.getElementById("page2").style.display = "none";
  updateAudio("declinePhone");
  setTimeout (pageDelayDeclined, 1000);
}

pageDelayDeclined=()=>{
  let page3Declined = document.getElementById("page3Declined").style.display = "block";
};

transitionMustAnswer=()=>{
  setLoader(false);
  let page3Declined = document.getElementById("page3Declined").style.display = "none";
  let footer = document.querySelector("footer").style.display = "none";
  let audio = document.getElementById("narration");
  audio.pause();
  setTimeout (pageDelayAnswered, 1000);
};

pageDelayMustAnswer=()=>{
  let page3 = document.getElementById("page3").style.display = "block";
};*/

transition3=()=>{
  setLoader(false);
  let page3 = document.getElementById("page3").style.display = "none";
  let footer = document.querySelector("footer").style.display = "block"; /* The footer is set back to block here as it is required for all but one of the remaining pages*/
  updateAudio("questionFirst");
  setTimeout (pageDelay3, 770); /*Decreased the setTimeout length to better match the div and page loading at the same time*/
  let recallName = localStorage.getItem("username");
  let characterChoice = document.getElementById("characterChoice").textContent = ("Who would you like to talk to first Detective " + recallName + "?"); /*This code updates the text content on the character choice screen by getting the players name out of local storage and adding it to the end of a sentence*/
  video.pause(); /* This stops the video and its audio from playing if the player decides to stop watching it early. This is done by triggering the video to pause if the user clicks the arrow to continue to the next page*/
};

pageDelay3=()=>{
  let page4 = document.getElementById("page4").style.display = "block";
};

transition4=()=>{
  setLoader(true);
  let page4 = document.getElementById("page4").style.display = "none";
  let page6= document.getElementById("page6").style.display = "none";
  let page7 = document.getElementById("page7").style.display = "none";
  /*With the questioning section of the game now in motion, multiple pages are set to none, ensuring that they cannot be visible, regardless of what character is selected next. This means that the page will still load if clicked first, but does not appear if navigated to sequentially from another character. This enables players to navigate the questioning section freely in any pattern they want to. However, they can only visit each character once, meaning they can only ask them one of the two questions.*/
  updateAudio("alistair");
  setTimeout (pageDelay4, 1000);
};

pageDelay4=()=>{
  let page5 = document.getElementById("page5").style.display = "block";
  questioningAlistair(); // This function loads the page content for questioningAlistair
};

transition5=()=>{
  setLoader(true);
  let page4 = document.getElementById("page4").style.display = "none";
  let page5 = document.getElementById("page5").style.display = "none";
  let page7 = document.getElementById("page7").style.display = "none";
  updateAudio("clarissa");
  setTimeout (pageDelay5, 1000);
};

pageDelay5=()=>{
  let page6 = document.getElementById("page6").style.display = "block";
  questioningClarissa();// This function loads the page content for questioningClarissa
};

transition6=()=>{
  setLoader(true);
  let page4 = document.getElementById("page4").style.display = "none";
  let page5 = document.getElementById("page5").style.display = "none";
  let page6 = document.getElementById("page6").style.display = "none";
  let page7 = document.getElementById("page7").style.display = "none";
  updateAudio("doctor");
  setTimeout (pageDelay6, 1000);
};

pageDelay6=()=>{
  let page7 = document.getElementById("page7").style.display = "block";
  questioningDoctor(); // This function loads the page content for questioningDoctor
};

transition7=()=>{
  setLoader(true);
  let page4 = document.getElementById("page4").style.display = "none";
  let page5 = document.getElementById("page5").style.display = "none";
  let page6 = document.getElementById("page6").style.display = "none";
  let page7 = document.getElementById("page7").style.display = "none";
  updateAudio("gatherEveryone");
  setTimeout (pageDelay7, 1000);
};

pageDelay7=()=>{
  let page8 = document.getElementById("page8").style.display = "block";
};

transition8=()=>{
  setLoader(false);
  let page8 = document.getElementById("page8").style.display = "none";
  updateAudio("correctKiller");
  setTimeout (pageDelay8, 1000);
  let recallName = localStorage.getItem("username");
  let goodJob = document.getElementById("goodJob").textContent = ("Good Job Detective " + recallName + "!");
  // The last 2 lines of code are here so that the text can be updated with the users name
};

pageDelay8=()=>{
  let page9 = document.getElementById("page9").style.display = "block";
};

transition9=()=>{
  setLoader(false);
  let page8 = document.getElementById("page8").style.display = "none";
  let page9 = document.getElementById("page9").style.display = "none";
  updateAudio("wrongKiller1");
  setTimeout (pageDelay9, 1000);
};

pageDelay9=()=>{
  let page10 = document.getElementById("page10").style.display = "block";
};

transition10=()=>{
  setLoader(false);
  let page8 = document.getElementById("page8").style.display = "none";
  let page10 = document.getElementById("page10").style.display = "none";
  updateAudio("wrongKiller2");
  setTimeout (pageDelay10, 1000); /*Even though the page takes slightly longer to load than the loader div transition on the screen, this was left with the added delay rather than closing the gap. This is because it creates further suspense for players to see if they guessed correctly or not. The same was also done on transition9() and transition8().*/
};

pageDelay10=()=>{
  let page11 = document.getElementById("page11").style.display = "block";
};

transition11=()=>{
  setLoader(true);
  let page9 = document.getElementById("page9").style.display = "none";
  let page10 = document.getElementById("page10").style.display = "none";
  let footer = document.querySelector("footer").style.display = "none";
  let audio = document.getElementById("narration");
  audio.pause();
  setTimeout (pageDelay11, 1000);
};

pageDelay11=()=>{
  let page12 = document.getElementById("page12").style.display = "block";
};

transition12=()=>{
  setLoader(true);
  let page10 = document.getElementById("page10").style.display = "none";
  let page11 = document.getElementById("page11").style.display = "none";
  setTimeout (pageDelay12, 1000);
};

pageDelay12=()=>{
  location.reload(); //The reload method is used so that when the user clicks to try again, the whole document is reloaded, meaning all the transitions reset. This was used to ensure that that the user can attempt to solve the mystery as many times as they want to, without the transition code breaking*/
};

transition4A=()=>{
/*These are a sub-set of transitions that are not loading entirely new divs, instead they refresh the content within the same div. The reason all of the setLoader() are false is because, they need to all be set to the same position, as the user can select any of the characters to talk to first. Additionally, this act as navigation based on what question the user selects to ask the characters*/
setLoader(false);
updateAudio("alistair1");
questioningAlistair2();
};

transition4B=()=>{
  setLoader(false);
  updateAudio("alistair2");
  questioningAlistair3();
};

transition5A=()=>{
  setLoader(false);
  updateAudio("clarissa1");
  questioningClarissa2();
};

transition5B=()=>{
  setLoader(false);
  updateAudio("clarissa2");
  questioningClarissa3();
};

transition6A=()=>{
  setLoader(false);
  updateAudio("doctor1");
  questioningDoctor2();
};

transition6B=()=>{
  setLoader(false);
  updateAudio("doctor2");
  questioningDoctor3();
};

userDetails=()=>{
  let name = document.getElementById("username").value; /*Value is used to set the value of the what is typed into the name text form field*/
  let colour = document.getElementById("eyeColour").value;
  localStorage.setItem("username", name); /* This sets whatever the player types in the name field on the form as their username in local storage, with "username" being the keyname and name being the value*/
  localStorage.setItem("eyeColour", colour); /* This does the same as the username, but with the eye colour instead*/
  document.getElementById("storyline").textContent=("Thank you for updating your file Detective " + name + "."); /*This code is using the arthimetic operator + to add the players name into the correct place within the string*/
  document.getElementById("form").style.display = "none"; /* This makes the form disappear once the user click the enter button*/
};

createAlistairButtons=()=>{
  let buttonsContainer = document.getElementById("buttonsContainer");
  while(buttonsContainer.hasChildNodes()){
    buttonsContainer.removeChild(buttonsContainer.firstChild);
}
/*The above while loop was taken from a first year coding project. The container is called as otherwise the buttons cannot be removed or appended to it. The loop removes the original buttons to make space for 3 new buttons to be created in there place with new options for the players to choose from*/

let newButton1 = document.createElement("button");
let newButton2 = document.createElement("button");
let newButton3 = document.createElement("button");
      /*Here an if statment has been used with the condition set to be if this is not equal to "clarissa/alistair/doctor", then display their respective buttons. However if it is equal to one of the character names, this removes their button and places it in the selectedPerson array, meaning players cannot navigate back to the same character after asking them one question. This was done as if players were able to go back to ask a character their second question, the wrong buttons appeared and the transitions broke.*/
if(!selectedPerson.includes("clarissa")){
  newButton1.className = "buttons";
  newButton1.innerHTML = "Speak to Lady Clarissa Hawthorne";
  newButton1.addEventListener("click", transition5);
  buttonsContainer.appendChild(newButton1);
}
if(!selectedPerson.includes("doctor")){
  newButton2.className = "buttons";
  newButton2.innerHTML = "Speak to Doctor William Medicus";
  newButton2.addEventListener("click", transition6);
  buttonsContainer.appendChild(newButton2);
}
newButton3.className = "buttons";
newButton3.innerHTML = "Gather everyone to reveal the killer";
newButton3.addEventListener("click", transition7);
buttonsContainer.appendChild(newButton3);
};

questioningAlistair=()=>{
  let recallName = localStorage.getItem("username"); // This gets the players name from localStorage
  let dialogueA1 = document.getElementById("dialogueA1").textContent = ("You ask Alistair if he will join you in the library. He obliges. As he puts his phone in his pocket, you get a glimpse of his screensaver - Alistair and Lord Hawthorne in the garden, in the summer perhaps.");// This gets the p tag and updates its text content
  let dialogueA2 = document.getElementById("dialogueA2").textContent = ("“I’m sorry Detective " + recallName + ", I’m still trying to make sense of what has happened. It’s all such a shock you know.”") /*This updates the text content and places the players name into the text too.*/
  selectedPerson.push("alistair"); /* This method works with the empty array at the top of all the code. Here it is being told to push/add alistair to the array if the player has already visited his page. This is repeated with the other characters accordingly*/
};

questioningAlistair2=()=>{//This function works with the transition4A()
  let dialogueA1 = document.getElementById("dialogueA1").textContent = ("“I just find it a shame that I’m not with him all year round, but I understand that he sent me to boarding school to get the best education possible.”");
  let dialogueA2 = document.getElementById("dialogueA2").textContent = ("What would you like to do next?");
  createAlistairButtons();
};

questioningAlistair3=()=>{//This function works with the transition4B()
  let dialogueA1 = document.getElementById("dialogueA1").textContent = ("“Oh I’d say the sciences, particularly biology, I just find it fascinating to understand how things work together.”");
  let dialogueA2 = document.getElementById("dialogueA2").textContent = ("What would you like to do next?");
  createAlistairButtons();
};

createClarissaButtons=()=>{
  let buttonsContainer1 = document.getElementById("buttonsContainer1");
  while(buttonsContainer1.hasChildNodes()){
    buttonsContainer1.removeChild(buttonsContainer1.firstChild);
}
let newButton1 = document.createElement("button");
let newButton2 = document.createElement("button");
let newButton3 = document.createElement("button");
if(!selectedPerson.includes("alistair")){
  newButton1.className = "buttons";
  newButton1.innerHTML = "Speak to Alistair Hawthorne";
  newButton1.addEventListener("click", transition4);
  buttonsContainer1.appendChild(newButton1);
}
if(!selectedPerson.includes("doctor")){
  newButton2.className = "buttons";
  newButton2.innerHTML = "Speak to Doctor William Medicus";
  newButton2.addEventListener("click", transition6);
  buttonsContainer1.appendChild(newButton2);
}
newButton3.className = "buttons";
newButton3.innerHTML = "Gather everyone to reveal the killer";
newButton3.addEventListener("click", transition7);
buttonsContainer1.appendChild(newButton3);
}

questioningClarissa=()=>{
  let recallName = localStorage.getItem("username");
  let recallEyeColour = localStorage.getItem("eyeColour");
  let dialogueC1 = document.getElementById("dialogueC1").textContent = ("You ask Lady Hawthorne to accompany you to the library, a quiet place to begin your investigation. On your way you notice she is visibly shaken. There are mascara lines running down her cheeks.");
  let dialogueC2 = document.getElementById("dialogueC2").textContent = ("“What lovely " + recallEyeColour + " eyes you have. How can I help you Detective " + recallName + "? This whole situation is just awful!”");
  selectedPerson.push("clarissa");
};

questioningClarissa2=()=>{//This function works with the transition5A()
  let dialogueC1 = document.getElementById("dialogueC1").textContent = ("“We’ve been happily married for 6 wonderful months. I’m so grateful that I found him, my life changed for the better”");
  let dialogueC2 = document.getElementById("dialogueC2").textContent = ("What would you like to do next?");
  createClarissaButtons();
};

questioningClarissa3=()=>{//This function works with the transition5B()
  let dialogueC2 = document.getElementById("dialogueC2").textContent = ("What would you like to do next?");
  createClarissaButtons();
};

createDoctorButtons=()=>{
  let buttonsContainer2 = document.getElementById("buttonsContainer2");
  while(buttonsContainer2.hasChildNodes()){
    buttonsContainer2.removeChild(buttonsContainer2.firstChild);
}
let newButton1 = document.createElement("button");
let newButton2 = document.createElement("button");
let newButton3 = document.createElement("button");
if(!selectedPerson.includes("alistair")){
  newButton1.className = "buttons";
  newButton1.innerHTML = "Speak to Alistair Hawthorne";
  newButton1.addEventListener("click", transition4);
  buttonsContainer2.appendChild(newButton1);
}
if(!selectedPerson.includes("clarissa")){
  newButton2.className = "buttons";
  newButton2.innerHTML = "Speak to Lady Clarissa Hawthorne";
  newButton2.addEventListener("click", transition5);
  buttonsContainer2.appendChild(newButton2);
}
newButton3.className = "buttons";
newButton3.innerHTML = "Gather everyone to reveal the killer";
newButton3.addEventListener("click", transition7);
buttonsContainer2.appendChild(newButton3);
};

questioningDoctor=()=>{
  let recallName = localStorage.getItem("username");
  let recallEyeColour = localStorage.getItem("eyeColour");
  let dialogueD1 = document.getElementById("dialogueD1").textContent = ("The Doctor slowly gets to his feet with the help of his walking stick and follows you to the library. He is not the steadiest, although you notice something off about his walk - For the leg his limp is with, his cane is on the wrong side.");
  let dialogueD2 = document.getElementById("dialogueD2").textContent = ("“I do apologise Detective " + recallName + ", I’m not as quick as I once was. I must say, your eyes are a fascinating " + recallEyeColour + "colour! What can I do for you?”");
  selectedPerson.push("doctor");
};

questioningDoctor2=()=>{//This function works with the transition6A()
  let recallName = localStorage.getItem("username");
  let dialogueD1 = document.getElementById("dialogueD1").textContent = ("“Well Detective " + recallName + ", he wasn’t a spritely young man anymore. So naturally his health declined, but nothing out of the ordinary.”");
  let dialogueD2 = document.getElementById("dialogueD2").textContent = ("What would you like to do next?");
  createDoctorButtons();
};

questioningDoctor3=()=>{//This function works with the transition6B()
  let dialogueD1 = document.getElementById("dialogueD1").textContent = ("“I had just started him on a course of antibiotics to clear up an infection. All standard practice of course.”");
  let dialogueD2 = document.getElementById("dialogueD2").textContent = ("What would you like to do next?");
  createDoctorButtons();
};
