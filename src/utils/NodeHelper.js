export const findParent = (node, check) => {
	while(node != null) {		
        if(check(node))
            return node;

        node = node.parent();			
    }
    
    return null;
};

const findClosest = (node, depth, check) => {
    if(check(node))
        return {node, depth}

    let result = null;
    for(child in node.childNodes){
        const item = findClosestChild(child, depth + 1));

        if(result == null || result.depth > item.depth)            
            result = item;
    }

    return result;
}

export const findClosestInDepth = (node, check) => {
    const closest = findClosest(node, 0, check);
    return closest.node;
}