const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


// const refs = {
//   listUl: document.querySelector(".gallery"),
//   containerUl: document.querySelector(".js-gallery"),
//   divModal: document.querySelector(".lightbox"),
//   imgModal: document.querySelector(".lightbox__image"),
//   closeModalBtn: document.querySelector('[data-action="close-lightbox"]')
// }


// const makeMarkop = transaction => {

//   return `
//     <li class= "gallery__item">
//       <a
//         class= "gallery__link"
//         href= "${transaction.original}"
//       >
//         <img
//           class= "gallery__image"
//           src= "${transaction.preview}"
//           data-source= "${transaction.original}"
//           alt= "${transaction.description}"
//         />     
//       </a>
//     </li>
//    `}

// const result = galleryItems.map(makeMarkop).join('')

// refs.listUl.insertAdjacentHTML('beforeend', result)
// refs.containerUl.addEventListener('click', onOpenModal)
// refs.closeModalBtn.addEventListener('click', onCloseModal)

// function onOpenModal(event) {

//    // откл перезагрузку окна
//   event.preventDefault()
//   // фильтр целей, кроме img никого
//   if (event.target.nodeName !== 'IMG') {
//     return
//   }
 

//   // снять класс с активного
//   // const currentActiveImg = document.querySelector('.is-open')

//   // if (currentActiveImg) {
//   //   currentActiveImg.classList.remove('.is-open')
//   // }

//   console.log(event.target.nodeName)
//   // вешаем на див класс при клике на img
//   refs.divModal.classList.add('is-open')

//      refs.imgModal.srs = event.target.dataset.source;
//     console.log(refs.imgModal.srs);
  
// } 


// function onCloseModal(event) {
//   refs.divModal.classList.remove('is-open')
//   refs.imgModal.srs = "";
// }







const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('div.lightbox');
const modalImage = document.querySelector('img.lightbox__image');
const btnCloseModal = document.querySelector('button[data-action="close-lightbox"]')

const createImageCard = galleryItems.map(
    (image, i, array) =>
`<li class="gallery__item">
<a
  class="gallery__link"
  href="${image.original}"
>
  <img
    class="gallery__image"
    src="${image.preview}"
    data-source="${image.original}"
    data-index=${i}
    alt="${image.description}"
  />
</a>
</li>`
).join("");

galleryRef.insertAdjacentHTML("beforeend", createImageCard);

galleryRef.addEventListener('click', modalIsOpen);
btnCloseModal.addEventListener('click', modalClose);
window.addEventListener('keydown', keyPress);
lightboxRef.addEventListener('click', modalCloseOnOverlay)
window.addEventListener('keydown', (e) => {
  nextImage (e);
  previousImage (e);
});

function modalIsOpen () {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  
  const originImageRef = event.target;
  const originImageIndex = originImageRef.getAttribute('data-index');
  
  lightboxRef.classList.add('is-open');
  modalImage.src = originImageRef.dataset.source;
  modalImage.setAttribute('data-index', originImageIndex)
}

function modalClose () {
  lightboxRef.classList.remove('is-open');
  modalImage.src = "";
}

function modalCloseOnOverlay () {
  const targetClassNAme = event.target.className
  if (targetClassNAme !== "lightbox__overlay") {
    return;
  }
  lightboxRef.classList.remove('is-open');
  modalImage.src = "";
}

function keyPress (e) {
    if(e.key !== "Escape") {
      return;
    }
    lightboxRef.classList.remove('is-open');
    modalImage.src = "";
}

function nextImage (e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
  } else if (e.key === "ArrowRight") {
    let i = Number(modalImage.dataset.index)
    i += 1;
    if (i >= 0 && i < galleryItems.length) {
      modalImage.setAttribute('data-index', i);
      modalImage.src = galleryItems[i].original
    } else {
      return;
    }
  }
  
}

function previousImage (e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
   } else if (e.key === "ArrowLeft") {
     let i = Number(modalImage.dataset.index)
     i -= 1;
       if (i >= 0 && i < galleryItems.length) {
         modalImage.setAttribute('data-index', i);
         modalImage.src = galleryItems[i].original
       } else {
         return;
       }
   }
 }