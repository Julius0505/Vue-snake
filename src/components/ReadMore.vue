<template>
    <v-card>
        <v-card-text class="title">
What is PlugAndPlink?
        </v-card-text>
        <v-card-text>
PlugAndPlink lets two pianos connect over the Internet. <br/>
<v-list>
    <v-list-item>
Notes played on one piano sound on both pianos
    </v-list-item>
    <v-list-item>
        Notes played on the remote piano make lights come on on the local piano
    </v-list-item>
</v-list>


This means that instead of having to keep looking at your phone and looking back at your piano, your teacher can point out notes to play directly in your line of sight. <br/>
The result is that remote piano lessons become a lot more effective.
        </v-card-text>
           <v-card-text class="title">
What does PlugAndPlink look like?
        </v-card-text>
        <v-card-text>
            PlugAndPlink is shaped like a snake. The body of the snake is shaped so that it fits neatly on your keyboard but leaves you enough space to still play your keyboard.
<br/>

The neck of the snake can be bent into whatever shape best suits your piano.
<br/>

The nostrils of the snake indicate the mode of the snake such as waiting to pair with the app or paired and working. <br/>


There is no difference between the snake which your teacher uses and the snake which you have.
        </v-card-text>
           <v-card-title class="title">
Do I need the app?
        </v-card-title>
        <v-card-text>
            The snake alone does nothing without the app. The snake is controlled entirely through the app. <br/> The app guides you through setting up your snake and checking that it is working. <br/>

You create a PlugAndPlink account using the app. You need an account so that you can find the other person you want to share your snake with.
        </v-card-text>
           <v-card-text class="title">
Is piano sharing the only thing which PlugAndPlink does?
        </v-card-text>
        <v-card-text>
            For the 2020 version (the first version) yes. We plan to add more features in the future. But we think that piano sharing is the most useful feature to offer at this time.
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.v-card__title {
    word-break: normal;
}
.v-card {
    margin-top: -2px;
}
.v-card__text {

    font-size: 18px;
    color: #ffffff !important
}
@media screen and (max-width: 500px) {
 .v-card__text {
    font-size: 16px;

    
}
.v-card {
    margin-top: -20px;
}
}
.v-list-item {
    list-style: circle !important;
}

</style>