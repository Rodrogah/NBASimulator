
// Dados do jogador
const player = {
    name: "",
    position: "",
    team: "",
    stats: {
        shooting: 0,
        defense: 0,
        athleticism: 0,
        playmaking: 0,
        rebounding: 0
    },
    seasonStats: {
        gamesPlayed: 0,
        points: 0,
        assists: 0,
        rebounds: 0,
        games: [],
        playoffGames: 0,
        playoffWins: 0,
        playoffLosses: 0
    },
    careerStats: {
        seasons: [],
        totalPoints: 0,
        totalGames: 0,
        championships: 0
    },
    achievements: [],
    draftPick: 0,
    playoffSeries: [],
    currentPlayoffRound: 0,
    trophies: [],
    teammates: [],
    currentSeason: 1,
    trophyCounts: {},
    overall: 70 // Overall inicial fixo em 70
};

// Times da NBA com logos e elencos reais (versão mais atualizada - 2024)
const teams = {
    "ATL": { 
        name: "Atlanta Hawks", 
        conference: "East", 
        logo: "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg",
        roster: [
            { name: "Trae Young", position: "PG", secondaryPosition: "SG", overall: 89 },
            { name: "Dejounte Murray", position: "SG", secondaryPosition: "PG", overall: 84 },
            { name: "Bogdan Bogdanovic", position: "SG", secondaryPosition: "SF", overall: 78 },
            { name: "De'Andre Hunter", position: "SF", secondaryPosition: "PF", overall: 79 },
            { name: "Jalen Johnson", position: "PF", secondaryPosition: "SF", overall: 80 },
            { name: "Clint Capela", position: "C", secondaryPosition: "", overall: 82 }
        ]
    },
    "BOS": { 
        name: "Boston Celtics", 
        conference: "East", 
        logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg",
        roster: [
            { name: "Jrue Holiday", position: "PG", secondaryPosition: "SG", overall: 85 },
            { name: "Derrick White", position: "SG", secondaryPosition: "PG", overall: 82 },
            { name: "Jaylen Brown", position: "SG", secondaryPosition: "SF", overall: 90 },
            { name: "Jayson Tatum", position: "SF", secondaryPosition: "PF", overall: 93 },
            { name: "Kristaps Porzingis", position: "PF", secondaryPosition: "C", overall: 86 }
        ]
    },
    "BKN": {
        name: "Brooklyn Nets",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg",
        roster: [
            { name: "Ben Simmons", position: "PG", secondaryPosition: "PF", overall: 79 },
            { name: "Dennis Schröder", position: "PG", secondaryPosition: "SG", overall: 80 },
            { name: "Cam Thomas", position: "SG", secondaryPosition: "PG", overall: 81 },
            { name: "Mikal Bridges", position: "SF", secondaryPosition: "SG", overall: 84 },
            { name: "Dorian Finney-Smith", position: "PF", secondaryPosition: "SF", overall: 77 },
            { name: "Nic Claxton", position: "C", secondaryPosition: "", overall: 82 }
        ]
    },
    "CHA": {
        name: "Charlotte Hornets",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg",
        roster: [
            { name: "LaMelo Ball", position: "PG", secondaryPosition: "SG", overall: 86 },
            { name: "Tre Mann", position: "SG", secondaryPosition: "PG", overall: 77 },
            { name: "Brandon Miller", position: "SF", secondaryPosition: "SG", overall: 82 },
            { name: "Miles Bridges", position: "SF", secondaryPosition: "PF", overall: 81 },
            { name: "Grant Williams", position: "PF", secondaryPosition: "C", overall: 78 },
            { name: "Mark Williams", position: "C", secondaryPosition: "", overall: 80 }
        ]
    },
    "CHI": {
        name: "Chicago Bulls",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg",
        roster: [
            { name: "Josh Giddey", position: "PG", secondaryPosition: "SG", overall: 83 },
            { name: "Coby White", position: "SG", secondaryPosition: "PG", overall: 81 },
            { name: "Zach LaVine", position: "SG", secondaryPosition: "SF", overall: 85 },
            { name: "Patrick Williams", position: "PF", secondaryPosition: "SF", overall: 79 },
            { name: "Nikola Vucevic", position: "C", secondaryPosition: "", overall: 84 }
        ]
    },
    "CLE": {
        name: "Cleveland Cavaliers",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg",
        roster: [
            { name: "Darius Garland", position: "PG", secondaryPosition: "SG", overall: 86 },
            { name: "Donovan Mitchell", position: "SG", secondaryPosition: "PG", overall: 90 },
            { name: "Max Strus", position: "SF", secondaryPosition: "SG", overall: 79 },
            { name: "Evan Mobley", position: "PF", secondaryPosition: "C", overall: 85 },
            { name: "Jarrett Allen", position: "C", secondaryPosition: "", overall: 85 }
        ]
    },
    "DAL": {
        name: "Dallas Mavericks",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg",
        roster: [
            { name: "Luka Doncic", position: "PG", secondaryPosition: "SF", overall: 96 },
            { name: "Kyrie Irving", position: "SG", secondaryPosition: "PG", overall: 91 },
            { name: "Klay Thompson", position: "SG", secondaryPosition: "SF", overall: 83 },
            { name: "PJ Washington", position: "PF", secondaryPosition: "SF", overall: 80 },
            { name: "Daniel Gafford", position: "C", secondaryPosition: "PF", overall: 81 },
            { name: "Dereck Lively II", position: "C", secondaryPosition: "", overall: 79 }
        ]
    },
    "DEN": {
        name: "Denver Nuggets",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg",
        roster: [
            { name: "Jamal Murray", position: "PG", secondaryPosition: "SG", overall: 86 },
            { name: "Kentavious Caldwell-Pope", position: "SG", secondaryPosition: "SF", overall: 79 },
            { name: "Michael Porter Jr.", position: "SF", secondaryPosition: "PF", overall: 84 },
            { name: "Aaron Gordon", position: "PF", secondaryPosition: "SF", overall: 82 },
            { name: "Nikola Jokic", position: "C", secondaryPosition: "", overall: 97 }
        ]
    },
    "DET": {
        name: "Detroit Pistons",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg",
        roster: [
            { name: "Cade Cunningham", position: "PG", secondaryPosition: "SG", overall: 85 },
            { name: "Jaden Ivey", position: "SG", secondaryPosition: "PG", overall: 80 },
            { name: "Tim Hardaway Jr.", position: "SG", secondaryPosition: "SF", overall: 77 },
            { name: "Ausar Thompson", position: "SF", secondaryPosition: "PF", overall: 79 },
            { name: "Jalen Duren", position: "C", secondaryPosition: "", overall: 80 }
        ]
    },
    "GSW": { 
        name: "Golden State Warriors", 
        conference: "West", 
        logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg",
        roster: [
            { name: "Stephen Curry", position: "PG", secondaryPosition: "SG", overall: 96 },
            { name: "De'Anthony Melton", position: "SG", secondaryPosition: "PG", overall: 79 },
            { name: "Andrew Wiggins", position: "SF", secondaryPosition: "PF", overall: 82 },
            { name: "Jonathan Kuminga", position: "PF", secondaryPosition: "SF", overall: 83 },
            { name: "Draymond Green", position: "PF", secondaryPosition: "C", overall: 83 }
        ]
    },
    "HOU": {
        name: "Houston Rockets",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg",
        roster: [
            { name: "Fred VanVleet", position: "PG", secondaryPosition: "SG", overall: 84 },
            { name: "Jalen Green", position: "SG", secondaryPosition: "SF", overall: 82 },
            { name: "Dillon Brooks", position: "SF", secondaryPosition: "SG", overall: 79 },
            { name: "Jabari Smith Jr.", position: "PF", secondaryPosition: "C", overall: 80 },
            { name: "Alperen Sengun", position: "C", secondaryPosition: "", overall: 85 }
        ]
    },
    "IND": {
        name: "Indiana Pacers",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg",
        roster: [
            { name: "Tyrese Haliburton", position: "PG", secondaryPosition: "SG", overall: 89 },
            { name: "Bennedict Mathurin", position: "SG", secondaryPosition: "SF", overall: 82 },
            { name: "Aaron Nesmith", position: "SF", secondaryPosition: "SG", overall: 78 },
            { name: "Pascal Siakam", position: "PF", secondaryPosition: "SF", overall: 86 },
            { name: "Myles Turner", position: "C", secondaryPosition: "", overall: 83 }
        ]
    },
    "LAC": {
        name: "LA Clippers",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg",
        roster: [
            { name: "James Harden", position: "PG", secondaryPosition: "SG", overall: 87 },
            { name: "Norman Powell", position: "SG", secondaryPosition: "SF", overall: 81 },
            { name: "Kawhi Leonard", position: "SF", secondaryPosition: "PF", overall: 92 },
            { name: "Terance Mann", position: "SF", secondaryPosition: "SG", overall: 78 },
            { name: "Ivica Zubac", position: "C", secondaryPosition: "", overall: 82 }
        ]
    },
    "LAL": { 
        name: "Los Angeles Lakers", 
        conference: "West", 
        logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg",
        roster: [
            { name: "D'Angelo Russell", position: "PG", secondaryPosition: "SG", overall: 81 },
            { name: "Austin Reaves", position: "SG", secondaryPosition: "SF", overall: 83 },
            { name: "LeBron James", position: "SF", secondaryPosition: "PF", overall: 95 },
            { name: "Rui Hachimura", position: "PF", secondaryPosition: "SF", overall: 79 },
            { name: "Anthony Davis", position: "PF", secondaryPosition: "C", overall: 93 }
        ]
    },
    "MEM": {
        name: "Memphis Grizzlies",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg",
        roster: [
            { name: "Ja Morant", position: "PG", secondaryPosition: "SG", overall: 91 },
            { name: "Marcus Smart", position: "SG", secondaryPosition: "PG", overall: 82 },
            { name: "Desmond Bane", position: "SG", secondaryPosition: "SF", overall: 86 },
            { name: "Vince Williams Jr.", position: "SF", secondaryPosition: "SG", overall: 77 },
            { name: "Jaren Jackson Jr.", position: "PF", secondaryPosition: "C", overall: 87 }
        ]
    },
    "MIA": {
        name: "Miami Heat",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg",
        roster: [
            { name: "Terry Rozier", position: "PG", secondaryPosition: "SG", overall: 83 },
            { name: "Tyler Herro", position: "SG", secondaryPosition: "PG", overall: 84 },
            { name: "Jimmy Butler", position: "SF", secondaryPosition: "PF", overall: 90 },
            { name: "Jaime Jaquez Jr.", position: "SF", secondaryPosition: "SG", overall: 79 },
            { name: "Bam Adebayo", position: "C", secondaryPosition: "PF", overall: 88 }
        ]
    },
    "MIL": {
        name: "Milwaukee Bucks",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg",
        roster: [
            { name: "Damian Lillard", position: "PG", secondaryPosition: "SG", overall: 89 },
            { name: "Malik Beasley", position: "SG", secondaryPosition: "SF", overall: 77 },
            { name: "Khris Middleton", position: "SF", secondaryPosition: "PF", overall: 85 },
            { name: "Giannis Antetokounmpo", position: "PF", secondaryPosition: "C", overall: 97 },
            { name: "Brook Lopez", position: "C", secondaryPosition: "", overall: 83 },
            { name: "Bobby Portis", position: "PF", secondaryPosition: "C", overall: 81 }
        ]
    },
    "MIN": {
        name: "Minnesota Timberwolves",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg",
        roster: [
            { name: "Mike Conley", position: "PG", secondaryPosition: "SG", overall: 81 },
            { name: "Anthony Edwards", position: "SG", secondaryPosition: "SF", overall: 90 },
            { name: "Jaden McDaniels", position: "SF", secondaryPosition: "PF", overall: 81 },
            { name: "Karl-Anthony Towns", position: "PF", secondaryPosition: "C", overall: 88 },
            { name: "Rudy Gobert", position: "C", secondaryPosition: "", overall: 88 }
        ]
    },
    "NOP": {
        name: "New Orleans Pelicans",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg",
        roster: [
            { name: "CJ McCollum", position: "PG", secondaryPosition: "SG", overall: 84 },
            { name: "Dejounte Murray", position: "SG", secondaryPosition: "PG", overall: 85 },
            { name: "Brandon Ingram", position: "SF", secondaryPosition: "PF", overall: 85 },
            { name: "Zion Williamson", position: "PF", secondaryPosition: "SF", overall: 89 },
            { name: "Jonas Valanciunas", position: "C", secondaryPosition: "", overall: 82 },
            { name: "Herb Jones", position: "SF", secondaryPosition: "PF", overall: 80 }
        ]
    },
    "NYK": {
        name: "New York Knicks",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg",
        roster: [
            { name: "Jalen Brunson", position: "PG", secondaryPosition: "SG", overall: 91 },
            { name: "Donte DiVincenzo", position: "SG", secondaryPosition: "SF", overall: 80 },
            { name: "Josh Hart", position: "SF", secondaryPosition: "SG", overall: 82 },
            { name: "OG Anunoby", position: "SF", secondaryPosition: "PF", overall: 84 },
            { name: "Julius Randle", position: "PF", secondaryPosition: "C", overall: 85 },
            { name: "Karl-Anthony Towns", position: "C", secondaryPosition: "PF", overall: 88 }
        ]
    },
    "OKC": {
        name: "Oklahoma City Thunder",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg",
        roster: [
            { name: "Shai Gilgeous-Alexander", position: "PG", secondaryPosition: "SG", overall: 94 },
            { name: "Lu Dort", position: "SG", secondaryPosition: "SF", overall: 79 },
            { name: "Josh Giddey", position: "SF", secondaryPosition: "PG", overall: 82 },
            { name: "Jalen Williams", position: "SF", secondaryPosition: "SG", overall: 85 },
            { name: "Chet Holmgren", position: "PF", secondaryPosition: "C", overall: 86 }
        ]
    },
    "ORL": {
        name: "Orlando Magic",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg",
        roster: [
            { name: "Jalen Suggs", position: "PG", secondaryPosition: "SG", overall: 82 },
            { name: "Gary Harris", position: "SG", secondaryPosition: "SF", overall: 76 },
            { name: "Franz Wagner", position: "SF", secondaryPosition: "PF", overall: 87 },
            { name: "Paolo Banchero", position: "PF", secondaryPosition: "SF", overall: 88 },
            { name: "Wendell Carter Jr.", position: "C", secondaryPosition: "", overall: 82 },
            { name: "Jonathan Isaac", position: "PF", secondaryPosition: "SF", overall: 79 }
        ]
    },
    "PHI": {
        name: "Philadelphia 76ers",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg",
        roster: [
            { name: "Kyle Lowry", position: "PG", secondaryPosition: "SG", overall: 79 },
            { name: "Tyrese Maxey", position: "SG", secondaryPosition: "PG", overall: 89 },
            { name: "Paul George", position: "SF", secondaryPosition: "SG", overall: 88 },
            { name: "Tobias Harris", position: "PF", secondaryPosition: "SF", overall: 82 },
            { name: "Joel Embiid", position: "C", secondaryPosition: "", overall: 96 },
            { name: "Caleb Martin", position: "SF", secondaryPosition: "PF", overall: 78 }
        ]
    },
    "PHX": {
        name: "Phoenix Suns",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg",
        roster: [
            { name: "Tyus Jones", position: "PG", secondaryPosition: "SG", overall: 80 },
            { name: "Devin Booker", position: "SG", secondaryPosition: "PG", overall: 91 },
            { name: "Grayson Allen", position: "SG", secondaryPosition: "SF", overall: 78 },
            { name: "Kevin Durant", position: "SF", secondaryPosition: "PF", overall: 93 },
            { name: "Bradley Beal", position: "SG", secondaryPosition: "PG", overall: 86 },
            { name: "Jusuf Nurkic", position: "C", secondaryPosition: "", overall: 81 }
        ]
    },
    "POR": {
        name: "Portland Trail Blazers",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg",
        roster: [
            { name: "Scoot Henderson", position: "PG", secondaryPosition: "SG", overall: 81 },
            { name: "Anfernee Simons", position: "SG", secondaryPosition: "PG", overall: 84 },
            { name: "Shaedon Sharpe", position: "SG", secondaryPosition: "SF", overall: 80 },
            { name: "Jerami Grant", position: "PF", secondaryPosition: "SF", overall: 82 },
            { name: "Deandre Ayton", position: "C", secondaryPosition: "", overall: 84 },
            { name: "Robert Williams III", position: "C", secondaryPosition: "PF", overall: 82 }
        ]
    },
    "SAC": {
        name: "Sacramento Kings",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg",
        roster: [
            { name: "De'Aaron Fox", position: "PG", secondaryPosition: "SG", overall: 90 },
            { name: "Kevin Huerter", position: "SG", secondaryPosition: "SF", overall: 79 },
            { name: "DeMar DeRozan", position: "SF", secondaryPosition: "SG", overall: 87 },
            { name: "Keegan Murray", position: "PF", secondaryPosition: "SF", overall: 82 },
            { name: "Domantas Sabonis", position: "C", secondaryPosition: "PF", overall: 88 }
        ]
    },
    "SAS": {
        name: "San Antonio Spurs",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg",
        roster: [
            { name: "Chris Paul", position: "PG", secondaryPosition: "SG", overall: 85 },
            { name: "Devin Vassell", position: "SG", secondaryPosition: "SF", overall: 83 },
            { name: "Julian Champagnie", position: "SF", secondaryPosition: "PF", overall: 75 },
            { name: "Jeremy Sochan", position: "PF", secondaryPosition: "SF", overall: 79 },
            { name: "Victor Wembanyama", position: "PF", secondaryPosition: "C", overall: 90 },
            { name: "Keldon Johnson", position: "SF", secondaryPosition: "PF", overall: 82 }
        ]
    },
    "TOR": {
        name: "Toronto Raptors",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg",
        roster: [
            { name: "Immanuel Quickley", position: "PG", secondaryPosition: "SG", overall: 84 },
            { name: "Gradey Dick", position: "SG", secondaryPosition: "SF", overall: 77 },
            { name: "RJ Barrett", position: "SF", secondaryPosition: "SG", overall: 83 },
            { name: "Scottie Barnes", position: "PF", secondaryPosition: "SF", overall: 88 },
            { name: "Jakob Poeltl", position: "C", secondaryPosition: "", overall: 82 },
            { name: "Kelly Olynyk", position: "PF", secondaryPosition: "C", overall: 78 }
        ]
    },
    "UTA": {
        name: "Utah Jazz",
        conference: "West",
        logo: "https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg",
        roster: [
            { name: "Keyonte George", position: "PG", secondaryPosition: "SG", overall: 78 },
            { name: "Collin Sexton", position: "SG", secondaryPosition: "PG", overall: 81 },
            { name: "Jordan Clarkson", position: "SG", secondaryPosition: "SF", overall: 80 },
            { name: "Lauri Markkanen", position: "PF", secondaryPosition: "SF", overall: 87 },
            { name: "John Collins", position: "PF", secondaryPosition: "C", overall: 81 },
            { name: "Walker Kessler", position: "C", secondaryPosition: "", overall: 81 }
        ]
    },
    "WAS": {
        name: "Washington Wizards",
        conference: "East",
        logo: "https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg",
        roster: [
            { name: "Bilal Coulibaly", position: "SG", secondaryPosition: "SF", overall: 77 },
            { name: "Jordan Poole", position: "SG", secondaryPosition: "PG", overall: 82 },
            { name: "Kyle Kuzma", position: "PF", secondaryPosition: "SF", overall: 83 },
            { name: "Deni Avdija", position: "SF", secondaryPosition: "PF", overall: 80 },
            { name: "Jonas Valančiūnas", position: "C", secondaryPosition: "", overall: 82 }
        ]
    }
};

