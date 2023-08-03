// 預設的形容詞和名稱陣列
const adjectives = ["逐風者", "暴怒的", "迅捷的", "厚實的", "聰明的", "無敵的", "兇猛的", "瘋狂的", "神秘的", "忍者的", "狡猾的", "蓋世的", "驚奇的", "魔法的", "幸運的", "勇敢的", "愉快的", "黑暗的", "炙熱的", "絕望的"];
const names = ["輝夜", "阿姆斯壯", "皮卡丘", "咖啡豆", "莉莉絲", "亞特拉斯", "梅里奧", "莉莉斯", "雷納德", "夏洛特", "泰瑞爾", "麥克斯", "艾瑞絲", "潔西卡", "芭芭拉", "愛德華", "諾亞", "夏蕾特", "史蒂夫", "蘇菲亞", "威爾森", "雪莉", "喬治", "露西", "亞力山大", "愛蜜莉", "李察", "珍妮佛", "奧利佛", "羅瑞娜", "卡爾", "艾莉絲", "艾爾文", "瑪麗", "查理", "歐莉薇亞", "喬治", "佛莉絲", "亨利", "艾拉", "馬克", "梅格", "奈爾", "奧莉佛", "查理", "麗莎", "亨利", "艾拉", "馬克", "梅格"];
// 創建魔物種類容器
const monsters = [
    "地精",
    "狼人",
    "骷髏",
    "狼",
    "蜘蛛",
];
const monsters_detail = [
        "./images/monster1.gif",
        "./images/monster2.gif",
        "./images/monster3.gif",
        "./images/monster4.gif",
        "./images/monster5.gif",
];

const equipments = {
    "headgear":[
        { "name": "金屬頭盔" },
        { "name": "青銅頭盔" },
        { "name": "白銀頭盔" },
    ],
    "bodygear": [
        { "name": "金屬盔甲" },
        { "name": "青銅盔甲" },
        { "name": "白銀盔甲" },
    ],
    "leggear": [
        { "name": "金屬長靴" },
        { "name": "青銅長靴" },
        { "name": "白銀長靴" },
    ],
    "handgear": [
        { "name": "金屬手套" },
        { "name": "青銅手套" },
        { "name": "白銀手套" },
    ],
    "mainWeapon": [
        { "name": "金屬長劍" },
        { "name": "青銅長劍" },
        { "name": "白銀長劍" },
    ],
    "subWeapon": [
        { "name": "金屬盾牌" },
        { "name": "青銅盾牌" },
        { "name": "白銀盾牌" },
    ],
}
player = {
    gender: "",
    player_name: "",
};
let LSI  = null;
function init(){
    LSI = new LocalStorageItem();
    // 開始遊戲按鈕點擊事件
    document.getElementById("startGameBtn").addEventListener("click", function () {
        // 跳轉到選擇性別和輸入名字畫面
        const stv_div = document.getElementById("start_view");
        const cht_div = document.getElementById("charater_view");
        const main_view_div = document.getElementById("main_view");
        let pd = LSI.getLocalStorageItem("IdleGame_player_data");
        if (pd){
            console.log(JSON.parse(pd) );
            //有資料的時候直接進入遊戲
            stv_div.style.display = "none";
            cht_div.style.display = "none";
            main_view_div.style.display = "";
            startGame("");
        }else{
            stv_div.style.display = "none";
            cht_div.style.display = "";
        }
    });

    // 匯入檔案按鈕點擊事件
    document.getElementById("importBtn").addEventListener("click", function () {
        // 顯示輸入框供玩家匯入資料
        const userInput = prompt("請貼上匯出的角色資料:");
        // 假設你已經有相應的匯入功能，這裡就用alert來提示玩家匯入成功
        if (userInput) {
            console.log(JSON.parse(userInput));
            let userJson = JSON.parse(userInput);
            if (userInput != "" && userJson.name) {
                //匯入的檔案載入LocalStorage
                LSI.setLocalStorageItem("IdleGame_player_data", JSON.stringify(userJson));
                startGame("");
                alert("匯入成功！遊戲已繼續。");
                //有資料的時候直接進入遊戲
                const stv_div = document.getElementById("start_view");
                const cht_div = document.getElementById("charater_view");
                const main_view_div = document.getElementById("main_view");
                stv_div.style.display = "none";
                cht_div.style.display = "none";
                main_view_div.style.display = "";
            }else{
                alert("匯入失敗！請確認資料是否正確");
            }
        }
    });
    //清除資料
    document.getElementById("clearBtn").addEventListener("click", function () {
        var yes = confirm('確定清除本地資料嗎？');

        if (yes) {
            LSI.removeLocalStorageItem("IdleGame_player_data");
            alert('清除成功');
        } else {
            alert('已取消');
        }
    });

}
// 匯入檔案按鈕功能
function importData() {
    // 複製資料
    let ca = document.getElementById("copy_area");
    ca.style.display = "";
    ca.innerHTML = JSON.stringify(player);
    doCopy("copy_area");
    ca.style.display = "none";
}

