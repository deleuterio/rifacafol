<template>
    <div>
        Confira seu email!
        {{user.email}}
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