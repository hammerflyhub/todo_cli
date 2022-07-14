import inquirer from 'inquirer';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const open = require('open');

let time = new Date()
function countdown(xinxi) {
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

function q8() {
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
            if (answers.question_8 === '没') return open('file:///C:/Users/ruoha/Documents/2_Areas_L/learning_coding/todo/countdown.html')
            if (answers.question_8 === '学了') return null;
        });
}