// 選擇角色性別
function chooseGender(selectedGender) {
    // 可以根據玩家選擇的性別顯示相對應的gif圖
    // 這裡假設有名為showGif的函式，並根據selectedGender顯示相應的gif圖
    const gifElement = document.getElementById("gif");
    showGif(selectedGender, gifElement);

    player.gender = selectedGender;
    // 顯示名稱輸入畫面
    // document.querySelector(".gender-selection").style.display = "none";
    document.querySelector(".name-input").style.display = "block";
}

// 隨機產生名字
function randomName() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    player_name = randomAdjective + randomName;
    document.getElementById("nameInput").value = player_name;
}
//選擇性別切換圖片
function showGif(selectedGender,div) {
    // 假設有一個存放gif圖片路徑的物件，根據性別選擇對應的gif圖片
    const gifPaths = {
        male: "./images/male.gif",
        female: "./images/female.gif",
        male_atk: "./images/male_atk.gif",
        female_atk: "./images/female_atk.gif",
    };

    // 取得gif圖片路徑
    const gifPath = gifPaths[selectedGender];

    // 假設有一個用來顯示gif圖片的元素，例如一個img標籤，並將圖片路徑設定給它
    div.src = gifPath;
}
// 確認名稱
function confirmName() {
    player_name = document.getElementById("nameInput").value;
    // 建立角色物件並進入遊戲
    player.player_name = player_name;
    // 進入遊戲，這裡假設有名為startGameplay的函式用來進入遊戲畫面
    startGame(player);
    // 隱藏名稱輸入畫面
    document.querySelector("#start_view").style.display = "none";
}
// 開始遊戲按鈕功能
function startGame(data) {
    let pd = LSI.getLocalStorageItem("IdleGame_player_data");
    player = new Character(data.gender, data.player_name);
    if (pd) {
        let pd_obj = JSON.parse(pd);
        //把設定輸入給player物件
        player.gender = pd_obj.gender;
        player.name = pd_obj.name;
        player.level = pd_obj.level;
        player.job = pd_obj.job;
        player.exp = pd_obj.exp;
        player.strength = pd_obj.strength;
        player.constitution = pd_obj.constitution;
        player.agility = pd_obj.agility;
        player.intelligence = pd_obj.intelligence;
        player.hp = pd_obj.hp;
        player.mp = pd_obj.mp;
        player.attack = pd_obj.attack;
        player.critical = pd_obj.critical;
        player.attackSpeed = pd_obj.attackSpeed;
        player.defense = pd_obj.defense;
        player.evasion = pd_obj.evasion;
        player.point = pd_obj.point;
        player.hpRecovery = pd_obj.hpRecovery;
        player.mpRecovery = pd_obj.mpRecovery;
        player.equipment = pd_obj.equipment;
        player.expNeeded = pd_obj.expNeeded;
        player.skills = pd_obj.skills;
        player.gameTime = pd_obj.gameTime;
    }
    reloadAbilities();
    // 顯示角色性別選擇畫面和名稱輸入畫面
    document.getElementById("charater_view").style.display = "none";
    document.getElementById("start_view").style.display = "none";
    document.getElementById("main_view").style.display = "";
    const excute_time_div = document.getElementById("excute_time");

    // 開始計時，遊戲時間會開始增加
    let gameTime = player.gameTime;
    setInterval(() => {
        gameTime++;
        if ( (gameTime%5) == 0){
            player.recovery();
        }
        excute_time_div.innerHTML = gameTime;
        player.gameTime = gameTime;
        // 更新遊戲時間的顯示
    }, 1000);

    // 開始第一場戰鬥
    startBattle();
}


