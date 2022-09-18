import axios from "axios";

export const fetchText = async () => {
    try {
        const response = await axios.get(`https://baconipsum.com/api/?type=meat-and-filler&paras=1`);
        const data = response.data;

        return data[0].split(''); //response returns array, needs first
    } catch (e) {
        throw e;
    }
}