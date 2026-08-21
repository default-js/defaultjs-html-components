/**
 * @module utils/NodeHelper
 *
 * Helpers to traverse the DOM tree relative to a node.
 */

/**
 * Walks up the ancestor chain of a node and returns the first ancestor for
 * which `check` returns a truthy value.
 *
 * @param {Node} node - the node to start from.
 * @param {function(Node): boolean} check - predicate applied to each ancestor.
 * @returns {Node|null} the first matching ancestor, or `null` if none matches.
 */
export const findParent = (node, check) => {
	while(node != null) {
        if(check(node))
            return node;

        node = node.parent();
    }

    return null;
};

/**
 * Recursively searches the descendants of `node` and tracks the match with the
 * smallest depth found so far.
 *
 * @param {Node} node - the current node being inspected.
 * @param {number} depth - the depth of `node` relative to the search root.
 * @param {function(Node): boolean} check - predicate applied to each node.
 * @returns {{node: Node, depth: number}|null} the shallowest match with its depth, or `null`.
 */
const findClosest = (node, depth, check) => {
    if(check(node))
        return {node, depth}

    let result = null;
    for(let child of node.childNodes){
        const item = findClosest(child, depth + 1, check);

        if(item != null && (result == null || result.depth > item.depth))
            result = item;
    }

    return result;
}

/**
 * Searches the descendants of `node` and returns the matching node that is
 * closest to `node` (i.e. at the smallest depth).
 *
 * @param {Node} node - the root of the search.
 * @param {function(Node): boolean} check - predicate applied to each descendant.
 * @returns {Node|null} the shallowest matching descendant, or `null` if none matches.
 */
export const findClosestInDepth = (node, check) => {
    const closest = findClosest(node, 0, check);
    return closest != null ? closest.node : null;
}

export default {findParent, findClosestInDepth};
