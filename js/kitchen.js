import {kill,setApple, setEye, eatApple,eatEye, monsterEat,counter, points,readGameState,saveGameState,number,places, eyeInpocket, appleInpocket} from './utils.js';
//import {eyeInpocket} from "./utils";
//import{zone} from './index.html';
class SecondPanel extends Phaser.Scene{



    constructor(){
        super({key:'SecondPanel'});

    }

    preload(){
        this.load.image('background2', 'assets/Background2.png');
        this.load.image('arrow', 'assets/Arrow.png');
        this.load.image('ovenC', 'assets/OvenDoorClosed.png');
        this.load.image('ovenO', 'assets/OvenDoorOpen.png');
        this.load.image('cupboardC', 'assets/TopDrawerFront.png');
        this.load.image('cupboardO', 'assets/OpenTopDrawer.png');
        this.load.image('drawer', 'assets/DrawerInt.png');
        this.load.image('drawerFront', 'assets/SmDraweFront.png');
        this.load.image('pot', 'assets/pot.png');
        this.load.image('lid', 'assets/lid.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('eye', 'assets/eye.png');
        this.load.image('card', 'assets/card.png');
        this.load.image('clouds', 'assets/cloudsSm.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('pocket', 'assets/pocket.png');

    }



    create(){
        console.log(places);
        console.log('Licznik'+counter);


        var sky = this.add.image(1000,250,'sky').setScale(.7);

        var path = new Phaser.Curves.Path(600, 150).lineTo(1200, 150);
        var path2 = new Phaser.Curves.Path(800, 200).lineTo(1400, 200);
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

        //Nałożenie tła
        var panel2 = this.add.image(0,0,'background2');
        panel2.setDisplaySize(this.cameras.main.width,this.cameras.main.height);
        panel2.setOrigin(0);

//Strefy do overlapu
        let zonePocket = this.add.image(1650,950,'pocket');
        this.physics.world.enable(zonePocket);
        zonePocket.body.setAllowGravity(false);
        zonePocket.body.moves = false;

        let zonePot = this.add.zone(900, 465).setSize(50, 50);
        this.physics.world.enable(zonePot);
        zonePot.body.setAllowGravity(false);
        zonePot.body.moves = false;

        let zoneApple = this.add.zone(1450,200).setSize(50, 50);
        this.physics.world.enable(zoneApple);
        zoneApple.body.setAllowGravity(false);
        zoneApple.body.moves = false;

        let pocketEye = this.add.image(1650, 950,'eye').setInteractive().setScale(1.4).setVisible(false);
        let pocketApple = this.add.image(1650, 950,'apple').setInteractive().setVisible(false);
        let scoreText = this.add.text(16, 16, 'Score: ' + counter, { fontSize: '32px', fill: '#000' });
//Elementy potwora



        //Szafka wisząca
        var cupboardOpen = this.add.image(1350,146,'cupboardO').setInteractive()
            .setVisible(false)
            .on('pointerdown',function () {
                cupboardOpen.setVisible(false)
                apple.setVisible(false);
                cupboardFront.setVisible(true)
            })
        var cupboardFront = this.add.image(1430,150,'cupboardC').setInteractive()
            .setVisible(true)
            .on('pointerdown',function () {
                cupboardOpen.setVisible(true)
                if(pocketApple.visible === false && eatApple==0){
                    apple.setVisible(true);}
                cupboardFront.setVisible(false)
            })

        var apple = this.add.sprite(1450,200, 'apple').setVisible(false).setScale(0.8);
        //Szuflada

        var drawerF = this.add.image(1300,620,'drawerFront').setInteractive()
            .setVisible(true)
            .on('pointerdown',function () {
                drawerF.setVisible(false)
                drawer.setVisible(true)
                if(places[2]==1){
                    card3.setVisible(true);
                    card3.on('pointerdown', function () {
                        points();
                        scoreText.setText('Score: ' + counter);
                        card3.setVisible(false);
                        places[2] = 0;
                    });
                }
            })
        var drawer = this.add.image(1354,656,'drawer').setInteractive()
        let card3 = this.add.sprite(1325, 600, 'card').setScale(.25).setVisible(false).setAngle(-20).setInteractive();
            drawer.setVisible(false)
            .on('pointerdown',function () {
                drawerF.setVisible(true)
                drawer.setVisible(false)
                if(card3.setVisible()==true){
                    card3.setVisible(false);
                }
            })

        //Piekarnik
        let card4 = this.add.sprite(785, 860, 'card').setScale(.25).setVisible(false).setAngle(-20).setInteractive();
        var ovenDoor = this.add.image(599,865,'ovenO').setInteractive()
            .setVisible(false)
            .on('pointerdown', function(){
                if(card4.setVisible()==true){
                    card4.setVisible(false);

                }
                oven.setVisible(true);
                ovenDoor.setVisible(false)
            })

        var oven = this.add.image(785,860,'ovenC').setInteractive()
            .setVisible(true)
            .on('pointerdown', function(){
            oven.setVisible(false);
                if(places[3]==1){
                    card4.setVisible(true);
                    card4.on('pointerdown', function () {
                        points();
                        scoreText.setText('Score: ' + counter);
                        card4.setVisible(false);
                        places[3] = 0;
                    });
                }
            ovenDoor.setVisible(true)
        })
        //Garnek i pokrywka
        var pot = this.add.image(900,500,'pot').setInteractive();
        var lid = this.add.image(900,456,'lid').setInteractive();
        var eye = this.add.sprite(900,465,'eye').setVisible(false);


        this.physics.world.enable(eye);
        eye.body.setAllowGravity(false);
        this.physics.add.overlap(eye, zonePocket, log, null, this);

        function log(){
            console.log("Overlap");
            if(pocketApple.visible==false){
            eye.setVisible(false);
            pocketEye.setVisible(true);
            setEye(1);};
        }
if (eyeInpocket == 1){
    pocketEye.setVisible(true);
    eye.setVisible(false);
};
        eye.setInteractive();
        this.input.setDraggable(eye);
        //eye.originalPosition = (1200,465);
        //let eye_start_position = (900,465);
        let last_position = Phaser.Utils.Array.NumberArrayStep(0, 1, 0);

        this.physics.world.enable(pocketEye);
        pocketEye.body.setAllowGravity(false);
        this.physics.add.overlap(pocketEye, zonePot, logBack, null, this);

        function logBack(){
            console.log("Overlap");
            eye.setVisible(true);
            pocketEye.setVisible(false);
            setEye(0);
        }
        pocketEye.setInteractive();
        this.input.setDraggable(pocketEye);
        last_position = Phaser.Utils.Array.NumberArrayStep(0, 1, 0);

        this.physics.world.enable(apple);
        apple.body.setAllowGravity(false);
        this.physics.add.overlap(apple, zonePocket, logApple, null, this);

        function logApple(){
            console.log("Overlap");
            if(pocketEye.visible==false){
            apple.setVisible(false);
            pocketApple.setVisible(true);
            setApple(1)};
        }
        if (appleInpocket == 1){
            pocketApple.setVisible(true);
            apple.setVisible(false);
        };
        apple.setInteractive();
        this.input.setDraggable(apple);
        last_position = Phaser.Utils.Array.NumberArrayStep(0, 1, 0);

        this.physics.world.enable(pocketApple);
        pocketApple.body.setAllowGravity(false);
        this.physics.add.overlap(pocketApple, zoneApple, logAppleBack, null, this);

        function logAppleBack(){
            console.log("Overlap");
            apple.setVisible(true);
            pocketApple.setVisible(false);
            setApple(0);
        }
        pocketApple.setInteractive();
        this.input.setDraggable(pocketApple);
        last_position = Phaser.Utils.Array.NumberArrayStep(0, 1, 0);

        lid.on('pointerdown', function(){
            lid.setVisible(true);
            lid.x=pot.x;
            lid.y=pot.y-44;
            eye.setVisible(false);

        });

        pot.on('pointerdown', function(){
            lid.setVisible(true);
            lid.x=pot.x;
            lid.y=pot.y-150;
            if(pocketEye.visible === false && eatEye==0){
                eye.setVisible(true);}


        });
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

//Przejście między panelami
        var hitPointer = new Phaser.Geom.Rectangle(1600, 500, 200, 200);


        var buttonNext = this.add.sprite(1700,600,'arrow').setAngle(180)
            .setVisible(false)
        panel2.setInteractive(hitPointer, Phaser.Geom.Rectangle.Contains)
            .on('pointerover', function(){
                buttonNext.setVisible(true);
            })
            .on('pointerout', function(){
                buttonNext.setVisible(false);
            })
            .on('pointerdown', function(){
                this.scene.scene.start('FirstPanel');
            })


    }

    update(){
        //Koniec
        if (counter === 3){
            this.scene.scene.start('MenuScene');
            kill();
        };
    }





}
export default SecondPanel;