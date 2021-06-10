import { listContacts } from "./services/contacts_services.js";
import { login } from "./services/sessions_services.js";
import STORE from "./store.js";
import Main from './main.js';

export default function Login(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      const html = `
      <div class="login-title">
        <h3>Login</h3>
      </div>
      <form class="js-login-form">
        <div class="js-login-inputs">
          <div class="js-container-email">
            <input 
              type="email"
              name="email"
              class="js-login-email" 
              placeholder="email" r
              equired />
          </div>
          <div class="js-container-password">
            <input
              type="password"
              name="password"
              class="js-login-password"
              placeholder="password"
              required
            />
          </div>
        </div>
        <div class="js-login-signup">
          <input type="submit" class="js-btn-login" value="Login" />
          <a class="js-btn-signup" href="signup">Signup</a>
        </div>
      </form>
      `;
      this.parent.innerHTML = html;
      this.addFormSubmitListener();
    },
    addFormSubmitListener: function() {
      const form = this.parent.querySelector(".js-login-form");
      form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const { email, password } = form;
          const main = Main(".js-content");
          try {
            const data = await login(email.value, password.value);
            sessionStorage.setItem("token", data.token);
  
            if(data.token){
              STORE.contacts = await listContacts();
              main.render();
            }
          }
          catch (e) {
            alert(e.message);
          }
      }
      );
    },
  };
};
