import api from '../../../commom/AjaxUltil.js';

export function fetchListColor() {
  const getListColor = 'color/getAll';
  return api.get(
    getListColor, 
    null, 
  );
}
export function addColor(colorData){
  console.log('addd');
  const addColor = 'color/addColor';
  return api.post(addColor,colorData);
}