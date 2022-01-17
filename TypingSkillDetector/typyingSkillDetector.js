const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions, it invariably proves to be capable of bearing some other interpretation', 
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last',
    'There is nothing more deceptive than an obvious fact.',
    'Mediocrity knows nothing higher than itself; but talent instantly recognizes genius.',
    'You have a grand gift for silence, Watson. It makes you quite invaluable as a companion.',
    'What you do in this world is a matter of no consequence. The question is what can you make people believe you have done.',
    'It may be that you are not yourself luminous, but that you are a conductor of light. Some people without possessing genius have a remarkable power of stimulating it.',
    'Crime is common. Logic is rare. Therefore it is upon the logic rather than upon the crime that you should dwell.',
    'A man always finds it hard to realize that he may have finally lost a woman\'s love, however badly he may have treated her.',
    'I wanted to end the world, but I\'ll settle for ending yours.',
    'I am somewhat exhausted; I wonder how a battery feels when it pours electricity into a non-conductor?',
    'There is nothing more to be said or to be done tonight, so hand me over my violin and let us try to forget for half an hour the miserable weather and the still more miserable ways of our fellowmen.',
    'No: I am not tired. I have a curious constitution. I never remember feeling tired by work, though idleness exhausts me completely.',
    'I am the most incurably lazy devil that ever stood in shoe leather.',
    'Now is the dramatic moment of fate, Watson, when you hear a step upon the stair which is walking into your life, and you know not whether for good or ill.',
    'You know my method. It is founded upon the observation of trifles.',
    'Show Holmes a drop of water and he would deduce the existence of the Atlantic. Show it to me and I would look for a tap. That was the difference between us.',
    'I cannot live without brainwork. What else is there to live for? Stand at the window here. Was ever such a dreary, dismal, unprofitable world? See how the yellow fog swirls down the street and drifts across the duncoloured houses. What could be more hopelessly prosaic and material?',
    'It is my belief, Watson, founded upon my experience, that the lowest and vilest alleys in London do not present a more dreadful record of sin than does the smiling and beautiful countryside.',
    'Your life is not your own. Keep your hands off it.',
    'You know my methods. Apply them.',
    'My mind rebels at stagnation, give me problems, give me work!',
    'It is only goodness which gives extras, and so I say again that we have much to hope from the flowers.',
    'She wondered how Dr. Watson - a clever man in his own right - had lasted so many years without bashing his roommate over the head out of sheer frustration.',
    'If my future were black, it was better surely to face it like a man than to attempt to brighten it by mere will-o’-the-wisps of the imagination.',
    'It is a pity he did not write in pencil. As you have no doubt frequently observed, the impression usually goes through -- a fact which has dissolved many a happy marriage.',
    'It has always seemed to me that so long as you produce your dramatic effect, accuracy of detail matters little. I have never striven for it and I have made some bad mistakes in consequence. What matter if I hold my readers?',
    'Beyond the obvious facts that he has at some time done manual labour, that he takes snuff, that he is a Freemason, that he has been in China, and that he has done a considerable amount of writing lately, I can deduce nothing else.',
    'I am not the law, but I represent justice so far as my feeble powers go.',
    'It is only goodness which gives extras, and so I say again that we have much to hope from the flowers.',
    'My mind rebels at stagnation, give me problems, give me work!'
];

// store the list of words and the index of the word the player is currenting typing
let words = [];
let wordIndex = 0;

// the starting time
let startTime = Date.now();

// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
    
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    
    // Put the quote into an array of words
    words = quote.split(' ');
    
    // reset the word index for tracking
    wordIndex = 0;
    
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    
    // Clear any prior messages
    messageElement.innerText = '';
    
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    
    // set focus
    typedValueElement.focus();
    
    // set the event handler
    // Start the timer
    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
    
    // Get the current word
    const currentWord = words[wordIndex];
    
    // get the current value
    const typedValue = typedValueElement.value;
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        
        // end of sentence
        // Display success
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} secs.`;
        messageElement.innerText = message;
    } 
    else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
       
        // move to the next word
        wordIndex++;
        
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    }
    else if (currentWord.startsWith(typedValue)) {
        
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } 
    else {
        
        // error state
        typedValueElement.className = 'error';
    }
});