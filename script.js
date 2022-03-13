//jshint esversion: 8

const joke_history = new Set();

new_joke();

// $("#new-joke").on("click", new_joke);
$("#new-joke").on("click", new_joke);

async function new_joke()  {
  fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
    .then(data => {
      if (joke_history.has(data.id)) {
        console.log("A duplicated joke", data);
        return new_joke();
      }
      if (data.type === 'twopart') {
          $("#joke-content").html(data.setup + " <br><br> " + data.delivery);
      }
      else {
          $("#joke-content").html(data.joke);
      }
      joke_history.add(data.id);
      console.log(data);
    });
}

async function dad_joke() {
  fetch('https://icanhazdadjoke.com/slack')
   .then(response => response.json())
   .then(data => {
     console.log(data);
     console.log(data.attachments[0].text);}
   );
}
