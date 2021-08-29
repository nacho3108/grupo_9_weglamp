const time = document.querySelector('.time')
const day = document.querySelector('.day')
const night = document.querySelector('.night')

setInterval(() => {
    const now = new Date()
    time.innerHTML = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    time.style.marginLeft = '1220px'

    if (now.getHours() >= 20 && now.getHours() < 6) {
       
        day.style.display = 'none'
        night.style.display = 'inline-block' 
        night.style.marginLeft = '5px' 

    } else {
        
        day.style.display = 'inline-block'
        day.style.marginLeft = '5px' 
        night.style.display = 'none'
    }
}, 1000)