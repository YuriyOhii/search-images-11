import axios from 'axios';

export default class Pixabay {
    constructor(){
        this.BASE_URL = 'https://pixabay.com/api/';
        this.params = {
            per_page: 40,
            page: 1,
            key: '37868364-ee4dbef8cb4e94ed0f02125ab',
            orientation: 'horizontal',
            image_type: 'photo',
            safesearch: true,
            q: null,
        } 
    };

    increasePageNumber() {
        this.params.page += 1; 
    }

    set query(newQuery) {
        this.params.q = newQuery;
    }

    async fetchData() {
        const params = this.params;
        const fetchedData = await axios.get(`${this.BASE_URL}`,{params});
        const {data} = fetchedData;
        console.log(data);
        return data;
      }
}