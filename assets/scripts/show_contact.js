import EditContact from './edit_contact.js';
import Main from './main.js';
import { editContacts, deleteContacts } from "./services/contacts_services.js";
import { login } from "./services/sessions_services.js";
import Signup from "./signup.js";
import STORE from './store.js';

export default function ShowContact(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function (contact) {
      const html = `
      <div  class="show-profile">
          <div class="show-profile-header">
            <h2 class="show-profile-header__title">Contact Detail</h2>
            <a href="logout">Logout</a>
          </div>
          <div class="show-profile-body">
            <img class = "img-medium" src="${contact.urlImage || './assets/imgs/Rectangle.png'}" />
            <h3>${contact.name}</h3>
            <p>${contact.relation}</p>
            <ul class="show-profile__info">
              <li><span>Number:</span> ${contact.number} </li>
              <li><span>Email:</span> ${contact.email} </li>
              <li><span>Birthday:</span> ${contact.birthday || ""} </li>
              <li><span>Gender:</span> ${contact.gender || ""} </li>
            </ul>
          </div>
          <div class="show-profile-footer">
            <a href="#back" class="js-btn-back">Back</a>
            <a data-id="${contact.id}" href="#delete" class="js-btn-delete-contact">Delete</a>
            <a data-id="${contact.id}" href="#edit" class="js-btn-edit-contact">Edit</a>
          </div>
        </div>`;
      this.parent.innerHTML = html;
      this.addBackListener();
      this.addDeleteContact();
      this.addEditContact();
    },
    addBackListener: function() {
      const btnBack = this.parent.querySelector('.js-btn-back');
      btnBack.addEventListener('click', (e) => {
        e.preventDefault();
        const main = Main('.js-content');
        main.render();
      })
    },
    addDeleteContact: function() {
      const btnDelete = this.parent.querySelector('.js-btn-delete-contact');
      btnDelete.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const idContact = +btnDelete.dataset.id;
          const response = await deleteContacts(idContact);
          const main = Main('.js-content');
          if(response){
            STORE.contacts = STORE.contacts.filter(contact => contact.id !== idContact);
            main.render();
          }
        } catch(error) {
          alert(error.message);
        }
      })
    },
    addEditContact: function() {
      const btnEdit = this.parent.querySelector('.js-btn-edit-contact');
      btnEdit.addEventListener('click', (e) => {
        e.preventDefault()
        //Código del edit
        const idContact = +btnEdit.dataset.id;
        const edit = EditContact(".js-content",idContact);
        edit.render();
      })
    },
  };
};

