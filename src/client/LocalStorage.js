export const loadState = () => {
    try{
        const serialusedState = localStorage.getItem('state');

        if(serialusedState === null){
            return undefined;
        }
        return JSON.parse(serialusedState);
    }catch(err){
        return undefined;
    }
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }catch(err){
        return err;
    }
}