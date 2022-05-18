"use strict";

//Button

class ButtonGame {
    state = false;
    display_value  = 0;

    constructor() {
        const interfaces = {};
        const dataelemattrib = document.querySelectorAll("[data-element]");
        dataelemattrib.forEach(function(node) {
            if (interfaces === undefined) {
                interfaces[node.dataset.element] = [node]
            }
            if (node.dataset.element in interfaces) {
                interfaces[node.dataset.element].push(node);
            } else {
                interfaces[node.dataset.element] =  [node];
            }
        }
        );
        this.interfaces = interfaces;
        this.chassis = interfaces["container"]?.find(
            (container) => container.dataset.container == "chassis"
          );
        this.button = interfaces["button"].find(
            (button) => button.dataset.button == "main"
        );
        this.countdown = interfaces["text"].find(
            (text) => text.dataset.text == "timer"
        );
        this.instructions = interfaces["text"].find(
            (text) => text.dataset.text == "instructions"
        );
        this.header = interfaces["text"].find(
            (text) => text.dataset.text == "header"
        )
        this.results = interfaces['container']?.find( 
            (container) => container.dataset.container == "results")
    }

    startTimer(duration, output) {
        var timer = duration, minutes, seconds
        var counter = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10)-2;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            output.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
            }
            if (timer == 0) {
                timer = -1
                button.endGame(counter)
            }
        }, 1000);
    }
    endGame(counter) {
        if (this.state == true) {
            clearInterval(counter)
            new Audio(`src/audio/party.mp3`).play();
            this.state == false;
            button.chassis.classList.add('hidden');
            button.results.classList.remove('hidden');
            document.getElementById("globalcount").textContent = this.display_value;
            document.getElementById("globalcount2").textContent = this.display_value;
            document.getElementById("globalcount3").textContent = this.display_value;
            var averageper = (this.display_value / 2617) * 100
            var cal =  this.display_value * 400
            var meter = this.display_value / 100
            var time = (2617 / 616.2) * this.display_value;
            document.getElementById("meter").textContent = meter
            document.getElementById("averageper").textContent = averageper.toFixed(3) + "%"
            document.getElementById("cal").textContent = cal
            document.getElementById("time").textContent =time.toFixed(3)

        }
    }
    addButtonCount(output) {
        if (this.state == true) {
        this.display_value += 1;
        output.textContent = this.display_value;
        }
    }
}
const button = new ButtonGame();

button.button.addEventListener("click", function(e) {
    if (e.target.dataset.element != "button") return;
    console.log("Click!")
    btnClickHandler();
    const op = e.target.dataset.button;

    switch(op) {
        case "main":
            if (button.state == true) {
                button.addButtonCount(button.button);
                button.button.classList.remove('off');
                
            } else {
                button.startTimer(5*1+2, button.countdown);
                button.instructions.classList.add('hidden');
                button.state = true;
                button.display_value = 1;  
                button.addButtonCount(button.button);     
            }

    }
})
document.getElementById('refresh').addEventListener("click", function(e) {
    location.reload()
})
const btnClickHandler = function () {
    const rand = Math.floor(Math.random() * 4);
    new Audio(`src/audio/sound--${rand}.mp3`).play();
  };
