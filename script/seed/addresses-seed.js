const numbers = [
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110'
]

const houseOrApt = randNum => (randNum > 0.5 ? 'house' : 'apartment')

const streetNames = [
  'Swift Brae',
  'Dainford Close',
  'Harefield Approach',
  'Ruchazie Road',
  'Conifer Head',
  'Drumcavel Road',
  'Scotland Brook',
  'Crossfield Common',
  'Wenlock Edge',
  'Scrubwood Lane'
]

const cities = [
  'chicago',
  'new york',
  'yosemite',
  'gold coast',
  'tampa',
  'albuquerque'
]

const states = ['PA', 'IL', 'NY', 'OH', 'FL', 'GA', 'CO']

const zipCodes = ['30263', '22156', '93485', '06605', '82375', '55243']

const buildAddress = () => {
  return {
    number: numbers[Math.floor(Math.random() * numbers.length)],
    houseOrApt: houseOrApt(),
    streetName: streetNames[Math.floor(Math.random() * streetNames.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    state: states[Math.floor(Math.random() * states.length)],
    zip: zipCodes[Math.floor(Math.random() * zipCodes.length)]
  }
}

module.exports = new Array(10).fill(null).map(() => buildAddress())
