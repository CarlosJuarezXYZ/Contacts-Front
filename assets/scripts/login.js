import STORE from "./store.js";
import Main from './main.js';
import { listContacts } from "./services/contacts_services.js";
import { login } from "./services/sessions_services.js";
import Signup from "./signup.js";

export default function Login(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      const html = `
      <div class="login">
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
              placeholder="email" 
              required />
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
          <a class="js-btn-signup" href="signup">Signup</a>
          <input type="submit" class="js-btn-login" value="Login" />
        </div>
      </form>
      </div>`;
      this.parent.innerHTML = html;
      this.addFormSubmitListener();
      this.addLinkToSingUp();
    },
    addFormSubmitListener: function() {
      const form = this.parent.querySelector(".js-login-form");
      const main = Main(".js-content");
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { email, password } = form;
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
      })
    },
    addLinkToSingUp: function() {
      const btnSignup = this.parent.querySelector(".js-btn-signup")
      btnSignup.addEventListener('click', (e) =>{
        e.preventDefault();
        const signup = Signup(".js-content");
        signup.render();
      })
    },
  };
};

