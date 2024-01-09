const carousel = document.querySelector('.carousel'),
  firstImg = carousel.querySelectorAll('img')[0]
arrowIcons = document.querySelectorAll('.wrapper i')

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff

const showHideIcons = () => {
  //show and hide icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    let firstImgWidth = firstImg.clientWidth
    //if clicked icon is left, reduce width value from carousel scroll left else add to it
    carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
    //calling showHideIcons after 60ms
    setTimeout(() => showHideIcons(), 60)
  })
})

const autoSlide = () => {
  // if there's no image left to scroll then return from here
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth) return
  positionDiff = Math.abs(positionDiff) // make positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth
  // get difference value that needs to add or return from carousel left to take img center
  let valDifference = firstImgWidth - positionDiff

  if (carousel.scrollLeft > prevScrollLeft) {
    //if user us scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff)
  }
  //if user us scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
}

const dragStart = (e) => {
  // update global variables value on mouse down event
  isDragStart = true
  prevPageX = e.pageX || e.touched[0].pageX
  prevScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if (!isDragStart) return
  e.preventDefault()
  isDragging = true
  carousel.classList.add('dragging')
  positionDiff = (e.pageX || e.touched[0].pageX) - prevPageX
  carousel.scrollLeft = prevScrollLeft - positionDiff
  showHideIcons()
}

const dragStop = () => {
  isDragStart = false
  carousel.classList.remove('dragging')

  if (!isDragging) return
  isDragging = false
  autoSlide()
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

carousel.addEventListener('mouseup', dragStop)

carousel.addEventListener('mouseleave', dragStop)
carousel.addEventListener('touchend', dragStop)