// 顯示角色資訊
function showStats() {
    document.getElementById("level").textContent = player.level;
    document.getElementById("hp").textContent = player.hp;
    document.getElementById("mp").textContent = player.mp;
    document.getElementById("exp").textContent = player.exp;
}

// 顯示技能使用情況
function showSkills() {
    document.getElementById("skill1").textContent = "亂噴火球 (CD: 0s)";
    document.getElementById("skill2").textContent = "搓一顆火球 (CD: 0s)";
    // 技能3和技能4留空
    document.getElementById("skill3").textContent = "";
    document.getElementById("skill4").textContent = "";
}

// 顯示戰鬥狀況
function showBattleLog(log) {
    const battleLog = document.getElementById("battleLog");
    battleLog.innerHTML += `<div>${log}</div>`;
    battleLog.scrollTop = battleLog.scrollHeight;
    //檢查有沒有過長
    let all_div = battleLog.getElementsByTagName('div');
    let logsize = 30;
    if (all_div.length > logsize){
        let div = all_div[0];
        div.remove();
    }
}


// 顯示角色資訊視窗
function showCharacterInfo() {
    const characterInfo = document.getElementById("characterInfo");
    characterInfo.style.display = "";
    const main_view = document.getElementById("main_view");
    main_view.style.display = "none";
}

// 關閉角色資訊視窗
function closeCharacterInfo() {
    const characterInfo = document.getElementById("characterInfo");
    characterInfo.style.display = "none";
    const main_view = document.getElementById("main_view");
    main_view.style.display = "";
}
class Character {
    constructor(gender, name) {
        this.gender = gender;
        this.name = name;
        this.level = 1;
        this.job = "";
        this.exp = 0;
        this.strength = 10;
        this.constitution = 10;
        this.agility = 10;
        this.intelligence = 10;
        this.other_attack = 0;
        this.other_strength = 0;
        this.other_constitution = 0;
        this.other_agility = 0;
        this.other_intelligence = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.critical = 0;
        this.attackSpeed = 0;
        this.evasion = 0;
        this.defense = 0;
        this.point = 0;
        this.hpRecovery = 5 + (this.constitution/5);
        this.mpRecovery = 5 + (this.intelligence / 5);
        this.equipment = {
            "headgear": {
                "type": "",
                "name": "",
                "level": 0,
                "defense": 0,
                "attack": 0,
                "attributeValue": 0,
                "attributeType": "",
            },
            "bodygear": {
                "type": "",
                "name": "",
                "level": 0,
                "defense": 0,
                "attack": 0,
                "attributeValue": 0,
                "attributeType": "",
            },
            "leggear": {
                "type": "",
                "name": "",
                "level": 0,
                "defense": 0,
                "attack": 0,
                "attributeValue": 0,
                "attributeType": "",
            },
            "handgear": {
                "type": "",
                "name": "",
                "level": 0,
                "defense": 0,
                "attack": 0,
                "attributeValue": 0,
                "attributeType": "",
            },
            "mainWeapon": {
            "type":"",
            "name":"",
            "level":0,
            "defense":0,
            "attack":0,
            "attributeValue":0,
            "attributeType":"",
            },
            "subWeapon": {
            "type":"",
            "name":"",
            "level":0,
            "defense":0,
            "attack":0,
            "attributeValue":0,
            "attributeType":"",
            },
        };
        this.expNeeded = this.level * 5;
        this.skills = [];
        this.gameTime = 0;
    }