// Conquistas possíveis
const allAchievements = [
    { id: "first-game", name: "Estreia na NBA", description: "Jogou sua primeira partida na NBA", earned: false },
    { id: "first-points", name: "Primeiros Pontos", description: "Marcou seus primeiros pontos na NBA", earned: false },
    { id: "double-double", name: "Duplo-Duplo", description: "Conseguiu um duplo-duplo em uma partida", earned: false },
    { id: "30-points", name: "30 Pontos", description: "Marcou 30 pontos em uma partida", earned: false },
    { id: "10-assists", name: "10 Assistências", description: "Registrou 10 assistências em uma partida", earned: false },
    { id: "drafted", name: "Draftado", description: "Foi selecionado no draft da NBA", earned: false },
    { id: "lottery-pick", name: "Lottery Pick", description: "Foi selecionado entre as 14 primeiras escolhas do draft", earned: false },
    { id: "playoff-berth", name: "Classificado para os Playoffs", description: "Seu time se classificou para os playoffs", earned: false },
    { id: "playoff-win", name: "Vitória nos Playoffs", description: "Ganhou sua primeira partida nos playoffs", earned: false },
    { id: "series-win", name: "Venceu uma Série", description: "Venceu uma série nos playoffs", earned: false },
    { id: "conference-finals", name: "Finais de Conferência", description: "Chegou às finais de conferência", earned: false },
    { id: "nba-finals", name: "Finais da NBA", description: "Chegou às finais da NBA", earned: false },
    { id: "champion", name: "Campeão da NBA", description: "Venceu o campeonato da NBA", earned: false },
    { id: "triple-double", name: "Triple-Double", description: "Conseguiu um triple-double em uma partida", earned: false },
    { id: "50-point-game", name: "50 Pontos", description: "Marcou 50 ou mais pontos em uma partida", earned: false },
    { id: "jersey-retired", name: "Camisa Aposentada", description: "Teve a camisa aposentada por um time", earned: false },
    { id: "hall-of-fame", name: "Hall da Fama", description: "Entrou para o Hall da Fama do basquete", earned: false },
    { id: "legend", name: "Lenda do Jogo", description: "Jogou por mais de 15 temporadas na NBA", earned: false }
];

// Troféus disponíveis
const allTrophies = [
    { id: "mvp", name: "MVP", description: "Jogador Mais Valioso da Temporada", earned: false },
    { id: "fmvp", name: "MVP das Finais", description: "Jogador Mais Valioso das Finais", earned: false },
    { id: "scoring-champ", name: "Artilheiro", description: "Líder da liga em pontuação", earned: false },
    { id: "all-star", name: "All-Star", description: "Selecionado para o All-Star Game", earned: false },
    { id: "all-nba", name: "All-NBA Team", description: "Selecionado para um dos times All-NBA", earned: false },
    { id: "rookie-year", name: "Calouro do Ano", description: "Eleito o melhor calouro da temporada", earned: false },
    { id: "dpoy", name: "Defensor do Ano", description: "Eleito o melhor defensor da temporada", earned: false },
    { id: "sixth-man", name: "Sexto Homem", description: "Eleito o melhor reserva da temporada", earned: false },
    { id: "most-improved", name: "Jogador que Mais Evoluiu", description: "Mostrou maior evolução em relação à temporada anterior", earned: false }
];

// Inicializa o simulador
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa contagem de troféus
    initializeTrophyCounts();

    // Configura os sliders de atributos
    setupAttributeSliders();

    // Configura o botão de criar jogador
    document.getElementById('create-btn').addEventListener('click', startDraft);

    // Configura o botão de jogar partida
    document.getElementById('play-game-btn').addEventListener('click', playGame);

    // Configura o botão de continuar após o draft
    document.getElementById('continue-btn').addEventListener('click', startSeason);

    // Configura o botão de ir direto para os playoffs
    document.getElementById('playoffs-btn').addEventListener('click', goToPlayoffs);

    // Configura o botão de ir para os playoffs durante a temporada
    document.getElementById('go-to-playoffs-btn').addEventListener('click', goToPlayoffs);

    // Configura o botão de simular jogo dos playoffs
    document.getElementById('simulate-playoff-game-btn').addEventListener('click', simulatePlayoffGame);

    // Configura o botão de próxima temporada
    document.getElementById('next-season-btn').addEventListener('click', startNewSeason);

    // Configura o botão para ver a galeria de troféus
    document.getElementById('back-to-dashboard-btn').addEventListener('click', backToDashboard);

    // Configura os botões de pular jogos
    document.getElementById('skip-5-btn').addEventListener('click', () => skipGames(5));
    document.getElementById('skip-10-btn').addEventListener('click', () => skipGames(10));
    document.getElementById('skip-custom-btn').addEventListener('click', () => {
        const gamesToSkip = parseInt(document.getElementById('skip-custom-input').value);
        skipGames(gamesToSkip);
    });
    document.getElementById('skip-to-playoffs-btn').addEventListener('click', () => {
        const remainingGames = 82 - player.seasonStats.gamesPlayed;
        if (remainingGames > 0) {
            skipGames(remainingGames);
        }
        goToPlayoffs();
    });
});

// Inicializa a contagem de troféus
function initializeTrophyCounts() {
    allTrophies.forEach(trophy => {
        player.trophyCounts[trophy.id] = 0;
    });
}

// Configura os sliders de atributos
function setupAttributeSliders() {
    // Atributos expandidos para mais variação
    const sliders = [
        { id: "shooting", valueId: "shooting-value", min: 5, max: 20, label: "Arremesso" },
        { id: "midrange", valueId: "midrange-value", min: 5, max: 20, label: "Mid-Range" },
        { id: "threepoint", valueId: "threepoint-value", min: 5, max: 20, label: "3 Pontos" },
        { id: "finishing", valueId: "finishing-value", min: 5, max: 20, label: "Finalização" },
        { id: "defense", valueId: "defense-value", min: 5, max: 20, label: "Defesa" },
        { id: "perimeter_d", valueId: "perimeter_d-value", min: 5, max: 20, label: "Defesa Perim." },
        { id: "athleticism", valueId: "athleticism-value", min: 5, max: 20, label: "Atleticismo" },
        { id: "speed", valueId: "speed-value", min: 5, max: 20, label: "Velocidade" },
        { id: "playmaking", valueId: "playmaking-value", min: 5, max: 20, label: "Passes" },
        { id: "ball_handle", valueId: "ball_handle-value", min: 5, max: 20, label: "Drible" },
        { id: "rebounding", valueId: "rebounding-value", min: 5, max: 20, label: "Rebotes" },
        { id: "strength", valueId: "strength-value", min: 5, max: 20, label: "Força" }
    ];

    // Atualiza a estrutura HTML para os novos atributos
    const attributeSliders = document.querySelector('.attribute-sliders');
    attributeSliders.innerHTML = '';
    
    // Cria dois grupos de atributos para layout em colunas
    const attributesLeftColumn = document.createElement('div');
    attributesLeftColumn.className = 'attributes-column';
    
    const attributesRightColumn = document.createElement('div');
    attributesRightColumn.className = 'attributes-column';
    
    // Adiciona os sliders nas colunas
    sliders.forEach((slider, index) => {
        const sliderHtml = `
            <div class="form-group">
                <label for="${slider.id}">${slider.label}: <span id="${slider.valueId}">5</span></label>
                <input type="range" id="${slider.id}" min="${slider.min}" max="${slider.max}" value="5">
            </div>
        `;
        
        if (index < sliders.length / 2) {
            attributesLeftColumn.innerHTML += sliderHtml;
        } else {
            attributesRightColumn.innerHTML += sliderHtml;
        }
    });
    
    attributeSliders.appendChild(attributesLeftColumn);
    attributeSliders.appendChild(attributesRightColumn);
    
    // Redefine os valores iniciais para criar mais variação
    sliders.forEach(slider => {
        document.getElementById(slider.id).value = 5;
        document.getElementById(slider.valueId).textContent = 5;
    });

    // Adiciona os event listeners para os sliders
    sliders.forEach(slider => {
        const sliderElement = document.getElementById(slider.id);
        const valueElement = document.getElementById(slider.valueId);
        
        // Atualiza os atributos min e max do slider
        sliderElement.min = slider.min;
        sliderElement.max = slider.max;

        sliderElement.addEventListener('input', function() {
            valueElement.textContent = this.value;
            updatePointsLeft();
        });
    });
    
    // Adiciona botões de builds rápidas
    const quickBuildsContainer = document.createElement('div');
    quickBuildsContainer.className = 'quick-builds';
    quickBuildsContainer.innerHTML = '<h3>Builds Rápidas</h3>';
    
    const builds = [
        { id: 'shooter', name: 'Atirador' },
        { id: 'slasher', name: 'Atacador' },
        { id: 'lockdown_defender', name: 'Defensor' },
        { id: 'playmaker', name: 'Armador' },
        { id: 'glass_cleaner', name: 'Reboteiro' },
        { id: 'two_way', name: 'Two-Way' },
        { id: 'stretch_big', name: 'Stretch Big' },
        { id: 'athletic_freak', name: 'Atleta' },
        { id: 'all_around', name: 'Completo' },
        { id: 'post_scorer', name: 'Post Scorer' }
    ];
    
    const buildsRow1 = document.createElement('div');
    buildsRow1.className = 'builds-row';
    
    const buildsRow2 = document.createElement('div');
    buildsRow2.className = 'builds-row';
    
    builds.forEach((build, index) => {
        const buildButton = document.createElement('button');
        buildButton.className = 'build-btn';
        buildButton.textContent = build.name;
        buildButton.addEventListener('click', () => applyBuild(build.id));
        
        // Divide os botões em duas linhas
        if (index < 5) {
            buildsRow1.appendChild(buildButton);
        } else {
            buildsRow2.appendChild(buildButton);
        }
    });
    
    quickBuildsContainer.appendChild(buildsRow1);
    quickBuildsContainer.appendChild(buildsRow2);
    
    // Adiciona os botões antes dos sliders
    const attributeSection = document.querySelector('.section:nth-child(2)');
    attributeSection.insertBefore(quickBuildsContainer, attributeSection.querySelector('.points-info'));
    
    // Atualiza player.stats para incluir os novos atributos
    player.stats = {
        shooting: 5,
        midrange: 5,
        threepoint: 5,
        finishing: 5,
        defense: 5,
        perimeter_d: 5,
        athleticism: 5,
        speed: 5,
        playmaking: 5,
        ball_handle: 5,
        rebounding: 5,
        strength: 5
    };
    
    // Inicia o cálculo de pontos
    updatePointsLeft();
}

