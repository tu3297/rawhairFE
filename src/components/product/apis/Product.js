import api from '../../../commom/AjaxUltil';
export function getNextIdApi(action) {
  const getNextId = 'product/getNextId';
  return api.get(
    getNextId, 
    null, 
  );
}