    // 玩家升級
    levelUp() {
        const expNeeded = this.level * 5; // 升級所需經驗值為前次的1.5倍
        player.expNeeded = expNeeded;
        if (this.exp >= expNeeded) {
            this.level++;
            this.exp -= expNeeded;
            this.point +=4;
            showPoint("Y");
            player.rest();
            showBattleLog(player.name + " 等級提升!! " + player.level + " 力量:" + player.strength + " 體質:" + player.constitution + " 敏捷:" + player.agility + " 智力:" + player.intelligence);
            // 根據職業增加屬性
            if (this.level === 30) {
                this.addAttributesByClass();
            }
        }
    }

    // 根據職業增加屬性
    addAttributesByClass() {
        // 根據職業增加屬性
        if (this.job === "knight") {
            // 戰士職業增加力量和體質
            this.strength += 30;
            this.constitution += 30;
        } else if (this.job === "magic") {
            // 法師職業增加智力和敏捷
            this.intelligence += 30;
            this.agility += 30;
        }
    }

    // 角色攻擊
    attackMonster(monster) {
        // 判斷是否有技能可以使用，如果有，施放技能
        if (this.skills.length > 0 && this.mp >= this.skills[0].mpCost) {
            const skill = this.skills.shift();
            this.mp -= skill.mpCost;
            // 使用技能攻擊
            const damage = Math.floor(skill.damageMultiplier * player.attack);
            monster.hp -= damage;
            // 判斷是否擊敗魔物
            if (monster.hp <= 0) {
                this.exp += monster.expValue;
                this.levelUp();
            }
            return `${this.name} 使用 ${skill.name} 造成 ${monster.name}(LV:${monster.level}) ${damage} 點傷害` + " 剩餘血量:" + monster.hp;
        } else {
            // 使用普通攻擊
            let damage = Math.floor(player.attack);
            const isEvasion = isprobabilities(player.critical);
            let isEvasion_str = "";
            //判斷是否爆擊
            if (isEvasion) {
                isEvasion_str = "爆擊";
                damage = damage*2;
            }
            monster.hp -= damage;
            // 判斷是否擊敗魔物
            if (monster.hp <= 0) {
                this.exp += monster.expValue;
                this.levelUp();
                if (Math.random() < 0.006) {
                    this.getEquipment();
                }
                if (monster.hp < 0) monster.hp = 0;
            }
            return `${this.name} 使用普通攻擊 造成 ${monster.name}(LV:${monster.level}) ${damage} 點${isEvasion_str}傷害` + " 剩餘血量:" + monster.hp;
        }
    }

    // 獲得裝備
    getEquipment() {
        // 判斷是否已經裝備
        const equipmentType = ["headgear", "bodygear", "leggear", "handgear", "mainWeapon", "subWeapon"];
        const randomType = equipmentType[Math.floor(Math.random() * equipmentType.length)];
        const eqname = equipments[randomType][Math.floor(Math.random() * equipments[randomType].length)]["name"];
        const isEquipped = this.equipment[randomType]["name"] == "" ? false :true;
        if (!isEquipped) {
            // 裝備第一件裝備
            this.equipment[randomType] = new Equipment(randomType,eqname, 1);
            // 獲得裝備後檢查是否有前綴詞屬性的裝備
            if (Math.random() < 0.0001) {
                this.getPrefixedEquipment(randomType);
            }
        } else {
            // 裝備增加防禦或攻擊力
            this.equipment[randomType].name = eqname;
            this.equipment[randomType].level++;
            if (randomType === "mainWeapon" || randomType === "subWeapon") {
                this.equipment[randomType].attack = Math.floor(this.equipment[randomType].attack + Math.random() * 0.5 + 1);
                showBattleLog(player.name + " 獲得裝備: " + this.equipment[randomType]["name"] + " level:" + this.equipment[randomType]["level"] + " 攻擊:" + this.equipment[randomType].attack );
            }else{
                this.equipment[randomType].defense = Math.floor(this.equipment[randomType].defense + Math.random() * 0.5 + 1);
                showBattleLog(player.name + " 獲得裝備: " + this.equipment[randomType]["name"] + " level:" + this.equipment[randomType]["level"] + " 防禦:" + this.equipment[randomType].defense);
            }
            // 獲得裝備後檢查是否有前綴詞屬性的裝備
            if (isprobabilities(0.01) ) {
                this.getPrefixedEquipment(randomType);
            }
        }

    }

