class MenuScene extends Phaser.Scene{
    constructor(){
        //Phaser.scene.call(this,{key:'MenuScene'});
        super({key:'MenuScene'});

    }
    preload(){
        this.load.image('background', './assets/MenuScreen1.png');
        this.load.image('title', 'assets/Title.png');
        //this.load.spritesheet('button', 'assets/Buttons1.png', {frameWidth: 391 , frameHeight: 96});
        this.load.spritesheet({
            key: 'button',
            url: 'assets/Buttons2.png',
            frameConfig: {
                frameWidth: 400,
                frameHeight: 200,
                startFrame: 0,
                endFrame: 6
            }
        });
    }
    create(){
        var background = this.add.image(0,0,'background');
        background.setDisplaySize(this.cameras.main.width,this.cameras.main.height);
        background.setOrigin(0)
        var startSprite  = this.add.sprite(500,300,'title')

        var buttonPlayOff = this.add.sprite(300,800,'button',0)
        var buttonPlayHover = this.add.sprite(300,800,'button',3)
            buttonPlayHover.setVisible(false)
            buttonPlayOff.setInteractive()
            .on('pointerover', function(){
               buttonPlayHover.setVisible(true);
            })
            .on('pointerout', function(){
                buttonPlayHover.setVisible(false);
            })
                .on('pointerdown', function(){
                this.scene.scene.start('FirstPanel');
            });

        var buttonRules = this.add.sprite(900,800,'button',1)
        var buttonRulesHover = this.add.sprite(900,800,'button',4)
        buttonRulesHover.setVisible(false)
        buttonRules.setInteractive()
            .on('pointerover', function(){
                buttonRulesHover.setVisible(true);
            })
            .on('pointerout', function(){
                buttonRulesHover.setVisible(false);
            })
        var buttonCredits = this.add.sprite(1500,800,'button',2)
        var buttonCreditsHover = this.add.sprite(1500,800,'button',5)
        buttonCreditsHover.setVisible(false)
        buttonCredits.setInteractive()
            .on('pointerover', function(){
                buttonCreditsHover.setVisible(true);
            })
            .on('pointerout', function(){
                buttonCreditsHover.setVisible(false);
            })
    }
}

export default MenuScene;