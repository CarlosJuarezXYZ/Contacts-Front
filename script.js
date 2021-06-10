import Login from "./assets/scripts/login.js";
import Main from "./assets/scripts/main.js";
import { listContacts } from "./assets/scripts/services/contacts_services.js";
import STORE from "./assets/scripts/store.js";
/*import CreateContact from "./assets/scripts/create_contacts.js"
import EditContact from "./assets/scripts/edit_contact.js"*/



async function init() {
    const main = Main(".js-content");
    const login = Login(".js-content");
    /*const create = CreateContact(".js-content");
    const edit = EditContact(".js-content");*/
    if (sessionStorage.getItem("token")) {
      STORE.contacts = await listContacts();
      main.render();
    } else {
      login.render();
    }
}

init();
