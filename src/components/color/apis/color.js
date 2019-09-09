import api from '../../../commom/AjaxUltil.js';

export function fetchListColor() {
  const getListColor = `color/getAll`;
  return api.get(
    getListColor, 
    null, 
  );
}