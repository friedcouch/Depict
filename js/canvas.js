import * as database from '../../js/database.js'

// Make an instance of two and place it on the page.
let elem = document.querySelector('#edit-canvas-container');
let params = { width: 400, height: 400 };
let two = new Two(params).appendTo(elem);

// Delete path
$('#path-overview').on('click', '.delete', event => {
  const targetLi = $(event.target).closest('li')
  $(`#${targetLi.data('pathId')}`).remove()
  targetLi.remove()
})

// Show subpages when clicked
$('#btn-path-overview').click(_ => {
  $('#path-overview').show()
  $('#path-settings').hide()
  $('#btn-path-overview').css('background-color', '#f8f8f8')
  $('#btn-path-settings').css('background-color', '#eee')
})

$('#btn-path-settings').click(_ => {
  $('#path-settings').show()
  $('#path-overview').hide()
  $('#btn-path-settings').css('background-color', '#f8f8f8')
  $('#btn-path-overview').css('background-color', '#eee')
})

// Adds new input fields
$('#fill-colour').on('click', '.add', event => addColourInput('fill-colour'))
$('#stroke-colour').on('click', '.add', event => addColourInput('stroke-colour'))

// Deletes input fields
$('#fill-colour').on('click', '.delete', event => $(event.target).closest('li').remove())
$('#stroke-colour').on('click', '.delete', event => $(event.target).closest('li').remove())

// Generate path
$('#edit-canvas').submit(event => {
  event.preventDefault()
  const maxAnchors = $('#canvas-max-anchors')[0].value
  const isClosed = $('#canvas-is-closed')[0].checked
  const isCurved = $('#canvas-is-curved')[0].checked
  const fillColourList = $.map($('#fill-colour input[type="color"]'), getRGBA)
  const strokeColourList = $.map($('#stroke-colour input[type="color"]'), getRGBA)
  const newPath = createPath(maxAnchors, isClosed, isCurved, randColour(fillColourList), randColour(strokeColourList))

  addPathLi(newPath.id)
  two.add(newPath)
  two.update()
})

// Upload canvas
$('#canvas-name-form').submit(event => {
  event.preventDefault()

  if (!$('#edit-canvas-container svg path')[0]) {
    window.alert('Canvas is empty! Please generate at least one path before posting.')
    return
  }

  const name = event.target[0].value
  
  if (!localStorage.user) window.location.reload()
  const userId = JSON.parse(localStorage.user).user_id
  if (!userId) window.location.reload()

  database.canvasCreate(name, elem.innerHTML, userId)
    .then(data => {
      if (data.error) throw data.error
      clearSettings()
      $('#create-canvas-container').hide()
      $('#form-bg').hide()
      window.location.reload()
    })
    .catch(err => console.log(err))
})

const getRGBA = colour => {
  const hex = colour.value;
  const r = parseInt(hex[1].toString() + hex[2].toString(), 16);
  const g = parseInt(hex[3].toString() + hex[4].toString(), 16);
  const b = parseInt(hex[5].toString() + hex[6].toString(), 16);
  const a = $(colour).next('input')[0].value / 100 // Opacity
  return `rgba(${r}, ${g}, ${b}, ${a})` // Return rgba value
}

const randRGB = () => Math.floor(Math.random() * 255)
const randColour = colourList => !!colourList
  ? colourList[Math.floor(Math.random() * colourList.length)]
  : `rgba(${randRGB()}, ${randRGB()}, ${randRGB()}, ${Math.random() <= 0.5 ? Math.random() : 1})`

const createPath = (maxAnchors, isClosed, isCurved, fillColour, strokeColour) => {
  let vertices = new Two.Utils.Collection();

  for (let i = 0; i < maxAnchors; ++i) {
    vertices.push(
      new Two.Anchor(
        Math.random() * 380,
        Math.random() * 380,
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random()
      )
    )
  }

  let path = new Two.Path(vertices, isClosed, isCurved)
  path.stroke = strokeColour
  path.fill = fillColour
  path.linewidth = Math.floor(Math.random() * 3)
  return path
}

const addColourInput = (inputName) => {
  $(`#${inputName} ul`).append(`
    <li class="colour-input-container">
      <input type="color" class="colour">
      <input type="number" class="opacity" value="50" min="0" max="100">
      <button type="button" class="delete">delete</button>
    </li>
    `)
}

const addPathLi = (pathId) => {
  $('#path-overview ul').append(`
    <li data-path-id="${pathId}">
      <span>Path ${pathId.slice(4)}</span>
      <button type="button" class="delete">delete</button>
    </li>
  `)
}

const clearSettings = () => {
  $('#canvas-max-anchors')[0].value = '5'
  $('#canvas-is-closed')[0].checked = true
  $('#canvas-is-curved')[0].checked = true
  $('.settings li, #edit-canvas-container svg').remove()
}