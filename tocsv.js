let data = require('./data.json')

let seasons = {}
data.seasons.forEach( (season, index) => {
    let seasonId = season.seasonid
    let [startYear, endYear] = season.label.split('-')
    seasons[seasonId] = {
        startYear,
        endYear: '20'+endYear
    }    
})

console.log("Year,WeekNumber,AllDeaths")
let weeklyData = data.nchs_summary.map( (week) => {
    // seasons run across winter, so 2012-2013
    // so in a season if week > 39 it's 2012, if < 12 it's 2013
    let seasonId = week.seasonid
    let weekNumber = week.weeknumber
    let year
    if (weekNumber > 39) {
        year = seasons[seasonId].startYear
    } else {
        year = seasons[seasonId].endYear
    }
    // oh for crying out loud, the number is a string with a comma
    let allDeaths = week.all_deaths.replace(',','')
    // quick and dirty CSV
    let row = [year,weekNumber,allDeaths]
    console.log(row.join(','))
})