// Função de aplicar builds removida

// Atualiza os pontos restantes com mais atributos
function updatePointsLeft() {
    // Calcula quantos pontos o jogador está usando além do mínimo
    let total = 0;
    
    // Lista de todos os atributos possíveis
    const allAttributes = [
        'shooting', 'midrange', 'threepoint', 'finishing', 
        'defense', 'perimeter_d', 'athleticism', 'speed', 
        'playmaking', 'ball_handle', 'rebounding', 'strength'
    ];
    
    // Reseta os pontos de atributos no objeto do jogador
    allAttributes.forEach(attr => {
        const element = document.getElementById(attr);
        if (element) {
            player.stats[attr] = parseInt(element.value);
            total += (parseInt(element.value) - 5); // Cada atributo começa em 5
        }
    });
    
    // Ponto de balanceamento total para 12 atributos (110 pontos disponíveis além do mínimo)
    const maxPoints = 110;
    const pointsLeft = maxPoints - total;
    
    document.getElementById('points-left').textContent = pointsLeft;
    document.getElementById('points-progress').style.width = `${(total / maxPoints) * 100}%`;
    
    // Desabilita o botão se não tiver distribuído todos os pontos
    document.getElementById('create-btn').disabled = pointsLeft !== 0;
}



// Aplica uma build pré-definida
function applyBuild(buildType) {
    // Mapeia todos os sliders para os 12 atributos
    const sliders = {
        shooting: document.getElementById('shooting'),
        midrange: document.getElementById('midrange'),
        threepoint: document.getElementById('threepoint'),
        finishing: document.getElementById('finishing'),
        defense: document.getElementById('defense'),
        perimeter_d: document.getElementById('perimeter_d'),
        athleticism: document.getElementById('athleticism'),
        speed: document.getElementById('speed'),
        playmaking: document.getElementById('playmaking'),
        ball_handle: document.getElementById('ball_handle'),
        rebounding: document.getElementById('rebounding'),
        strength: document.getElementById('strength')
    };
    
    // Valores base (5 para cada atributo)
    const baseValues = {
        shooting: 5,
        midrange: 5,
        threepoint: 5,
        finishing: 5,
        defense: 5,
        perimeter_d: 5,
        athleticism: 5,
        speed: 5,
        playmaking: 5,
        ball_handle: 5,
        rebounding: 5,
        strength: 5
    };
    
    // Distribui os 110 pontos conforme a build (cada build precisa ter exatamente 110 pontos acima do mínimo)
    switch(buildType) {
        case 'shooter':
            // Especialista em arremessos
            baseValues.shooting = 18;     // +13
            baseValues.midrange = 18;     // +13
            baseValues.threepoint = 20;   // +15
            baseValues.finishing = 11;    // +6
            baseValues.defense = 7;       // +2
            baseValues.perimeter_d = 8;   // +3
            baseValues.athleticism = 10;  // +5
            baseValues.speed = 11;        // +6
            baseValues.playmaking = 15;   // +10
            baseValues.ball_handle = 17;  // +12
            baseValues.rebounding = 8;    // +3
            baseValues.strength = 7;      // +2
            break;
            
        case 'slasher':
            // Especialista em penetração
            baseValues.shooting = 10;     // +5
            baseValues.midrange = 15;     // +10
            baseValues.threepoint = 10;   // +5
            baseValues.finishing = 20;    // +15
            baseValues.defense = 9;       // +4
            baseValues.perimeter_d = 8;   // +3
            baseValues.athleticism = 18;  // +13
            baseValues.speed = 20;        // +15
            baseValues.playmaking = 14;   // +9
            baseValues.ball_handle = 19;  // +14
            baseValues.rebounding = 7;    // +2
            baseValues.strength = 10;     // +5
            break;
            
        case 'lockdown_defender':
            // Especialista em defesa
            baseValues.shooting = 8;      // +3
            baseValues.midrange = 9;      // +4
            baseValues.threepoint = 8;    // +3
            baseValues.finishing = 12;    // +7
            baseValues.defense = 20;      // +15
            baseValues.perimeter_d = 20;  // +15
            baseValues.athleticism = 15;  // +10
            baseValues.speed = 15;        // +10
            baseValues.playmaking = 10;   // +5
            baseValues.ball_handle = 9;   // +4
            baseValues.rebounding = 14;   // +9
            baseValues.strength = 15;     // +10
            break;
            
        case 'playmaker':
            // Especialista em passes e ball handling
            baseValues.shooting = 13;     // +8
            baseValues.midrange = 13;     // +8
            baseValues.threepoint = 12;   // +7
            baseValues.finishing = 12;    // +7
            baseValues.defense = 8;       // +3
            baseValues.perimeter_d = 10;  // +5
            baseValues.athleticism = 12;  // +7
            baseValues.speed = 18;        // +13
            baseValues.playmaking = 20;   // +15
            baseValues.ball_handle = 20;  // +15
            baseValues.rebounding = 6;    // +1
            baseValues.strength = 6;      // +1
            break;
            
        case 'glass_cleaner':
            // Especialista em rebotes
            baseValues.shooting = 7;      // +2
            baseValues.midrange = 8;      // +3
            baseValues.threepoint = 6;    // +1
            baseValues.finishing = 15;    // +10
            baseValues.defense = 18;      // +13
            baseValues.perimeter_d = 8;   // +3
            baseValues.athleticism = 13;  // +8
            baseValues.speed = 8;         // +3
            baseValues.playmaking = 7;    // +2
            baseValues.ball_handle = 6;   // +1
            baseValues.rebounding = 20;   // +15
            baseValues.strength = 19;     // +14
            break;
            
        case 'two_way':
            // Bom em ataque e defesa
            baseValues.shooting = 13;     // +8
            baseValues.midrange = 14;     // +9
            baseValues.threepoint = 13;   // +8
            baseValues.finishing = 14;    // +9
            baseValues.defense = 15;      // +10
            baseValues.perimeter_d = 15;  // +10
            baseValues.athleticism = 12;  // +7
            baseValues.speed = 12;        // +7
            baseValues.playmaking = 13;   // +8
            baseValues.ball_handle = 12;  // +7
            baseValues.rebounding = 12;   // +7
            baseValues.strength = 15;     // +10
            break;
            
        case 'stretch_big':
            // Pivô arremessador
            baseValues.shooting = 15;     // +10
            baseValues.midrange = 17;     // +12
            baseValues.threepoint = 16;   // +11
            baseValues.finishing = 14;    // +9
            baseValues.defense = 12;      // +7
            baseValues.perimeter_d = 8;   // +3
            baseValues.athleticism = 10;  // +5
            baseValues.speed = 9;         // +4
            baseValues.playmaking = 9;    // +4
            baseValues.ball_handle = 8;   // +3
            baseValues.rebounding = 19;   // +14
            baseValues.strength = 18;     // +13
            break;
            
        case 'athletic_freak':
            // Especialista em atleticismo
            baseValues.shooting = 11;     // +6
            baseValues.midrange = 12;     // +7
            baseValues.threepoint = 8;    // +3
            baseValues.finishing = 19;    // +14
            baseValues.defense = 13;      // +8
            baseValues.perimeter_d = 11;  // +6
            baseValues.athleticism = 20;  // +15
            baseValues.speed = 20;        // +15
            baseValues.playmaking = 10;   // +5
            baseValues.ball_handle = 11;  // +6
            baseValues.rebounding = 12;   // +7
            baseValues.strength = 18;     // +13
            break;
            
        case 'all_around':
            // Jogador completo e equilibrado
            baseValues.shooting = 14;     // +9
            baseValues.midrange = 14;     // +9
            baseValues.threepoint = 14;   // +9
            baseValues.finishing = 14;    // +9
            baseValues.defense = 14;      // +9
            baseValues.perimeter_d = 14;  // +9
            baseValues.athleticism = 14;  // +9
            baseValues.speed = 14;        // +9
            baseValues.playmaking = 14;   // +9
            baseValues.ball_handle = 14;  // +9
            baseValues.rebounding = 14;   // +9
            baseValues.strength = 14;     // +9
            break;
            
        case 'post_scorer':
            // Especialista em jogo de costas para a cesta
            baseValues.shooting = 8;      // +3
            baseValues.midrange = 18;     // +13
            baseValues.threepoint = 6;    // +1
            baseValues.finishing = 18;    // +13
            baseValues.defense = 12;      // +7
            baseValues.perimeter_d = 6;   // +1
            baseValues.athleticism = 13;  // +8
            baseValues.speed = 6;         // +1
            baseValues.playmaking = 10;   // +5
            baseValues.ball_handle = 11;  // +6
            baseValues.rebounding = 18;   // +13
            baseValues.strength = 19;     // +14
            break;
    }
    
    // Aplica os valores aos sliders
    for (const stat in baseValues) {
        if (sliders[stat]) {
            sliders[stat].value = baseValues[stat];
            document.getElementById(`${stat}-value`).textContent = baseValues[stat];
        }
    }
    
    // Atualiza os pontos
    updatePointsLeft();
}

// Atualiza os pontos restantes considerando todos os atributos
function updatePointsLeft() {
    // Lista de todos os atributos possíveis
    const allAttributes = [
        'shooting', 'midrange', 'threepoint', 'finishing', 
        'defense', 'perimeter_d', 'athleticism', 'speed', 
        'playmaking', 'ball_handle', 'rebounding', 'strength'
    ];
    
    // Calcula quantos pontos o jogador está usando além do mínimo
    let total = 0;
    
    // Calcula o total para cada atributo
    allAttributes.forEach(attr => {
        const element = document.getElementById(attr);
        if (element) {
            // Cada atributo começa em 5, então contamos a diferença
            total += (parseInt(element.value) - 5);
        }
    });
    
    // Ponto de balanceamento total para 12 atributos (110 pontos disponíveis além do mínimo)
    const maxPoints = 110;
    const pointsLeft = maxPoints - total;
    
    document.getElementById('points-left').textContent = pointsLeft;
    document.getElementById('points-progress').style.width = `${(total / maxPoints) * 100}%`;
    
    // Desabilita o botão se não tiver distribuído todos os pontos
    document.getElementById('create-btn').disabled = pointsLeft !== 0;
    
    // Ajusta a cor do indicador de pontos conforme o progresso
    const pointsLeftElement = document.getElementById('points-left');
    if (pointsLeft < 0) {
        pointsLeftElement.style.color = '#f44336'; // Vermelho se passar do limite
    } else if (pointsLeft > 0) {
        pointsLeftElement.style.color = '#2196F3'; // Azul se ainda tiver pontos
    } else {
        pointsLeftElement.style.color = '#4CAF50'; // Verde se estiver correto
    }
}

// Inicia o processo de draft
function startDraft() {
    // Verifica se todos os pontos estão distribuídos
    const pointsLeft = parseInt(document.getElementById('points-left').textContent);
    if (pointsLeft !== 0) {
        alert(`Você precisa distribuir exatamente todos os pontos disponíveis! Ainda restam ${pointsLeft} pontos.`);
        return;
    }
    
    player.name = document.getElementById('player-name').value;
    if (!player.name) {
        player.name = "Rookie Player";
    }
    
    player.position = document.getElementById('player-position').value;

    // Lista de todos os atributos possíveis
    const allAttributes = [
        'shooting', 'midrange', 'threepoint', 'finishing', 
        'defense', 'perimeter_d', 'athleticism', 'speed', 
        'playmaking', 'ball_handle', 'rebounding', 'strength'
    ];
    
    // Reset das estatísticas para ter certeza que todos os atributos estão incluídos
    player.stats = {};
    
    // Adiciona cada atributo ao objeto do jogador
    allAttributes.forEach(attr => {
        const element = document.getElementById(attr);
        if (element) {
            player.stats[attr] = parseInt(element.value);
        } else {
            // Se o elemento não existe na interface, mantém o valor atual ou define o padrão
            player.stats[attr] = player.stats[attr] || 5;
        }
    });

    // Define o overall inicial como 70
    player.overall = 70;

    // Mostra a tela de draft
    document.getElementById('create-player').classList.add('hidden');
    document.getElementById('draft-screen').classList.remove('hidden');

    // Inicia a animação do draft
    simulateDraft();
}

