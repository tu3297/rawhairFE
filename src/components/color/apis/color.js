import api from '../../../commom/AjaxUltil.js';

export function fetchListColorApi() {
  const getListColor = 'color/getAll';
  return api.get(
    getListColor, 
    null, 
  );
}
export function fetchaddColorApi(colorData){
  const addColor = 'color/addColor';
  return api.post(addColor,colorData);
}
export function deleteColorApi(colorId){
  const deleteColor = 'color/deleteColor';
  return api.post(deleteColor,colorId);
}