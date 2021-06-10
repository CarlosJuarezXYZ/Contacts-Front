import Main from "./main.js";
import STORE from "./store.js";
import { createContacts } from "./services/contacts_services.js";

export default function CreateContact (parentElement) {
    return {
        parent: document.querySelector(parentElement),
        render: function () {
            let html = `
            <div class="create-contact">
            <div>
            <div class="create-contact-header">
                <h3>Create new contact</h2>
                <a class="js-logout" href="logout">Logout</a>
            </div>
            <div class="create-contact-form">
                <form class="js-contact-form js-create-form">
                    <div>
                    <input type="text" class="form_name" name="name" placeholder="Name">
                    <label class="error-message hidden">Error message</label>
                    </div>
                    <div>
                    <input type="text" class="form_number" name="number" placeholder="Number">
                    <label class="error-message hidden">Error message</label>
                    </div>
                    <div>
                    <input type="text" class="form_email" name="email" placeholder="Email">
                    </div>
                    <div>
                    <input type="text" class="form_url" name="url" placeholder="Url">
                    </div>
                    <div>
                    <input type="gender" class="form_gender" name="gender" placeholder="Gender">
                    </div>
                    <div>
                    <input type="date" class="form_birthday" name="birthday" placeholder="Birthday">
                    </div>

                    <div>
                    <select class="select-arrow" name="relation">
                    <option selected disabled>Relation</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Work">Work</option>
                    <option value="Acquaintance">Acquaintance</option>
                    </select>
                    </div>
                </form>
            </div>
            </div>
            <div class="create-contact-footer">
                <a class = "cancel" href="cancel">Cancel</a>
                <a class = "save" href="save">Save</a>
            </div>
            </div>
            `;
            this.parent.innerHTML = html;
            this.saveClickListener();
            this.cancelClickListener();
            const main = Main(parentElement)
            main.logoutClickListener();
        },
        saveClickListener: function () {
            const container = document.querySelector(".js-content");
            container.addEventListener("click",async (e) => {
              e.preventDefault();
              const save = container.querySelector(".save");
              const form = container.querySelector(".js-contact-from");
              const name = document.querySelector(".form_name");
              const number = document.querySelector(".form_number");
              const email = document.querySelector(".form_email");
              const relation = document.querySelector(".select-arrow");
              const urlImage = document.querySelector(".form_url");
              const gender = document.querySelector(".form_gender");
              const birthday = document.querySelector(".form_birthday")
              if(save == e.target){
                try{
                  const data = await createContacts(name.value,email.value,number.value,relation.value,urlImage.value,gender.value,birthday.value);
                  STORE.contacts.push(data);
                  const main = Main(parentElement);
                  location.reload();
                  main.render();
                }catch(error){
                  alert("can't  be  blank  and must have the formats");
                }
              } 
            });
        },
        cancelClickListener: function () {
            const container = document.querySelector(".js-content");
            container.addEventListener("click", async (e) => {
                e.preventDefault();
                const cancelBtn = container.querySelector(".cancel");
                if (cancelBtn == e.target) {
                  const main = Main(parentElement);
                  main.render();
                }
            })
        },
    }
}
