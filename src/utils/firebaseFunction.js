import {
    collection,
Firestore,  
doc, 
orderBy, 
setDoc,
getDocs, 
query, 
} from "firebase/firestore";
import { firestore } from "../firebase.config"

 

//saving new item 
export const saveItem = async (data) => 
{
    await setDoc (doc(firestore, 'allitems', `${Date.now()}`), data, { 
        merge : true,
    });
};

//get all items
export const getAllitems = async () => {
    const items = await getDocs(
        query(collection(firestore, "allitems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};
