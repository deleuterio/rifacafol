<template>
    <div>
        <v-alert
            dense
            outlined
            type="info"
            prominent
            icon="mdi-email"
        >
            Em instantes confirmaremos seu pedido no email:
            <br/>
            <strong>{{user.email}}</strong>
        </v-alert>
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