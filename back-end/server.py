from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import httpx
import asyncio
from nbastatsmiddleware import getStats, getTeams
import mongodbhandler as DB
import jwt
import hashlib
import tokenparams
import datetime

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})

# Logins the user if user has an account
@app.route("/login", methods=['POST'])
def login():
    body = request.json
    username = body['Username']
    password = body['Password']
    result_hash = hashlib.sha256(password.encode())
    password_hash = result_hash.hexdigest()

    account = DB.loginDB(username, password_hash)
    if account is not None:
        payload = {
            "id":str(account['_id']), 
            "Username":str(account['Username']), 
            "Role":str(account['Role']), 
            "iss": tokenparams.ISSUER, 
            "aud": tokenparams.AUDIENCE, 
            "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=15)
        }
        
        token = jwt.encode(payload, tokenparams.SECRET)
        resp = make_response('', 200)
        resp.set_cookie('token', token, httponly = True, max_age=60*15)
        resp.set_cookie('loggedin', "true", max_age=60*15)
        return resp
    return ('', 400)

# Decodes JWT token if it is valid (not expired and is inserted in request)
def decodeJWT():
    token = request.cookies.get('token')
    try:
        payload = jwt.decode(token, tokenparams.SECRET, audience=tokenparams.AUDIENCE, issuer=tokenparams.ISSUER)
        return True, payload
    except jwt.ExpiredSignatureError:
        return False, None
    except Exception:
        return False, None

# Registers the user
@app.route("/register", methods=['POST'])
def register():
    body = request.json
    psw = body['Password']
    username = (body['Username'])
    hash = hashlib.sha256(psw.encode())
    password_hash = hash.hexdigest()
    isInserted = DB.registerDB(username, password_hash)
    if not isInserted:
        return ('', 400)
    return ('', 201) 

# Gets all players stats
@app.route("/playerstats", methods=['GET', 'POST', 'PUT', 'DELETE'])
async def playersStats():
    valid, token = decodeJWT()
    if not valid:
        return ('', 401)
    if request.method == 'POST':
        async with httpx.AsyncClient() as client:
            jsonData = await asyncio.gather(getStats(client))
            jsonData = jsonData[0]
            headers = jsonData["resultSets"][0]["headers"]
            playerStats = jsonData["resultSets"][0]["rowSet"]
            DB.fillDB(headers, playerStats)
        return ('', 201)
    elif request.method == 'PUT':
        async with httpx.AsyncClient() as client:
            jsonData = await asyncio.gather(getStats(client))
            jsonData = jsonData[0]
            headers = jsonData["resultSets"][0]["headers"]
            playerStats = jsonData["resultSets"][0]["rowSet"]
            DB.updateDB(headers, playerStats)
        return ('', 204)
    elif request.method == 'DELETE':
        DB.eraseDB()
        return ('', 204)
    else:
        data = DB.getPlayersStats()
        return (data, 200)

# Gets all the teams
@app.route("/teams", methods=['GET', 'POST'])
async def teams():
    valid, token = decodeJWT()
    if not valid:
        return ('', 401)
    if request.method == 'POST':
        async with httpx.AsyncClient() as client:
            jsonData = await asyncio.gather(getTeams(client))
        teams = jsonData[0]['teams']
        nbaTeams=[]
        for team in teams:
            if teams[team]['conference'] != "":
                nbaTeams.append(teams[team])
        DB.fillTeamsDB(nbaTeams)
        return ('', 201)
    elif request.method == 'GET':
        data =  DB.getTeams()
        return (data, 200)

# Gets teams players
@app.route("/teams/<id>", methods=['GET'])
async def teamsById(id):
    valid, token = decodeJWT()
    if not valid:
        return ('', 401)
    if request.method == 'GET':
        data =  DB.getTeamsById(id)
        return (data, 200)
    return ('', 400)

# Gets all the teams
@app.route("/teams/<teamid>/players/<playerid>", methods=['GET'])
async def teamPlayerById(teamid, playerid):
    valid, token = decodeJWT()
    if not valid:
        return ('', 401)
    if request.method == 'GET':
        data =  DB.getTeamPlayer(teamid, playerid)
        return (data, 200)
    return ('', 400)

# Main function to start the server
def main():
    app.run('0.0.0.0', 8080, debug=True)

# Run the app
main()
