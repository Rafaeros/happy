//criar mapa | create map
const map = L.map('mapid').setView([-23.3050658,-51.1708301], 16);

//criar e adicionar tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

//criar ícone
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

//criar e adicionar marcador
map.on('click', (event) => {

    console.log(event)
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

//add the photo field
function addPhotoField() {
    //console.log("esta funcionando")
    //pegar o container de fotos #image 
    const container = document.querySelector('#images')
    //pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //clonar a ultima imagem adicionada | clone the last image added
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    //verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]
    
    if(input.value == "") {
        return
    }

    //limpar o campo antes de adicionar ao container de imagens
    input.value = ""
    //adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

function removeField(event) {
    //console.log(event.currentTarget)
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2) {
        //limpar o valo do campo
        span.parentNode.children[0].value = ""
        return
    }
    //deletar o campo
    //console.log(span.parentNode)
    span.parentNode.remove()

    //console.log("cheguei aqui")
}

//selecionar sim ou não
function toggleSelect(event) {
    //retirar a class .active dos botões
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {button.classList.remove('active')})
    
    //colocar a class .active no botão clicado
    const button = event.currentTarget
    button.classList.add('active')
    
    //atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    //console.log(input)
    input.value = button.dataset.value
}

function validateMap(event) {
    // validar se  lat e lng estão preenchidos
    needsLat = document.querySelector('.lat-input').value
    needsLng = document.querySelector('.lng-input').value
    if(needsLat == "" && needsLng == ""){
        needsLatAndLng = true
        console.log(needsLatAndLng)
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
}