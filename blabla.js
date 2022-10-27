const UNIT = 'bla'
const settings = { // [min, max]
  paragraphs: [4, 6],
  sentences: [2, 10], // per paragraph
  words: [6, 12], // per sentence
  wordSize: [1, 5], // in "units"
  commas: [0, 3] // within sentence
}

const $button = document.querySelector('button')
const $target = document.querySelector('[data-target]')
let loading = false

const isNotLast = (i, arr) => i < arr.length - 1
const rand = (min = 1, max = 10) => Math.floor(Math.random() * ((max + 1) - min) + min)
const fill = (n) => new Array(n).fill()
const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const sleep = () => new Promise(res => setTimeout(res, rand(400, 1200)))

$button.addEventListener('click', generate)

async function generate() {
  if (loading) return
  loading = true
  $target.innerHTML = '⏳ Blablabla…'
  await sleep()
  loading = false
  $target.innerHTML = fill(rand(...settings.paragraphs)).map(paragraph).join('')
}

function paragraph() {
  return '<p>' + fill(rand(...settings.sentences)).map(sentence).join('. ') + '.</p>'
}

function sentence() {
  let commasTotal = rand(...settings.commas)
  return fill(rand(...settings.words))
    .map((_, i, arr) => {
      if (rand(0, 1) && commasTotal > 0 && isNotLast(i, arr)) {
        commasTotal--
        return ','
      }
      return ''
    })
    .map(word).join(' ')
}

function word(comma, index) {
  const word = fill(rand(...settings.wordSize)).map(_ => UNIT).join('') + comma
  return index === 0 ? capitalise(word) : word
}
