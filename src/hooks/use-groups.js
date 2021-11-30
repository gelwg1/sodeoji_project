import { useState, useEffect } from 'react';
import { arrayOfGroup } from '../services/firebase';

export default function useGroups() {
    const [groups, setGroups] = useState(null);
    var GroupList;
    useEffect(() => {
        async function getGroups() {
            GroupList = await arrayOfGroup();
            setGroups(GroupList);
        }

        getGroups();
    }, []);

    return { groups };
}
