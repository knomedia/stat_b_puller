// *******************************
//  specialty stats
// *******************************
function getEls(ID) {
  let table = document.querySelector('#' + ID)
  return table.tBodies[0].children
}

function getData(elements) {
  let data = {}
  for(let i=0; i<elements.length; i++) {
    let row = elements[i]
    if (row.children[0]) {
      data[row.children[0].innerText] = row.children[1].innerText
    }
  }
  return data
}

function specialty() {
  const ID = "teamspecialty_table"
  let data = getData(getEls(ID))
  return data
}

// *******************************
//  box stats
// *******************************

function getTable(CN) {
  return document.querySelector('.' + CN)
}

function getIdentifiers(table) {
  let elements = table.tHead.rows[0].children
  let identifiers = []
  for(let i=0; i<elements.length; i++) {
    let value = elements[i].innerText
    identifiers.push(value)
  }
  return identifiers
}

function getAllPlayers(ids, table) {
  let players = table.tBodies[0].children
  let playerData = []
  for(let i=0; i<players.length; i++) {
    let playerRow = players[i]
    playerData.push(getPlayer(ids, playerRow))
  }
  return playerData
}

function getPlayer(ids, playerRow) {
  let tds = playerRow.children
  let player = {}
  for(let i=0; i<ids.length; i++) {
    player[ids[i]] = tds[i].innerText
  }
  return player
}

function box() {
  const CN = "teambox"
  let table = getTable(CN)
  let ids = getIdentifiers(table)
  let playerData = getAllPlayers(ids, table)
  return playerData
}

// *******************************
// main
// *******************************

function log(str) {
  let buffer = ""
  let length = str.length + 10; // 4 chars + 1 space per side
  for(let i=0; i<length; i++) {
    buffer += "*"
  }
  console.log(buffer)
  console.log( "**** ", str, " ****")
  console.log(buffer)
}

function getLocation(ID) {
  let el = document.querySelector(ID)
  let text = ""
  if (el) {
    text = el.innerText
  }
  let locationValue = "home|away"
  if (byuIsHome(text)) {
    locationValue = 'home'
  } else { 
    locationValue = 'away'
  }
  return locationValue
}

function byuIsHome(text) {
  const BYU = 'byu'
  let parts = text.split(/\s/)
  parts = parts.map(function(p) {
    return p.trim()
  })
  return parts[parts.length - 1].toLowerCase() === BYU
}

function print(home, away, locationValue) {
  let data = {
    date: new Date(),
    opponent_name: "",
    location: locationValue,
    outcome: "win|loss",
    home: home,
    away: away
  }
  log(" ALL DATA")
  console.log(JSON.stringify(data, null, 2))
}

function getTeamData() {
  let specialtyData = specialty()
  let playerData = box()
  let data = {
    individual: playerData,
    specialty: specialtyData
  }
  return data
}

function changeTeam(ID, cb) {
  const WAIT_MS = 1500
  let link = document.querySelector(ID)
  link.click()
  window.setTimeout(function() {
    cb()
  }, WAIT_MS)
}

function main() {
  const HOME_ID = "#_bbgame_fullboxH"
  const AWAY_ID = "#_bbgame_fullboxV"
  const LOC = "#header .sb-title-text"
  let locationValue = getLocation(LOC)
  changeTeam(HOME_ID, function() {
    let home = getTeamData()
    changeTeam(AWAY_ID, function() {
      let away = getTeamData()
      print(home, away, locationValue)
    })
  })
}

main()
