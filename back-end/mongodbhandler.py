from pymongo import MongoClient
from bson.json_util import dumps

# Makes a connection with the DB
def connectToDB():
    # Reads the MongoDB connection string from the file
    connString=''
    with open('mongoconnstring.txt') as file:
        connString = file.readline()
    file.close()

    client = MongoClient(connString)
    return client

# Fills empty DB with players stats data
def fillDB(headers, players):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Players']
    data = []
    for i in range(len(players)):
        zipper = zip(headers, players[i])
        line = dict(zipper)
        data.append(line)
    collection.insert_many(data)

# Get players stats
def getPlayersStats():
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Players']
    cursor = collection.find()
    results = dumps(cursor)
    return results

# Updates players stats in the DB by replacing old data with the new one
def updateDB(headers, players):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Players']
    for i in range(len(players)):
        zipper = zip(headers, players[i])
        line = dict(zipper)
        collection.replace_one({'PLAYER_ID': line['PLAYER_ID']}, line)

# Erases all the players stats in the DB
def eraseDB():
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Players']
    collection.delete_many({})

# Finds account data and returns it
def loginDB(username, password_hash):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Users']
    data = {"Username": username, "Password": password_hash}
    account = collection.find_one(data)
    return account

# Registers an account and returns if registration was successful
def registerDB(username, password_hash):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Users']
    data = {"Username": username, "Password": password_hash, "Role": "User"}
    found = collection.find_one({'Username':username})
    if found is None:
        collection.insert_one(data)
        return True
    return False

# Inserts teams into DB
def fillTeamsDB(teams):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Teams']
    insertData=[]
    for team in teams:
        data = {
            "id":team['id'],
            "city":team['city'],
            "code":team['code'],
            "conference":team['conference'],
            "name":team['name'],
            "division":team['division']
        }
        insertData.append(data)
    collection.insert_many(insertData)

# Get teams data
def getTeams():
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Teams']
    cursor = collection.find()
    results = dumps(cursor)
    return results

# Get teams' players data
def getTeamsById(id):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Players']
    cursor = collection.find({'TEAM_ID': int(id)})
    results = dumps(cursor)
    return results

# Gets player in the team
def getTeamPlayer(teamid, playerid):
    client = connectToDB()
    db = client['NBASTATSAPI']
    collection = db['Players']
    result = collection.find_one({'TEAM_ID': int(teamid), 'PLAYER_ID': int(playerid)})
    return dumps(result)