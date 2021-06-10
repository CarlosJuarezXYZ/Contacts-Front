import STORE from "./store.js";
import Login from "./login.js";
import CreateContact from "./create_contacts.js"
import ShowContact from "./show_contact.js";
import { logout } from "./services/sessions_services.js";
import { showContacts, editFavoriteContacts } from "./services/contacts_services.js";

export default function Main(parentElement) {
    return {
        parent: document.querySelector(parentElement),
        // selectedContact: null,
        render: function () {
            let html = `
            <div class="contactable">  
                <h2 class="contactable__title">Contacs</h2>
                <a class="js-logout" href="logout">Logout</a>
            </div>
            <div class="js-contact-list">
            <section class="favorites">
                <div class="js-contacts">
                  <h4>FAVORITES</h4>
                </div>
                <ul class="js-contacts-list">
                    ${STORE.contacts.filter(contact => contact.favorite == true).map( (contact) => this.addFavoriteContact(contact)).join(" ")}
                </ul>
            </section>
        
            <section class="contacts">
                <div class="js-contacts">
                  <h4>CONTACTS (${STORE.contacts.filter(contact => contact.favorite == false).length})</h4>
                </div>
                <ul class="js-contacts-list">
                    ${STORE.contacts.filter(contact => contact.favorite == false).map( (contact) => this.addContact(contact)).join(" ")}
                </ul>
            </section>
            </div>
            <a class="btn-plus"><span>+</span></a>
            `;
            this.parent.innerHTML = html;
            this.logoutClickListener();
            this.contactClickListener();
            this.toggleFavoriteClickListener();
            this.createContactClickListener();
            this.hiddenFavorites();
        },
        addFavoriteContact: function (contact) {
            return `
            <li class="js-contact" data-id="${contact.id}">
            <div class="js-contact-info">
                <img class = "img-small" src="${contact.urlImage}"> 
                <p>${contact.name}</p> 
                </div>
                <icon data-id="${contact.id}" class="ri-star-line js-favorite-icon active"></icon>
            </li>`;
        },
        addContact: function (contact) {
            return  `
            <li class="js-contact" data-id="${contact.id}">
                <div class="js-contact-info">
                    <img class = "img-small" src="${contact.urlImage || './assets/imgs/Rectangle.png'}">
                    <p>${contact.name}</p> 
                </div>
                <icon data-id="${contact.id}" class="ri-star-line js-favorite-icon"></icon>
            </li>`;
          
        },

        logoutClickListener:  function () {
            const logoutBtn = this.parent.querySelector(".js-logout");
            if (logoutBtn) {
              logoutBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                await logout();
                sessionStorage.removeItem("token");
                STORE.contacts = [];
                const login = Login(parentElement);
                location.reload();
                login.render();
              });
            }
        },
        contactClickListener: function () {
            const contactList = this.parent.querySelector(".js-contact-list");
            contactList.addEventListener("click", (e) => {
                const contacts = contactList.querySelectorAll(".js-contact");
                contacts.forEach(async (contact) => {
                    if (contact === e.target) {
                        const contactId = parseInt(contact.dataset.id); // HEREEEEEEEE
                        const contactDetail = ShowContact(contactId);
                        contactDetail.render();
                    }
                })
            })
        },
        toggleFavoriteClickListener: function () {
            const favorites = this.parent.querySelectorAll(".js-favorite-icon");
            favorites.forEach(favorite => {
                favorite.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const selectedContact = STORE.contacts.find( i => i.id == parseInt(favorite.dataset.id));
                    selectedContact.favorite = !selectedContact.favorite;
                    const data = await editFavoriteContacts(favorite.dataset.id, selectedContact.favorite);
                    this.render();
                })
            })
        },
        createContactClickListener: function () {
            const content = this.parent.querySelector(".btn-plus");
            content.addEventListener("click", (e) =>{
              if(content == e.target){
                const createContactForm = CreateContact(parentElement);
                createContactForm.render();
              }
            })
        },
        hiddenFavorites: function() {
            const favorites = STORE.contacts.filter(contact => contact.favorite == true)
            if (favorites.length == 0) {
                const section = this.parent.querySelector(".favorites");
                section.classList.add("hidden");
            }
        },
        contactClickListener: function () {
            const contactsList = this.parent.querySelectorAll(".js-contact");
            contactsList.forEach((contact) => {
                const contactBody = contact.querySelector('.js-contact-info')
                contactBody.addEventListener('click', async (e) => {
                    const contactId = contact.dataset.id;
                    const objectContact = await showContacts(contactId);
                    if(objectContact){
                        const showContact = ShowContact('.js-content');
                        showContact.render(objectContact);
                    }
                })
            })
        },
    }
}
