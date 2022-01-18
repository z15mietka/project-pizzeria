import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';
const app = {
  initPages: function(){
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#','');
    

    let pageMatchingHash = thisApp.pages[0].id;
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click',function(event){
        const clickedElement = this;
        event.preventDefault();
        /*get page id from href attribute*/ 
        const id = clickedElement.getAttribute('href').replace('#', '');
        /*run thisApp.activatePage with that id*/
        thisApp.activatePage(id);
        /*change URL hash*/
        window.location.hash= '#' + id;

      });
    }
    
  },
  activatePage: function(pageID) {
    const thisApp = this;
    /* add class 'active'to matching page, remove from non-matching*/ 
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active,page.id == pageID);
    }
    /*add class 'active' to matching link, remove from non matching*/
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href')=='#' + pageID
      );
    }
  },
  initMenu: function(){
    const thisApp = this;
    //console.log('thisApp.data:', thisApp.data);
    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },
  initCart: function(){
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart (cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },
  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        //console.log('parsedResponse', parsedResponse);
        /*save parsedResponse as thisApp.data.products*/
        thisApp.data.products = parsedResponse;
        /*execute initMenu method*/
        thisApp.initMenu();

      });
    //console.log('thisApp.data', JSON.stringify(thisApp.data));
  },
  initBooking: function(){
    const thisApp = this;
    const bookingWidget = document.querySelector(select.containerOf.booking);
    
    thisApp.Booking = new Booking(bookingWidget);

  },
  initHome: function(){
    const thisApp = this;
    const homeWidget = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(homeWidget);
  },
  init: function(){
    const thisApp = this;
    //console.log('*** App starting ***');
    //console.log('thisApp:', thisApp);
    //console.log('classNames:', classNames);
    //console.log('settings:', settings);
    //console.log('templates:', templates);
    thisApp.initPages();
    thisApp.initData();
    //thisApp.initMenu();
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initHome();
  },

};
app.init();

