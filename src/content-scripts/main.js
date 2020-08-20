import $ from "jquery";

function l(u, i) {
    var d = document;
    if (!d.getElementById(i)) {
        var s = d.createElement('script');
        s.src = u;
        s.id = i;
        d.body.appendChild(s);
    }
}

l('//code.jquery.com/jquery-3.4.1.min.js', 'jquery');

const result = {
    cardImage: $('img.outline__img').attr('src').replace('../', 'https://ryu.sega-online.jp/special/character/')
};

['healthPoint', 'attack', 'defence', 'speed'].forEach((each, i) => {
    result[each] = $('h3:contains(ステータス・スキル)+table tr:nth-child(' + (i + 2) + ') td:last-child').text().replace(',', '') / 1
});

const skillTitles = [
    "リーダースキル",
    "絶技リーダースキル",
    "バトルスキル",
    "絶技バトルスキル",
    "ヒートアクション",
    "絶技ヒートアクション",
    "アビリティ(1)",
    "絶技アビリティ(1)",
    "アビリティ(2)",
    "絶技アビリティ(2)",
    "奥義",
];

[
    'leaderSkill',
    'enhancedLeaderSkill',
    'battleSkill',
    'enhancedBattleSkill',
    'hitAttack',
    'enhancedHitAttack',
    'skill1',
    'enhancedSkill1',
    'skill2',
    'enhancedSkill2',
    'strategy'
].forEach((each, i) => {
    const $cell = $('h3:contains(ステータス・スキル)+table+table tr').filter(function () {
        return $(this).find('th').text() === skillTitles[i];
    }).find('td:last-child');

    const title = $cell.find('h5').text();

    const coolDownTime = title.match(/クールタイム：([0-9]+)/);
    const cost = title.match(/消費.+：([0-9]+)\//);

    result[each] = {
        title: $cell.find('h5').text(),
        cost: cost != null && cost.length >= 2 ? cost[1] / 1 : null,
        coolDownTime: coolDownTime != null && coolDownTime.length >= 2 ? coolDownTime[1] / 1 : null,
        description: $cell.find('p').text(),
    };

    if (each === 'strategy') {
        result[each].description = result[each].title.split(' Lv.')[0];
    }
});

chrome.runtime.sendMessage({status: "ACTION_FINISHED", result}, function ({nextLink}) {
    location.href = nextLink;
});