    // 獲得有前綴詞的裝備
    getPrefixedEquipment(randomType) {
        // 獲得屬性
        const attributeType = ["力量", "體質", "敏捷", "智力"];
        const attributeType_V = {
            "力量": "strength",
            "體質": "constitution",
            "敏捷": "agility",
            "智力": "intelligence",
        }
        const randomAttribute = attributeType[Math.floor(Math.random() * attributeType.length)];
        this.equipment[randomType]["name"] = randomAttribute + "的 " + this.equipment[randomType]["name"];
        //先判斷原本有沒有
        if (this.equipment[randomType]["attributeType"] != "") {
            this.equipment[randomType]["attributeValue"] = 1;
        } else {
            this.equipment[randomType]["attributeValue"] += Math.random() * 0.5 + 1;
        }
        //塞對應的能力
        this.equipment[randomType]["attributeType"] = attributeType_V[randomAttribute];
    }

    // 玩家休息回復
    rest() {
        this.hp = this.constitution * 10;
        this.mp = this.intelligence * 10;
    }
    //時間回復寫量
    recovery(){
        if (this.hp < this.constitution * 10){
            this.hp += this.hpRecovery;
            showBattleLog(player.name + " 回復生命 " + this.hpRecovery);
        }
        if (this.mp < this.intelligence * 10) {
            this.mp += this.mpRecovery;
            showBattleLog(player.name + " 回復魔力 " + this.mpRecovery);
        }

    }
}

class Equipment {
    constructor(type, name,level) {
        this.type = type;
        this.name = name;
        this.level = level;
        this.defense = type !== "mainWeapon" && type !== "subWeapon" ? level : 0;
        this.attack = type === "mainWeapon" || type === "subWeapon" ? level*10 : 0;
        this.attributeValue = 0;
        this.attributeType = "";
    }
}

class Monster {
    constructor(level, name, prefix ,player) {
        this.level = level;
        this.name = prefix + name;
        this.hp = player.constitution*10*0.4;
        this.expValue = Math.ceil((this.level * 50) / 1000);
        this.attack = player.strength*1*0.8;
    }
    // 怪物攻擊
    attackChracter(player) {
        // 使用普通攻擊
        const damage = Math.floor(this.attack - (player.defense * 0.5)) ;

        //判斷玩家的迴避率
        const isEvasion = isprobabilities(player.evasion);
        // 判斷亂數是否小於等於機率，如果是則表示事件發生
        if (isEvasion) {
            return `${this.name} 使用普通攻擊 被是被 ${player.name}(LV:${player.level}) 閃開了`;
        }else{
            //計算防禦
            let scal_d = player.defense*0.5;
            player.hp -= damage;
            if (player.hp < 0) player.hp = 0;
            return `${this.name} 使用普通攻擊 造成 ${player.name}(LV:${player.level}) ${damage} 點傷害 ,抵擋了(${scal_d}點傷害)`;
        }
    }
}



