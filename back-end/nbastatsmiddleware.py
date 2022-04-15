from params import HEADERS, NBA_STATS_DEFAULT, NBA_STATS_PARAMETERS, NBA_CONFIG, NBA_CONFIG_HEADERS

# Gets all players stats from the stats.nba.com
async def getStats(client):
    req = await client.get(NBA_STATS_DEFAULT, headers=HEADERS)
    return req.json()

# Gets team from the stats.nba.com
async def getTeams(client):
    req = await client.get(NBA_CONFIG, headers=NBA_CONFIG_HEADERS)
    return req.json()