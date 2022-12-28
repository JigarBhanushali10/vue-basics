<template>
    <div
        class="calucatorBody w-100 h-100 d-flex flex-column justify-content-start align-items-center bg-info overflow-auto">
        <div class="py-5 ">
            <figure class="">
                <img src="../../assets/images/logo.svg" alt="logo" class="img-fluid">
            </figure>
        </div>
        <div class="d-flex flex-column flex-sm-row bg-white rounded-4">
            <div class="p-4 col-12 col-sm-6">
                <div class="my-4">
                    <label class="text-secondary" for="bill">
                        Bill
                    </label>
                    <div class="input-container bg-light d-flex px-3 rounded-2 mt-2">
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="../../assets/images/icon-dollar.svg" alt="" srcset="">
                        </div>
                        <input type="number"
                            class=" form-control bg-light w-100 h-100 text-end shadow-none border-0  text-dark fw-bold fs-4  "
                            id="bill" v-model=bill autocomplete="off" @input="showValue"  placeholder="0">
                    </div>
                </div>
                <div class="my-4">

                    <label class="text-secondary">
                        Select Tip %
                    </label>
                    <div class="row g-4 mt-1">
                        <div class="col-6 col-sm-4">

                            <input type="radio" class="btn-check" v-model="discount" name="options" value="5"
                                id="option1" autocomplete="off">
                            <label class="btn btn-dark w-100 fs-4" for="option1"
                                :class="discount == 5 ? 'btn-active' : ''" @click="showValue">5%</label>

                        </div>
                        <div class="col-6 col-sm-4">

                            <input type="radio" class="btn-check" v-model="discount" name="options" value="10"
                                id="option2" autocomplete="off">
                            <label class="btn btn-dark w-100 fs-4" for="option2"
                                :class="discount == 10 ? 'btn-active' : ''" @click="showValue">10%</label>
                        </div>
                        <div class="col-6 col-sm-4">

                            <input type="radio" class="btn-check" v-model="discount" name="options" value="15"
                                id="option3" autocomplete="off">
                            <label class="btn btn-dark w-100 fs-4" for="option3"
                                :class="discount == 15 ? 'btn-active' : ''" @click="showValue">15%</label>
                        </div>
                        <div class="col-6 col-sm-4">


                            <input type="radio" class="btn-check" v-model="discount" name="options" value="25"
                                id="option4" autocomplete="off">
                            <label class="btn btn-dark w-100 fs-4" for="option4"
                                :class="discount == 25 ? 'btn-active' : ''" @click="showValue">25%</label>

                        </div>
                        <div class="col-6 col-sm-4">

                            <input type="radio" class="btn-check" v-model="discount" name="options" value="50"
                                ref="option5" id="option5" autocomplete="off">
                            <label class="btn btn-dark w-100 fs-4 " for="option5" @click="showValue"
                                :class="discount == 50 ? 'btn-active' : ''">50%</label>

                        </div>
                        <div class="input-container bg-light d rounded-2 col-6 col-sm-4">
                            <input type="text"
                                class=" form-control bg-light w-100 h-100 text-end border-0 shadow-none text-dark fw-bold fs-4 "
                                placeholder="Custom" name="options" id="option6" autocomplete="off" v-model="customeDiscount"  @input="showValue">
                        </div>
                    </div>
                </div>
                <div class="mt-4">


                    <label class="text-secondary" for="numberOfPeople">
                        Number of people
                    </label>

                    <div class="input-container bg-light d-flex px-3 rounded-2 mt-2"
                        :class="numberOfPeople == 0 ? 'input-container-error' : 'input-container'">
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="../../assets/images/icon-person.svg" alt="" srcset="">
                        </div>
                        <input type="number"
                            class=" form-control bg-light w-100 h-100 text-end shadow-none border-0  text-dark fw-bold fs-4  "
                            name="numberOfPeople" id="numberOfPeople" v-model="numberOfPeople" autocomplete="off"
                            @input="showValue"   placeholder="0">
                    </div>
                </div>

            </div>
            <div class=" h-sm-100 col-12 col-sm-6 p-4">

                <div class="h-100 bg-dark rounded-4 p-4 ">
                    <div class="h-100 py-3 px-2 d-flex flex-column justify-content-between">
                        <div>

                            <div class="d-flex justify-content-between my-3">
                                <div>
                                    <span class="text-light">

                                        Tip Amount
                                    </span>
                                    <br>
                                    <small class="text-muted">
                                        / person
                                    </small>
                                </div>
                                <div class="fs-1 text-primary">
                                    ${{tipAmount === 'NaN' ? 0.00 : tipAmount }}
                                </div>
                            </div>
                            <div class="d-flex justify-content-between my-3">
                                <div>
                                    <span class="text-light">

                                        Total
                                    </span>
                                    <br>
                                    <small class="text-muted">
                                        / person
                                    </small>
                                </div>
                                <div class="fs-1 text-primary">
                                    ${{ totalPerPerson === 'NaN' ? 0.00 : totalPerPerson }}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary text-dark w-100 fs-5" @click="reset">
                                RESET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
/* eslint-disable */

import { ref, computed } from "vue";

const option5 = ref('')
const bill = ref()
const numberOfPeople = ref()
const discount = ref()
const customeDiscount = ref()
const tipAmount: any = ref(0.00)
const totalPerPerson: any = ref(0.00)

const reset=()=>{
    bill.value=''
    discount.value=''
    customeDiscount.value=''
}

const showValue = () => {
if (customeDiscount.value) {
    discount.value = customeDiscount.value
}

    tipAmount.value = ((bill.value * discount.value / 100) / numberOfPeople.value).toFixed(2)
    totalPerPerson.value = (((bill.value * discount.value / 100) + bill.value) / numberOfPeople.value).toFixed(2)
}


</script>

<style scoped>

</style>