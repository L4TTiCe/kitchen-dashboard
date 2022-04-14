import { writable } from "svelte/store";
import { variables } from '$lib/env';
import axios from "axios";

export const kitchens = writable([]);
export const kitchenIds = writable([]);

// export async function fetchKitchen(kid: string) {
//     const URL = env.SERVER_URL + '/kitchens/' + kid;
//     try {
//         const response = await fetch(URL);
//         const data = await response.json();
//         console.log(data)
//     } catch (e) {
//         console.log(e)
//     }
//     // kitchen.set(data);
// }

export async function getKitchenIds() {
    axios.get(variables.SERVER_URL + '/kitchens')
    .then(response => {
        const data = response.data;
        let id = [];
        data.forEach(element => {
            id.push(element._id);
        });
        kitchenIds.set(id);
    }).catch(error => {
        console.log(error);
    });
}

export async function getKitchens() {
    axios.get(variables.SERVER_URL + '/kitchens')
    .then(response => {
        const data = response.data;
        // let data = [];
        // data.forEach(kitchen => {
        //     data.push(kitchen);
        // });
        kitchens.set(data);
    }).catch(error => {
        console.log(error);
    });
}

getKitchenIds();
getKitchens();