// Simula o processo de draft
function simulateDraft() {
    const draftAnimation = document.getElementById('draft-animation');
    const teamLogoWheel = document.getElementById('team-logo-wheel');
    const teamLogo = document.getElementById('team-logo');
    const draftResult = document.getElementById('draft-result');
    const continueBtn = document.getElementById('continue-btn');
    const playoffsBtn = document.getElementById('playoffs-btn');

    // Cria a roleta horizontal no HTML com uma área destacada para o time selecionado
    draftAnimation.innerHTML = `
        <div class="draft-wheel-container">
            <div class="logo-wheel"></div>
            <div class="selection-frame"></div>
        </div>
    `;
    const logoWheel = document.querySelector('.logo-wheel');
    
    // Adiciona todos os logos dos times na roleta
    const teamCodesArray = Object.keys(teams);
    
    // Adiciona os times várias vezes para criar uma roleta contínua sem espaços vazios
    // Adiciona 3 cópias completas para garantir espaço suficiente para a animação
    for (let i = 0; i < 3; i++) {
        teamCodesArray.forEach(teamCode => {
            const logoDiv = document.createElement('div');
            logoDiv.className = 'wheel-logo-container';
            logoDiv.innerHTML = `
                <div class="logo-border">
                    <img src="${teams[teamCode].logo}" alt="${teams[teamCode].name}" class="wheel-logo">
                </div>
                <div class="team-name-label">${teams[teamCode].name}</div>
            `;
            logoWheel.appendChild(logoDiv);
        });
    }

    // Esconde o resultado e botões
    draftResult.style.display = 'none';
    continueBtn.classList.add('hidden');
    playoffsBtn.classList.add('hidden');

    // Calcula a posição no draft (1-30)
    let draftPosition;
    
    // Baseado nos atributos do jogador (maior soma = melhor posição)
    const totalAttributePoints = Object.values(player.stats).reduce((sum, curr) => sum + curr, 0);
    
    if (totalAttributePoints >= 85) {
        // Top 5 pick (1-5)
        draftPosition = Math.floor(Math.random() * 5) + 1;
    } else if (totalAttributePoints >= 75) {
        // Lottery pick (1-14)
        draftPosition = Math.floor(Math.random() * 14) + 1;
    } else if (totalAttributePoints >= 65) {
        // Mid first round (15-20)
        draftPosition = Math.floor(Math.random() * 6) + 15;
    } else {
        // Late first round (21-30)
        draftPosition = Math.floor(Math.random() * 10) + 21;
    }

    // Garante que está entre 1 e 30
    draftPosition = Math.max(1, Math.min(30, draftPosition));
    player.draftPick = draftPosition;

    // Lista de todos os times
    const teamCodes = Object.keys(teams);

    // Seleciona um time aleatório (simplificado - na realidade, a ordem do draft é fixa)
    const selectedTeamCode = teamCodes[Math.floor(Math.random() * teamCodes.length)];
    player.team = selectedTeamCode;

    // Pegamos a segunda cópia do time selecionado (no meio da roleta)
    const selectedTeamIndex = teamCodesArray.length + teamCodesArray.indexOf(selectedTeamCode);
    
    // A roleta gira rapidamente no início e depois desacelera até parar no time selecionado
    let speed = 40; // Velocidade inicial maior
    let position = 0;
    const logoWidth = 120; // Largura de cada logo + margin
    
    // Obtem a largura da janela e do container para centralizar adequadamente
    const containerWidth = draftAnimation.offsetWidth;
    
    // Calcula a posição final (centralizando o logo selecionado no meio da tela)
    const finalPosition = -(selectedTeamIndex * logoWidth) + (containerWidth / 2) - (logoWidth / 2);
    
    // Desaceleração mais lenta para aumentar a emoção
    const deceleration = 0.985;
    
    // Animação da roleta
    const animateRoleta = () => {
        // Move a roleta
        position -= speed;
        logoWheel.style.transform = `translateX(${position}px)`;
        
        // Desacelera mais gradualmente
        speed *= deceleration;
        
        // Quando estiver muito lento, para no time selecionado
        if (speed > 0.2) {
            requestAnimationFrame(animateRoleta);
        } else {
            // Ajusta para a posição final exata
            logoWheel.style.transform = `translateX(${finalPosition}px)`;
            logoWheel.style.transition = 'transform 1s ease-out';
            
            // Destaca o time selecionado
            setTimeout(() => {
                const selectedLogo = logoWheel.children[selectedTeamIndex];
                selectedLogo.classList.add('selected-team');
                
                // Mostra o resultado do draft após a animação
                setTimeout(() => {
                    showDraftResult(selectedTeamCode, draftPosition);
                }, 1000);
            }, 1000);
        }
    };
    
    // Inicia a animação após um pequeno delay
    setTimeout(animateRoleta, 500);
}

// Gera companheiros de equipe para o time do jogador (usando elenco real)
function generateTeammates(teamCode) {
    player.teammates = [];
    const team = teams[teamCode];
    
    // Mapeamento para garantir todas as posições no time
    const positionCovered = {
        "PG": false,
        "SG": false,
        "SF": false,
        "PF": false,
        "C": false
    };
    
    // A posição do jogador já está coberta
    positionCovered[player.position] = true;

    // Adiciona os jogadores do elenco real, priorizando posições não cobertas
    // Primeiro adiciona jogadores de posições diferentes
    team.roster.forEach(teammate => {
        if (teammate.position !== player.position && !positionCovered[teammate.position]) {
            player.teammates.push({
                name: teammate.name,
                position: teammate.position,
                secondaryPosition: teammate.secondaryPosition,
                overall: teammate.overall
            });
            positionCovered[teammate.position] = true;
        }
    });
    
    // Se ainda precisar, adiciona outros jogadores do elenco
    team.roster.forEach(teammate => {
        if (teammate.position !== player.position && 
            !player.teammates.some(t => t.name === teammate.name)) {
            player.teammates.push({
                name: teammate.name,
                position: teammate.position,
                secondaryPosition: teammate.secondaryPosition,
                overall: teammate.overall
            });
        }
    });

    // Garante que temos exatamente 4 companheiros (para um total de 5 jogadores com o usuário)
    
    // Se tem jogadores em excesso, remove os de menor overall
    if (player.teammates.length > 4) {
        player.teammates.sort((a, b) => b.overall - a.overall);
        player.teammates = player.teammates.slice(0, 4);
    }
    
    // Se não houver jogadores suficientes, completa com jogadores genéricos
    // Prioriza preencher posições que ainda não têm jogadores
    while (player.teammates.length < 4) {
        // Encontra posições que ainda precisam ser preenchidas
        const positionsNeeded = Object.keys(positionCovered).filter(pos => !positionCovered[pos]);
        
        let position;
        if (positionsNeeded.length > 0) {
            // Prioriza posições não cobertas
            position = positionsNeeded[0];
        } else {
            // Se todas as posições estiverem cobertas, escolhe uma aleatória diferente do jogador
            const availablePos = ["PG", "SG", "SF", "PF", "C"].filter(pos => pos !== player.position);
            position = availablePos[Math.floor(Math.random() * availablePos.length)];
        }
        
        const fakeNames = {
            "PG": ["Mike James", "Tyus Jones", "Cameron Payne", "T.J. McConnell", "Ish Smith", "D.J. Augustin"],
            "SG": ["Josh Richardson", "Gary Harris", "Malik Beasley", "Luke Kennard", "Wayne Ellington", "Alec Burks"],
            "SF": ["Torrey Craig", "Jae Crowder", "Justin Holiday", "Joe Ingles", "Solomon Hill", "James Ennis"],
            "PF": ["JaMychal Green", "Mike Muscala", "Taj Gibson", "Larry Nance Jr.", "Markieff Morris", "Jeff Green"],
            "C": ["Robin Lopez", "Mason Plumlee", "Gorgui Dieng", "Dwight Howard", "Nerlens Noel", "Bismack Biyombo"]
        };
        
        // Escolhe um nome não usado ainda
        let name;
        do {
            name = fakeNames[position][Math.floor(Math.random() * fakeNames[position].length)];
        } while (player.teammates.some(t => t.name === name));

        player.teammates.push({
            name: name,
            position: position,
            secondaryPosition: "",
            overall: Math.floor(Math.random() * 8) + 72 // Overall entre 72-79, maior variação
        });
        
        positionCovered[position] = true;
    }

    // Ordena por posição (PG, SG, SF, PF, C)
    player.teammates.sort((a, b) => {
        const posOrder = { "PG": 1, "SG": 2, "SF": 3, "PF": 4, "C": 5 };
        return posOrder[a.position] - posOrder[b.position];
    });
}

// Mostra o resultado do draft
function showDraftResult(teamCode, pickNumber) {
    const teamLogo = document.getElementById('team-logo');
    const draftResult = document.getElementById('draft-result');
    const draftTeamName = document.getElementById('draft-team-name');
    const draftPickNumber = document.getElementById('draft-pick-number');
    const rosterPlayers = document.getElementById('roster-players');
    const continueBtn = document.getElementById('continue-btn');
    const playoffsBtn = document.getElementById('playoffs-btn');

    // Gera os companheiros de equipe
    generateTeammates(teamCode);

    // Mostra o resultado
    draftTeamName.textContent = `${teams[teamCode].name} selecionam:`;
    draftPickNumber.textContent = `${player.name} - ${pickNumber}ª escolha no draft`;

    // Mostra o elenco do time
    rosterPlayers.innerHTML = '';

    // Adiciona o jogador ao elenco
    const playerElement = document.createElement('div');
    playerElement.className = 'teammate';
    playerElement.innerHTML = `
        <div class="teammate-position">${player.position}</div>
        <div class="teammate-name">${player.name} <em>(você)</em></div>
        <div class="teammate-rating">${player.overall}</div>
    `;
    rosterPlayers.appendChild(playerElement);

    // Adiciona os companheiros de equipe
    player.teammates.forEach(teammate => {
        const teammateElement = document.createElement('div');
        teammateElement.className = 'teammate';
        teammateElement.innerHTML = `
            <div class="teammate-position">${teammate.position}</div>
            <div class="teammate-name">${teammate.name}</div>
            <div class="teammate-rating">${teammate.overall}</div>
        `;
        rosterPlayers.appendChild(teammateElement);
    });

    draftResult.style.display = 'block';
    continueBtn.classList.remove('hidden');
    playoffsBtn.classList.remove('hidden');

    // Desbloqueia conquista
    unlockAchievement("drafted");
    if (pickNumber <= 14) {
        unlockAchievement("lottery-pick");
    }
}

// Inicia a temporada após o draft
function startSeason() {
    document.getElementById('draft-screen').classList.add('hidden');
    document.getElementById('player-dashboard').classList.remove('hidden');
    document.getElementById('season-info').textContent = `Temporada ${player.currentSeason}`;
    updatePlayerInfo();
}

// Função para ir direto para os playoffs
function goToPlayoffs() {
    if (player.seasonStats.gamesPlayed < 82) {
        // Precisa completar a temporada primeiro
        skipGames(82 - player.seasonStats.gamesPlayed);
    }
    
    // Verifica se o time se classificou para os playoffs
    const madePlayoffs = checkPlayoffQualification();
    
    if (madePlayoffs) {
        document.getElementById('player-dashboard').classList.add('hidden');
        document.getElementById('playoffs-screen').classList.remove('hidden');
        document.getElementById('playoffs-info').textContent = `Temporada ${player.currentSeason} - Playoffs`;
        
        // Inicializa os playoffs
        setupPlayoffs();
        renderPlayoffBracket();
        
        // Desbloqueia conquista
        unlockAchievement("playoff-berth");
    } else {
        // Não classificou para os playoffs
        alert(`O ${teams[player.team].name} não se classificou para os playoffs este ano. Tente melhorar na próxima temporada!`);
        
        // Vai direto para a próxima temporada
        startNewSeason();
    }
}

// Verifica se o time se classificou para os playoffs
function checkPlayoffQualification() {
    // Calcula o percentual de vitórias baseado nos jogos do jogador
    let winPercentage = player.seasonStats.games.filter(game => game.result === "W").length / player.seasonStats.gamesPlayed;
    
    // Adiciona um componente baseado no overall do jogador e dos companheiros
    const teamAvgOverall = player.teammates.reduce((sum, t) => sum + t.overall, 0) / player.teammates.length;
    const combinedOverall = (player.overall + teamAvgOverall) / 2;
    
    // Ajuste baseado no overall combinado (cada ponto acima de 80 adiciona 0.5%)
    const overallBonus = (combinedOverall - 80) * 0.005;
    
    // Calcula a probabilidade final de classificação
    let qualificationChance = winPercentage * 0.6 + overallBonus;
    
    // Limita entre 0.2 e 0.9
    qualificationChance = Math.max(0.2, Math.min(0.9, qualificationChance));
    
    // Decide se o time se classifica com base na probabilidade
    return Math.random() < qualificationChance;
}

// Configura os playoffs
function setupPlayoffs() {
    // Reinicia o round atual
    player.currentPlayoffRound = 0;
    
    // Esvazia as séries anteriores
    player.playoffSeries = [];
    
    // Cria as 4 rodadas de playoffs
    const rounds = [
        { name: "Primeira Rodada", opponent: null, team1Wins: 0, team2Wins: 0, games: [null, null, null, null, null, null, null], completed: false },
        { name: "Semifinal de Conferência", opponent: null, team1Wins: 0, team2Wins: 0, games: [null, null, null, null, null, null, null], completed: false },
        { name: "Final de Conferência", opponent: null, team1Wins: 0, team2Wins: 0, games: [null, null, null, null, null, null, null], completed: false },
        { name: "Finais da NBA", opponent: null, team1Wins: 0, team2Wins: 0, games: [null, null, null, null, null, null, null], completed: false }
    ];
    
    // Determina os oponentes para cada rodada (simulado - na vida real seria baseado na classificação)
    const conference = teams[player.team].conference;
    
    // Para primeira rodada, escolhe um time aleatório da mesma conferência
    const conferenceTeams = Object.keys(teams).filter(teamCode => 
        teams[teamCode].conference === conference && teamCode !== player.team
    );
    
    // Primeira rodada: oponente aleatório de mesma conferência
    const round1Opponent = conferenceTeams[Math.floor(Math.random() * conferenceTeams.length)];
    rounds[0].opponent = round1Opponent;
    
    // As outras rodadas serão determinadas após cada série
    player.playoffSeries = rounds;
}

// Renderiza o bracket dos playoffs
function renderPlayoffBracket() {
    const bracket = document.getElementById('playoffs-bracket');
    bracket.innerHTML = '';
    
    // Esconde o banner de campeão
    document.getElementById('champion-banner').classList.add('hidden');
    
    // Renderiza a série atual
    const currentSeries = player.playoffSeries[player.currentPlayoffRound];
    if (!currentSeries || !currentSeries.opponent) return;
    
    const roundDiv = document.createElement('div');
    roundDiv.className = 'section';
    roundDiv.innerHTML = `<h3>${currentSeries.name}</h3>`;
    
    const seriesDiv = document.createElement('div');
    seriesDiv.className = 'playoff-series';
    
    const team1 = teams[player.team];
    const team2 = teams[currentSeries.opponent];
    
    // Cabeçalho da série
    const seriesHeader = document.createElement('div');
    seriesHeader.className = 'series-header';
    seriesHeader.innerHTML = `
        <div>${team1.name} (${currentSeries.team1Wins})</div>
        <div>vs</div>
        <div>${team2.name} (${currentSeries.team2Wins})</div>
    `;
    
    // Jogos da série
    const seriesGames = document.createElement('div');
    seriesGames.className = 'series-games';
    
    currentSeries.games.forEach((game, gameIndex) => {
        const gameResult = document.createElement('div');
        gameResult.className = 'game-result';
        
        if (game === null) {
            gameResult.className += ' pending';
            gameResult.textContent = gameIndex + 1;
        } else if (game === 'W') {
            gameResult.className += ' win';
            gameResult.textContent = 'V';
        } else {
            gameResult.className += ' loss';
            gameResult.textContent = 'D';
        }
        
        seriesGames.appendChild(gameResult);
    });
    
    seriesDiv.appendChild(seriesHeader);
    seriesDiv.appendChild(seriesGames);
    roundDiv.appendChild(seriesDiv);
    bracket.appendChild(roundDiv);
    
    // Atualiza botões
    const simulateBtn = document.getElementById('simulate-playoff-game-btn');
    const nextSeasonBtn = document.getElementById('next-season-btn');
    
    if (currentSeries.completed) {
        simulateBtn.style.display = 'none';
        nextSeasonBtn.style.display = 'block';
        
        if (player.currentPlayoffRound === 3 && currentSeries.team1Wins === 4) {
            showChampionshipBanner();
        }
    } else {
        simulateBtn.style.display = 'block';
        nextSeasonBtn.style.display = 'none';
    }
}