// 開始戰鬥
function startBattle() {
    // 隨機產生一種魔物
    const monsterIndex = Math.floor(Math.random() * monsters.length);
    const monster_url = monsters_detail[monsterIndex];
    const monsterName = monsters[monsterIndex];
    let prefix = "普通的";
    if (Math.random() < 0.25) {
        prefix = "暴怒的";
    } else if (Math.random() < 0.5) {
        prefix = "迅捷的";
    } else if (Math.random() < 0.75) {
        prefix = "厚實的";
    }
    monster = new Monster(player.level, monsterName, prefix, player);
    showBattleLog("遇到了野生的 " + monster.name + " (LV:" + monster.level + ") hp:" + monster.hp);
    //隨機給一個圖
    document.getElementById("monster_gif").src = monster_url;
    //顯示怪物圖示
    document.getElementById("monster_gif").style.display = "";
    // 戰鬥經過
    battleIng();
    //切換戰鬥圖示
    const gif_act = document.getElementById("gif_act");
    showGif(player.gender + "_atk", gif_act);
}
//戰鬥流程
function battleIng() {

    // 玩家攻擊魔物
    const playerAttackResult = player.attackMonster(monster);
    showBattleLog(playerAttackResult);
    showPlayerStatus(player);
    // 更新畫面顯示戰鬥結果
    // 判斷戰鬥是否結束
    if (player.hp <= 0) {
        // 玩家死亡，結束戰鬥
        showBattleLog("玩家死亡，結束戰鬥 5秒後復活");
        //切換戰鬥圖示
        const gif_act = document.getElementById("gif_act");
        showGif(player.gender, gif_act);
        setTimeout(() => {
            player.rest(); // 休息60秒回復HP和MP
            startBattle(); // 進入下一場戰鬥
            //切換戰鬥圖示
            const gif_act = document.getElementById("gif_act");
            showGif(player.gender, gif_act);
        }, 5000);
    } else if (monster.hp <= 0) {
        // 魔物死亡，玩家獲得經驗值和裝備
        showBattleLog("擊倒魔物，5秒繼續戰鬥  獲得經驗:" + monster.expValue);
        //顯示怪物圖示
        document.getElementById("monster_gif").src = "";
        document.getElementById("monster_gif").style.display = "none";
        //切換戰鬥圖示
        const gif_act = document.getElementById("gif_act");
        showGif(player.gender, gif_act);
        setTimeout(() => {
            // player.rest(); // 休息2秒
            //切換戰鬥圖示
            const gif_act = document.getElementById("gif_act");
            showGif(player.gender, gif_act);
            startBattle(); // 進入下一場戰鬥
        }, 5000);
    } else {
        // 魔物攻擊玩家
        const monsterAttackResult =monster.attackChracter(player);
        showBattleLog(monsterAttackResult);
        // 判斷戰鬥是否結束
        if (player.hp <= 0) {
            // 玩家死亡，結束戰鬥
            showBattleLog("玩家死亡，結束戰鬥 5秒後復活");
            //切換戰鬥圖示
            const gif_act = document.getElementById("gif_act");
            showGif(player.gender, gif_act);
            setTimeout(() => {
                player.rest(); // 休息60秒回復HP和MP
                startBattle(); // 進入下一場戰鬥
            }, 5000);
        } else {
            //算攻擊速度
            let org_atkspeed = 1;
            let new_atkspeed = org_atkspeed + (org_atkspeed*player.attackSpeed) ;
            let atk_speed = 1000 / new_atkspeed;
            // console.log("攻擊速度:" + atk_speed + " new_atkspeed" + new_atkspeed);
            // 玩家未死亡，繼續戰鬥
            setTimeout(() => {
                battleIng();
            }, atk_speed);
        }
    }
}
//更新玩家寫量和經驗值
function showPlayerStatus(player){
    document.getElementById("level").innerHTML = player.level;
    document.getElementById("hp").innerHTML = Math.floor(player.hp);
    document.getElementById("mp").innerHTML = Math.floor(player.mp);
    document.getElementById("exp").innerHTML = player.exp + "/" + player.expNeeded;

    document.getElementById("player_gender").innerHTML = player.gender;
    document.getElementById("player_name").innerHTML = player.name;
    document.getElementById("player_level").innerHTML = player.level;
    document.getElementById("characterJob").innerHTML = player.job;
    document.getElementById("player_exp").innerHTML = player.exp;
    document.getElementById("player_strength").innerHTML = player.strength + player.other_strength;
    document.getElementById("player_constitution").innerHTML = player.constitution + player.other_constitution;
    document.getElementById("player_agility").innerHTML = player.agility + player.other_agility;
    document.getElementById("player_intelligence").innerHTML = player.intelligence + player.other_intelligence;
    document.getElementById("player_hp").innerHTML = player.hp;
    document.getElementById("player_mp").innerHTML = player.mp;
    document.getElementById("player_attack").innerHTML = player.attack ;
    document.getElementById("player_critical").innerHTML = player.critical * 100 + "%";
    document.getElementById("player_attackSpeed").innerHTML = player.attackSpeed * 100 + "%";
    document.getElementById("player_defense").innerHTML = player.defense;
    document.getElementById("player_evasion").innerHTML = player.evasion * 100 + "%";
    document.getElementById("player_point").innerHTML = player.point;
    document.getElementById("player_hpRecovery").innerHTML = player.hpRecovery;
    document.getElementById("player_mpRecovery").innerHTML = player.mpRecovery;
    document.getElementById("player_expNeeded").innerHTML = player.expNeeded;
    // document.getElementById("player_skills").innerHTML = player.skills;
    document.getElementById("player_gameTime").innerHTML = player.gameTime;

    document.getElementById("player_headgear").innerHTML = player.equipment.headgear.name + " (LV" + player.equipment.headgear.level + ") 防禦:" +player.equipment.headgear.defense;
    document.getElementById("player_bodygear").innerHTML = player.equipment.bodygear.name + " (LV" + player.equipment.bodygear.level + ") 防禦:" +player.equipment.bodygear.defense;
    document.getElementById("player_leggear").innerHTML = player.equipment.leggear.name + " (LV" + player.equipment.leggear.level + ") 防禦:" +player.equipment.leggear.defense;
    document.getElementById("player_handgear").innerHTML = player.equipment.handgear.name + " (LV" + player.equipment.handgear.level + ") 防禦:" +player.equipment.handgear.defense;
    document.getElementById("player_mainWeapon").innerHTML = player.equipment.mainWeapon.name + " (LV" + player.equipment.mainWeapon.level + ") 攻擊:" +player.equipment.mainWeapon.attack;
    document.getElementById("player_subWeapon").innerHTML = player.equipment.subWeapon.name + " (LV" + player.equipment.subWeapon.level + ") 攻擊:" + player.equipment.subWeapon.attack;
    if(player.point > 0 )showPoint("Y");
    LSI.setLocalStorageItem("IdleGame_player_data", JSON.stringify(player));
}

