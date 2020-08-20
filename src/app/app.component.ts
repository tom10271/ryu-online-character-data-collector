import { Component, NgZone } from '@angular/core';
import { charactersDataJSON } from "./characters-data";

class Skill {
    title: string;
    cost: number;
    coolDownTime: number;
    description: string;
}

class Character {
    cardImage: string;
    elementalType: string;
    link: string;
    name: string;
    rankType: string;
    roleType: string;
    smallIcon: string;
    healthPoint: number;
    attack: number;
    defence: number;
    speed: number;
    strategy?: Skill;
    leaderSkill: Skill;
    enhancedLeaderSkill: Skill;
    battleSkill: Skill;
    enhancedBattleSkill: Skill;
    hitAttack: Skill;
    enhancedHitAttack: Skill;
    skill1?: Skill;
    enhancedSkill1?: Skill;
    skill2?: Skill;
    enhancedSkill2?: Skill;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    characters: Character[];
    i = 0;

    constructor(private ngZone: NgZone) {
        this.characters = JSON.parse(charactersDataJSON);

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (sender.tab && message.status) {

                this.ngZone.run(() => {
                    this.characters[this.i] = Object.assign({}, this.characters[this.i], message.result);

                    console.log(this.characters);

                    this.i++;

                    if (this.characters.length - 1 >= this.i) {
                        sendResponse({
                            nextLink: this.characters[this.i].link
                        });
                    } else {
                        console.log(this.characters);
                        console.log(JSON.stringify(this.characters));
                    }
                });

                return true;
            }
        })
    }

    begin() {
        this.i = 0;
        chrome.tabs.create({ url: this.characters[this.i].link });
    }
}
