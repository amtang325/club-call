import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import time

import discord


TOKEN = ""

cred = credentials.Certificate('serviceAccount.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

CATEGORIES = ['academic', 'sports', 'other']

def addClub(category, name, id):
    if category not in CATEGORIES:
        print(category, "not a valid category for club", name)
        return
    
    db.collection('clubs').document(id).set({
        "category": category,
        "name": name
    })


def addAnnouncement(id, text):
    doc = db.collection("clubs").document(id)

    if doc.get().exists:
        doc.collection("announcements").add({
            "text": text,
            "time": int(time.time())
        })
    else:
        print("class", id, "doesn't exist")
        return



intents = discord.Intents.default()
intents.members = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if client.user.mentioned_in(message):
        addAnnouncement
        await message.channel.send('Hello!')



@client.event
async def on_guild_join(guild):
    await guild.owner.send('Hey! Thanks for adding ClubCall.')


client.run(TOKEN)
