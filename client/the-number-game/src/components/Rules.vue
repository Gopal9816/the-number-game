<template>
    <section class="hero is-success is-bold is-fullheight">
        <div class="hero-body">
            <div class="container ">
                <h1 class="title has-text-centered">
                        How To Play
                </h1>
                <div class="subtitle">
                    <ol>
                        <li>The Computer generates a random 4 digit number. The digits are between 1-9 and there are no repetitions</li>
                        <li>Your job is to guess the number in as few guesses as possible</li>
                        <li>When you enter a guess, the computer will tell how many digits you got right</li>
                        <li>If you got one digit right it will return 1 B</li>
                        <li>If you got a digit right but it is in the wrong place, it will return 1 C</li>
                        <li>For example, if the computer returns 2B 1C then your guessed number will have 2 digits in the right place and one digit which is correct but in the wrong place</li>
                        <li>While guessing, you cannot repeat digits in the number you guess</li>
                
                    </ol>
                    <br />
                </div>
                <h1 class="title has-text-centered">Have Fun!!</h1>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name : 'rules'
}
</script>

<style>
    .subtitle{
        padding-top: 20px;
    }
    @media only screen and (max-width: 600px) {
        .hero{
            padding-left: 10px;
            padding-right: 10px;
        }
    } 
</style>
