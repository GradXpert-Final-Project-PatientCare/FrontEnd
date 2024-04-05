<template>
  <div class="form-bg">
    <div class="container">
      <div class="row justify-content-center align-items-center" style="height: 100vh">
        <div class="col-md-6">
          <div class="form-container">
            <h3 class="title">Register</h3>
            <form class="form-horizontal" @submit.prevent="register">
              <div class="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.username"
                  placeholder="User Name"
                />
              </div>
              <div class="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="formData.email"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="formData.password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="formData.confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <h4 class="sub-title">Personal Information</h4>
              <div class="form-group">
                <label>Phone No.</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.phone"
                  placeholder="Phone Number"
                />
              </div>
              <div class="form-group">
                <label>City</label>
                <select class="form-control" v-model="formData.city">
                  <option value="paris">Paris</option>
                  <option value="new york">New York</option>
                </select>
              </div>
              <div class="check-terms">
                <input type="checkbox" class="checkbox" v-model="formData.agreeTerms" />
                <span class="check-label">I agree to the terms</span>
              </div>
              <span class="signin-link">
                Already have an account? Click here to <router-link to="/login">Login</router-link>
              </span>
              <button class="btn signup" type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  city: 'paris', // Default city
  agreeTerms: false
})

const register = () => {
  // Lakukan validasi data di sini
  // Dummy registration hanya untuk contoh
  console.log('Registrasi Berhasil:', formData.value)
  // Redirect ke halaman setelah registrasi
  router.push('/home')
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  background-color: #fff;
  font-family: 'Titillium Web', sans-serif;
  font-size: 0;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
}
.form-container .title {
  color: #000;
  font-size: 25px;
  font-weight: 600;
  text-transform: capitalize;
  margin: 0 0 25px;
}
.form-container .title:after {
  content: '';
  background-color: #00a9ef;
  height: 3px;
  width: 60px;
  margin: 10px 0 0;
  display: block;
  clear: both;
}
.form-container .sub-title {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 20px;
}
.form-container .form-horizontal {
  font-size: 0;
}
.form-container .form-horizontal .form-group {
  color: #333;
  width: 50%;
  padding: 0 8px;
  margin: 0 0 15px;
  display: inline-block;
}
.form-container .form-horizontal .form-group:nth-child(4) {
  margin-bottom: 30px;
}
.form-container .form-horizontal .form-group label {
  font-size: 17px;
  font-weight: 600;
}
.form-container .form-horizontal .form-control {
  color: #888;
  background: #fff;
  font-weight: 400;
  letter-spacing: 1px;
  height: 40px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 2px solid #e7e7e7;
  box-shadow: none;
}
.form-container .form-horizontal .form-control:focus {
  box-shadow: 0 0 5px #dcdcdc;
}
.form-container .form-horizontal .check-terms {
  padding: 0 8px;
  margin: 0 0 25px;
}
.form-container .form-horizontal .check-terms .check-label {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  vertical-align: top;
  display: inline-block;
}
.form-container .form-horizontal .check-terms .checkbox {
  height: 17px;
  width: 17px;
  min-height: auto;
  margin: 2px 8px 0 0;
  border: 2px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  transition: all 0.3s ease 0s;
}
.form-container .form-horizontal .check-terms .checkbox:before {
  content: '';
  height: 5px;
  width: 9px;
  border-bottom: 2px solid #00a9ef;
  border-left: 2px solid #00a9ef;
  transform: rotate(-45deg);
  position: absolute;
  left: 2px;
  top: 2.5px;
  transition: all 0.3s ease;
}
.form-container .form-horizontal .check-terms .checkbox:checked:before {
  opacity: 1;
}
.form-container .form-horizontal .check-terms .checkbox:not(:checked):before {
  opacity: 0;
}
.form-container .form-horizontal .check-terms .checkbox:focus {
  outline: none;
}
.form-container .signin-link {
  color: #333;
  font-size: 14px;
  width: calc(100% - 190px);
  margin-right: 30px;
  display: inline-block;
  vertical-align: top;
}
.form-container .signin-link a {
  color: #00a9ef;
  font-weight: 600;
  transition: all 0.3s ease 0s;
}
.form-container .signin-link a:hover {
  text-decoration: underline;
}
.form-container .form-horizontal .signup {
  color: #fff;
  background: #00a9ef;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 160px;
  padding: 8px 15px 9px;
  border-radius: 10px;
  transition: all 0.3s ease 0s;
}
.form-container .form-horizontal .btn:hover,
.form-container .form-horizontal .btn:focus {
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow:
    3px 3px rgba(0, 0, 0, 0.15),
    5px 5px rgba(0, 0, 0, 0.1);
  outline: none;
}
@media only screen and (max-width: 479px) {
  .form-container .form-horizontal .form-group {
    width: 100%;
  }
  .form-container .signin-link {
    width: 100%;
    margin: 0 10px 15px;
  }
}
</style>
