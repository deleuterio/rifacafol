<template>
    <div>
        <h3>Confira seu email:</h3>
        <br/>
        <b>{{user.email}}</b>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
}
</script>