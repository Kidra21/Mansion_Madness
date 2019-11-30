import {kill,eyeInpocket, appleInpocket,monsterFull,places,counter,number, points,readRunState,readGameState,saveGameState,setEye,setApple,eatenEye,eatenApple,monsterEat} from './utils.js';
class FirstPanel extends Phaser.Scene{

    constructor(){

        super({key:'FirstPanel'});

    }
    preload(){
        this.load.image('background1', 'assets/Background1.png');
        this.load.image('arrow', 'assets/Arrow.png');
        this.load.image('clouds', 'assets/cloudsSm.png');
        this.load.image('card', 'assets/card.png');
        this.load.image('curtain', 'assets/curtainPanel.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('monster', 'assets/Hand.png');
        this.load.spritesheet('cat','assets/CatSpritesheet.png',{frameWidth: 120, frameHeight: 50});
        this.load.spritesheet('jump','assets/CatSpritesheet2.png',{frameWidth: 120, frameHeight: 50});
        this.load.image('grab1', 'assets/Grab1.png');
        this.load.image('grab2', 'assets/Grab2.png');
        this.load.image('grab3', 'assets/Grab3.png');
        this.load.image('pocket', 'assets/pocket.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('eye', 'assets/eye.png');
        //this.run = readRunState();
    }
    create(){
        //var game_state = readGameState();
        console.log(places);
        console.log(number);
        console.log('Licznik'+counter);



        //Animacja pochmurnego nieba
        var sky = this.add.image(1000,350,'sky').setScale(.7);

        var path = new Phaser.Curves.Path(600, 300).lineTo(1200, 300);
        var path2 = new Phaser.Curves.Path(800, 350).lineTo(1400, 350);
        var graphics = this.add.graphics();
        var graphics2 = this.add.graphics();

        graphics.lineStyle(1, 0x373b75, 0);

        path.draw(graphics, 50);
        path2.draw(graphics2, 50);




        var skyCloud = this.add.follower(path, 100, 100, 'clouds');
        var skyCloud2 = this.add.follower(path2, 100, 100, 'clouds').setInteractive()


        skyCloud.startFollow({
            positionOnPath: true,
            duration: 50000,
            yoyo: false,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        skyCloud2.startFollow({
            positionOnPath: true,
            duration: 40000,
            yoyo: false,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
//Nałożenie tła gry
        var panel1 = this.add.image(0,0,'background1');
        panel1.setDisplaySize(this.cameras.main.width,this.cameras.main.height);
        panel1.setOrigin(0);
        //Punkty
       //Kurtyna - interaktywa 1z4
        var curtain = this.add.sprite(632,77,'curtain').setInteractive()
        let card2 = this.add.sprite(632, 77, 'card').setScale(.25).setVisible(false).setInteractive();
        curtain.on('pointerup', function() {
            if (places[1] == 1) {
                card2.setVisible(true);
                card2.on('pointerdown', function () {
                    points();
                    scoreText.setText('Score: ' + counter);
                    card2.setVisible(false);
                    places[1] = 0;
                });
                //else card.setVisible(false);
            }
            ;
        });


        let scoreText = this.add.text(16, 16, 'Score: ' + counter, { fontSize: '32px', fill: '#000' });
        let zonePocket = this.add.image(1650,950,'pocket');
        let pocketEye = this.add.image(1650, 950,'eye').setInteractive().setScale(1.4).setVisible(false);
        let pocketApple = this.add.image(1650, 950,'apple').setInteractive().setVisible(false);
        if(eyeInpocket == 1){
            console.log('Eye in pocket');
            pocketEye.setVisible(true);
        } else if (appleInpocket==1){
            console.log('Apple in pocket');
            pocketApple.setVisible(true);
        };

//Animacja ręki
            var path3 = new Phaser.Curves.Path(1650, 550).lineTo(1680, 650);
            var graphics3 = this.add.graphics();
            graphics.lineStyle(1, 0x373b75, 0);
            path3.draw(graphics3, 50);

            let hand = this.add.follower(path3, 100, 100, 'monster').setInteractive()
                if(monsterFull==0){
                    hand.setVisible(true);
                } else if(monsterFull==1){
                    hand.setVisible(false);
                };

            hand.startFollow({
                positionOnPath: true,
                duration: 4000,
                yoyo: true,
                repeat: -1,
                rotateToPath: false,
                verticalAdjust: true
            });
            var attack = this.add.sprite(1650, 600, 'grab1').setVisible(false);
            this.anims.create({
                key: 'attack',
                frames: [
                    {key: 'grab1'},
                    {key: 'grab2'},
                    {key: 'grab3', duration: 50}
                ],
                frameRate: 6,
                repeat: 0
            })

            hand.on('pointerup', function () {
                hand.setVisible(false);
                attack.setVisible(true);
                attack.play('attack');
            })
            hand.on('pointerout', function () {
                hand.setVisible(true);
                attack.setVisible(false);
            })

//Draggable
        //let hand = this.add.follower(path3, 100, 100, 'monster').setInteractive();
        this.physics.world.enable(hand);
        hand.body.setAllowGravity(false);

        let cardM = this.add.sprite(1675, 550, 'card').setScale(0.25).setVisible(false).setInteractive();
        cardM.on('pointerdown', function () {
            points();
            scoreText.setText('Score: ' + counter);
            cardM.setVisible(false);
        });
        this.physics.world.enable(pocketEye);
        pocketEye.body.setAllowGravity(false);
        this.physics.world.enable(pocketApple);
        pocketApple.body.setAllowGravity(false);
        this.physics.add.overlap(pocketEye, hand, logBack, null, this);

        function logBack(){
            console.log("Overlap");
            if (number==0){
                hand.setVisible(false);
                attack.setVisible(true);
                attack.play('attack');
                setTimeout(function(){
                    attack.setVisible(false);
                    hand.setVisible(false);
                    cardM.setVisible(true);
                }, 2000);
                pocketEye.setVisible(false);
                setEye(0);
                monsterEat(1);
                eatenEye(1);
            }
        };
        pocketEye.setInteractive();
        this.input.setDraggable(pocketEye);
        let last_position = Phaser.Utils.Array.NumberArrayStep(0, 1, 0);

        this.physics.world.enable(pocketApple);
        pocketApple.body.setAllowGravity(false);
        this.physics.add.overlap(pocketApple, hand, logAppleBack, null, this);

        function logAppleBack(){
             console.log("Overlap");
            if (number==1){
                hand.setVisible(false);
                attack.setVisible(true);
                attack.play('attack');
                setTimeout(function(){
                    attack.setVisible(false);
                    hand.setVisible(false);
                    cardM.setVisible(true);
                }, 2000);
                pocketApple.setVisible(false);
                setApple(0);
                monsterEat(1);
                eatenApple(1);
            }
         }
        pocketApple.setInteractive();
        this.input.setDraggable(pocketApple);
        last_position = Phaser.Utils.Array.NumberArrayStep(0, 1, 0);

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.setX(last_position[0]);
            gameObject.setY(last_position[1]);

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('dragstart', function (pointer, gameObject) {
            last_position[0] =  gameObject.x;
            last_position[1] =  gameObject.y;

        });

//Animacja kota
        const cat = this.add.sprite(935, 745, 'cat',0);

        this.anims.create({
            key: "blink",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("cat",{start: 1, end: 35}),
        });
        cat.play('blink');
        const jump = this.add.sprite(935, 745, 'jump',0);
        jump.setVisible(false);
        this.anims.create({
            key: "Catjump",
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("jump",{start: 1, end: 35}),
        });
        let card1 = this.add.sprite(935, 745, 'card').setScale(.25).setVisible(false).setInteractive();
        cat.setInteractive()
            .on('pointerdown', function () {
                jump.setVisible(true);
                jump.play('Catjump');

            })
            .on('pointerup', function(){
                if(places[0]==1){
                    card1.setVisible(true);
                    card1.on('pointerdown', function(){
                        points();
                        scoreText.setText('Score: ' + counter);
                        card1.setVisible(false);
                        places[0] = 0;
                    })
                }
                //else card.setVisible(false);
            })
            .on('pointerout', function(){
                jump.setVisible(false);
                cat.play('blink');
             })


//Przejście między panelami
        var hit = new Phaser.Geom.Rectangle(100, 500, 200, 200)

        var buttonNext = this.add.sprite(200,600,'arrow')
            .setVisible(false)
        panel1.setInteractive(hit, Phaser.Geom.Rectangle.Contains)
            .on('pointerover', function(){
                buttonNext.setVisible(true);
            })
            .on('pointerout', function(){
                buttonNext.setVisible(false);
            })
            .on('pointerdown', function(){
                this.scene.scene.start('SecondPanel');
            })

     //Zapis? o3o
        //saveGameState(game_state);


        }


    update(){
        //Koniec
        if (counter === 3){
            this.scene.start('MenuScene');
            kill();
        };
    }

}
export default FirstPanel;