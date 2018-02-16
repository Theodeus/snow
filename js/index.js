import * as PIXI from "pixi.js";

const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);

PIXI.loader.add('bg', 'landscape.png').load((loader, resources) => {
    
    let sparks = [];
    let flakes = [];
    let sprite;
    let i;

    const bg = new PIXI.Sprite(resources.bg.texture);
    bg.x = app.renderer.width / 2;
    bg.y = app.renderer.height / 2;
    bg.anchor.x = 0.5;
    bg.anchor.y = 0.5;

    let bgScale = window.innerWidth / 1920;
    bg.scale = new PIXI.Point(bgScale, bgScale);
    app.stage.addChild(bg);

    let sparkContainer = new PIXI.particles.ParticleContainer();
    for (i = 0; i < 100; ++i) {
        sprite = new PIXI.Sprite.fromImage("spark.png");
        sprite.tint = 0xFFC966; 
        sprite.scale = new PIXI.Point(Math.random() * 0.2, Math.random() * 0.2);
        sprite.xVelocity = Math.random() * 0.2 - 0.1;
        sprite.yVelocity = Math.random() * 0.5;
        sparkContainer.addChild(sprite);
        sparks.push(sprite);
    }
    sparkContainer.x = 1130 / 1950 * app.renderer.width;
    sparkContainer.y = 565/1080 * app.renderer.height;
    app.stage.addChild(sparkContainer)

    let snowContainer = new PIXI.particles.ParticleContainer();
    for (i = 0; i < 10000; ++i) {
        sprite = new PIXI.Sprite.fromImage("spark.png");
        sprite.tint = 0xffffff;
        sprite.x = app.renderer.width * Math.random();
        sprite.y = app.renderer.height * Math.random();
        sprite.scale = new PIXI.Point(Math.max(0.1, Math.random() * 0.2), Math.max(0.1, Math.random() * 0.2));
        sprite.xVelocity = Math.random() * 0.2;
        sprite.yVelocity = Math.max(0.25, Math.random() * 0.5);
        snowContainer.addChild(sprite);
        flakes.push(sprite);
    }
    snowContainer.x = 0;
    snowContainer.y = 0;
    app.stage.addChild(snowContainer)

    app.ticker.add(() => {
        for (i = 0; i < sparks.length; i++) {
            sparks[i].x += sparks[i].xVelocity;
            sparks[i].y -= sparks[i].yVelocity;
            if (sparks[i].y < -150) {
                sparks[i].y = 0;
                sparks[i].x = 0;
            }
        }

        for (i = 0; i < flakes.length; i++) {
            flakes[i].x += flakes[i].xVelocity;
            flakes[i].y += flakes[i].yVelocity;
            if (flakes[i].y > app.renderer.height) {
                flakes[i].y = 0;
                flakes[i].x = app.renderer.width * Math.random();
            }
        }
    });
});