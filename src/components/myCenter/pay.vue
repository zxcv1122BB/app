<template>

</template>
<script>
  export default {
    name: 'pay',
    mounted () {
      setTimeout(() => {
        let redirect = localStorage.getItem('pay');
        localStorage.removeItem('pay')
        if (!redirect) {
          this.$router.push({name: 'depositFile'});
        }else{
          document.write(decodeURIComponent(redirect));
        }
        window.location.replace();
      }, 10);
    }
  }
</script>
