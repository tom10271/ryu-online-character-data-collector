import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translateToChinese' })
export class TranslateToChinesePipe implements PipeTransform {
    transform(value: any) {
        let result = value;

        [
            ['([0-9]+)%上昇', '上升$1%'],
            ['自パーティの', '隊伍中'],
            ['属性', '屬性'],
            ['全味方の', '全體'],
            ['味方', '我方'],
            ['全体', '全體'],
            ['単体', '單體'],
            ['ボス', 'Boss'],
            ['防御', '防禦'],
            ['キャラクター', '角色'],
            ['状態', '狀態'],
            ['自身に', '自己'],
            ['ヒートゲージ', '熱血值'],

            ['敵([0-9]+)体へ攻撃力([0-9]+)%', '敵方$1位進行$2%'],
            ['敵(全|單)體へ攻撃力([0-9]+)%攻撃', '敵$1體進行$2%攻撃'],

            ['になる確率を', '機率'],

            ['が上升', '+'],
            ['狀態機率', ''],
            ['-([0-9]+)%減少', '-$1%'],
            ['を上升', '+'],

            ['と', ' 及 '],

            ['（アビリティレベル最大時）', ''],
            ['（スキルレベル最大時）', ''],

            ['の構え', '架式'],
            ['の陣', '陣'],
        ].forEach((args) => {
            let [match, replaceWith] = args;

            result = result.replace(new RegExp(match, 'gm'), replaceWith);
        });

        return result;
    }
}
