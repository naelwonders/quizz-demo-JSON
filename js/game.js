let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    autoCenter: true
};

let game = new Phaser.Game(config);
let currentIndex = 0;
let answerPanel = [];
let answerText = [];


function preload() {
    //attention un folder qui s'appelle Sprite ne marchera pas
    this.load.image('background', '../assets/Sprites/background.png');
    this.load.image('question', '../assets/Sprites/Label1.png');
    this.load.image('answer', '../assets/Sprites/Label4.png');
    this.load.image('star', '../assets/Sprites/Star.png');
    this.load.image('staroff', '../assets/Sprites/Staroff.png');
    this.load.image('playButton', '../assets/Sprites/Play.png');

    //telecharger le fichier JSON
    this.load.json('questions', './assets/data/Questions.json');
   
}

function create() {

    // faire le lien avec le fichier JSON et cette page
    questionJSON = this.cache.json.get('questions');

    background = this.add.image(0,0,'background');
    
    //visuel et texte pour la question
    questionImage = this.add.image(config.width / 2, config.height * 0.2, 'question');
    questionImage.setScale(0.6);
    
    questionText = this.add.text(120,90, questionJSON.questions[currentIndex].title, {fontfamily: 'Arial', fontSize: 24, color: '#00ff00'});
    
    //ICI pour next question!!!
    playButton = this.add.image(config.width - 80, config.height / 2, 'playButton').setInteractive();
    playButton.on('pointerdown', nextQuestion)
    playButton.setScale(0.4)
    
    
    //console.log(questionJSON.questions [2].answer[0]); // premiere question
    //answers = this.add.group();
    for (let i = 0; i < 3; i++) {
        
        choice = questionJSON.questions[currentIndex].answer[i]
        
        answerPanel[i] = this.add.image(config.width / 2 , (config.height * 0.25) + (100 *(i + 1)), 'answer').setInteractive();
        answerPanel[i].on('pointerdown', () => {checkAnswer(i)}) //définir une fonction sans nom, on met juste la parenthese avec la fleche (car on est obligé de mettre une fonction dans cette methode)
        
        //answers.add(answerPanel);
        answerText[i] = this.add.text(210,(config.height * 0.23) + (100 *(i + 1)), choice, {fontfamily: 'Arial', fontSize: 24, color: '#000000'});
    }   
    
    //les etoiles
    star = this.add.image(config.width / 10, config.height - 50, 'star');
    star.setScale(0.4);
    star.setVisible(false)
    
    staroff = this.add.image(config.width / 10, config.height - 50, 'staroff');
    staroff.setScale(0.4);
    staroff.setVisible(false)
}


function update() {

}

//mettre des couleurs en fonction des bonnes/mauvaises reponses
function checkAnswer(indexAnswer) {
    for (let i = 0; i < 3; i++) {
        //tt mettre en rouge, puis rendre pas interactif
        answerText[i].setColor("#ff0000")
        answerPanel[i].disableInteractive();
        
        if (indexAnswer == questionJSON.questions[currentIndex].goodAnswer) {
            star.setVisible(true)
            //alert("Bonne réponse");
            //alert();
        }
        else {
            staroff.setVisible(true)
            //alert("FAUX !!");
            //answerText[i].setColor("#ff0000")
        }
        
        // on ddesactive les 3
        answerText[questionJSON.questions[currentIndex].goodAnswer].setColor("#00ff00")
    }
}

function nextQuestion () {
    //alert();
    currentIndex += 1;
    answerPanel = [];
    answerText = [];
}
