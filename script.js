// HTML要素を取得
const rockButton = document.getElementById('rock');
const scissorsButton = document.getElementById('scissors');
const paperButton = document.getElementById('paper');
const computerHandDisplay = document.getElementById('computer-hand-display'); // コンピュータの手の画像表示エリア
const playerHandDisplay = document.getElementById('player-hand-display');   // プレイヤーの手の画像表示エリア
// const computerHandDisplayText = document.getElementById('computer-hand-text'); // ← 不要になったので削除
const resultText = document.getElementById('result');

// 手の定義 (名前と画像パス)
const HAND_TYPES = {
    ROCK: { name: 'グー', image: 'images/player_rock.png', comImage: 'images/com_rock.png' },
    SCISSORS: { name: 'チョキ', image: 'images/player_scissors.png', comImage: 'images/com_scissors.png' },
    PAPER: { name: 'パー', image: 'images/player_paper.png', comImage: 'images/com_paper.png' }
};

// コンピュータが選択可能な手のキーの配列
const HAND_KEYS = Object.keys(HAND_TYPES); // ["ROCK", "SCISSORS", "PAPER"]

// 定数（結果の表現） - これは変更なし
const RESULT_WIN = 'あなたの勝ち！';
const RESULT_LOSE = 'あなたの負け…';
const RESULT_DRAW = 'あいこ！';

// --- イベントリスナーの設定 ---
rockButton.addEventListener('click', function() {
    playJanken(HAND_TYPES.ROCK);
});

scissorsButton.addEventListener('click', function() {
    playJanken(HAND_TYPES.SCISSORS);
});

paperButton.addEventListener('click', function() {
    playJanken(HAND_TYPES.PAPER);
});

// --- 画像を表示する関数 ---
function displayHandImage(element, handType, isPlayer) {
    element.innerHTML = ''; // 以前の画像があればクリア
    const img = document.createElement('img');
    if (isPlayer) {
        img.src = handType.image;
        img.alt = `あなたの${handType.name}`;
    } else {
        img.src = handType.comImage;
        img.alt = `モンスターの${handType.name}`;
    }
    element.appendChild(img);
}

// --- じゃんけんのメイン処理 ---
function playJanken(playerHandType) {
    // 0. プレイヤーの手を表示
    displayHandImage(playerHandDisplay, playerHandType, true);

    // 1. コンピュータの手をランダムに決める
    const randomHandKey = HAND_KEYS[Math.floor(Math.random() * HAND_KEYS.length)];
    const computerHandType = HAND_TYPES[randomHandKey];

    // コンピュータの手を表示
    displayHandImage(computerHandDisplay, computerHandType, false);
    // computerHandDisplayText.textContent = computerHandType.name; // ← テキスト表示は削除

    // 2. 勝敗を判定する (判定ロジックは手の「名前」で行う)
    let result;
    if (playerHandType.name === computerHandType.name) {
        result = RESULT_DRAW; // あいこ
    } else if (
        (playerHandType.name === HAND_TYPES.ROCK.name && computerHandType.name === HAND_TYPES.SCISSORS.name) ||
        (playerHandType.name === HAND_TYPES.SCISSORS.name && computerHandType.name === HAND_TYPES.PAPER.name) ||
        (playerHandType.name === HAND_TYPES.PAPER.name && computerHandType.name === HAND_TYPES.ROCK.name)
    ) {
        result = RESULT_WIN; // 勝ち
    } else {
        result = RESULT_LOSE; // 負け
    }

    // 3. 結果を表示する
    resultText.textContent = result;
}

// 初期表示（何も選択されていない状態の画像などを表示したい場合はここに追加）
// 例： playerHandDisplay.innerHTML = '<img src="images/player_standby.png" alt="待機中">';
//      computerHandDisplay.innerHTML = '<img src="images/com_standby.png" alt="待機中">';
// (スタンドバイ用の画像があれば)