// Simula um jogo dos playoffs com escolhas importantes
function simulatePlayoffGame() {
    const currentSeries = player.playoffSeries[player.currentPlayoffRound];
    
    // Verifica se a série já acabou
    if (currentSeries.completed) {
        return;
    }
    
    // Encontra o próximo jogo não jogado
    const gameIndex = currentSeries.games.findIndex(game => game === null);
    
    if (gameIndex === -1) {
        return;
    }
    
    // Prepara as escolhas estratégicas para o jogo
    const choices = prepareGameChoices(currentSeries, gameIndex);
    
    // Mostra o diálogo de escolha ao jogador
    showPlayoffChoiceDialog(choices, (selectedChoice) => {
        // Calcula a probabilidade base de vitória
        let winProbability = 0.5; // 50% base
        
        // Ajusta baseado no overall do jogador (cada ponto acima de 70 aumenta 0.5%)
        winProbability += (player.overall - 70) * 0.005;
        
        // Ajusta baseado na média do overall dos companheiros
        const teamAvgOverall = player.teammates.reduce((sum, t) => sum + t.overall, 0) / player.teammates.length;
        
        // Média do overall dos adversários (simulado)
        const opponentAvgOverall = 82; // Valor base médio
        
        // Ajusta baseado na diferença de overall dos times
        winProbability += (teamAvgOverall - opponentAvgOverall) * 0.01;
        
        // Estágio dos playoffs (mais difícil conforme avança)
        winProbability -= player.currentPlayoffRound * 0.025;
        
        // Vantagem de casa (jogos 1, 2, 5, 7 em casa para o time com melhor campanha)
        // Considerando que jogador tem vantagem de mando nos jogos ímpares
        if (gameIndex % 2 === 0) {
            winProbability += 0.05; // +5% em casa
        } else {
            winProbability -= 0.05; // -5% fora
        }
        
        // Aplica o modificador da escolha estratégica
        winProbability += selectedChoice.winProbabilityModifier;
        
        // Limita entre 0.15 e 0.85
        winProbability = Math.max(0.15, Math.min(0.85, winProbability));
        
        // Decide vitória ou derrota considerando a estratégia escolhida
        const isWin = Math.random() < winProbability;
        
        // Simula estatísticas individuais com base na escolha feita
        const gameStats = {
            points: Math.round(generateStat(player.stats.shooting, 5, 45) * (1 + selectedChoice.statModifiers.points)),
            assists: Math.round(generateStat(player.stats.playmaking, 1, 15) * (1 + selectedChoice.statModifiers.assists)),
            rebounds: Math.round(generateStat(player.stats.rebounding, 1, 18) * (1 + selectedChoice.statModifiers.rebounds)),
            performance: selectedChoice.name
        };
        
        // Adiciona resultado do jogo
        if (isWin) {
            currentSeries.team1Wins++;
            currentSeries.games[gameIndex] = 'W';
            player.seasonStats.playoffWins++;
            
            // Desbloqueia conquista de primeira vitória nos playoffs
            if (player.seasonStats.playoffWins === 1) {
                unlockAchievement("playoff-win");
            }
        } else {
            currentSeries.team2Wins++;
            currentSeries.games[gameIndex] = 'L';
            player.seasonStats.playoffLosses++;
        }
        
        player.seasonStats.playoffGames++;
        
        // Mostra resultado do jogo com estatísticas personalizadas pela estratégia
        showPlayoffGameResult(isWin, gameStats, currentSeries, selectedChoice);
        
        // Verifica se a série terminou
        if (currentSeries.team1Wins === 4 || currentSeries.team2Wins === 4) {
            currentSeries.completed = true;
            
            if (currentSeries.team1Wins === 4) {
                // Time do jogador venceu
                unlockAchievement("series-win");
                
                // Verifica se é hora de avançar para a próxima rodada
                if (player.currentPlayoffRound < 3) {
                    // Avança para próxima rodada
                    player.currentPlayoffRound++;
                    
                    // Escolhe novo adversário
                    setupNextPlayoffOpponent();
                    
                    // Verifica conquistas específicas por rodada
                    if (player.currentPlayoffRound === 2) {
                        unlockAchievement("conference-finals");
                    } else if (player.currentPlayoffRound === 3) {
                        unlockAchievement("nba-finals");
                    }
                    
                    // Recompensa por avançar nas fases
                    awardPlayoffAdvancementBonus();
                } else {
                    // Ganhou as finais!
                    showChampionshipBanner();
                }
            } else {
                // Time do jogador perdeu - temporada acaba
                document.getElementById('simulate-playoff-game-btn').style.display = 'none';
                document.getElementById('next-season-btn').style.display = 'block';
            }
        }
        
        // Atualiza o bracket
        renderPlayoffBracket();
    });
}

// Prepara as escolhas estratégicas para o jogo atual
function prepareGameChoices(series, gameIndex) {
    const opponent = teams[series.opponent];
    const isHomeCourt = gameIndex % 2 === 0;
    const isMustWin = (series.team2Wins === 3); // Situação de eliminação
    const isCloseOut = (series.team1Wins === 3); // Chance de fechar a série
    const roundName = series.name;
    
    let choices = [];
    
    // Escolha 1: Ataque agressivo
    choices.push({
        name: "Ataque Agressivo",
        description: "Foque em pontuação e ignore um pouco a defesa. Isso pode te dar mais pontos, mas aumenta o risco defensivo.",
        icon: "🔥",
        winProbabilityModifier: 0.02,
        statModifiers: {
            points: 0.3,
            assists: -0.1,
            rebounds: -0.1
        }
    });
    
    // Escolha 2: Jogo coletivo
    choices.push({
        name: "Jogo Coletivo",
        description: "Procure envolver mais os companheiros de equipe. Isso equilibra o ataque mas diminui seus pontos.",
        icon: "🤝",
        winProbabilityModifier: 0.05,
        statModifiers: {
            points: -0.2,
            assists: 0.4,
            rebounds: 0.0
        }
    });
    
    // Escolha 3: Defesa primeiro
    choices.push({
        name: "Defesa Primeiro",
        description: "Concentre-se em parar o adversário. Isso reduz seu potencial ofensivo mas aumenta as chances de vitória.",
        icon: "🛡️",
        winProbabilityModifier: 0.07,
        statModifiers: {
            points: -0.25,
            assists: -0.1,
            rebounds: 0.3
        }
    });
    
    // Escolhas situacionais
    if (isMustWin) {
        // Quando está enfrentando eliminação
        choices.push({
            name: "Tudo ou Nada",
            description: "Arrisque tudo para evitar a eliminação! Grande chance de brilhar ou fracassar completamente.",
            icon: "⚠️",
            winProbabilityModifier: -0.1,  // Mais arriscado
            statModifiers: {
                points: 0.5,
                assists: 0.2,
                rebounds: 0.2
            }
        });
    }
    
    if (isCloseOut) {
        // Quando pode eliminar o adversário
        choices.push({
            name: "Golpe Final",
            description: "Tente fechar a série com um desempenho dominante. Concentre-se em todos os aspectos do jogo.",
            icon: "🏆",
            winProbabilityModifier: 0.03,
            statModifiers: {
                points: 0.25,
                assists: 0.15,
                rebounds: 0.15
            }
        });
    }
    
    // Escolha especial para finais da NBA
    if (roundName === "Finais da NBA") {
        choices.push({
            name: "Modo Lenda",
            description: "Jogue como uma lenda nas Finais! Altíssimo risco, altíssima recompensa.",
            icon: "👑",
            winProbabilityModifier: 0.0,
            statModifiers: {
                points: 0.7,
                assists: 0.3,
                rebounds: 0.3
            }
        });
    }
    
    // Escolha específica para jogo 7 (decisivo)
    if (series.team1Wins === 3 && series.team2Wins === 3) {
        choices = [{
            name: "Game 7: Legado",
            description: "Este é o momento que define sua carreira! O jogo mais importante de todos.",
            icon: "💎",
            winProbabilityModifier: 0.08,
            statModifiers: {
                points: 0.4,
                assists: 0.25,
                rebounds: 0.25
            }
        }];
    }
    
    return choices;
}

// Mostra diálogo de escolha para o jogador
function showPlayoffChoiceDialog(choices, callback) {
    // Cria o modal de escolha
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content playoff-choice-modal';
    
    const modalHeader = document.createElement('h2');
    modalHeader.textContent = 'Escolha sua Estratégia';
    modalContent.appendChild(modalHeader);
    
    const modalDescription = document.createElement('p');
    modalDescription.textContent = 'Esta decisão afetará o resultado do jogo. Escolha sabiamente:';
    modalContent.appendChild(modalDescription);
    
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-container';
    
    // Adiciona cada escolha como um botão
    choices.forEach(choice => {
        const choiceButton = document.createElement('div');
        choiceButton.className = 'choice-button';
        
        const choiceIcon = document.createElement('div');
        choiceIcon.className = 'choice-icon';
        choiceIcon.textContent = choice.icon;
        
        const choiceContent = document.createElement('div');
        choiceContent.className = 'choice-content';
        
        const choiceName = document.createElement('h3');
        choiceName.textContent = choice.name;
        
        const choiceDesc = document.createElement('p');
        choiceDesc.textContent = choice.description;
        
        choiceContent.appendChild(choiceName);
        choiceContent.appendChild(choiceDesc);
        
        choiceButton.appendChild(choiceIcon);
        choiceButton.appendChild(choiceContent);
        
        choiceButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
            callback(choice);
        });
        
        choicesContainer.appendChild(choiceButton);
    });
    
    modalContent.appendChild(choicesContainer);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// Mostra o resultado do jogo após a escolha estratégica
