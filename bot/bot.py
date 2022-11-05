import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import os, time, re

import discord

import asyncio

TOKEN = os.getenv("clubcall_token")

cred = credentials.Certificate('serviceAccount.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

CATEGORIES = ['academic', 'sports', 'other']

def addClub(category, name, id, icon):
    # shouldn't ever happen lol
    if category not in CATEGORIES:
        print(category, "not a valid category for club", name)
        return
    
    db.collection('clubs').document(id).set({
        "category": category,
        "name": name,
        "icon": icon
    })


def addAnnouncement(id, text):
    doc = db.collection("clubs").document(id)

    if doc.get().exists:
        data = doc.get().to_dict()

        db.collection("announcements").add({
            "name": data["name"],
            "icon": data["icon"],
            "type": data["category"],
            "text": text,
            "time": int(time.time())
        })
    else:
        print("class", id, "doesn't exist")
        return



intents = discord.Intents.default()
intents.message_content = True
intents.members = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    clubCallRole = discord.utils.get(message.guild.roles, name="clubcall-announcer")

    if not clubCallRole:
        return

    if client.user.mentioned_in(message) and clubCallRole in message.author.roles:
        content = re.sub(r"<@\d+>", "", message.content)
        for r in message.guild.roles:
            content = content.replace(r.name, "")

        content = content.strip()

        if content == "":
            return
        
        addAnnouncement(str(message.guild.id), content)


@client.event
async def on_guild_join(guild):
    ACADEMIC, SPORT, OTHER, NO = "📚", "🏀", "❓", "❌"
    emojiMapping = {
        ACADEMIC: "academic",
        SPORT: "sport",
        OTHER: "other"
    }

    message = await guild.owner.send(f"""Hey! Thanks for adding ClubCall.\n\nReact with the type of club `{guild.name}` is:\n{ACADEMIC}: Academic clubs\n{SPORT}: Sports clubs\n{OTHER}: Other clubs\n{NO}: Cancel operation""")

    for e in [ACADEMIC, SPORT, OTHER, NO]:
        await message.add_reaction(e)

    try:
        reaction = await client.wait_for('raw_reaction_add', timeout=300, check=lambda reaction: reaction.user_id == guild.owner.id and str(reaction.emoji) in [ACADEMIC, SPORT, OTHER] and reaction.message_id == message.id)
    except asyncio.TimeoutError:
        await guild.owner.send('Timed out waiting for a response. If you ever want to add your club, just kick and add me again!')
        return

    if str(reaction.emoji) == NO:
        await guild.owner.send('Alright. If you ever want to add your club, just kick and add me again!')
        return

    iconUrl = ""

    if guild.icon:
        iconUrl = guild.icon.url

    addClub(emojiMapping[str(reaction.emoji)], guild.name, str(guild.id), str(iconUrl))

    await guild.owner.send(f"Added `{guild.name}` as a club! {str(reaction.emoji)}\n\nPlease make sure to give the `clubcall-announcer` role to anybody who you would like to be able to post announcements, and add ClubCall as a pingable member")


client.run(TOKEN)
