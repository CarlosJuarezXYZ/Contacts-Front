import Main from './main.js';
import Login from "./login.js";
import { signup } from "./services/users_services.js";

export default function Signup(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      const html = `
      <div class="signup">
      <div class="signup-title">
        <h3>Signup</h3>
      </div>
      <form class="js-signup-form">
        <div class="js-signup-inputs">
          <div class="js-container-email">
            <input 
              type="text" 
              name="email"
              class="js-signup-email" 
              placeholder="email"
              required />
          </div>
          <div class="js-container-password">
            <input
              type="password"
              name="password"
              class="js-signup-password"
              placeholder="password"
              required
            />
          </div>
        </div>
          <div class="js-signup-signup">
            <a class="js-btn-login" href="signup">Login</a>
            <input type="submit" class="js-btn-signup" value="Signup" />
          </div>
        </form>
      </div>
      
      `;
      this.parent.innerHTML = html;
      this.addFormSubmitListener();
      this.addLinkToLogin();
    },
    addFormSubmitListener: function() {
      const form = this.parent.querySelector(".js-signup-form");
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const main = Main(".js-content");
        const { email, password } = form;
        try {
          const data = await signup(email.value, password.value);
          sessionStorage.setItem("token", data.token);
          if(data.token){
            main.render();
          }
        }
        catch (e) {
          alert(e.message);
        }
      })
    },
    addLinkToLogin: function() {
      const btnSignup = this.parent.querySelector(".js-btn-login")
      btnSignup.addEventListener('click', (e) =>{
        e.preventDefault();
        const login = Login(".js-content");
        login.render();
      })
    },
  };
};
