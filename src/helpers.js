export default function updateSortButton (sortBy) {
  Array.from(document.getElementsByClassName('sortBy')).forEach(elem => {
    elem.classList.remove('btn-blue')
  })
  document.getElementById(sortBy).classList.add('btn-blue')
}
