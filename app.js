import inquirer from 'inquirer';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const open = require('open');
var TogglClient = require('toggl-api');
var toggl = new TogglClient({ apiToken: 'a5a7204d031da0fb7f8d4b4991f1bd76' });

let time = new Date()
function RandArray(array) {
    var rand = Math.random() * array.length | 0;
    var rValue = array[rand];
    return rValue;
}
function countdown(xinxi = "") {
    console.info(xinxi)
    let counter = 5;

    const myFunc = () => {
        console.log(counter);
        counter -= 1;

        if (counter === 0) {
            console.log('Done');
            clearInterval(timerID);
        }
    };

    const timerID = setInterval(myFunc, 1000);
}

function summer() {
    let myTop = ['深蓝连衣裙', '格子短袖', '粉色T恤', '黑蓬蓬裙'];
    let Top = RandArray(myTop);
    console.info(Top);

    let Pants = RandArray(['浅蓝牛仔裤', '蓝色休闲裤']);
    if (Top == '格子短袖' || Top == '粉色T恤') {
        console.info(Pants);
    }

    let Coat = RandArray(['牛仔衬衣', "蓝色兜帽罩衫"]);
    console.info(Coat);

    let Shoes = RandArray(['回力', 'Beta老爹鞋']);
    console.info(Shoes);
    q11()
}

const toggltimer = () => {
    countdown("学习吧，我帮你计时了1个小时")
    setTimeout(()=>toggl.startTimeEntry({
        description: 'rw and crw导出并对比',
        pid: 182337167,
    }, function (err, timeEntry) {
        // handle error

        // working 10 seconds
        setTimeout(function () {
            toggl.stopTimeEntry(timeEntry.id, function (err) {
                // handle error

                toggl.updateTimeEntry(timeEntry.id, { tags: ['finished'] }, function (err) {
                    toggl.destroy()
                });
            });
        }, 60 * 60 * 1000);
    }), 5 * 1000)
}

inquirer
    .prompt([
        {
            type: 'list',
            name: 'question_1',
            message: '想上厕所吗',
            choices: ['想', '不想'],
        },
    ])
    .then(answers => {
        if (answers.question_1 === '想') return countdown("去上厕所")
        if (answers.question_1 === '不想') return q2();
    });

function q2(n) {
    if (time.getHours() <= 7) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'question_2',
                    message: '天晚了，先洗漱',
                    choices: ['好的', '还有点其他事要做', '我洗过了'],
                },
            ])
            .then(answers => {
                if (answers.question_2 === '好的') return countdown("洗洗睡吧，晚安")
                if (answers.question_2 === '还有点其他事要做') return q4();
                if (answers.question_2 === '我洗过了') return q6();
            });
        return
    }
    if (n == 4) return q7()
    if (time.getHours() > 7) return q4()
}

function q3(n) {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_3',
                message: '洗碗了吗？',
                choices: ['还没', '不用洗'],
            },
        ])
        .then(answers => {
            if (answers.question_3 === '是的') return countdown("快洗碗啦")
            if (answers.question_3 === '不用洗')
                return q2(n);
        });
}

function q4() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_4',
                message: '渴了？',
                choices: ['是的', '那倒不是因为这个'],
            },
        ])
        .then(answers => {
            if (answers.question_4 === '是的') return q5()
            if (answers.question_4 === '那倒不是因为这个') return q3(4);
        });
}

function q5() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_5',
                message: '喝点水？',
                choices: ['好的', '等下，水还不能喝'],
            },
        ])
        .then(answers => {
            if (answers.question_5 === '好的') return countdown("喝水吧")
            if (answers.question_5 === '等下，水还不能喝') return q3();
        });
}

function q6() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_6',
                message: '那直接睡吧',
                choices: ['好', '等等，我不想在这里睡！'],
            },
        ])
        .then(answers => {
            if (answers.question_6 === '好') return countdown("晚安")
            if (answers.question_6 === '等等，我不想在这里睡！') return countdown("那去另一个房间吧");
        });
}

function q7() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_7',
                message: '刷牙了吗',
                choices: ['没', '刷过了'],
            },
        ])
        .then(answers => {
            if (answers.question_7 === '没') return countdown("去刷牙")
            if (answers.question_7 === '刷过了') return q8();
        });
}

function q8(n) {
    if (time.getHours() >= 12 && n != 9) return q9()
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_8',
                message: '今天写Masterarbeit了吗',
                choices: ['没', '学了'],
            },
        ])
        .then(answers => {
            // if (answers.question_8 === '没') return open('C:/Users/ruoha/Documents/2_Areas_L/learning_coding/todo_cli/countdown.html')
            if (answers.question_8 === '没') return toggltimer()
            if (answers.question_8 === '学了') return null;
        });
}

function q9() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_9',
                message: '吃饭了吗',
                choices: ['没', '吃了'],
            },
        ])
        .then(answers => {
            if (answers.question_9 === '没') return q10()
            if (answers.question_9 === '吃了') return q8(9);
        });
}

function q10() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_10',
                message: '去吃饭？',
                choices: ['好', '等等，我还没穿衣服'],
            },
        ])
        .then(answers => {
            if (answers.question_10 === '好') return countdown("Guten appetit")
            if (answers.question_10 === '等等，我还没穿衣服') return summer()
        });
}

function q11() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'question_11',
                message: '',
                choices: ['确定'],
            },
        ])
        .then(answers => countdown())
}