function showPlayoffGameResult(isWin, gameStats, series, choice) {
    const opponent = teams[series.opponent].name;
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = `modal-content game-result-modal ${isWin ? 'win-result' : 'loss-result'}`;
    
    const resultHeader = document.createElement('h2');
    resultHeader.innerHTML = isWin ? '🏆 VITÓRIA! 🏆' : '❌ DERROTA ❌';
    
    const gameDetails = document.createElement('div');
    gameDetails.className = 'game-details';
    
    // Informações da série e placar
    const seriesInfo = document.createElement('div');
    seriesInfo.className = 'series-info';
    seriesInfo.innerHTML = `
        <h3>${teams[player.team].name} ${series.team1Wins} - ${series.team2Wins} ${opponent}</h3>
        <p>${series.name}</p>
    `;
    
    // Estatísticas do jogador
    const playerStats = document.createElement('div');
    playerStats.className = 'player-playoff-stats';
    playerStats.innerHTML = `
        <h3>Sua Performance: ${choice.name}</h3>
        <div class="stat-grid">
            <div class="stat-row">
                <div class="stat-label">PTS</div>
                <div class="stat-value">${gameStats.points}</div>
            </div>
            <div class="stat-row">
                <div class="stat-label">AST</div>
                <div class="stat-value">${gameStats.assists}</div>
            </div>
            <div class="stat-row">
                <div class="stat-label">REB</div>
                <div class="stat-value">${gameStats.rebounds}</div>
            </div>
        </div>
    `;
    
    // Narrativa do jogo (personalizada com base na escolha e no resultado)
    const narrative = document.createElement('div');
    narrative.className = 'game-narrative';
    
    let narrativeText = '';
    
    if (isWin) {
        if (gameStats.points >= 35) {
            narrativeText = `Você teve uma atuação dominante! ${opponent} não encontrou resposta para parar seu ataque.`;
        } else if (gameStats.assists >= 10) {
            narrativeText = `Seu jogo de passes foi excepcional, abrindo ótimas oportunidades para seus companheiros.`;
        } else if (gameStats.rebounds >= 12) {
            narrativeText = `Você dominou as tabelas, garantindo posses extras fundamentais para a vitória.`;
        } else {
            narrativeText = `Foi uma vitória sólida, com a equipe executando bem o plano de jogo.`;
        }
    } else {
        if (gameStats.points >= 30) {
            narrativeText = `Apesar do seu esforço individual impressionante, a equipe não conseguiu superar ${opponent}.`;
        } else if (gameStats.points < 15) {
            narrativeText = `Você teve uma noite difícil ofensivamente, o que comprometeu as chances do time.`;
        } else {
            narrativeText = `${opponent} jogou melhor coletivamente hoje e mereceu a vitória.`;
        }
    }
    
    narrative.textContent = narrativeText;
    
    // Botão para continuar
    const continueButton = document.createElement('button');
    continueButton.className = 'btn';
    continueButton.textContent = 'Continuar';
    continueButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
    
    gameDetails.appendChild(seriesInfo);
    gameDetails.appendChild(playerStats);
    gameDetails.appendChild(narrative);
    
    modalContent.appendChild(resultHeader);
    modalContent.appendChild(gameDetails);
    modalContent.appendChild(continueButton);
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// Concede bônus por avançar nas fases dos playoffs
function awardPlayoffAdvancementBonus() {
    const round = player.currentPlayoffRound;
    const roundNames = ["Primeira Rodada", "Semifinal de Conferência", "Final de Conferência"];
    let bonusMessage = "";
    
    // Bônus crescente por fase avançada
    switch(round) {
        case 1:
            player.overall += 1;
            bonusMessage = "Avançou para a Semifinal de Conferência: +1 de Overall!";
            break;
        case 2:
            player.overall += 2;
            bonusMessage = "Avançou para a Final de Conferência: +2 de Overall!";
            break;
        case 3:
            player.overall += 3;
            bonusMessage = "Avançou para as Finais da NBA: +3 de Overall!";
            break;
    }
    
    // Limita o overall máximo
    player.overall = Math.min(99, player.overall);
    
    // Mostra mensagem de bônus
    setTimeout(() => {
        alert(`🌟 ${bonusMessage} 🌟\n\nSeu novo Overall: ${player.overall}`);
    }, 1000);
}

// Configura o próximo adversário dos playoffs
function setupNextPlayoffOpponent() {
    const conference = teams[player.team].conference;
    const currentRound = player.currentPlayoffRound;
    const availableTeams = Object.keys(teams).filter(teamCode => 
        teams[teamCode].conference === conference && 
        teamCode !== player.team &&
        !player.playoffSeries.some(series => series.opponent === teamCode)
    );
    
    // Para as finais (rodada 3), pega um time da outra conferência
    if (currentRound === 3) {
        const otherConference = conference === "East" ? "West" : "East";
        const finalsOpponents = Object.keys(teams).filter(teamCode => 
            teams[teamCode].conference === otherConference
        );
        
        player.playoffSeries[currentRound].opponent = finalsOpponents[Math.floor(Math.random() * finalsOpponents.length)];
    } else {
        // Para outras rodadas, pega um time da mesma conferência
        player.playoffSeries[currentRound].opponent = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    }
}

// Mostra o banner de campeão com maior impacto
function showChampionshipBanner() {
    // Remove qualquer modal existente
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Atualiza o banner normal no bracket
    const championBanner = document.getElementById('champion-banner');
    const championTeam = document.getElementById('champion-team');
    
    championTeam.textContent = teams[player.team].name;
    championBanner.classList.remove('hidden');
    
    // Desbloqueia conquista de campeão
    unlockAchievement("champion");
    
    // Incrementa contagem de campeonatos
    player.careerStats.championships++;
    
    // Cria modal de celebração
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay championship-modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content championship-modal';
    
    // Adiciona confetes via animação CSS
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
        modalOverlay.appendChild(confetti);
    }
    
    // Conteúdo do banner de campeonato
    modalContent.innerHTML = `
        <div class="championship-header">
            <h1>🏆 CAMPEÃO DA NBA! 🏆</h1>
            <img src="${teams[player.team].logo}" alt="${teams[player.team].name}" class="champion-logo">
            <h2>${teams[player.team].name}</h2>
        </div>
        
        <div class="championship-player">
            <h3>${player.name}</h3>
            <p class="player-position">${getPositionName(player.position)}</p>
            <p class="player-overall">Overall: ${player.overall}</p>
        </div>
        
        <div class="championship-awards">
            <h3>Prêmios Conquistados</h3>
            <div class="award-items">
                <!-- Os prêmios serão adicionados aqui dinamicamente -->
            </div>
        </div>
        
        <button id="celebrate-btn" class="btn btn-championship">Comemorar</button>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Adiciona os prêmios conquistados
    const awardItems = modalContent.querySelector('.award-items');
    
    // Sempre concede o troféu de campeão
    const championshipAward = document.createElement('div');
    championshipAward.className = 'award-item';
    championshipAward.innerHTML = `
        <div class="award-icon">🏆</div>
        <div class="award-info">
            <h4>Campeão da NBA</h4>
            <p>Temporada ${player.currentSeason}</p>
        </div>
    `;
    awardItems.appendChild(championshipAward);
    
    // MVP das Finais (agora baseado nas estatísticas do jogador)
    // Verifica os jogos da série final
    const finalsSeries = player.playoffSeries[3];
    let highPerformance = false;
    
    if (finalsSeries && finalsSeries.team1Wins === 4) {
        // Verifica desempenho na série final (se média de pontos > 25 ou estatísticas gerais boas)
        if (player.seasonStats.playoffGames > 0) {
            const ppg = player.seasonStats.points / player.seasonStats.playoffGames;
            if (ppg > 25 || (ppg > 18 && player.seasonStats.assists / player.seasonStats.playoffGames > 7)) {
                highPerformance = true;
            }
        }
        
        // Maior chance de MVP das finais com base no desempenho
        const mvpChance = highPerformance ? 0.9 : 0.6;
        
        if (Math.random() < mvpChance) {
            unlockTrophy("fmvp");
            
            const fmvpAward = document.createElement('div');
            fmvpAward.className = 'award-item';
            fmvpAward.innerHTML = `
                <div class="award-icon">🥇</div>
                <div class="award-info">
                    <h4>MVP das Finais</h4>
                    <p>Melhor jogador da série final</p>
                </div>
            `;
            awardItems.appendChild(fmvpAward);
            
            // Concede bônus especial por ser MVP das Finais
            player.overall = Math.min(99, player.overall + 3);
        }
    }
    
    // Bônus de campeonato
    const teamBonus = document.createElement('div');
    teamBonus.className = 'championship-bonus';
    teamBonus.innerHTML = `
        <h3>🏅 Bônus de Campeonato 🏅</h3>
        <p>+5 de Overall! Novo Overall: ${Math.min(99, player.overall + 5)}</p>
    `;
    modalContent.insertBefore(teamBonus, modalContent.querySelector('button'));
    
    // Aplica o bônus ao overall
    player.overall = Math.min(99, player.overall + 5);
    
    // Botão para comemorar (continuar)
    document.getElementById('celebrate-btn').addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
        
        // Habilita o botão para próxima temporada
        document.getElementById('simulate-playoff-game-btn').style.display = 'none';
        document.getElementById('next-season-btn').style.display = 'block';
    });
}

// Inicia uma nova temporada
function startNewSeason() {
    // Salva as estatísticas da temporada atual
    const seasonStats = {
        season: player.currentSeason,
        gamesPlayed: player.seasonStats.gamesPlayed,
        points: player.seasonStats.points,
        assists: player.seasonStats.assists,
        rebounds: player.seasonStats.rebounds,
        playoffGames: player.seasonStats.playoffGames,
        playoffWins: player.seasonStats.playoffWins,
        playoffLosses: player.seasonStats.playoffLosses,
        championship: player.currentPlayoffRound === 3 && player.playoffSeries[3].team1Wins === 4
    };
    
    player.careerStats.seasons.push(seasonStats);
    player.careerStats.totalPoints += player.seasonStats.points;
    player.careerStats.totalGames += player.seasonStats.gamesPlayed;
    
    // Incrementa a temporada
    player.currentSeason++;
    
    // Reseta COMPLETAMENTE as estatísticas da temporada
    player.seasonStats = {
        gamesPlayed: 0,
        points: 0,
        assists: 0,
        rebounds: 0,
        games: [],
        playoffGames: 0,
        playoffWins: 0,
        playoffLosses: 0
    };
    
    // Reseta TODOS os dados dos playoffs
    player.playoffSeries = [];
    player.currentPlayoffRound = 0;
    
    // Se atingiu 10 temporadas, oferecer opção de aposentadoria
    if (player.currentSeason >= 10) {
        const wantsToRetire = confirm("Você já completou 10 temporadas na NBA! Deseja se aposentar e encerrar sua carreira?");
        
        if (wantsToRetire) {
            finishCareer();
            return;
        }
    }
    
    // Possibilidade de trocar de time
    offerTeamChange();
    
    // Melhora os atributos do jogador (progressão de carreira)
    improvePlayerSkills();
    
    // Atualiza os companheiros de equipe (alguma variação)
    updateTeammates();
    
    // Volta para o painel principal
    document.getElementById('playoffs-screen').classList.add('hidden');
    document.getElementById('player-dashboard').classList.remove('hidden');
    document.getElementById('season-info').textContent = `Temporada ${player.currentSeason}`;
    updatePlayerInfo();
}

// Oferece mudança de time
function offerTeamChange() {
    // Apenas se não for um novato
    if (player.currentSeason > 1) {
        // Lista de todos os times exceto o atual
        const otherTeams = Object.keys(teams).filter(teamCode => teamCode !== player.team);
        
        // Seleciona dois times aleatórios
        const team1 = otherTeams[Math.floor(Math.random() * otherTeams.length)];
        let team2;
        do {
            team2 = otherTeams[Math.floor(Math.random() * otherTeams.length)];
        } while (team2 === team1);
        
        const currentTeamCode = player.team;
        const currentTeamName = teams[currentTeamCode].name;
        const team1Name = teams[team1].name;
        const team2Name = teams[team2].name;
        
        // Cria o modal de escolha
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content team-choice-modal';
        
        modalContent.innerHTML = `
            <div class="team-choice-header">
                <h2>Ofertas de Times</h2>
                <p>Temporada ${player.currentSeason}</p>
            </div>
            
            <div class="team-choice-info">
                <p>Seu contrato com o ${currentTeamName} terminou e você recebeu novas propostas!</p>
                <p>Escolha um time para a próxima temporada:</p>
            </div>
            
            <div class="team-options">
                <div class="team-option" data-team="${currentTeamCode}">
                    <img src="${teams[currentTeamCode].logo}" alt="${currentTeamName}" class="team-option-logo">
                    <h3>${currentTeamName}</h3>
                    <p>Ficar no time atual</p>
                </div>
                
                <div class="team-option" data-team="${team1}">
                    <img src="${teams[team1].logo}" alt="${team1Name}" class="team-option-logo">
                    <h3>${team1Name}</h3>
                    <p>Nova oferta</p>
                </div>
                
                <div class="team-option" data-team="${team2}">
                    <img src="${teams[team2].logo}" alt="${team2Name}" class="team-option-logo">
                    <h3>${team2Name}</h3>
                    <p>Nova oferta</p>
                </div>
            </div>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Adiciona eventos aos botões de times
        const teamOptions = modalContent.querySelectorAll('.team-option');
        teamOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedTeam = option.getAttribute('data-team');
                
                // Processa a escolha
                if (selectedTeam !== currentTeamCode) {
                    player.team = selectedTeam;
                    
                    // Mostra notificação de mudança de time
                    const resultModal = document.createElement('div');
                    resultModal.className = 'modal-overlay';
                    
                    const resultContent = document.createElement('div');
                    resultContent.className = 'modal-content team-result-modal';
                    
                    resultContent.innerHTML = `
                        <h2>Você assinou com ${teams[selectedTeam].name}!</h2>
                        <img src="${teams[selectedTeam].logo}" alt="${teams[selectedTeam].name}" class="result-team-logo">
                        <p>Você jogará pelo ${teams[selectedTeam].name} na temporada ${player.currentSeason}.</p>
                        <button class="btn btn-continue">Continuar</button>
                    `;
                    
                    resultModal.appendChild(resultContent);
                    
                    // Remove o modal anterior e adiciona o novo
                    document.body.removeChild(modalOverlay);
                    document.body.appendChild(resultModal);
                    
                    // Adiciona evento ao botão continuar
                    resultContent.querySelector('.btn-continue').addEventListener('click', () => {
                        document.body.removeChild(resultModal);
                        
                        // Gera novos companheiros baseados no elenco do novo time
                        generateTeammates(selectedTeam);
                    });
                } else {
                    // Permanece no mesmo time
                    const resultModal = document.createElement('div');
                    resultModal.className = 'modal-overlay';
                    
                    const resultContent = document.createElement('div');
                    resultContent.className = 'modal-content team-result-modal';
                    
                    resultContent.innerHTML = `
                        <h2>Você permanece no ${currentTeamName}!</h2>
                        <img src="${teams[currentTeamCode].logo}" alt="${currentTeamName}" class="result-team-logo">
                        <p>Você continua jogando pelo ${currentTeamName} na temporada ${player.currentSeason}.</p>
                        <button class="btn btn-continue">Continuar</button>
                    `;
                    
                    resultModal.appendChild(resultContent);
                    
                    // Remove o modal anterior e adiciona o novo
                    document.body.removeChild(modalOverlay);
                    document.body.appendChild(resultModal);
                    
                    // Adiciona evento ao botão continuar
                    resultContent.querySelector('.btn-continue').addEventListener('click', () => {
                        document.body.removeChild(resultModal);
                    });
                }
            });
        });
    }
}

// Finaliza a carreira do jogador
function finishCareer() {
    // Verifica se merece o Hall da Fama
    const isHOF = (player.careerStats.championships >= 1 || 
                   player.trophyCounts["mvp"] >= 1 || 
                   player.trophyCounts["all-nba"] >= 5 ||
                   player.trophyCounts["all-star"] >= 8);
    
    // Verifica se merece camisa aposentada
    const hasRetiredJersey = (player.careerStats.championships >= 2 || 
                              player.trophyCounts["mvp"] >= 2 ||
                              player.currentSeason >= 8);
    
    // Verifica se é uma lenda
    const isLegend = player.currentSeason >= 15;
    
    // Desbloqueia conquistas relacionadas
    if (isHOF) {
        unlockAchievement("hall-of-fame");
    }
    
    if (hasRetiredJersey) {
        unlockAchievement("jersey-retired");
    }
    
    if (isLegend) {
        unlockAchievement("legend");
    }
    
    // Prepara mensagem final
    let careerSummary = `=== FIM DE CARREIRA ===\n\n`;
    careerSummary += `${player.name} se aposentou após ${player.currentSeason} temporadas na NBA!\n\n`;
    careerSummary += `Estatísticas de carreira:\n`;
    careerSummary += `Pontos totais: ${player.careerStats.totalPoints}\n`;
    careerSummary += `Jogos disputados: ${player.careerStats.totalGames}\n`;
    careerSummary += `Títulos da NBA: ${player.careerStats.championships}\n`;
    careerSummary += `Média de pontos: ${(player.careerStats.totalPoints / player.careerStats.totalGames).toFixed(1)}\n\n`;
    
    careerSummary += `Troféus conquistados:\n`;
    allTrophies.forEach(trophy => {
        if (player.trophyCounts[trophy.id] > 0) {
            careerSummary += `- ${trophy.name}: ${player.trophyCounts[trophy.id]}x\n`;
        }
    });
    
    if (isHOF) {
        careerSummary += `\n🏛️ INDUZIDO AO HALL DA FAMA DO BASQUETE! 🏛️\n`;
    }
    
    if (hasRetiredJersey) {
        careerSummary += `\n👕 CAMISA APOSENTADA PELO ${teams[player.team].name}! 👕\n`;
    }
    
    if (isLegend) {
        careerSummary += `\n🐐 STATUS LENDÁRIO ALCANÇADO! 🐐\n`;
    }
    
    // Exibe o resumo
    alert(careerSummary);
    
    // Reinicia o jogo
    if (confirm("Começar um novo jogador?")) {
        window.location.reload();
    }
}

