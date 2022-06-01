// Run only if the extension has not enabled, otherwise the jQuery v3 injected will break things
// making page changing fails.

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const result = [];

// async function collectCharacterLinksAndThumbnail() {
//     for (const elementalType of ['心', '技', '体', '陽', '陰']) {
//         for (const roleType of ['攻撃', '防御', '回復', '補助']) {
//             for (const rankType of ['KSR', 'SSR', 'SR', 'R', 'N']) {
//                 for (
//                     const {title, value} of
//                     [{
//                         title: '属性',
//                         value: elementalType
//                     }, {
//                         title: 'タイプ',
//                         value: roleType
//                     }, {
//                         title: 'レアリティ',
//                         value: rankType
//                     }]
//                 ) {
//                     $('.search03 h3:contains(' + title + ')').parent().find('input:checked').each(function () {
//                         $(this).click();
//                     });
//
//                     $('.search03 h3:contains(' + title + ')').parent().find('label')
//                         .filter(function () {
//                             return $(this).text() === value;
//                         })
//                         .click();
//
//                     await sleep(200);
//                 }
//
//                 console.log({elementalType, roleType, rankType});
//
//                 $('.btnWrap-search input[type=submit]').click();
//
//                 let hasNotFinished = false;
//
//                 do {
//                     await sleep(1000);
//
//                     $('.sys-result .character li > a').each(function () {
//                         let $this = $(this);
//
//                         result.push({
//                             name: $this.find('strong').text(),
//                             elementalType,
//                             roleType,
//                             rankType,
//                             smallIcon: $this.find('.characterIcon').attr('src').replace('./', 'https://ryu.sega-online.jp/special/character/'),
//                             link: $this.attr('href'),
//                         });
//                     });
//
//                     if (
//                         false === $('.pager li:last-child').hasClass('pager__current') &&
//                         $('.sys-result p.notice:contains(該当するキャラクターはありません。)').length === 0
//                     ) {
//                         $('.pager .pager__current+li a').trigger('click');
//
//                         hasNotFinished = true;
//                     } else {
//                         hasNotFinished = false;
//                     }
//
//                     console.log({hasNotFinished});
//                 } while (hasNotFinished);
//             }
//         }
//     }
//
//     console.log(JSON.stringify(result));
// }
//
// await collectCharacterLinksAndThumbnail();

function collectIndividualCharacterData() {
    const result = {
        name: $('img.outline__img').attr('alt'),
        cardImage: $('img.outline__img').attr('src').replace('../', 'https://ryu.sega-online.jp/special/character/')
    };

    ['體力', '攻擊', '防禦', '速度'].forEach((each, i) => {
        result[each] = $('h3:contains(ステータス・スキル)+table tr:nth-child(' + (i + 2) + ') td:last-child').text().replace(',', '') / 1
    });

    ['隊長技能', '戰鬥技', '熱血技', '能力1', '能力2', '能力3', '奧義'].forEach((each, i) => {
        const $cell = $('h3:contains(ステータス・スキル)+table+table tr:nth-child(' + (i + 2) + ') td:last-child');

        const title = $cell.find('h5').text();

        const cost = title.match(/クールタイム：([0-9]+)/);
        const coolDownTime = title.match(/消費.+：([0-9]+)\//);

        result[each] = {
            title: $cell.find('h5').text(),
            cost: cost != null && cost.length >= 2 ? cost[1] / 1 : null,
            coolDownTime: coolDownTime != null && coolDownTime.length >= 2 ? coolDownTime[1] / 1 : null,
            description: $cell.find('p').text(),
        };
    });

    result.characteristics = Array.from($('td.td25').map((p, each) => each.innerHTML)).filter(each => each != "ー")

    console.log(result);
}

collectIndividualCharacterData();
