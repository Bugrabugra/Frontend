<template>
  <div class="checkAccount">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-sheet
              color="blue-grey lighten-4"
              elevation="4"
              rounded
          >
            <v-form
                class="ma-4"
                ref="form"
                v-model="isFormValid"
            >
              <v-row>
                <v-col cols="6">

                  <!--Firm Type-->
                  <v-select
                      :items="firmType"
                      :rules="[
                        v => !!v || 'Firm Type is required',
                        ]"
                      item-text="text"
                      label="Business type of the firm"
                      v-model="firmTypeValue"
                  >
                  </v-select>

                  <!--Firm Full Name-->
                  <v-text-field
                      v-model="firmFullName"
                      :counter="70"
                      :rules="[
                        v => !!v || 'Firm Full Name is required',
                        v => (v && v.length <= 70) || 'Firm Full Name must be less than 70 characters',
                        ]"
                      label="Firm Full Name"
                  ></v-text-field>

                  <!--Taxpayer Number-->
                  <v-text-field
                      v-model="taxpayerNumber"
                      label="Taxpayer Number"
                      :counter="15"
                      :rules="[
                        v => !!v || 'Taxpayer Number is required',
                        v => (v && v.length <= 15) || 'Taxpayer Number must be less than 15 characters',
                        ]"
                  ></v-text-field>

                  <!--Tax Department-->
                  <v-text-field
                      v-model="taxDepartment"
                      label="Tax Department"
                      :counter="100"
                      :rules="[
                        v => !!v || 'Tax Department is required',
                        v => (v && v.length <= 100) || 'Tax Department must be less than 100 characters',
                        ]"
                  ></v-text-field>

                  <!--Firm Address-->
                  <v-text-field
                      v-model="firmAddress"
                      label="Firm Address"
                      :counter="200"
                      :rules="[
                        v => !!v || 'Firm Address is required',
                        v => (v && v.length <= 200) || 'Firm Address must be less than 200 characters',
                        ]"
                  ></v-text-field>

                  <!--Firm Key Contact Personnel-->
                  <v-text-field
                      v-model="firmKeyContactPersonnel"
                      label="Firm Key Contact Personnel"
                      :counter="70"
                      :rules="[
                        v => !!v || 'Firm Key Contact Personnel is required',
                        v => (v && v.length <= 70) || 'Firm Key Contact Personnel must be less than 70 characters',
                        ]"
                  ></v-text-field>

                  <!--Sector-->
                  <v-text-field
                      v-model="sector"
                      label="Sector"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <!--Birthplace-->
                  <v-select
                      v-model="birthplace"
                      :items="cities"
                      label="Birthplace"
                  ></v-select>

                  <!--City-->
                  <v-select
                      v-model="city"
                      :items="cities"
                      label="City"
                  ></v-select>

                  <!--District-->
                  <v-select
                      v-model="district"
                      :items="districts"
                      label="District"
                  ></v-select>

                  <!--Phone Number-->
                  <v-text-field
                      v-model="phoneNumber"
                      label="Phone Number"
                      :counter="15"
                      :rules="[
                        v => !!v || 'Phone Number is required',
                        v => Number.isInteger(Number(v)) || 'Phone Number must contain only numbers',
                        v => (v && v.length <= 15) || 'Phone Number must be less than 15 characters',
                        ]"
                  ></v-text-field>

                  <!--Fax-->
                  <v-text-field
                      v-model="fax"
                      label="Fax"
                      :counter="15"
                      :rules="[
                        v => !!v || 'Fax is required',
                        v => Number.isInteger(Number(v)) || 'Fax must contain only numbers',
                        v => (v && v.length <= 15) || 'Fax must be less than 15 characters',
                        ]"
                  ></v-text-field>

                  <!--Web Url-->
                  <v-text-field
                      v-model="webURL"
                      label="Web URL"
                  ></v-text-field>

                  <!--Email Addr-->
                  <v-text-field
                      v-model="emailAddr"
                      :rules="[
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                        ]"
                      label="E-mail"
                      required
                  ></v-text-field>

                </v-col>
              </v-row>

              <v-row justify="center">
                <v-btn
                    @click.prevent="submit"
                    color="blue lighten-1"
                    class="mb-2"
                    :disabled="!isFormValid"
                >
                  Create
                </v-btn>
              </v-row>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'CheckAccount',
    props: {

    },
    data() {
      return {
        isFormValid: false,
        firmFullName: "",
        firmTypeValue: "",
        firmType:
          [
            {text: "Tüzel Kişilik", value: "TUZEL_KISILIK"},
            {text: "Şahıs İşletmesi", value: "SAHIS_ISLETMESI"}
          ],
        taxpayerNumber: "",
        cities: ["İstanbul", "Yozgat"],
        birthplace: "",
        taxDepartment: "",
        firmAddress: "",
        firmKeyContactPersonnel: "",
        sector: "",
        city: "",
        districts: ["Kadıköy", "Sultanbeyli"],
        district: "",
        phoneNumber: "",
        fax: "",
        webURL: "",
        emailAddr: "",
      }
    },

    methods: {
      submit() {
        console.log({
          firmFullName: this.firmFullName,
          firmTypeValue: this.firmTypeValue,
          taxpayerNumber: this.taxpayerNumber,
          birthplace: this.birthplace,
          taxDepartment: this.taxDepartment,
          firmAddress: this.firmAddress,
          firmKeyContactPersonnel: this.firmKeyContactPersonnel,
          sector: this.sector,
          city: this.city,
          district: this.district,
          phoneNumber: this.phoneNumber,
          fax: this.fax,
          webURL: this.webURL,
          emailAddr: this.emailAddr,
        })
      }
    }
  }
</script>

<style scoped>

</style>