// Melhora as habilidades do jogador entre temporadas
function improvePlayerSkills() {
    // Idade efetiva baseada na temporada (considerando que começa com 19-20 anos)
    const effectiveAge = 19 + player.currentSeason;
    
    // Evolução do overall baseada na fase da carreira
    let overallChange = 0;
    
    if (effectiveAge < 25) {
        // Fase de desenvolvimento (temporadas 1-5)
        overallChange = Math.floor(Math.random() * 3) + 1; // +1 a +3
    } else if (effectiveAge < 30) {
        // Fase de pico (temporadas 6-10)
        overallChange = Math.floor(Math.random() * 2) + 0; // 0 a +1
    } else if (effectiveAge < 35) {
        // Fase de declínio inicial (temporadas 11-15)
        overallChange = Math.floor(Math.random() * 2) - 1; // -1 a 0
    } else {
        // Fase de declínio avançado (temporadas 16+)
        overallChange = Math.floor(Math.random() * 2) - 2; // -2 a -1
    }
    
    // Ajusta o overall (máximo 99, mínimo 65)
    player.overall = Math.min(99, Math.max(65, player.overall + overallChange));
    
    // Ajusta cada atributo individual
    Object.keys(player.stats).forEach(stat => {
        let change = 0;
        
        if (effectiveAge < 25) {
            // Jovem - mais chances de melhorar
            change = Math.floor(Math.random() * 3) - 1; // -1 a +2
        } else if (effectiveAge < 30) {
            // Pico - pequenas variações
            change = Math.floor(Math.random() * 3) - 1; // -1 a +1
        } else {
            // Veterano - mais chances de declínio
            change = Math.floor(Math.random() * 3) - 2; // -2 a 0
        }
        
        // Limita entre 0 e 20
        player.stats[stat] = Math.min(20, Math.max(0, player.stats[stat] + change));
    });
}

// Atualiza os companheiros de equipe para a nova temporada
function updateTeammates() {
    // Regenera completamente o elenco com base no time atual do jogador
    // Isso garante que sempre terá o elenco correto do time
    generateTeammates(player.team);
    
    // Evolui um pouco os companheiros depois de gerar
    player.teammates.forEach(teammate => {
        const change = Math.floor(Math.random() * 3) - 1; // -1 a +1
        teammate.overall = Math.min(96, Math.max(70, teammate.overall + change));
    });
    
    // Garante que existem 4 companheiros de equipe
    while (player.teammates.length > 4) {
        player.teammates.pop(); // Remove extras se necessário
    }
    
    // Ordena por posição
    player.teammates.sort((a, b) => {
        const posOrder = { "PG": 1, "SG": 2, "SF": 3, "PF": 4, "C": 5 };
        return posOrder[a.position] - posOrder[b.position];
    });
}

// Mostra a galeria de troféus
function showTrophyGallery() {
    document.getElementById('player-dashboard').classList.add('hidden');
    document.getElementById('trophy-gallery').classList.remove('hidden');
    
    const trophiesContainer = document.getElementById('trophies-container');
    trophiesContainer.innerHTML = '';
    
    allTrophies.forEach(trophy => {
        const trophyItem = document.createElement('div');
        trophyItem.className = 'trophy-item';
        
        const trophyIcon = document.createElement('div');
        trophyIcon.className = `trophy-icon ${player.trophyCounts[trophy.id] > 0 ? '' : 'trophy-locked'}`;
        trophyIcon.innerHTML = player.trophyCounts[trophy.id] > 0 ? '🏆' : '🔒';
        
        const trophyName = document.createElement('h3');
        trophyName.textContent = trophy.name;
        
        const trophyDesc = document.createElement('p');
        trophyDesc.textContent = trophy.description;
        
        const trophyCount = document.createElement('div');
        trophyCount.className = 'trophy-count';
        trophyCount.textContent = player.trophyCounts[trophy.id] > 0 ? `${player.trophyCounts[trophy.id]}x` : '';
        
        trophyItem.appendChild(trophyIcon);
        trophyItem.appendChild(trophyName);
        trophyItem.appendChild(trophyDesc);
        trophyItem.appendChild(trophyCount);
        trophiesContainer.appendChild(trophyItem);
    });
}

// Volta ao painel principal
function backToDashboard() {
    document.getElementById('trophy-gallery').classList.add('hidden');
    document.getElementById('player-dashboard').classList.remove('hidden');
}

// Atualiza as informações do jogador no painel
function updatePlayerInfo() {
    document.getElementById('player-full-name').textContent = player.name;
    document.getElementById('player-team-info').textContent = 
        `${teams[player.team].name} - ${getPositionName(player.position)}`;
    
    // Mostra o overall atualizado
    document.getElementById('player-overall').innerHTML = `Overall: <span>${player.overall}</span>`;
    
    // Atualiza as estatísticas médias
    if (player.seasonStats.gamesPlayed > 0) {
        document.getElementById('ppg-stat').textContent = 
            (player.seasonStats.points / player.seasonStats.gamesPlayed).toFixed(1);
        document.getElementById('apg-stat').textContent = 
            (player.seasonStats.assists / player.seasonStats.gamesPlayed).toFixed(1);
        document.getElementById('rpg-stat').textContent = 
            (player.seasonStats.rebounds / player.seasonStats.gamesPlayed).toFixed(1);
    }
    
    // Atualiza o logo do time atual
    const playerCard = document.querySelector('.player-card');
    
    // Verifica se já existe um logo
    let teamLogoElement = playerCard.querySelector('.current-team-logo');
    if (!teamLogoElement) {
        // Cria o elemento para o logo se não existir
        teamLogoElement = document.createElement('div');
        teamLogoElement.className = 'current-team-logo';
        playerCard.insertBefore(teamLogoElement, playerCard.firstChild);
    }
    
    // Atualiza o logo
    teamLogoElement.innerHTML = `<img src="${teams[player.team].logo}" alt="${teams[player.team].name}">`;
    
    // Atualiza o progresso da temporada
    document.getElementById('games-played').textContent = player.seasonStats.gamesPlayed;
    document.getElementById('season-progress').style.width = 
        `${(player.seasonStats.gamesPlayed / 82) * 100}%`;
    
    // Atualiza a lista de jogos
    updateGamesList();
    
    // Atualiza as conquistas
    updateAchievements();
    
    // Atualiza a lista de companheiros de equipe
    updateTeammatesList();
    
    // Mostra ou esconde o botão de ir para os playoffs
    document.getElementById('go-to-playoffs-btn').style.display = 
        (player.seasonStats.gamesPlayed >= 82 || player.seasonStats.playoffGames > 0) ? 'block' : 'none';
}

// Atualiza a lista de companheiros de equipe
function updateTeammatesList() {
    const teammatesList = document.getElementById('teammates-list');
    teammatesList.innerHTML = '';
    
    player.teammates.forEach(teammate => {
        const teammateElement = document.createElement('div');
        teammateElement.className = 'teammate';
        teammateElement.innerHTML = `
            <div class="teammate-position">${teammate.position}</div>
            <div class="teammate-name">${teammate.name}</div>
            <div class="teammate-rating">${teammate.overall}</div>
        `;
        teammatesList.appendChild(teammateElement);
    });
}

// Retorna o nome completo da posição
function getPositionName(abbr) {
    const positions = {
        "PG": "Armador",
        "SG": "Ala-armador",
        "SF": "Ala",
        "PF": "Ala-pivô",
        "C": "Pivô"
    };
    return positions[abbr] || abbr;
}

// Joga uma partida
function playGame() {
    if (player.seasonStats.gamesPlayed >= 82) {
        alert("A temporada regular acabou! Vá para os playoffs.");
        return;
    }
    
    // Gera estatísticas baseadas nos atributos do jogador e overall
    const gameStats = {
        points: generateStat(player.stats.shooting, 0, 50) * (player.overall / 70),
        assists: generateStat(player.stats.playmaking, 0, 15) * (player.overall / 70),
        rebounds: generateStat(player.stats.rebounding, 0, 20) * (player.overall / 70),
        steals: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
        blocks: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
        opponent: getRandomOpponent(),
        result: Math.random() > (0.5 - (player.overall - 70) * 0.005) ? "W" : "L" // Chance de vitória baseada no overall
    };
    
    // Arredonda as estatísticas
    gameStats.points = Math.round(gameStats.points);
    gameStats.assists = Math.round(gameStats.assists);
    gameStats.rebounds = Math.round(gameStats.rebounds);
    gameStats.steals = Math.round(gameStats.steals);
    gameStats.blocks = Math.round(gameStats.blocks);
    
    // Adiciona o jogo às estatísticas
    player.seasonStats.gamesPlayed++;
    player.seasonStats.points += gameStats.points;
    player.seasonStats.assists += gameStats.assists;
    player.seasonStats.rebounds += gameStats.rebounds;
    player.seasonStats.games.unshift(gameStats);
    
    // Verifica conquistas
    checkAchievements(gameStats);
    
    // Verifica se terminou a temporada regular
    if (player.seasonStats.gamesPlayed === 82) {
        awardSeasonTrophies();
    }
    
    // Atualiza o painel
    updatePlayerInfo();
    
    // Mostra o resultado do jogo
    alert(`Resultado da Partida:\n\n` +
          `VS ${gameStats.opponent}: ${gameStats.result === "W" ? "Vitória" : "Derrota"}\n` +
          `Pontos: ${gameStats.points}\n` +
          `Assistências: ${gameStats.assists}\n` +
          `Rebotes: ${gameStats.rebounds}\n` +
          `Roubos: ${gameStats.steals}\n` +
          `Tocos: ${gameStats.blocks}`);
}

// Concede troféus no final da temporada com maior impacto
function awardSeasonTrophies() {
    // Calcula médias
    const ppg = player.seasonStats.points / player.seasonStats.gamesPlayed;
    const apg = player.seasonStats.assists / player.seasonStats.gamesPlayed;
    const rpg = player.seasonStats.rebounds / player.seasonStats.gamesPlayed;
    
    // Cria lista de prêmios conquistados para mostrar no final
    const awardsWon = [];
    
    // All-Star (maior aleatoriedade, baseada em estatísticas)
    if ((player.overall >= 82 || ppg >= 18 || (ppg >= 13 && apg >= 6) || (ppg >= 13 && rpg >= 8)) && Math.random() > 0.3) {
        unlockTrophy("all-star");
        awardsWon.push({
            id: "all-star",
            name: "All-Star",
            description: "Selecionado para o All-Star Game",
            bonus: 1
        });
    }
    
    // Artilheiro (muitos pontos, mas com maior dificuldade)
    if (ppg >= 25 && Math.random() > 0.6) {
        unlockTrophy("scoring-champ");
        awardsWon.push({
            id: "scoring-champ",
            name: "Líder de Pontuação",
            description: `Média de ${ppg.toFixed(1)} pontos por jogo`,
            bonus: 2
        });
    }
    
    // All-NBA (estatísticas boas, mas com mais aleatoriedade)
    if ((ppg >= 20 || player.overall >= 88 || (ppg >= 16 && apg >= 7) || (ppg >= 16 && rpg >= 9)) && Math.random() > 0.5) {
        unlockTrophy("all-nba");
        awardsWon.push({
            id: "all-nba",
            name: "All-NBA Team",
            description: "Um dos melhores jogadores da temporada",
            bonus: 2
        });
    }
    
    // MVP (muito mais difícil e aleatório)
    const mvpChance = Math.random();
    let mvpAchieved = false;
    
    // Sistema de MVP mais rigoroso e com mais variações
    if (player.overall >= 92 && ppg >= 27 && (apg >= 6 || rpg >= 7) && mvpChance > 0.8) {
        // Superstar com estatísticas de elite - ainda assim só 20% de chance
        mvpAchieved = true;
    } else if (player.overall >= 88 && ppg >= 25 && apg >= 8 && rpg >= 6 && mvpChance > 0.85) {
        // All-around star - 15% de chance
        mvpAchieved = true;
    } else if (player.overall >= 85 && ppg >= 30 && mvpChance > 0.9) {
        // Pontuador elite - apenas 10% de chance
        mvpAchieved = true;
    }
    
    if (mvpAchieved) {
        unlockTrophy("mvp");
        awardsWon.push({
            id: "mvp",
            name: "MVP da Temporada Regular",
            description: "Jogador Mais Valioso da NBA",
            bonus: 5
        });
    }
    
    // Calouro do Ano (primeira temporada, baseado em estatísticas)
    if (player.currentSeason === 1 && ((ppg >= 14 && Math.random() > 0.4) || (ppg >= 18 && Math.random() > 0.2))) {
        unlockTrophy("rookie-year");
        awardsWon.push({
            id: "rookie-year",
            name: "Calouro do Ano",
            description: "Melhor novato da liga",
            bonus: 3
        });
    }
    
    // Defensor do Ano (baseado em atributo de defesa e aleatoriedade)
    if ((player.stats.defense >= 15 && Math.random() > 0.75) || 
        (player.stats.defense >= 18 && Math.random() > 0.5)) {
        unlockTrophy("dpoy");
        awardsWon.push({
            id: "dpoy",
            name: "Defensor do Ano",
            description: "Melhor defensor da NBA",
            bonus: 3
        });
    }
    
    // Jogador que Mais Evoluiu (menor chance)
    if (player.currentSeason > 1 && player.overall >= 84 && player.overall - 70 >= 10 && Math.random() > 0.8) {
        unlockTrophy("most-improved");
        awardsWon.push({
            id: "most-improved",
            name: "Jogador que Mais Evoluiu",
            description: "Maior evolução em relação à temporada anterior",
            bonus: 2
        });
    }
    
    // Sexto Homem (muito raro, easter egg)
    if (Math.random() > 0.95) {
        unlockTrophy("sixth-man");
        awardsWon.push({
            id: "sixth-man",
            name: "Sexto Homem do Ano",
            description: "Melhor jogador saindo do banco",
            bonus: 2
        });
    }
    
    // Se conquistou algum prêmio, mostra tela de premiação
    if (awardsWon.length > 0) {
        showSeasonAwards(awardsWon);
    }
}

