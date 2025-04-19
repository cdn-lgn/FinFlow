export const loadState = ()=>{
  try {
const serializedState = sessionStorage.getItem("reduxState")
if(serializedState === null)return undefined
return JSON.parse(serializedState)
  } catch (error) {
    console.warn('Could not load state', error);
    return undefined;
  }
}


export const saveState =(state)=>{
  try {
const serializedState = JSON.stringify(state)
sessionStorage.setItem("reduxState",serializedState)
  } catch (error) {
    console.warn('Could not save state', error);
  }
}
