export default function findObjInArray(arr, searchTerm, prop) {
  let ret = -1;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][prop] == searchTerm) {
            ret = i;;
        }
    }
    return ret;
}

export function areEqual(arr1, arr2){
	if(arr1.length != arr2.length){
		return false;
	}
	for(let i = 0; i < arr1.length; i++){
		if(arr1[i] != arr2[i]){
			return false;
		}
	}
	return true;
}
