// O QUE FALTA FAZER? FAZER ALGORITMO MELHOR DE =, PARA DAR PREFERENCIA A MULTIPLICACOES E DIVISOES.
// Para isso, criar novo array com * e seus 2 numeros, e / e seus dois numeros, e esvaziar a outra original, com
// as somas e etc.


let hist_game = 0;
let game = '';
let game_list = [];

const buttons = [
    {text: "CE", func: () => {
        let display_content = document.getElementById('present_calculation');
        display_content.textContent = display_content.textContent.slice(0,display_content.textContent.length - game.length);
        game = '';
        

    }},
    {text: "C", func: () => {
        let display_content = document.getElementById('present_calculation');
        display_content.textContent = '0';
        let historic_content = document.getElementById('historic_calculation');
        historic_content.textContent = '';
        game = ''
        game_list = [];
        console.log(game);
    }},
    {text: '%', func: () => {
        let display_content = document.getElementById('present_calculation');
        if(!game || display_content.textContent[display_content.textContent.length-1] === '%') return;

        display_content.textContent += "%";
        game = game/100;
    }},
    {text: '/', func: () => create_signal_button('/')},
    {text: '7', value: 7},
    {text: '8', value: 8},
    {text: '9', value: 9},
    {text: 'X', func: () => create_signal_button('*')},
    {text: '4', value: 4},
    {text: '5', value: 5},
    {text: '6', value: 6},
    {text: '-', func: () => create_signal_button('-')},
    {text: '1', value: 1},
    {text: '2', value: 2},
    {text: '3', value: 3},
    {text: '+', func: () => create_signal_button('+')},
    {text: '+/-', func: () => { // FALTA ESSE AQUI, TA INCOMPLETO A PARTE DO DISPLAY, MAS O CALCULO TA CERTO!
    let display_content = document.getElementById('present_calculation');
    let string_display = display_content.textContent;
    if (!game || !string_display) return;

    console.log(`Valor de game antes da troca: ${game}`);
    console.log(`Valor do display antes da troca: ${string_display}`);

    let new_display = string_display;
    let lastOperatorIndex = Math.max(
        string_display.lastIndexOf('+'),
        string_display.lastIndexOf('-'),
        string_display.lastIndexOf('*'),
        string_display.lastIndexOf('/')
    );

    if (lastOperatorIndex === -1) {
        // Se não houver operadores, apenas troca o sinal do número inteiro
        new_display = (string_display[0] === '-') ? string_display.slice(1) : '-' + string_display;
    } else {
        // Alterna o sinal antes do último número
        let before = string_display.slice(0, lastOperatorIndex + 1);
        let lastNumber = string_display.slice(lastOperatorIndex + 1);
        
        if (before.endsWith('+')) {
            before = before.slice(0, -1) + '-';
        } else if (before.endsWith('-')) {
            before = before.slice(0, -1) + '+';
        }

        new_display = before + lastNumber;
    }

    if(game[0] !== '-'){
        game = '-' + game;
    }
    else{
        game = game.slice(1);
    }

    display_content.textContent = new_display;
    console.log(`Valor do GAME depois da troca : ${game}`);
    console.log(`Novo display: ${new_display}`);



    }},

    {text: '0', value: 0},
    {text: ',', func: () => { // Aqui provavelmente eh uma func que pega o valor do display e adiciona virgula
        let display_content = document.getElementById('present_calculation');
        display_content.textContent += '.';
        game += '.';
    }},
    {text: '=', func: () => {
        game_list.push(Number(game));
        console.log(`VAMOS COMPUTAR O RESULTADO {${game_list}}`);
        //console.log(game_list);
        let result = 0;
        //console.log('##################');
        for (let i = 0; i < game_list.length-2; i += 2){
            let first_part = game_list[i];
            if(i !== 0){
                first_part = result;
            }
            //console.log(`result(${result})`);
            let next_part = game_list[i+2];
            if(game_list[i+1] === '+'){
                result = first_part+next_part;
            }
            if(game_list[i+1] === '-'){
                result = first_part-next_part;
            }
            if(game_list[i+1] === '/'){
                result = first_part/next_part;
            }
            if(game_list[i+1] === '*'){
                result = first_part*next_part;
            }
            console.log(`${first_part} ${game_list[i+1]} ${next_part}  = ${result}`);
        //console.log('##################');
        }
        game = result.toString();
        //console.log('---------');
        let historic_content = document.getElementById('historic_calculation');
        historic_content.textContent = game_list.toString();
        game_list = [];
        //console.log(game_list);
        let display_content = document.getElementById('present_calculation');
        display_content.textContent = game;
    }}
]

buttons.forEach(btn => {
    const buttons_place = document.getElementById('buttons-place');
    let new_button = document.createElement('button');
    new_button.textContent = btn.text;
    if(Object.hasOwn(btn, 'func')){
        new_button.onclick = btn.func;
    }
    else{ // se tem propriedade {value}
        new_button.onclick = () => {
            let display_content = document.getElementById('present_calculation');
            if(display_content.textContent === '0'){
                display_content.textContent = "";
            }
            display_content.textContent += btn.text;
            game += btn.text;
            //console.log(game);
        };
    }
    buttons_place.appendChild(new_button);
});

function create_signal_button(signal){
    let display_content = document.getElementById('present_calculation');
    let display_text = display_content.textContent;
        if(!['0','1','2','3','4','5','6','7','8','9'].includes(display_text[display_text.length-1])){
            display_text = display_text.slice(0, -1) + signal;
            display_content.textContent = display_text;
            game_list[game_list.length-1] = signal;
            return;
        }
    game_list.push(Number(game));
    game = '';
    game_list.push(signal);
    display_content.textContent += signal;
}