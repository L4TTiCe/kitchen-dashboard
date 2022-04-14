<script lang="ts">
    import { variables } from '$lib/env'
    import type {User} from '../../models/User'
    import axios from "axios";
  
    let username: string = '';
    let password: string = '';
    let repassword: string = '';
  
    let f_name: string = '';
    let l_name: string = '';
    let email: string = '';
  
    let status_message = '';
  
    function validateUser(user: User): boolean {
      if (user.username == '' || user.password == '' || user.email == '' || user.firstName == '' || user.lastName == '') {
        return false;
      }
      if (user.password == repassword) {
        return true;
      }
      return false;
    }
  
    function handleSubmit() {
      // console.log(username)
      // console.log(password)
  
      // console.log(f_name)
      // console.log(l_name)
      // console.log(email)
  
      let user: User = {
        username: username,
        password: password,
        email: email,
        firstName: f_name,
        lastName: l_name
      }
  
      if (validateUser(user)){    
        axios.post(variables.SERVER_URL + '/users', user)
        .then(response => {
          console.log(response)
          alert('User Created!')
        }).catch(error => {
            console.log(error);
            alert(error)
        });} else {
          status_message = 'Please complete the above form!';
        }
    }
  </script>
  
  <div>
      <h2 class="text-2xl m-4">Add User</h2>
      <form class="w-full max-w-lg mx-4">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input bind:value={f_name} class="{f_name == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Jane">
              {#if f_name == '' || l_name ==''}
              <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
              {/if}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input bind:value={l_name} class="{l_name == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                  Username
                </label>
                <input bind:value={username} class="{username == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" placeholder="jane.doe">
                <p class="text-gray-600 text-xs italic">Make it as unique as yourself!</p>
                {#if username == ''}
                <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
                {/if}
              </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password-1">
                  Password
                </label>
                <input bind:value={password} type="password" class="{password == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password-2" placeholder="******">
                {#if password == '' || repassword == ''}
                <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
                {/if}
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password-2">
                  Retype Password
                </label>
                <input bind:value={repassword} type="password" class="{password != repassword ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password-2" placeholder="******">
                {#if password != repassword}
                <p class="text-red-500 text-xs italic ">Passwords don't match!</p>
                {/if}
              </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                  E Mail
                </label>
                <input bind:value={email} class="{email == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="jane.doe@example.com">
                <p class="text-gray-600 text-xs italic">You are safe. We don't spam.</p>
                {#if email == ''}
                <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
                {/if}
              </div>
          </div>
          <div class="content-center -mx-3 mb-6">
              <div class="px-3">
                  <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" type="button">
                      Sign Up
                  </button>
                  {#if status_message != ''}
                  <p class="text-red-500 text-s italic ">{status_message}</p>
                  {/if}
              </div>
          </div>
        </form>
  </div>
  