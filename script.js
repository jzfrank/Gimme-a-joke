//jshint esversion: 8

const geek_joke_history = new Set();

geek_joke();

// $("#new-joke").on("click", new_joke);
$("#new-joke").on("click", ()=>{
    if (Math.random() < 1/3) geek_joke();
    else dad_joke();
});

async function geek_joke()  {
  fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
    .then(data => {
      if (geek_joke_history.has(data.id)) {
        console.log("A duplicated joke", data);
        return geek_joke();
      }
      if (data.type === 'twopart') {
          $("#joke-content").html(data.setup + " <br><br> " + data.delivery);
      }
      else {
          $("#joke-content").html(data.joke);
      }
      geek_joke_history.add(data.id);
      console.log(data);
    });
}

async function dad_joke() {
  fetch('https://icanhazdadjoke.com/slack')
   .then(response => response.json())
   .then(data => {
     $("#joke-content").html(data.attachments[0].text);
     console.log(data);
     console.log(data.attachments[0].text);}
   );
}
