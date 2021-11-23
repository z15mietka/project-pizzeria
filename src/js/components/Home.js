
import {templates, select} from '.././settings.js';
import {app} from '.././app.js';

class Home{
  constructor(wrapper){
    const thisHome = this;

    thisHome.render(wrapper);
    thisHome.initWidgets();
    app.initLinks(thisHome.mainOptions);
  }

  render(wrapper){
    const thisHome = this;

    const generatedHTML = templates.homeWidget();
    thisHome.dom = {};
    thisHome.dom.wrapper = wrapper;
    thisHome.dom.wrapper.innerHTML = generatedHTML;

    thisHome.mainOptions = document.querySelectorAll(select.nav.options);
    thisHome.dom.orderOnline = document.querySelector(select.home.orderButton);
    thisHome.dom.BookATable = document.querySelector(select.home.bookButton);
  }

  initWidgets(){
    const thisHome = this;

    thisHome.elem = document.querySelector(select.widgets.carousel);
    //eslint-disable-next-line no-undef
    thisHome.flkty = new Flickity( thisHome.elem, {
      // options
      cellAlign: 'left',
      contain: true,
      autoPlay: 3000,
      prevNextButtons: false,
      wrapAround: true,
    });
  }

}

export default Home;

