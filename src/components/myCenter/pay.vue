<template>

</template>
<script>
  export default {
    name: 'pay',
    mounted () {
      setTimeout(() => {
        let redirect = localStorage.getItem('pay');
        if (!redirect) {
          this.$router.push({name: 'weChat'});
          return;
        }
        document.write(decodeURIComponent(redirect));
      }, 10);
    }
  }
</script>
