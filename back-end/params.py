NBA_STATS_DEFAULT = "https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2021-22&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight="

HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Host": "stats.nba.com",
    "Origin": "https://www.nba.com",
    "Pragma": "no-cache",
    "Referer": "https://www.nba.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "Sec-GPC": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    "x-nba-stats-origin": "stats",
    "x-nba-stats-token": "true"
}

NBA_STATS_PARAMETERS = {
    "MeasureType": "Base",
    "PerMode": "Totals",
    "PlusMinus": "N",
    "PaceAdjust": "N",
    "Rank": "N",
    "LeagueID": "00",
    "Season": "2021-22",
    "SeasonType": "Regular Season",
    "PORound": 0,
    "Outcome": None,
    "Location": None,
    "Month": 0,
    "SeasonSegment": None,
    "DateFrom": None,
    "DateTo": None,
    "OpponentTeamID": 0,
    "VsConference": None,
    "VsDivision": None,
    "TeamID": 0,
    "Conference": None,
    "Division": None,
    "GameSegment": None,
    "Period": 0,
    "ShotClockRange": None,
    "LastNGames": 0,
    "GameScope": None,
    "PlayerExperience": None,
    "PlayerPosition": None,
    "StarterBench": None,
    "DraftYear": None,
    "DraftPick": None,
    "College": None,
    "Country": None,
    "Height": None,
    "Weight": None,
    "TwoWay": 0
}

# Can extract teams from the link below
NBA_CONFIG = "https://neulionms-a.akamaihd.net/nbad/player/v1/nba/site_spa/config.json"
NBA_CONFIG_HEADERS = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Host": "neulionms-a.akamaihd.net",
    "Origin": "https://www.nba.com",
    "Pragma": "no-cache",
    "Referer": "https://www.nba.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "Sec-GPC": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
}
