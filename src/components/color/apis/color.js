import api from '../../../commom/AjaxUltil.js';

export function fetchListColor(userId) {
  const getListColor = `colors`;
  return api.get(
    getListColor, 
    null, 
  );
}