import { getData } from '/js/data.js';
import { createPopup } from '/js/popup.js';
import { initAdForm, disableAdForm, disableFilters, enableAdForm, enableFilters} from '/js/ad-form.js';
import { createMap } from '/js/map.js';


const SIMILAR_OFFERS_COUNT = 10;

//disableAdForm();
disableFilters();

createMap();

//enableAdForm;
initAdForm();
