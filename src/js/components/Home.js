import { templates, classNames, select} from '../settings.js';

class Home {
  constructor(element){
    const thisHome = this;
    console.log(thisHome);
    thisHome.render(element);
    thisHome.initLinks();
   

  }

  render(element) {
    const thisHome = this;
    const generatedHTML = templates.home();

    thisHome.dom = {};
    thisHome.dom.wrapper= element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }


  activatePage(pageId){
    const thisHome = this;

    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);

    for(let page of thisHome.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId );
    }
    for(let link of thisHome.navLinks){
      link.classList.toggle(classNames.nav.active);
      link.getAttribute('href') == '#' + pageId;
      
    }

  }
  initLinks(){
    const thisHome = this;
  
    thisHome.links = document.querySelectorAll('.link');

    for(let link of thisHome.links){
      link.addEventListener('click', function(event){
        event.preventDefault;
        const clickedLink = this;
        const id = clickedLink.getAttribute('href').replace('#', '');

        thisHome.activatePage(id);
      });
    }
  }
}


export default Home; 