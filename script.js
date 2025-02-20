$(document).on("click", "#speak", init);

function init() {

    // TODO: RECOGNIZE SPEECH

    $("#speak").prop("disabled", true);
    $("#speak").text("Speaking ...");
    $("#speak").addClass("btn-outline-danger");
    $("#speak").removeClass("btn-outline-primary");

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent =
        window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();

    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const color = event.results[0][0].transcript;
        $("#query").val(color);
        $("#submit").click();
        console.log(`Confidence: ${event.results[0][0].confidence}`);
    };

}



$(document).on("click", "#submit", send);

function send() {

    var text = $("#query").val();

    if (text == "") {

        alert("Write something!");

    } else {

        $("#output").prepend("<br />");
        $("#output").prepend("[🫥] " + text);
        $("#query").val("");

        $("#submit").prop("disabled", true);
        $("#submit").text("Loading ...");

        $.ajax({
            url: 'https://code.schoolofdesign.ca/api/openai/v1/chat/completions',
            crossDomain: true,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                'model': 'gpt-4o-mini',
                'messages': [
                    {
                        'role': 'system',
                        // 'content': 'Hey AI, I would like to play a draumatic choose your own adventure game with you. When the game begins you are only allowed to respond to "**CHOICE 1**", "**CHOICE 2**", "**CHOICE 3**", and "**CHOICE 4**", following with what the choice was for context. You have to create the story as the user progresses the own choose your own adventure game. After the user makes a choice you have to decide either a good or bad outcome event with its own 4 choices that uses the context from your previous message and the most recent message from the user. Never restart or repeat older events and ALWAYS respond using the CONTEXT from your previous reply and the most recent choice from the user. Always remember your previous message.'
                        'content': 'Hey AI, I would like to play a draumatic choose your own adventure game with you with a random theme of your choice. You have to create the story, and let me make choices to progress the story! I’ll start by giving you the game rules/parameters. Here are some rules/parameters: 1. I would like you to offer me 4 choices called "**CHOICE 1**", "**CHOICE 2**", "**CHOICE 3**", and "**CHOICE 4**". I will respond with what choice that I chose with the CONTEXT of what it was. 2. When I respond with a choice, I would like you to respond with the outcome event to progress the story with its own 4 choices using the CONTEXT from both your PREVIOUS message/response and my most recent choice. 3. I would like you to remember what your previous message/response was to use the CONTEXT from it to generate your outcome events. 4. PLEASE NEVER restart undo events from the story from the beginning and always continue where we left off. 5. I would like you to always begin your messages/responses by repeating (saying what I chose) the choice I made using the CONTEXT of the choice I gave you. 6. I would like to be able to type "END" to end our story, which will allow you to generate one last message/response with 0 choices to end our story with using the context from my last choice.'
                    },
                    {
                        'role': 'user',
                        'content': text
                    },
                    {
                        'role': 'assistant',
                        'content': 'Refer to the following conversation. ' + $("#output").text()
                    }
                ]
            })
        }).done(function (response) {

            $("#submit").prop("disabled", false);
            $("#submit").text("Submit");

            var reply = response.choices[0].message.content;

            $("#output").prepend("<br />");
            $("#output").prepend("[🧙‍♂️] " + reply);

            const synth = window.speechSynthesis;
            const utterThis = new SpeechSynthesisUtterance(reply);
            utterThis.pitch = 0.5;
            utterThis.rate = 0.5;
            synth.speak(utterThis);

        });


    }
}