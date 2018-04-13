<template>
	<div class="detail">
		这里是详情页哦～
		<h2>{{name}}</h2>
	</div>
</template>

<style>
	.detail {
		background-color: yellow;
	}
</style>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      name: ''
    }
  },
  watch: {
    '$route' () {
      this.name = this.$route.query.goodsId
    }
  }
}
</script>
