<script>

export default {
  data() {
    return {
      title: "w"
    }

  }
}

</script>

<template>

  <h1>
    <router-link to="/">hello</router-link>
  </h1>

  <nav>
    <ul>

      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
      <li>
        <router-link to="/user/123">Go to user</router-link>
      </li>
    </ul>
  </nav>

</template>

<style>
#header>h1>a {
  display: initial;
  color: #D0D0D0;
  transition: color 200ms linear;
  margin:0 20px 0 20px;
  margin-bottom: -2px;
}

#header>h1 {
  display: contents;
  
}

#header>h1:hover {
  color: #FFFFFF;
  transition-duration: 80ms;
}





nav {
  display: inline;
}

nav>ul {
  padding-left: 0.5em;
  padding-right: 0.5em;
  list-style-type: none;
  display: inline-block;
}

nav>ul>li {
  display: inline;

}

nav>ul>li>a {
  display: inline-block;
  padding: 0.4em 0.6em 0.2em;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  transition: background-color 150ms;
  color: #BE81C5;
}

nav>ul>li>a:hover {
  background-color: #E0E0E0;
  transition-duration: 70ms;
}
</style>