class LocalStorageItem {
    constructor() {}
	// get localStorage
	getLocalStorage = function () {
        var tmp_storage = null;

        try {
            tmp_storage = (window.localStorage) ? window.localStorage : window.globalStorage[strDomain];
            tmp_storage["init"] = "true";
        } catch (e) {
            //showErrorMsg(classname, "getLocalStorage", e.toString());
            return null;
        }

        return tmp_storage;
    }

	// get localStorage item
	getLocalStorageItem = function (_key) {
        //if(!checkPrivate()) return "initFail";
        var tmp_storage = this.getLocalStorage();
        var tmp_value = null;

        if (tmp_storage) {
            if (tmp_storage[_key.toString()]) {
                tmp_value = tmp_storage[_key.toString()];
                return tmp_value;
            }
        }

        return null;
    }

	// set localStorage item
	setLocalStorageItem = function (_key, _value) {
        //if(!checkPrivate()) return "initFail";
        var tmp_storage = this.getLocalStorage();
        if (tmp_storage) {
            try {
                tmp_storage[_key.toString()] = _value;
                return true;
            } catch (err) {
                //showErrorMsg(classname, "setLocalStorageItem", e.toString());
            }
        }

        return false;
    }

	// remove localStorage item
	removeLocalStorageItem = function (_key) {
        // if (!checkPrivate()) return "initFail";
        var tmp_storage = this.getLocalStorage();
        if (tmp_storage) {
            if (tmp_storage[_key.toString()]) {
                try {
                    tmp_storage.removeItem(_key.toString());
                    return true;
                } catch (err) {
                    //showErrorMsg(classname, "removeLocalStorageItem", e.toString());
                }
            }
        }

        return false;
    }
}
//複製功能
function doCopy(divID) {
    var copyDiv = document.getElementById(divID);
    if (window.clipboardData) {
        window.clipboardData.setData("Text", copyDiv.innerHTML);
        alert("Copy Success1 !");
    }
    else if (document.createRange && window.getSelection) {
        var range = document.createRange();
        range.selectNode(copyDiv);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand("Copy", false, null);
        sel.removeAllRanges();
        alert("Copy Success2 !");

    } else {
        alert("Copy Error!");
    }
}
//增加屬性
function setPoint(point){
    //點數大於0才可以點
    if(player.point > 0){
        if (point == "strength"){
            player.strength += 1;
            player.point --;
        }
        if (point == "constitution") {
            player.constitution += 1;
            player.point--;
        }
        if (point == "agility") {
            player.agility += 1;
            player.point--;
        }
        if (point == "intelligence") {
            player.intelligence += 1;
            player.point--;
        }
        //如果點數沒了要關閉按鈕
        if(player.point <= 0){
            showPoint("N");
        }
        //重置一下能力值
        reloadAbilities();
        showPlayerStatus(player);
    }
}
//顯示屬性點數按鈕
function showPoint(show){
    let isShow = "";
    if(show != "Y") isShow = "none";
    document.getElementById("player_strength_point").style.display = isShow;
    document.getElementById("player_constitution_point").style.display = isShow;
    document.getElementById("player_agility_point").style.display = isShow;
    document.getElementById("player_intelligence_point").style.display = isShow;
}
function reloadAbilities(){
    //重置一下能力值
    let total_def = 0;
    let total_atk = 0;
    let attriT = "";
    let attriV = 0;

    total_def += player.equipment["headgear"]["defense"];
    attriT = player.equipment["headgear"]["attributeType"];
    attriV = player.equipment["headgear"]["attributeValue"];
    if (attriT != "")player["other_" + attriT] += attriV;
    total_def += player.equipment["bodygear"]["defense"];
    attriT = player.equipment["bodygear"]["attributeType"];
    attriV = player.equipment["bodygear"]["attributeValue"];
    if (attriT != "") player["other_" + attriT] += attriV;
    total_def += player.equipment["leggear"]["defense"];
    attriT = player.equipment["leggear"]["attributeType"];
    attriV = player.equipment["leggear"]["attributeValue"];
    if (attriT != "") player["other_" + attriT] += attriV;
    total_def += player.equipment["handgear"]["defense"];
    attriT = player.equipment["handgear"]["attributeType"];
    attriV = player.equipment["handgear"]["attributeValue"];
    if (attriT != "") player["other_" + attriT] += attriV;
    total_atk += player.equipment["mainWeapon"]["attack"];
    total_atk += player.equipment["subWeapon"]["attack"];

    player.defense = total_def;
    player.other_attack = total_atk;
    player.hp = (player.constitution + player.other_constitution) * 10;
    player.mp = (player.intelligence + player.other_intelligence) * 10;
    player.attack = player.strength * 1 + player.other_attack;
    player.critical = (player.agility + player.other_agility) * 0.001;
    player.attackSpeed = (player.agility + player.other_agility) * 0.001;
    player.evasion = (player.agility + player.other_agility) * 0.002;
}
function isprobabilities(p){
    // 設定機率為 5%
    const probability = p;

    // 產生一個介於 0 到 1 之間的亂數
    const randomValue = Math.random();

    // 判斷亂數是否小於等於機率，如果是則表示事件發生
    if (randomValue <= probability) {
        return true;
    } else {
        return false;
    }
}