// Mostra os prêmios da temporada de forma impactante
function showSeasonAwards(awards) {
    // Acumulador de bônus de overall
    let totalBonus = 0;
    
    // Cria modal para mostrar os prêmios
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content season-awards-modal';
    
    const header = document.createElement('div');
    header.className = 'awards-header';
    header.innerHTML = `
        <h2>🏆 Prêmios da Temporada ${player.currentSeason} 🏆</h2>
        <p>Você conquistou prêmios importantes nesta temporada!</p>
    `;
    
    const awardsList = document.createElement('div');
    awardsList.className = 'awards-list';
    
    // Adiciona cada prêmio conquistado
    awards.forEach(award => {
        totalBonus += award.bonus;
        
        const awardItem = document.createElement('div');
        awardItem.className = 'season-award-item';
        
        let iconEmoji = '🏆';
        if (award.id === 'mvp') iconEmoji = '👑';
        else if (award.id === 'dpoy') iconEmoji = '🛡️';
        else if (award.id === 'scoring-champ') iconEmoji = '🏀';
        else if (award.id === 'rookie-year') iconEmoji = '🌟';
        
        awardItem.innerHTML = `
            <div class="award-icon">${iconEmoji}</div>
            <div class="award-info">
                <h3>${award.name}</h3>
                <p>${award.description}</p>
                <div class="award-bonus">+${award.bonus} Overall</div>
            </div>
        `;
        
        awardsList.appendChild(awardItem);
    });
    
    // Adiciona o bônus de overall
    const bonusSection = document.createElement('div');
    bonusSection.className = 'total-bonus-section';
    
    // Aplica o bônus ao overall
    const oldOverall = player.overall;
    player.overall = Math.min(99, player.overall + totalBonus);
    
    bonusSection.innerHTML = `
        <h3>Bônus Total de Overall</h3>
        <div class="overall-change">
            <div class="old-overall">${oldOverall}</div>
            <div class="overall-arrow">➡️</div>
            <div class="new-overall">${player.overall}</div>
        </div>
        <p>Continue assim para ganhar mais prêmios!</p>
    `;
    
    // Botão para continuar
    const continueButton = document.createElement('button');
    continueButton.className = 'btn';
    continueButton.textContent = 'Continuar';
    continueButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
    
    // Monta a modal
    modalContent.appendChild(header);
    modalContent.appendChild(awardsList);
    modalContent.appendChild(bonusSection);
    modalContent.appendChild(continueButton);
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// Pula um número específico de jogos
function skipGames(numberOfGames) {
    if (player.seasonStats.gamesPlayed >= 82) {
        alert("A temporada regular já acabou!");
        return;
    }
    
    const gamesToPlay = Math.min(numberOfGames, 82 - player.seasonStats.gamesPlayed);
    
    for (let i = 0; i < gamesToPlay; i++) {
        const gameStats = {
            points: generateStat(player.stats.shooting, 0, 35) * (player.overall / 70),
            assists: generateStat(player.stats.playmaking, 0, 10) * (player.overall / 70),
            rebounds: generateStat(player.stats.rebounding, 0, 15) * (player.overall / 70),
            steals: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
            blocks: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
            opponent: getRandomOpponent(),
            result: Math.random() > (0.5 - (player.overall - 70) * 0.005) ? "W" : "L"
        };
        
        gameStats.points = Math.round(gameStats.points);
        gameStats.assists = Math.round(gameStats.assists);
        gameStats.rebounds = Math.round(gameStats.rebounds);
        gameStats.steals = Math.round(gameStats.steals);
        gameStats.blocks = Math.round(gameStats.blocks);
        
        player.seasonStats.gamesPlayed++;
        player.seasonStats.points += gameStats.points;
        player.seasonStats.assists += gameStats.assists;
        player.seasonStats.rebounds += gameStats.rebounds;
        player.seasonStats.games.unshift(gameStats);
        
        // Verifica conquistas apenas no último jogo pulado
        if (i === gamesToPlay - 1) {
            checkAchievements(gameStats);
        }
    }
    
    // Verifica se terminou a temporada
    if (player.seasonStats.gamesPlayed === 82) {
        awardSeasonTrophies();
    }
    
    updatePlayerInfo();
    alert(`Você pulou ${gamesToPlay} jogos!\n\nEstatísticas atualizadas.`);
}

// Gera uma estatística baseada no atributo com maior variação e mais realismo
function generateStat(attribute, min, max) {
    // Reduz o peso do atributo base para evitar que o jogador sempre domine
    const base = (attribute / 30) * (max * 0.5);
    
    // Maior variação aleatória (60% do valor máximo possível)
    const variation = (Math.random() - 0.5) * (max * 0.6);
    
    // Adiciona um fator de consistência mais variável
    let streakFactor = 0;
    
    const streakRoll = Math.random();
    if (streakRoll > 0.92) {
        // Apenas 8% de chance de jogo excelente 
        streakFactor = Math.random() * max * 0.2;
    } else if (streakRoll > 0.75) {
        // 17% de chance de jogo bom
        streakFactor = Math.random() * max * 0.1;
    } else if (streakRoll < 0.15) {
        // 15% de chance de jogo ruim
        streakFactor = -1 * (Math.random() * max * 0.2);
    } else if (streakRoll < 0.25) {
        // 10% de chance de jogo abaixo da média
        streakFactor = -1 * (Math.random() * max * 0.1);
    }
    
    // Adiciona fator de aleatoriedade do jogo
    const gameFactor = Math.random() * max * 0.1;
    
    // Valor máximo real depende da posição e do tipo de estatística
    const adjustedMax = max * 0.85; // Reduz o máximo para evitar jogos de 50 pontos constantes
    
    return Math.max(min, Math.min(adjustedMax, Math.round(base + variation + streakFactor + gameFactor)));
}

// Retorna um oponente aleatório (não pode ser o próprio time)
function getRandomOpponent() {
    const teamCodes = Object.keys(teams);
    let opponent;
    do {
        opponent = teamCodes[Math.floor(Math.random() * teamCodes.length)];
    } while (opponent === player.team);
    return teams[opponent].name;
}

// Atualiza a lista de jogos
function updateGamesList() {
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = '';
    
    const recentGames = player.seasonStats.games.slice(0, 5);
    
    if (recentGames.length === 0) {
        gamesList.innerHTML = '<p>Nenhuma partida jogada ainda.</p>';
        return;
    }
    
    recentGames.forEach((game, index) => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <div>VS ${game.opponent}</div>
            <div>
                <span style="color: ${game.result === "W" ? "#4CAF50" : "#f44336"}">
                    ${game.result === "W" ? "V" : "D"}
                </span>
                ${game.points}PTS ${game.assists}AST ${game.rebounds}REB
            </div>
        `;
        gamesList.appendChild(gameItem);
    });
}

// Verifica conquistas
function checkAchievements(gameStats) {
    // Primeiro jogo
    if (player.seasonStats.gamesPlayed === 1 && !hasAchievement("first-game")) {
        unlockAchievement("first-game");
    }
    
    // Primeiros pontos
    if (gameStats.points > 0 && !hasAchievement("first-points")) {
        unlockAchievement("first-points");
    }
    
    // Duplo-duplo
    if ((gameStats.points >= 10 && gameStats.assists >= 10) ||
        (gameStats.points >= 10 && gameStats.rebounds >= 10) ||
        (gameStats.assists >= 10 && gameStats.rebounds >= 10)) {
        if (!hasAchievement("double-double")) {
            unlockAchievement("double-double");
        }
    }
    
    // Triple-double
    if (gameStats.points >= 10 && gameStats.assists >= 10 && gameStats.rebounds >= 10) {
        if (!hasAchievement("triple-double")) {
            unlockAchievement("triple-double");
        }
    }
    
    // 30 pontos
    if (gameStats.points >= 30 && !hasAchievement("30-points")) {
        unlockAchievement("30-points");
    }
    
    // 50 pontos
    if (gameStats.points >= 50 && !hasAchievement("50-point-game")) {
        unlockAchievement("50-point-game");
    }
    
    // 10 assistências
    if (gameStats.assists >= 10 && !hasAchievement("10-assists")) {
        unlockAchievement("10-assists");
    }
}

// Verifica se o jogador tem uma conquista
function hasAchievement(achievementId) {
    return player.achievements.includes(achievementId);
}

// Desbloqueia uma conquista
function unlockAchievement(achievementId) {
    if (!hasAchievement(achievementId)) {
        player.achievements.push(achievementId);
        
        // Marca como desbloqueada na lista completa
        const achievement = allAchievements.find(a => a.id === achievementId);
        if (achievement) {
            achievement.earned = true;
            
            // Mostra modal em vez de alerta
            showAchievementModal(achievement);
        }
    }
}

// Mostra conquista desbloqueada em uma modal
function showAchievementModal(achievement) {
    // Remove qualquer modal existente
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Cria a nova modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content achievement-modal';
    
    modalContent.innerHTML = `
        <div class="achievement-modal-header">
            <h2>🏆 Conquista Desbloqueada! 🏆</h2>
        </div>
        
        <div class="achievement-modal-content">
            <div class="achievement-icon">⭐</div>
            <div class="achievement-details">
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
            </div>
        </div>
        
        <button class="btn btn-achievement">Continuar</button>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Adiciona evento ao botão
    modalContent.querySelector('.btn-achievement').addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
}

// Desbloqueia um troféu
function unlockTrophy(trophyId) {
    const trophy = allTrophies.find(t => t.id === trophyId);
    if (trophy) {
        player.trophyCounts[trophy.id]++;
        
        // Mostra modal apenas na primeira vez
        if (player.trophyCounts[trophy.id] === 1) {
            showTrophyModal(trophy);
        }
    }
}

// Mostra troféu conquistado em uma modal
function showTrophyModal(trophy) {
    // Remove qualquer modal existente
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Cria a nova modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content trophy-modal';
    
    modalContent.innerHTML = `
        <div class="trophy-modal-header">
            <h2>🏆 Troféu Conquistado! 🏆</h2>
        </div>
        
        <div class="trophy-modal-content">
            <div class="trophy-big-icon">🏆</div>
            <div class="trophy-details">
                <h3>${trophy.name}</h3>
                <p>${trophy.description}</p>
            </div>
        </div>
        
        <button class="btn btn-trophy">Continuar</button>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Adiciona evento ao botão
    modalContent.querySelector('.btn-trophy').addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
}

// Atualiza a lista de conquistas
function updateAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    if (player.achievements.length === 0) {
        achievementsList.innerHTML = '<p>Nenhuma conquista ainda. Continue jogando!</p>';
        return;
    }
    
    // Adiciona botão para ver troféus
    const trophyButton = document.createElement('button');
    trophyButton.className = 'btn';
    trophyButton.textContent = 'Ver Troféus';
    trophyButton.addEventListener('click', showTrophyGallery);
    achievementsList.appendChild(trophyButton);
    
    player.achievements.forEach(achievementId => {
        const achievement = allAchievements.find(a => a.id === achievementId);
        if (achievement) {
            const achievementItem = document.createElement('div');
            achievementItem.className = 'achievement';
            achievementItem.innerHTML = `
                <div class="achievement-icon">⭐</div>
                <div>
                    <strong>${achievement.name}</strong>
                    <p>${achievement.description}</p>
                </div>
            `;
            achievementsList.appendChild(achievementItem);
        }
    });
}


// Função playGame original sem a parte de momentum
function playGame() {
    if (player.seasonStats.gamesPlayed >= 82) {
        alert("A temporada regular acabou! Vá para os playoffs.");
        return;
    }
    
    // Gera estatísticas baseadas nos atributos do jogador e overall
    const gameStats = {
        points: generateStat(player.stats.shooting, 0, 50) * (player.overall / 70),
        assists: generateStat(player.stats.playmaking, 0, 15) * (player.overall / 70),
        rebounds: generateStat(player.stats.rebounding, 0, 20) * (player.overall / 70),
        steals: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
        blocks: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
        opponent: getRandomOpponent(),
        result: Math.random() > (0.5 - (player.overall - 70) * 0.005) ? "W" : "L" // Chance de vitória baseada no overall
    };
    
    // Arredonda as estatísticas
    gameStats.points = Math.round(gameStats.points);
    gameStats.assists = Math.round(gameStats.assists);
    gameStats.rebounds = Math.round(gameStats.rebounds);
    gameStats.steals = Math.round(gameStats.steals);
    gameStats.blocks = Math.round(gameStats.blocks);
    
    // Adiciona o jogo às estatísticas
    player.seasonStats.gamesPlayed++;
    player.seasonStats.points += gameStats.points;
    player.seasonStats.assists += gameStats.assists;
    player.seasonStats.rebounds += gameStats.rebounds;
    player.seasonStats.games.unshift(gameStats);
    
    // Verifica conquistas
    checkAchievements(gameStats);
    
    // Verifica se terminou a temporada regular
    if (player.seasonStats.gamesPlayed === 82) {
        awardSeasonTrophies();
    }
    
    // Atualiza o painel
    updatePlayerInfo();
    
    // Mostra o resultado do jogo
    alert(`Resultado da Partida:\n\n` +
          `VS ${gameStats.opponent}: ${gameStats.result === "W" ? "Vitória" : "Derrota"}\n` +
          `Pontos: ${gameStats.points}\n` +
          `Assistências: ${gameStats.assists}\n` +
          `Rebotes: ${gameStats.rebounds}\n` +
          `Roubos: ${gameStats.steals}\n` +
          `Tocos: ${gameStats.blocks}`);
}

// Versão original de skipGames (sem momentum)
function skipGames(numberOfGames) {
    if (player.seasonStats.gamesPlayed >= 82) {
        alert("A temporada regular já acabou!");
        return;
    }
    
    const gamesToPlay = Math.min(numberOfGames, 82 - player.seasonStats.gamesPlayed);
    
    for (let i = 0; i < gamesToPlay; i++) {
        const gameStats = {
            points: generateStat(player.stats.shooting, 0, 35) * (player.overall / 70),
            assists: generateStat(player.stats.playmaking, 0, 10) * (player.overall / 70),
            rebounds: generateStat(player.stats.rebounding, 0, 15) * (player.overall / 70),
            steals: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
            blocks: generateStat(player.stats.defense, 0, 5) * (player.overall / 70),
            opponent: getRandomOpponent(),
            result: Math.random() > (0.5 - (player.overall - 70) * 0.005) ? "W" : "L"
        };
        
        gameStats.points = Math.round(gameStats.points);
        gameStats.assists = Math.round(gameStats.assists);
        gameStats.rebounds = Math.round(gameStats.rebounds);
        gameStats.steals = Math.round(gameStats.steals);
        gameStats.blocks = Math.round(gameStats.blocks);
        
        player.seasonStats.gamesPlayed++;
        player.seasonStats.points += gameStats.points;
        player.seasonStats.assists += gameStats.assists;
        player.seasonStats.rebounds += gameStats.rebounds;
        player.seasonStats.games.unshift(gameStats);
        
        // Verifica conquistas apenas no último jogo pulado
        if (i === gamesToPlay - 1) {
            checkAchievements(gameStats);
        }
    }
    
    // Verifica se terminou a temporada
    if (player.seasonStats.gamesPlayed === 82) {
        awardSeasonTrophies();
    }
    
    updatePlayerInfo();
    alert(`Você pulou ${gamesToPlay} jogos!\n\nEstatísticas atualizadas.`);
}
