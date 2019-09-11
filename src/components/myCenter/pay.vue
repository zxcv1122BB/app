<template>

</template>
<script>
  export default {
    name: 'pay',
    mounted () {
      let redirect = localStorage.getItem('pay');
      localStorage.removeItem('pay')
      setTimeout(() => {
        if(!redirect){
          this.$router.push('/');
        }else{
          document.write(decodeURIComponent(redirect));
        }
        
      }, 10);
    }
  }
</script>
